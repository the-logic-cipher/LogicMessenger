import React, {useState, useEffect} from 'react';
import {cometChatConfig} from './env.js';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screens/Home/Home.js';
import {TouchableOpacity, Image, Alert} from 'react-native';
import Context from './src/Context/Context.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform, PermissionsAndroid, Modal} from 'react-native';
import StackNavigation from './src/Components/Navigation/StackNavigation.js';
import {logout} from './src/Context/LogOut.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CreateGroup from './src/Screens/CreateGroup/CreateGroup.js';
import ManageGroup from './src/Screens/ManageGroup/ManageGroup.js';
import AddMembers from './src/Screens/AddMembers/AddMembers.js';
import RemoveMembers from './src/Screens/RemoveMembers/RemoveMembers.js';

function App() {
  const Stack = createNativeStackNavigator();

  const [cometChat, setCometChat] = useState(null);
  const [user, setUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [callSettings, setCallSettings] = useState(null);

  useEffect(() => {
    initCometChat();
    initAuthenticatedUser();
    getPermissions();
    return () => {
      // cometChat.removeUserListener(userOnlineListenerId);
    };
  }, []);

  const initCometChat = async () => {
    const {CometChat} = await import('@cometchat-pro/react-native-chat');
    const appID = `${cometChatConfig.cometChatAppId}`;
    const region = `${cometChatConfig.cometChatRegion}`;
    const appSetting = new CometChat.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion(region)
      .build();
    CometChat.init(appID, appSetting).then(
      () => {
        console.log('CometChat was initialized successfully');
        setCometChat(() => CometChat);
      },
      error => {
        console.log(error);
      },
    );
  };

  const initAuthenticatedUser = async () => {
    const authenticatedUser = await AsyncStorage.getItem('auth');
    setUser(() => (authenticatedUser ? JSON.parse(authenticatedUser) : null));
  };

  const getPermissions = async () => {
    if (Platform.OS === 'android') {
      let granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        ]);
      }
    }
  };

  const handleLogout = navigation => {
    cometChat.logout().then(
      () => {
        console.log('Logout completed successfully');
        AsyncStorage.removeItem('auth');
        setUser(null);
        navigation.reset({
          index: 0,
          routes: [{name: 'login'}],
        });
      },
      error => {
        console.log('Logout failed with exception:', {error});
      },
    );
  };

  const logout = navigation => () => {
    Alert.alert('Confirm', 'Do you want to log out?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleLogout(navigation)},
    ]);
  };

  if (user && !callSettings) {
    return (
      <Context.Provider
        value={{
          cometChat,
          user,
          setUser,
          selectedConversation,
          setSelectedConversation,
        }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Home}
              options={({navigation}) => ({
                headerLeft: () => (
                  <TouchableOpacity onPress={logout(navigation)}>
                    <Icon
                      name="logout"
                      style={{fontSize: 22, marginRight: 8}}
                    />
                  </TouchableOpacity>
                ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('createGroup')}>
                    <Icon name="add" style={{fontSize: 22, marginRight: 8}} />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="createGroup" component={CreateGroup} />
            {/* <Stack.Screen
              name="Chat"
              component={Chat}
              options={({navigation}) => ({
                headerTitle: () => renderChatHeaderTitle(),
                headerRight: () => renderChatHeaderRight(navigation),
              })}
            /> */}
            <Stack.Screen name="manageGroup" component={ManageGroup} />
            <Stack.Screen name="addMembers" component={AddMembers} />
            <Stack.Screen name="removeMembers" component={RemoveMembers} />
          </Stack.Navigator>
        </NavigationContainer>
        {/* {isSomeoneCalling && call && (
          <Modal animated animationType="fade">
            <View style={styles.waitingForCallContainer}>
              <Text style={styles.waitingForCallContainerTitle}>
                You are having a call from {call.sender.name}
              </Text>
              <View style={styles.waitingForCallImageContainer}>
                <Image
                  style={{width: 128, height: 128}}
                  source={{uri: call.sender.avatar}}></Image>
              </View>
              <TouchableOpacity
                style={styles.acceptCallBtn}
                onPress={handleAcceptCall}>
                <Text style={styles.acceptCallLabel}>Accept Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelCallBtn}
                onPress={handleRejectCall}>
                <Text style={styles.cancelCallLabel}>Reject Call</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )} */}
      </Context.Provider>
    );
  }
  return (
    <Context.Provider value={{cometChat, user, setUser}}>
      <StackNavigation />
    </Context.Provider>
  );
}

export default App;
