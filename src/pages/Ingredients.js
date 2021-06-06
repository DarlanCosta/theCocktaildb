import React, { useEffect, useState } from 'react';
import {
  Image,
  Heading,
  Flex,
  SimpleGrid,
  AlertDialog,
} from '@chakra-ui/react';
import api from '../services/api';

export default function Ingredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const { data } = await api.get(`list.php?i=list`);

        setIngredients(data.drinks);
      } catch (error) {
        AlertDialog(error);
      }
    };
    loadIngredients();
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Heading alignSelf="center" color="white" mt="10">
        Ingredients
      </Heading>

      <Flex width="90%" my="6" maxWidth={1480} mx="auto" px="6">
        <SimpleGrid flex="1" gap="4" minChildWidth="180px" align="flex-start">
          {ingredients.map(ingredient => (
            <>
              <Image
                alt={ingredient.strIngredient1}
                src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Medium.png`}
              />
            </>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
