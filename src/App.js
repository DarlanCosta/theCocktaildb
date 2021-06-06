import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import Routes from './routes';

import store from './store';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ChakraProvider>
  );
}

export default App;
