import React from 'react';
import { Box, Text, VStack, Grid } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../components/ColorModeSwitcher';
import Logo from '../components/ui/Logo';
import EntryButton from '../components/EntryButton';

export default function Main() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
        </VStack>
        <VStack spacing={8}>
          <Text fontSize="30">
            Welcome to the app
            <Text fontSize="45" color="blue.700">
              TheCocktailDB
            </Text>
            choose your drink and enjoy!
          </Text>

          <EntryButton type="button" label="Entry" />
        </VStack>
      </Grid>
    </Box>
  );
}
