import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Review from './Review';
import axios from 'axios';
import moment from 'moment';
import { BoozeContext } from '../boozeContext';
import { UserContext } from '../userContext';

import { ingredientParser } from '../../utils/parseIng';
import StarRating from '../components/StarRating.jsx';

// Testing deployed instance workflow //
const DrinkView = () => {
  // useParams will grab the param passed in url. grabbing drinkId from params.
  const { drinkId } = useParams();
  const [aDrink, setADrink] = useState({});

  // Initial state to be changed once we have a valid network call to get reviews.
  useEffect(() => {
    return axios
      .get(`/routes/drink/${drinkId}`)
      .then(({ data }) => {
        console.log(drinkId, 31);
        setADrink(data.drinks[0]);
      })
      .catch((err) => console.error('THIS IS OUR ERROR!', err, drinkId));
  }, []);

  const [reviews, setReviews] = useState([]);

  const ingredients = ingredientParser(aDrink);

  const { isLoggedIn, favoriteDrinks, toggleFavorite, removeFavorite, getShoppingList, shoppingList, updateShoppingList, setShoppingList } =
    useContext(UserContext);

    //when drinkView renders setShoppingList
    useEffect(() => {
      getShoppingList();
    }, [])


  // grab what we need from drink object, reassign names
  const {
    idDrink: id,
    strDrink: name,
    strDrinkThumb: thumbnail,
    strAlcoholic: alcoholic,
    strGlass: glass,
    strInstructions: directions,
  } = aDrink;

  // Function to grab all reviews for a given drink
  const getReviews = () => {
    return axios

      .get(`/routes/users/getReviews/${id}`)
      .then(({ data }) => {
        console.log(id, 56);
        data.map((rev) => {
          rev.created_at = moment(rev.created_at).format(
            'dddd, MMMM Do YYYY, h:mm a'
          );
          return rev;
        });
        setReviews(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeButton = () => {
    if (favoriteDrinks.includes(name)) {
      return (
        <span className='remove-button' onClick={() => removeFavorite(aDrink)}>
          <button type='button' className='btn btn-danger'>
            Remove from Favorites
          </button>
        </span>
      );
    }
  };
  // console.log(isLoggedIn, 79);

  const userButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          <br></br>
          <span className='drink-button'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={() => {
                toggleFavorite(aDrink);
              }}
            >
              Add To Favorites
            </button>
            <div>
              <Review aDrink={aDrink} getReviews={getReviews} />
            </div>
          </span>
          {removeButton()}
        </>
      );
    }
  };

  //Slackerss add Drink to shoppingList button
  const ShoppingButton = () => {
    //initialize object to pass into shoppingList with id and name and quantity of 1
    const updateObj = {
      drinkId: id,
      name: name,
      quantity: 1
    }
    // for each ingredient assign an ingredient property and measurement property 
    let count = 1;
    ingredients.forEach((ing) => {
      updateObj[`ing${count}`] = ing[0];
      updateObj[`meas${count}`] = ing[1];
      count++;
    })
    count = 0;
    if (isLoggedIn) {
      return (
        <>
          <br></br>
          <span className='drink-button'>
            <button
              type='button'
              className='btn btn-dark'
              onClick={() => {
                updateShoppingList({ update: updateObj });
              }}
            >
              Add To Shopping List
            </button>
          </span>
        {/** remove from Shoppinglist button? */}
        </>
      );
    }
  };

  return (
    <div className='container'>
      <h2 className='page-heading'>{name}</h2>
      <div className='row'>
        <div className='col-md-8'>
          <img src={thumbnail} className='img-fluid drink-display' alt={name} />
        </div>
        <div className='col-md-4'>
          <h4>{alcoholic}</h4>
          <h4>Glass: {glass}</h4>
          <hr></hr>
          <h5>Ingredients</h5>
          <ul>
            {ingredients.map((i, index) => {
              return (
                <li key={index}>
                  {i[1]} {i[0]}
                </li>
              ); //* each element is an array containing an ingredient followed by it's measurement
            })}
          </ul>
          <h5>Directions</h5>
          <p>{directions}</p>
          <StarRating />
          {userButtons()}
          {ShoppingButton()}
          <br></br>
          <br></br>
        </div>
      </div>
      <div>
        <h2 className='page-heading'>User Reviews:</h2>
        <div style={{ margin: '40px' }}>
          {reviews.map((review, i) => (
            <p
              key={i}
            >{`${review.review} - ${review.username}, ${review.created_at}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
/* Will need to map over an array of reviews that we get for a given 
drink. */
export default DrinkView;
