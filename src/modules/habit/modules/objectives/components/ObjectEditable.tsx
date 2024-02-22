
import React, { useState } from 'react';
import { Text, View, TextInput, StyleProp, ViewStyle } from 'react-native';
import { tw, twGetTextColor } from 'src/root/tw';
import Card from 'src/modules/common/components/Card';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { HandleStringProps } from '../pages/Objectives';
import { styles } from './styles';

export interface ObjectEditableProps {
  title: string;
  placeholder: string;
  name: string;
  styleCard?: StyleProp<ViewStyle>;
  isCentered?: boolean;
  onBlur: (objectiveValue: HandleStringProps) => void;
}

const ObjectEditable = ({
  title,
  name,
  onBlur,
  styleCard = {},
  isCentered = false,
  placeholder
}: ObjectEditableProps) => {

  const [value, setValue] = useState('');

  const handleTitleInputState = (valueCurrent: string) => {
    setValue(valueCurrent);
    onBlur({ [name]: valueCurrent });
  };

  return (
    <View style={tw`${isCentered ? 'items-center' : '' } `}>
      <Card style={[styles.backgroundWhite, styleCard]}>
        <ViewY>
          <Text style={tw`text-black font-semibold`}>{title}</Text>
          <TextInput
            value={value}
            onChangeText={handleTitleInputState}
            placeholder={placeholder}
            multiline={true}
            style={[tw`rounded-xl text-sm text-black py-2`, styles.maxWidthBox]}
            placeholderTextColor={twGetTextColor('text-black')}
          />
        </ViewY>
      </Card>
    </View>
    
  );
};

export default ObjectEditable;
