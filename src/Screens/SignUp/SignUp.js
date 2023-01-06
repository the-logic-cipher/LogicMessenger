import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../assets/Config/Firebase';

SignUp = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigation = useNavigation();

  const sign = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(user);
        navigation.navigate('login');
        console.log('User account created & signed in!');
      })
      .catch(error => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
      });
  };

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
          <TouchableOpacity style={style.button} onPress={sign}>
            <Text style={style.buttonText}>SignUp</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 180, marginBottom: 50}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#8F8F8F'}}>Already Have an Account? </Text>
            <TouchableOpacity
              style={{paddingVertical: 0}}
              onPress={() => {
                navigation.navigate('login');
              }}>
              <Text style={{color: '#3A76FE', padding: 0}}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;

const style = StyleSheet.create({
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
