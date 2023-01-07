import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from '../../../src/Screens/SplashScreen/SplashScreen.js';
import LogIn from '../../../src/Screens/LogIn/LogIn.js';
import OnBoarding1 from '../../../src/Screens/OnBoarding/OnBoarding1.js';
import OnBoarding2 from '../../../src/Screens/OnBoarding/OnBoarding2.js';
import OnBoarding3 from '../../../src/Screens/OnBoarding/OnBoarding3.js';
import SignUp from '../../../src/Screens/SignUp/SignUp.js';
import Home from '../../../src/Screens/Home/Home.js';

const StackNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="onBoarding1" component={OnBoarding1} />
        <Stack.Screen name="onBoarding2" component={OnBoarding2} />
        <Stack.Screen name="onBoarding3" component={OnBoarding3} />
        <Stack.Screen name="login" component={LogIn} />
        <Stack.Screen name="signUp" component={SignUp} />
        <Stack.Screen name="home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigation;
