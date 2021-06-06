import React, { useEffect, useState } from 'react';

import { connect } from 'react-redux';
import Hero from '../components/sections/Hero';
import LandingLayout from '../components/layouts/LandingLayout';
import api from '../services/api';

function Landing({ dispatch }) {
  useEffect(() => {
    const loadCategories = async () => {
      const { data } = await api.get('list.php?c=list');

      dispatch({
        type: 'ADD_CATEGORIES',
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
    <LandingLayout>
      <Hero
        title="Make the best drink yourself"
        subtitle="With our recipes you and your guests will have fun enjoying the best drinks in the world."
        image={image}
        ctaLink="/signup"
      />
    </LandingLayout>
  );
}

export default connect(state => ({
  state,
}))(Landing);
