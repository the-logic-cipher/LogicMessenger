import React from 'react';
import {View, TouchableOpacity, Text, Image} from 'react-native';

const renderChatHeaderTitle = () => {
  if (selectedConversation && selectedConversation.name) {
    return (
      <View style={styles.chatHeaderTitleContainer}>
        <Text style={styles.chatHeaderTitle}>{selectedConversation.name}</Text>
        {selectedConversation.status && (
          <Text style={[styles.chatHeaderTitle, styles.chatHeaderStatus]}>
            {' '}
            - {selectedConversation.status}
          </Text>
        )}
      </View>
    );
  }
  return <Text style={styles.chatHeaderTitle}>Chat</Text>;
};

const renderChatHeaderRight = navigation => {
  if (
    selectedConversation &&
    selectedConversation.contactType === 1 &&
    selectedConversation.owner === user.uid
  ) {
    return (
      <View style={styles.chatHeaderActions}>
        <TouchableOpacity onPress={startAudioCall}>
          <Image
            style={{width: 24, height: 24, marginRight: 8}}
            source={audioCallIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={startVideoCall}>
          <Image
            style={{width: 32, height: 24, marginRight: 8}}
            source={videoCallIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={manageGroup(navigation)}>
          <Image style={{width: 24, height: 24}} source={settingsIcon} />
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={styles.chatHeaderActions}>
      <TouchableOpacity onPress={startAudioCall}>
        <Image
          style={{width: 24, height: 24, marginRight: 8}}
          source={audioCallIcon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={startVideoCall}>
        <Image style={{width: 32, height: 24}} source={videoCallIcon} />
      </TouchableOpacity>
    </View>
  );
};
