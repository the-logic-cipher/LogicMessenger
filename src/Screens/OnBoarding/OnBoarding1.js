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
        source={require('../../../assets/images/onBoarding1.png')}
      />
      <Text style={style.heading}>Send Free Messages</Text>
      <Text style={style.desc}>
        Free message services allow users to send messages such as text
        messages, voice messages to other users without having to pay for the
        service.
      </Text>
      <View style={style.bottomNav}>
        <Image
          resizeMode="contain"
          style={style.nav}
          source={require('../../../assets/images/onBoardNav1.png')}
        />
        <Icon
          style={{position: 'absolute', right: 0}}
          name="ios-arrow-forward-circle"
          color="#0084FF"
          size={28}
          onPress={() => navigation.navigate('onBoarding2')}
        />
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
