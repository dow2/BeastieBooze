const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment');
const mongoose = require('mongoose');
////////////////////////////////////////////////////////
const DATABASE = process.env.DB_NAME || 'BeastieBooze';
// for dev - uncomment the next line and comment out line 10
// const dbLocation = `mongodb://localhost:27017/${DATABASE}`;
// for prod
const dbLocation = `${process.env.ATLAS_URL}/${DATABASE}`;
// const dbLocation = process.env.ATLAS_URL;
mongoose
  .connect(dbLocation, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`sucessfully connected! ${DATABASE}`);
  })
  .catch((err) => console.error('Failed to connect to database', err));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// Adding review schema.
const ReviewSchema = new mongoose.Schema(
  {
    username: String,
    googleId: String,
    review: String,
    drinkId: Number,
  },
  { timestamps: { createdAt: 'created_at' } }
);

const Review = mongoose.model('Review', ReviewSchema);

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
  },
  username: String,
  favorites: [],
  creations: [],
});

const DrinkSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  ingredients: {},
  alcoholic: Boolean,
  createdBy: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    },
  ],
  //add a createdBy to the drinkSchema to link to Users once created
});

const EventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  location: String,
  eventType: String,
});

const User = mongoose.model('User', UserSchema);
const Drink = mongoose.model('Drink', DrinkSchema);
const Event = mongoose.model('Event', EventSchema);

const drinkListingSchema = new mongoose.Schema({
  drinkId: {
    type: Number,
    unique: true,
  },
  name: String,
  quantity: Number,
  ing1: String, meas1: String,
  ing2: String, meas2: String,
  ing3: String, meas3: String,
  ing4: String, meas4: String,
  ing5: String, meas5: String,
  ing6: String, meas6: String,
  ing7: String, meas7: String,
  ing8: String, meas8: String,
  ing9: String, meas9: String,
  ing10: String, meas10: String,
  ing11: String, meas11: String,
  ing12: String, meas12: String
});

// Slackerss ShoppingList Schema for profiles
const UsersShoppingListSchema = new mongoose.Schema({
  googleId: {
    type: String,
    ref: User,
    unique: true
  },
  List: [drinkListingSchema],
});

const ShoppingList = mongoose.model('shoppingList', UsersShoppingListSchema);

const addDrink = async (drink) => {
  const { drinkName: name, instructions, ingredients, alcoholic } = drink;
  const newDrink = new Drink({
    name,
    instructions,
    ingredients,
    alcoholic,
  });
  await newDrink.save();
};

const getDrinks = async () => {
  return await Drink.find({}).exec();
};

const createEvent = async (args) => {
  const { eventName: title, description, date, location, eventType } = args;
  const newEvent = new Event({
    title,
    description,
    date,
    location,
    eventType,
  });
  await newEvent.save();
};

const getEvents = async () => {
  return await Event.find({}).exec();
};

module.exports = {
  User,
  Drink,
  addDrink,
  getDrinks,
  Review,
  Event,
  createEvent,
  ShoppingList,
  getEvents,
};
