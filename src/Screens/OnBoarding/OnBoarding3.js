import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const OnBoarding1 = () => {
  const navigation = useNavigation();
  return (
    <View style={style.container}>
      <Image
        resizeMode="contain"
        style={style.img}
        source={require('../../../assets/images/onBoarding3.png')}
      />
      <Text style={style.heading}>Make Group Chat</Text>
      <Text style={style.desc}>
        By creating a group chat, different members can then communicate with
        each other through texts, video, audio, and other media.
      </Text>
      <View style={style.bottomNav}>
        <Image
          resizeMode="contain"
          style={style.nav}
          source={require('../../../assets/images/onBoardNav3.png')}
        />
        <Text
          style={{
            position: 'absolute',
            right: 0,
            fontSize: 15,
            color: '#0084FF',
          }}
          onPress={() => navigation.navigate('login')}>
          Skip
        </Text>
      </View>
    </View>
  );
};

export default OnBoarding1;

const style = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 30,
  },
  img: {
    height: 254,
    width: 290,
    marginTop: 120,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 50,
    color: 'black',
  },
  desc: {
    color: '#6B6A6A',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  bottomNav: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 35,
    width: '100%',
  },
  nav: {
    height: 8,
    width: 80,
  },
});
