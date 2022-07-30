const { User, Drink, Review, ShoppingList } = require('./Models');

// getUser should take a userId and return the found user, empty array or null if not found?
const getUser = async (id) => {
  try {
    const user = await User.find({ googleId: id });
    return user;
  } catch (err) {
    console.log('getUser failed', err);
  }
};

// createUser should take a user object ({ googleId, username }) which should make a new user entry in the db
const createUser = async (userObj) => {
  const { googleId, givenName: username } = userObj;

  try {
    const newUser = await User.create({ googleId, username });
    return newUser;
  } catch (err) {
    console.log('createUser failed', err);
  }
};

const findAndUpdate = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { creations: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndUpdateFavorites = async (id, data) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $push: { favorites: data } },
    { new: true }
  );
  return updatedUser;
};

const findAndDeleteFavorites = async (id, drinkId) => {
  const updatedUser = await User.findOneAndUpdate(
    { googleId: id },
    { $pull: { favorites: { favId: drinkId } } },
    { new: true }
  );
  return updatedUser;
};

// Adds a review to the review model with information on author, drink and review.
const addReviews = async (data) => {
  const reviewList = await Review.create({
    googleId: data.id,
    review: data.review,
    drinkId: data.drinkId,
    username: data.username,
  });
  return reviewList;
};

// Gets all reviews for a given drink id.
const findDrinkReviews = async (id) => {
  const drinkReviews = await Review.find({ drinkId: id });
  // .populate('Review')
  // .exec((err) => {
  //   console.error(err);
  // });
  return drinkReviews;
};


// Slackers get and create shoppingList
const getShoppingList = async (userId) => {
  const { googleId } = userId;
  
  try {
    const shoppingList = await ShoppingList.find({ user: googleId });
    return shoppingList;
  } catch (err) {
    console.error('could not get shoppingList\n', err);
  }
  
  } 
  
  const createShoppingList = async (userId) => {
    const { googleId } = userId;
  
    try {
      const newList = await ShoppingList.create({ googleId })
      return newList;
    } catch (err) {
      console.error('createUserShoppingList failed \n', err);
    }
  }


module.exports = {
  getUser,
  createUser,
  findAndUpdate,
  findAndUpdateFavorites,
  findAndDeleteFavorites,
  addReviews,
  findDrinkReviews,
  createShoppingList,
  getShoppingList
};
