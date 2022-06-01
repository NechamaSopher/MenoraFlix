
import { View, SafeAreaView, TouchableOpacity, Text, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import { setLoginToken } from '../actions'

const Logout = ({navigation}) => {
  const dispatch = useDispatch();

  return (
    <View style={{flex:1}}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <TouchableOpacity onPress={()=>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              {text: 'Cancel', onPress: () => {return null}},
              {text: 'Confirm', onPress: () => {
                dispatch(setLoginToken(''));
                navigation.navigate('Auth');
              }},
            ],
            { cancelable: false }
          )}>
          <Text style={{margin: 16, fontWeight: 'bold', color: 'white'}}>{'Logout'}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  )
}

export default Logout;