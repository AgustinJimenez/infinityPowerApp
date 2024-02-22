import React from 'react';
import {RootNavigation} from 'src/root/rootRoutes';
import {Provider} from 'react-redux';
import {persistor, rootStore} from 'src/root/rootStore';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
