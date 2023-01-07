import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../../assets/Config/Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import Context from '../../Context/Context.js';
import validator from 'validator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {cometChatConfig} from '../../../env';

LogIn = () => {
  const {setUser, cometChat} = useContext(Context);
  const navigation = useNavigation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  const isUserCredentialsValid = (email, password) => {
    return validator.isEmail(email) && password;
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const login = () => {
    if (isUserCredentialsValid(email, password)) {
      setIsLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          const user = userCredential.user;
          const firebaseUid = userCredential.user.uid;
          console.log(user);

          // comet chat login

          cometChat
            .login(firebaseUid, `${cometChatConfig.cometChatAuthKey}`)
            .then(
              user => {
                AsyncStorage.setItem('auth', JSON.stringify(user));
                setUser(user);
                console.log(user);
                navigation.navigate('home');
                alert('User signed in!');
              },
              error => {
                setIsLoading(false);
                console.log(error);
                showMessage(
                  'Error',
                  'Your username or password is not correct',
                );
              },
            );
        })
        .catch(error => {
          setIsLoading(false);
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          if (error.code === 'auth/invalid-email') {
            alert('Your email is incorrect!');
          }
          if (error.code === 'auth/wrong-password') {
            alert('Your password is incorrect!');
          }
        });
    } else {
      setIsLoading(false);
      showMessage('Error', 'Your username or password is not correct');
    }
  };

  if (isLoading) {
    return (
      <View style={style.container}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{marginTop: 130}}>
          <Image
            resizeMode="contain"
            source={require('../../../assets/images/logo-blue.png')}
            style={{
              width: 270,
              height: 39,
              marginBottom: 20,
              marginBottom: 5,
              alignSelf: 'center',
            }}
          />
          <Text style={style.text}>Enter Your Email & Password</Text>
          <TextInput
            style={style.textInput}
            placeholder="Enter Email"
            onChangeText={val => setEmail(val)}></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Enter Password"
            onChangeText={val => setPassword(val)}></TextInput>
          <TouchableOpacity style={style.button} onPress={login}>
            <Text style={style.buttonText}>LogIn</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 180, marginBottom: 50}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#8F8F8F'}}>Don't Have an Account? </Text>
            <TouchableOpacity
              style={{paddingVertical: 0}}
              onPress={() => {
                navigation.navigate('signUp');
              }}>
              <Text style={{color: '#3A76FE', padding: 0}}>SignUp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LogIn;

const style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 34,
    color: '#001E39',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 15,
    marginBottom: 15,
    color: '#8F8F8F',
  },
  textInput: {
    height: 55,
    borderColor: '#9C9C9C',
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 32,
    paddingHorizontal: 21,
    marginVertical: 10,
  },
  forgot: {
    color: '#3A76FE',
    fontSize: 15,
    marginRight: 32,
    textAlign: 'right',
  },
  button: {
    borderRadius: 10,
    marginHorizontal: 32,
    marginVertical: 10,
    backgroundColor: '#3A76FE',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    height: 55,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  flex: {
    flexDirection: 'row',
  },
});
