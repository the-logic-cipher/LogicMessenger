import {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('onBoarding1');
    }, 3000);
  }, []);

  return (
    <View style={style.container}>
      <Image
        resizeMode="contain"
        source={require('../../../assets/images/logo-white.png')}
        style={{width: 270, height: 39, marginBottom: 20}}
      />
    </View>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0084FF',
  },
});
