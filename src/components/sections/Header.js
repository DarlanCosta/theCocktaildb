import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Text, HStack, Tooltip } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import Logo from '../ui/Logo';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { SearchBar } from './SearchBar';
import ExitButton from '../ExitButton';

const MenuItem = ({ children, isLast, to = '/', ...rest }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <Link to={to}>{children}</Link>
    </Text>
  );
};

const CloseIcon = () => (
  <svg width="24" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <title>Close</title>
    <path
      fill="white"
      d="M9.00023 7.58599L13.9502 2.63599L15.3642 4.04999L10.4142 8.99999L15.3642 13.95L13.9502 15.364L9.00023 10.414L4.05023 15.364L2.63623 13.95L7.58623 8.99999L2.63623 4.04999L4.05023 2.63599L9.00023 7.58599Z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    width="24px"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <title>Menu</title>
    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
  </svg>
);

const Header = props => {
  const [show, setShow] = React.useState(false);
  const toggleMenu = () => setShow(!show);
  const user = useSelector(state => state.auth);

  return (
    <Flex
      as="nav"
      align="center"
      justifyItems="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
      bg={['primary.500', 'primary.500', 'transparent', 'transparent']}
      {...props}
    >
      <Flex align="center">
        <Logo w="100px" />
      </Flex>
      <SearchBar />

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <MenuIcon />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align="center"
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItem color="blue.300" to="/categories">
            Categories
          </MenuItem>
          <MenuItem color="blue.300" to="/videos">
            Videos
          </MenuItem>
          <MenuItem color="blue.300" to="/ingredients">
            Ingredients
          </MenuItem>

          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
      </Box>

      <Tooltip label="Sair" aria-label="Sair">
        <HStack bg="blue.300" borderRadius="6" p="1" as="button">
          <FaUser margin="2" size="20" />
          <ExitButton label={user.name} />
        </HStack>
      </Tooltip>
    </Flex>
  );
};

export default Header;
