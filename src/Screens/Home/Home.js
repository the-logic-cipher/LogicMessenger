import {View, Text} from 'react-native';
import React, {useEffect, useState, useContext} from 'react';
import Context from '../../Context/Context';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const {cometChat, setSelectedConversation} = useContext(Context);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
