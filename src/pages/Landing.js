import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Text } from '@chakra-ui/react';
import Hero from '../components/sections/Hero';
import LandingLayout from '../components/layouts/LandingLayout';
import api from '../services/ApiTheCocktailDB';

export default function Landing() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);

  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await api.get('list.php?c=list');

      dispatch({
        type: '@drink/ADD_CATEGORIES',
        categories: data.drinks,
      });
    };

    loadCategories();
  }, []);

  const [image, setImage] = useState('');
  useEffect(() => {
    const LoadRandomImage = async () => {
      const { data } = await api.get('random.php');

      setImage(data.drinks[0].strDrinkThumb);
    };

    LoadRandomImage();
  }, []);
  return (
    <>
      {user.signed ? (
        <LandingLayout h="100vh">
          <Hero
            key={image}
            title="Make the best drink yourself"
            subtitle="With our recipes you and your guests will have fun enjoying the best drinks in the world."
            image={image}
            ctaLink="/signup"
          />
        </LandingLayout>
      ) : (
        <Text>Not logeed user</Text>
      )}
    </>
  );
}

// export default connect(state => ({
//   state,
// }))(Landing);
