import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';

export interface CartTitleProps {
  title?: string;
  mainDate?: string;
  infoDate?: string;
  isTitleDisabled?: boolean;
  onConfirm?: (date: string) => void;
  isWithTimePicker?: boolean;
}

const CardStatic = ({
  title,
  isTitleDisabled = false,
  isWithTimePicker = false,
  mainDate,
  infoDate,
  onConfirm,
}: CartTitleProps) => {
  const [openDateTime, setDateTime] = useState(false);

  const onConfirmLocal = date => {
    if (onConfirm) {
      onConfirm(date);
    }
    setDateTime(false);
  };

  const onCancel = () => {
    setDateTime(false);
  };

  const handleDate = () => {
    if (isWithTimePicker) {
      setDateTime(true);
    }
  };

  return (
    <ViewX spacing={2}>
      <ViewY spacing={2} style={tw`flex-grow`}>
        <ViewY spacing={0} style={tw`flex-grow justify-center`}>
          {title && (
            <ViewX>
              <Text style={tw`flex-wrap flex-1 text-sm text-${isTitleDisabled ? 'gray-200' : 'white'}`}>{title}</Text>
            </ViewX>
          )}
          {mainDate && (
            <ViewX>
              <TouchableOpacity style={tw`items-center flex-wrap flex-1 content-center`} onPress={handleDate}>
                <Text style={tw`text-2xl text-white font-bold`}>{mainDate}</Text>
              </TouchableOpacity>
            </ViewX>
          )}
          {infoDate && (
            <ViewX>
              <Text style={tw`flex-wrap flex-1 text-xs text-black`}>{infoDate}</Text>
            </ViewX>
          )}

          <DateTimePickerModal onConfirm={onConfirmLocal} onCancel={onCancel} isVisible={openDateTime} mode="time" />
        </ViewY>
      </ViewY>
    </ViewX>
  );
};

export default CardStatic;
