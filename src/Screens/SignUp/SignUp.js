import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {useNavigation} from '@react-navigation/native';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../../../assets/Config/Firebase';
import {cometChatConfig} from '../../../env';
import Context from '../../Context/Context';
import validator from 'validator';

SignUp = () => {
  const navigation = useNavigation();

  const {cometChat} = useContext(Context);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const generateAvatar = () => {
    const avatars = [
      'https://data-us.cometchat.io/assets/images/avatars/captainamerica.png',
      'https://data-us.cometchat.io/assets/images/avatars/cyclops.png',
      'https://data-us.cometchat.io/assets/images/avatars/ironman.png',
      'https://data-us.cometchat.io/assets/images/avatars/spiderman.png',
      'https://data-us.cometchat.io/assets/images/avatars/wolverine.png',
    ];
    const avatarPosition = Math.floor(Math.random() * avatars.length);
    return avatars[avatarPosition];
  };

  const showMessage = (title, message) => {
    Alert.alert(title, message);
  };

  const isSignupValid = ({name, email, password, confirmPassword}) => {
    if (validator.isEmpty(name)) {
      showMessage('Error', 'Please input your full name');
      return false;
    }
    if (validator.isEmpty(email) || !validator.isEmail(email)) {
      showMessage('Error', 'Please input your email');
      return false;
    }
    if (validator.isEmpty(password)) {
      showMessage('Error', 'Please input your password');
      return false;
    }
    if (validator.isEmpty(confirmPassword)) {
      showMessage('Error', 'Please input your confirm password');
      return false;
    }
    if (password !== confirmPassword) {
      showMessage(
        'Error',
        'Your confirm password must be matched with your password',
      );
      return false;
    }
    return true;
  };

  const sign = () => {
    if (isSignupValid({name, email, password, confirmPassword})) {
      setIsLoading(true);

      const userAvatar = generateAvatar();

      createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
          if (userCredential) {
            const firebaseUid = userCredential._tokenResponse.localId;
            const authKey = `${cometChatConfig.cometChatAuthKey}`;
            // call cometchat service to register a new account.
            const user = new cometChat.User(firebaseUid);
            user.setName(name);
            user.setAvatar(userAvatar);

            cometChat.createUser(user, authKey).then(
              user => {
                showMessage(
                  'Info',
                  `${userCredential.user.email} was created successfully! Please sign in with your created account`,
                );
                setIsLoading(false);
                navigation.navigate('login');
              },
              error => {
                console.log(error);
                setIsLoading(false);
              },
            );
          }
        })
        .catch(error => {
          setIsLoading(false);
          const errorMessage = error.message;
          console.log(errorMessage);
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
        });
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
              marginBottom: 5,
              alignSelf: 'center',
            }}
          />
          <Text style={style.text}>Enter Your Information.</Text>
          <TextInput
            style={style.textInput}
            placeholder="Enter Username"
            onChangeText={val => setName(val)}></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Enter Email"
            onChangeText={val => setEmail(val)}></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Enter Password"
            onChangeText={val => setPassword(val)}></TextInput>
          <TextInput
            style={style.textInput}
            placeholder="Confirm Password"
            onChangeText={val => setConfirmPassword(val)}></TextInput>
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
  container: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
