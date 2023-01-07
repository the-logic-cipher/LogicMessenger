import Context from './Context';
import {useContext} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {cometChat, setUser} = useContext(Context);

const handleLogout = navigation => {
  cometChat.logout().then(
    () => {
      console.log('Logout completed successfully');
      AsyncStorage.removeItem('auth');
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    },
    error => {
      console.log('Logout failed with exception:', {error});
    },
  );
};

export const logout = navigation => () => {
  Alert.alert('Confirm', 'Do you want to log out?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {text: 'OK', onPress: () => handleLogout(navigation)},
  ]);
};
