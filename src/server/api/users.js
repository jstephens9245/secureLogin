const router = require('express').Router();
const User = require('../models/user');
const Session = require('../models/session');

module.exports = router;

router.use((req, res, next) => {
  console.log('got to /api/users routes');
  // you can use this for custom middleware
  next();
});

// Your code goes here

// signup
router.post('/', (req, res, next) => {
  // @todo security issue
  return User.create(req.body)
    .then(user => Session.add(user.id))
    .then(sessionId => {
      res.cookie('sessionId', sessionId);
      res.json({});
    })
    .catch(next);
})

router.get('/', (req, res, next) => {
  return User.findAll()
    .then((users) => {
      res.json(users);
    })
    .catch(next);
});

