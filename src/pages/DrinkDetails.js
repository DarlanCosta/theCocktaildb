import React, { useEffect, useState } from 'react';
import {
  Button,
  Code,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { FaStar } from 'react-icons/fa';
import api from '../services/ApiTheCocktailDB';
import Ingredient from '../components/sections/Ingredient';

function DrinkDetails() {
  const query = useQuery();
  const id = query.get('id');
  const dispatch = useDispatch();
  const updatedDrink = useSelector(state => state.drinks);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const [drink, setDrink] = useState({});
  const [favorite, setFavorite] = useState(false);
  // const [ingredient, setIngredient] = useState([]);
  useEffect(() => {
    const LoadDrink = async () => {
      const { data } = await api.get(`lookup.php?i=${id}`);
      setDrink(data.drinks[0]);
    };

    LoadDrink();
  }, []);

  useEffect(() => {
    const index = updatedDrink.findIndex(ind => ind.idDrink === id);
    setFavorite(!!updatedDrink[index].favorite);
  }, [updatedDrink]);

  const handleFavorite = async () => {
    dispatch({
      type: '@drink/ADD_DRINKS_FAVORITE',
      id: drink.idDrink,
      toggle: !favorite,
    });
  };

  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <VStack spacing={6} w="full" maxW="lg">
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as="span"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              {drink.strDrink}
            </Text>
          </Heading>
          {favorite && <FaStar size={30} />}
          <Button onClick={handleFavorite}>
            {favorite ? 'Remove favorite' : 'Add favorite'}{' '}
          </Button>

          <Text
            alignSelf="self-start"
            color="blue.400"
            fontSize="2xl"
            as="span"
          >
            Category: <Code>{drink.strCategory}</Code>
          </Text>
          <Text
            alignSelf="self-start"
            color="blue.400"
            fontSize="2xl"
            as="span"
          >
            Alcoholic: <Code>{drink.strAlcoholic}</Code>
          </Text>

          <Text
            alignSelf="self-start"
            color="blue.400"
            fontSize="2xl"
            as="span"
          >
            Ingridients
          </Text>
          <Divider orientation="vertical" />
          <HStack alignSelf="self-start" spacing={1}>
            <Ingredient
              measure={drink.strMeasure1}
              ingredient={drink.strIngredient1}
              visible={!!drink.strIngredient1}
            />
            <Ingredient
              measure={drink.strMeasure2}
              ingredient={drink.strIngredient2}
              visible={!!drink.strIngredient2}
            />
            <Ingredient
              measure={drink.strMeasure3}
              ingredient={drink.strIngredient3}
              visible={!!drink.strIngredient3}
            />
            <Ingredient
              measure={drink.strMeasure4}
              ingredient={drink.strIngredient4}
              visible={!!drink.strIngredient4}
            />
            <Ingredient
              measure={drink.strMeasure5}
              ingredient={drink.strIngredient5}
              visible={!!drink.strIngredient5}
            />
          </HStack>
          <HStack alignSelf="self-start" spacing={1}>
            <Ingredient
              measure={drink.strMeasure6}
              ingredient={drink.strIngredient6}
              visible={!!drink.strIngredient6}
            />
            <Ingredient
              measure={drink.strMeasure7}
              ingredient={drink.strIngredient7}
              visible={!!drink.strIngredient7}
            />
            <Ingredient
              measure={drink.strMeasure8}
              ingredient={drink.strIngredient8}
              visible={!!drink.strIngredient8}
            />
            <Ingredient
              measure={drink.strMeasure9}
              ingredient={drink.strIngredient9}
              visible={!!drink.strIngredient9}
            />
            <Ingredient
              measure={drink.strMeasure10}
              ingredient={drink.strIngredient10}
              visible={!!drink.strIngredient10}
            />
          </HStack>
          <HStack alignSelf="self-start" spacing={1}>
            <Ingredient
              measure={drink.strMeasure11}
              ingredient={drink.strIngredient11}
              visible={!!drink.strIngredient11}
            />
            <Ingredient
              measure={drink.strMeasure12}
              ingredient={drink.strIngredient12}
              visible={!!drink.strIngredient12}
            />
            <Ingredient
              measure={drink.strMeasure13}
              ingredient={drink.strIngredient13}
              visible={!!drink.strIngredient13}
            />
            <Ingredient
              measure={drink.strMeasure14}
              ingredient={drink.strIngredient14}
              visible={!!drink.strIngredient14}
            />
            <Ingredient
              measure={drink.strMeasure15}
              ingredient={drink.strIngredient15}
              visible={!!drink.strIngredient15}
            />
          </HStack>

          <Text
            alignSelf="self-start"
            color="blue.400"
            fontSize="2xl"
            as="span"
          >
            Instructions
          </Text>
          <Text
            fontSize={{ base: 'md', lg: 'lg' }}
            alignSelf="start"
            color="gray.500"
          >
            {drink.strInstructions}
          </Text>
        </VStack>
      </Flex>
      <Flex flex={1}>
        <Image alt="Drink Image" objectFit="cover" src={drink.strDrinkThumb} />
      </Flex>
    </Stack>
  );
}

export default connect()(DrinkDetails);
