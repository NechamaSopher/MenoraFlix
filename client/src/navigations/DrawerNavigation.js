//I tried many ways to add a drawer but each time this module returned an error.
//So I added a logout button in the header of My home screen

// import { createDrawerNavigator } from '@react-navigation/drawer';

// import BottomTabNavigator from './BottomTabNavigator'

// const Drawer = createDrawerNavigator();

// const CustomDrawerContent = ({ navigation }) => {
//     return (
//       <Button
//         title="Logout"
//         onPress={() => {
//          //TODO setLoginToken ''
//           navigation.navigate('Auth');
//         }}
//       />
//     );
//   }

// const DrawerNavigation = () => {
//   return (
//     <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
//       <Drawer.Screen name="Main" component={BottomTabNavigator} />
//     </Drawer.Navigator>
//   );
// }

// export default DrawerNavigation;