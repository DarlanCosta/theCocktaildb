import React from 'react';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import Routes from './routes';

import { store, persistor } from './store';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ChakraProvider>
  );
}

export default App;
