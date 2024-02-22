import {View, Text, Button} from 'react-native';
import React from 'react';
import Screen from 'src/modules/common/components/Screen';

const PhraseMusic = ({navigation}) => {
  return (
    <Screen>
      <Text>Musical</Text>
      <Button
        title="Volver"
        onPress={() => navigation.navigate('MeditationHome')}
      />
    </Screen>
  );
};

export default PhraseMusic;
