import React, { useEffect, useState } from 'react';
import { 
  ImageBackground, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Platform, 
  Keyboard} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused } from "@react-navigation/core"
import JWT from 'expo-jwt';

import { setRegistered, setLoginToken } from '../actions';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const AuthScreen = ({navigation}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const [keyboardIsOpen, setKeyboardIsOpen] = React.useState(false);
  Keyboard.addListener("keyboardDidShow", () => {
    setKeyboardIsOpen(true);
  });
  Keyboard.addListener("keyboardDidHide", () => {
    setKeyboardIsOpen(false);
  });

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const registered = useSelector(state => state.auth.registered);
  
  useEffect(() => {isFocused && registered && setIsLogin(true) },[isFocused]);

  const onLoggedIn = async(token) => {
    dispatch(setLoginToken(token));

    !isLogin && dispatch(setRegistered());
    navigation.navigate('Main');
  }

  const getToken = () => {
    return JWT.encode({ username, password }, 'secret');
  }

  const onSubmitHandler = () => {
    const token = getToken();
    setMessage('');

    fetch(`${API_URL}/user/${isLogin ? 'login' : 'signin'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `Bearer ${token}`
      },
    })
    .then(async res => { 
      try {
        const jsonRes = await res.json();
        
        if (res.status !== 200) {
          setIsError(true);
          setMessage(jsonRes.message);
        } else {
          onLoggedIn(token);
          setIsError(false);
        }
      } catch (err) {
        console.log(err);
      };
    })
    .catch(err => {
      console.log(err);
    });
  };

  const usernameValid = () => {
    return username.match(/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]{8,}$/);
  }

  const passwordValid = () => {
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/);
  }

  const usernameMsg = 'username should be at least 8 characters containing letters only'
  const passwordMsg = 'password should be at least 6 characters containing upper and lower letters, number and special char';

  return (
    <ImageBackground source={require('../assets/bgImg.png')} style={styles.image}>
      <View style={styles.container}>
        <Text style={[styles.title, {marginTop: keyboardIsOpen ? '5%' : '20%'}]}>{'Menora Flix'}</Text>
        <View style={styles.form}>
          <Text style={styles.subTitle}>{isLogin ? 'Login' : 'Sighin'}</Text>

          <TextInput style={styles.input} placeholder="Userame" onChangeText={setUsername}></TextInput>
          <Text style={[styles.message, {color: 'white' }]}>{username && !usernameValid() ? usernameMsg : null}</Text>

          <TextInput secureTextEntry={true} style={styles.input} placeholder="Password" onChangeText={setPassword}></TextInput>
          <Text style={[styles.message, {color: 'white' }]}>{password && !passwordValid() ? passwordMsg : null}</Text>

          <TouchableOpacity style={styles.button} activeOpacity={passwordValid() && usernameValid() ? 1 : 0.5}  onPress={passwordValid() && usernameValid() && onSubmitHandler}>
              <Text style={styles.buttonText}>{!isLogin ? 'Sighin' : 'Login'}</Text>
          </TouchableOpacity>
          
          <Text style={[styles.message, {color: 'white' }]}>{message && isError ? message : null}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
},
  image: {
    flex: 1,
    width: '100%',
    alignItems: 'center'
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center'
  }, 
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: '20%',
    marginBottom: '10%',
    color: 'red',
  },
  subTitle: {
    fontSize: 30,
    marginTop: '5%',
    color: 'white',
    marginBottom: '7%'
  },
  form: {
    width: '80%',
  }, 
  input: {
    width: '100%',
    height: '12%',
    backgroundColor: 'gray',
    fontSize: 16, 
    minHeight: 40,
    marginTop: '3%',
    paddingLeft: 4
  },
  button: {
    width: '100%',
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'red',
    marginTop: '7%'
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
    color: 'white'
  },
  message: {
    fontSize: 18,
    marginTop: 10,
    marginLeft: 10
  },
});

export default AuthScreen;