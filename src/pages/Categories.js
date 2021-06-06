import React from 'react';

import {
  Box,
  useColorModeValue,
  VStack,
  Flex,
  SimpleGrid,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function Categories({ categories }) {
  const history = useHistory();

  return (
    <Flex direction="column" h="100vh">
      <Heading alignSelf="center" mt="10">
        Categories
      </Heading>

      <Flex width="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SimpleGrid flex="1" gap="4" minChildWidth="320px">
          {categories &&
            categories.map(categorie => (
              <VStack key={categorie.strCategory}>
                <Box
                  maxW="445px"
                  w="full"
                  margin="3"
                  bg={useColorModeValue('white', 'gray.700')}
                  boxShadow="2xl"
                  rounded="md"
                  as="button"
                  _hover={{
                    bg: 'gray.600',
                  }}
                  p={6}
                  overflow="hidden"
                  color="blue.200"
                  onClick={() =>
                    history.push(`/drinks?category=${categorie.strCategory}`)
                  }
                >
                  {categorie.strCategory}
                </Box>
                <Divider orientation="horizontal" />
              </VStack>
            ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

export default connect(state => ({
  categories: state.categories,
}))(Categories);
