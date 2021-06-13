import React, { useEffect, useState } from 'react';
import {
  Image,
  Box,
  Heading,
  Text,
  Stack,
  Flex,
  SimpleGrid,
  AlertDialog,
} from '@chakra-ui/react';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import api from '../services/ApiTheCocktailDB';

function Drinks({ dispatch, state }) {
  const [drinks, setDrinks] = useState([]);

  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const category = query.get('category');

  useEffect(() => {
    const loadDrinks = async () => {
      const drinksFiltered = state.drinks.filter(
        d => d.strCategory === category
      );

      if (drinksFiltered.length > 0) {
        setDrinks(drinksFiltered);
      } else {
        try {
          const { data } = await api.get(`filter.php?c=${category}`);

          const sendDrinks = data.drinks.map(dri => ({
            ...dri,
            strCategory: category,
          }));

          dispatch({
            type: '@drink/ADD_DRINKS',
            drinks: sendDrinks,
          });

          setDrinks(data.drinks);
        } catch (error) {
          AlertDialog(error);
        }
      }
    };

    loadDrinks();
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Heading alignSelf="center" color="white" mt="10">
        {query.get('category')}
      </Heading>

      <Flex width="90%" my="6" maxWidth={1480} mx="auto" px="6">
        <SimpleGrid flex="1" gap="4" minChildWidth="180px" align="flex-start">
          {drinks.map(drink => (
            <Box
              // maxW="445px"
              // w="200"
              key={drink.idDrink}
              bg="gray.700"
              boxShadow="2xl"
              rounded="md"
              p={6}
              overflow="hidden"
              as="a"
              _hover={{
                bg: 'gray.600',
                cursor: 'pointer',
                opacity: '0.8',
              }}
              onClick={() => history.push(`/drinkdetails?id=${drink.idDrink}`)}
            >
              <Box bg="gray.100" mt={-6} mx={-6} mb={2} pos="relative">
                <Image src={drink.strDrinkThumb} />
              </Box>
              <Stack direction="column" spacing={0} fontSize="sm">
                <Text alignSelf="center" color="gray.500">
                  Código: {drink.idDrink}
                </Text>
              </Stack>
              <Stack>
                <Text
                  alignSelf="center"
                  color="blue.500"
                  textTransform="uppercase"
                  fontWeight={800}
                  fontSize="sm"
                  mt="3"
                >
                  {drink.strDrink}
                </Text>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default connect(state => ({
  state,
}))(Drinks);
