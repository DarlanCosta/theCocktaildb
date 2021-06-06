import React from 'react';
import { Image } from '@chakra-ui/react';
import logo from './logo.png';

const Logo = props => {
  return <Image src={logo} {...props} />;
};

export default Logo;
