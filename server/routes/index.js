const { feedRouter } = require('./feed.js');
const { drinkRouter } = require('./drinkView.js');
const { searchRouter } = require('./search.js');
const { customRouter } = require('./customFeed.js');
const { usersRouter } = require('./users.js');
const { uploadImgRouter } = require('./uploadImg.js');
const { eventRouter } = require('./event.js');

module.exports = (app) => {
  app.use(`/routes/feed/`, feedRouter),
  app.use('/routes/search/', searchRouter),
  app.use('/routes/drink/', drinkRouter),
  app.use('/routes/custom/', customRouter),
  app.use('/routes/images', uploadImgRouter),
  app.use('/routes/event/', eventRouter),
  app.use('/routes/users/', usersRouter)
};
