import React, { useEffect } from 'react';
import {
  Heading,
  Flex,
  SimpleGrid,
  AspectRatio,
  AlertDialog,
} from '@chakra-ui/react';
import api from '../services/api';

export default function Ingredients() {
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const { data } = await api.get(`list.php?i=list`);
        console.log(data);
      } catch (error) {
        AlertDialog(error);
      }
    };
    loadIngredients();
  }, []);

  return (
    <Flex direction="column" h="100vh">
      <Heading alignSelf="center" color="white" mt="10">
        Videos
      </Heading>

      <Flex width="90%" my="6" maxWidth={1480} mx="auto" px="6">
        <SimpleGrid flex="1" gap="4" minChildWidth="180px" align="flex-start">
          <AspectRatio maxW="560px" ratio={1}>
            <iframe
              title="Drink 1"
              src="https://www.youtube.com/embed/ApMR3IWYZHI"
              allowFullScreen
            />
          </AspectRatio>
          <AspectRatio maxW="560px" ratio={1}>
            <iframe
              title="Drink 2"
              src="https://www.youtube.com/embed/c6GV_vRlIIA"
              allowFullScreen
            />
          </AspectRatio>

          <AspectRatio maxW="560px" ratio={1}>
            <iframe
              title="Drink 2"
              src="https://www.youtube.com/embed/-eQnWhxwbG8"
              allowFullScreen
            />
          </AspectRatio>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
