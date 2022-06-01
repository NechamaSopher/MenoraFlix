import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';

import { FavoritesScreen, MyHomeScreen } from '../screens';
import Icon from '../components/Icon';
import Logout from '../components/Logout';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = ({navigation}) => {
  return (
    <BottomTab.Navigator
      initialRouteName="MyHome"
      screenOptions={{
        headerStyle: { backgroundColor: 'red' },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        tabBarStyle: {
          height: 55,
          backgroundColor: 'black',
        },
        tabBarLabelStyle: {
          color: 'white',
          fontSize: 12
        }
      }}>
      <BottomTab.Screen
        name="MyHome"
        component={MyHomeScreen}
        options={{
          title: 'My Home',
          tabBarIcon: () => (<Image source={require('../assets/icons8-home-48.png')} style={{width: 30, height: 30}} />),
          headerRight: () => (
            <Logout navigation={navigation}/>
          )
        }}        
      />
      <BottomTab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: 'Favorites',
          headerShown: false,
          tabBarIcon: () => (<Icon />)
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
  