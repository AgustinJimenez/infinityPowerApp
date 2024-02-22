import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Card from 'src/modules/common/components/Card';
import { tw } from 'src/root/tw';
import { HandleDaysProps } from '../pages/Objectives';
import { styles } from './styles';

interface DayTouchedProps {
  dayName: string;
  label: string;
  dayValue: boolean;
  handleDays: (inputValue :HandleDaysProps) => void
}

const DayTouched = ({
  dayName,
  label,
  dayValue,
  handleDays
} : DayTouchedProps) => {
  return (
    <TouchableOpacity style={tw`mx-1`} onPress={() => handleDays({
      [dayName]: !dayValue
    })}>
      <Card style={dayValue ? styles.backgroundSelected : styles.backgroundNotSelected}>
        <Text style={tw`text-white font-bold`}>{label}</Text>
      </Card>
    </TouchableOpacity>
  );
};

export default DayTouched;
