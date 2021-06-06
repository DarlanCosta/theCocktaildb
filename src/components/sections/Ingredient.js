import React from 'react';
import { Code, Image, Stack } from '@chakra-ui/react';

const Ingredient = ({ measure, ingredient, visible }) => {
  if (visible) {
    return (
      <Stack alignSelf="start">
        <Code>{measure}</Code>
        <Image
          alt={ingredient}
          src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`}
        />
      </Stack>
    );
  }
  return <></>;
};

export default Ingredient;
