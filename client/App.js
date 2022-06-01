import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './src/reducers'
import { AuthScreen } from './src/screens';

import BottomTabNavigator from './src/navigations/BottomTabNavigator';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen}/>
          <Stack.Screen name="Main" component={BottomTabNavigator}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;