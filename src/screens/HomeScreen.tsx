// HomeScreen.tsx
import React from 'react';
import {View, Text, Button} from 'react-native';

const HomeScreen: React.FC<{navigation: any}> = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Welcome to JetSetGo!</Text>
      <Text>Plan your trip effortlessly.</Text>
      <Button
        title="Start Booking"
        onPress={() => navigation.navigate('TravelRequest')}
      />
    </View>
  );
};

export default HomeScreen;
