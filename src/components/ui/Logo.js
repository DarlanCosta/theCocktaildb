import React from 'react';
import { Image, Text, VStack } from '@chakra-ui/react';
import logo from './logo.png';

const Logo = props => {
  return (
    <VStack>
      <Image src={logo} {...props} />
      <Text color="gray.400">TheCocktailDB</Text>
    </VStack>
  );
};

export default Logo;
