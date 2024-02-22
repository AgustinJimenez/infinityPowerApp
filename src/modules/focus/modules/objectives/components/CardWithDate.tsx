import React, { useMemo, useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { formatMonthDayYear, formatYearDayMonth } from 'src/utils/date';
import { HandleChangeDateProps } from '../pages/Objectives';

export interface CartTitleProps {
  title?: string;
  description?: string;
  mainDate?: string;
  infoDate?: string;
  isTitleDisabled?: boolean;
  handleChangeDate: (date: HandleChangeDateProps) => void;
}

const CardWithDate = ({ title, description, isTitleDisabled, mainDate, infoDate, handleChangeDate }: CartTitleProps) => {
  const [openDateTime, setDateTime] = useState(false);

  const onConfirmLocal = (date: Date) => {
    handleChangeDate({
      date: date.toDateString(),
      dateFormatter: formatYearDayMonth(date),
    });
    setDateTime(false);
  };

  const estiloFecha = tw`text-sm text-white font-bold`
  if (!mainDate) {
    estiloFecha.color = "#0DDFCA"
  } else {
    estiloFecha.color = "white"
  }

  const onCancel = () => {
    setDateTime(false);
  };

  const handleDate = () => {
    setDateTime(true);
  };

  const labelDate = useMemo(() => {
    if (mainDate) {
      return formatMonthDayYear(mainDate)
    }
    return "Definir fecha límite";
  }, [mainDate]);



  return (
    <ViewX spacing={2}>
      <ViewY spacing={2} style={tw`flex-grow`}>
        <ViewY spacing={0} style={tw`flex-grow justify-center`}>
          {title && (
            <ViewX spacing={0}>
              <Text style={tw`flex-wrap mt-2 font-medium flex-1 text-sm text-${isTitleDisabled ? 'gray-200' : 'white'}`}>
                {title}
              </Text>
            </ViewX>
          )}
          {description && (
            <ViewX spacing={0}>
              <Text style={tw`flex-wrap mb-2 flex-1 text-xs text-white`}>
                {description}
              </Text>
            </ViewX>
          )}
          <ViewX>
            <TouchableOpacity style={tw`items-center flex-wrap flex-1`} onPress={handleDate}>
              <Text style={estiloFecha}>{labelDate}</Text>
            </TouchableOpacity>
          </ViewX>
          {infoDate && (
            <ViewX>
              <Text style={tw`flex-wrap flex-1 text-xs text-white`}>{infoDate}</Text>
            </ViewX>
          )}

          <DateTimePickerModal onConfirm={onConfirmLocal} onCancel={onCancel} isVisible={openDateTime} mode="date" />
        </ViewY>
      </ViewY>
    </ViewX>
  );
};

export default CardWithDate;
