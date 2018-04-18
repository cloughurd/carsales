// Express Setup
const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

// Knex Setup
const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

// bcrypt setup
let bcrypt = require('bcrypt');
const saltRounds = 10;

// login
app.post('/api/login', (req, res) => {
  if (!req.body.username || !req.body.password)
    return res.status(400).send();
  knex('users').where('username',req.body.username).first().then(user => {
    if (user === undefined) {
      res.status(403).send("Invalid credentials");
      throw new Error('abort');
    }
    return [bcrypt.compare(req.body.password, user.hash),user];
  }).spread((result,user) => {
    if (result)
      res.status(200).json({user:{username:user.username,name:user.name,id:user.id}});
    else
      res.status(403).send("Invalid credentials");
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});
// register
app.post('/api/users', (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.username || !req.body.name)
    return res.status(400).send();
  knex('users').where('email',req.body.email).first().then(user => {
    if (user !== undefined) {
      res.status(403).send("Email address already exists");
      throw new Error('abort');
    }
    return knex('users').where('username',req.body.username).first();
  }).then(user => {
    if (user !== undefined) {
      res.status(409).send("User name already exists");
      throw new Error('abort');
    }
    return bcrypt.hash(req.body.password, saltRounds);
  }).then(hash => {
    return knex('users').insert({email: req.body.email, hash: hash, username:req.body.username,
				 name:req.body.name, role: 'user'});
  }).then(ids => {
    return knex('users').where('id',ids[0]).first().select('username','name','id');
  }).then(user => {
    res.status(200).json({user:user});
    return;
  }).catch(error => {
    if (error.message !== 'abort') {
      console.log(error);
      res.status(500).json({ error });
    }
  });
});

// get all listings
app.get('/api/listings', (req, res) => {
  knex('users').join('listings','users.id','listings.user_id')
    .where('users.role','user')
    .orderBy('created','desc')
    .select('title','price','year','miles','description','created','username').then(listings =>{
      res.status(200).json({results:listings});
    }).catch(error =>{
      res.status(500).json({ error });
    });
});

// get listings made by a user
app.get('/api/users/:id/listings', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').join('listings','users.id','listings.user_id')
    .where('users.id',id)
    .orderBy('created','desc')
    .select('title','price','year','miles','description','created','username').then(listings => {
      res.status(200).json({results:listings});
    }).catch(error => {
      res.status(500).json({ error });
    });
});
// add new listing for a user
app.post('/api/users/:id/listings', (req, res) => {
  let id = parseInt(req.params.id);
  knex('users').where('id',id).first().then(user => {
    return knex('listings').insert({user_id: id,
      title:req.body.title,
      price:req.body.price,
      year:req.body.year,
      miles:req.body.miles,
      description:req.body.description,
      created: new Date()});
  }).then(ids => {
    return knex('listings').where('id',ids[0]).first();
  }).then(listing => {
    res.status(200).json({result:listing});
    return;
  }).catch(error => {
    console.log(error);
    res.status(500).json({ error });
  });
});

// search
app.get('/api/listings/search', (req, res) => {
  if (!req.query.keywords)
    return res.status(400).send();
  let offset = 0;
  if (req.query.offset)
    offset = parseInt(req.query.offset);
  let limit = 50;
  if (req.query.limit)
    limit = parseInt(req.query.limit);
  knex('users').join('listings','users.id','listings.user_id')
    .whereRaw("MATCH (title) AGAINST('" + req.query.keywords + "')")
    .orderBy('created','desc')
    .limit(limit)
    .offset(offset)
    .select('title','price','year','miles','username','description','created').then(listings => {
      res.status(200).json({results:listings});
    }).catch(error => {
      res.status(500).json({ error });
    });
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
