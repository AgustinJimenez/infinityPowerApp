import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonYellow from 'src/modules/common/components/ButtonYellow';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationRoutineActions } from '../handlers/redux';

const RoutineAddScreen = () => {
  const [name, setName] = useState("")
  const routine_create_loading = useSelector(state => state?.meditationRoutine?.routine_create_loading)
  const dispatch = useDispatch()

  const onCreatePress = () => {
    dispatch(meditationRoutineActions.routineCreate({ name }))
  }
  return (
    <Screen>
      <Header text={'Nueva Rutina'}></Header>
      <ViewY spacing={4} style={tw`items-stretch px-4`}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={`#888`}
          placeholder="Nombre"
          value={name}
          onChangeText={text => setName(text)}
          style={tw` border-b text-xl text-white py-2 border-white`}></TextInput>
        <ButtonYellow disabled={routine_create_loading} onPress={onCreatePress}>
          {!routine_create_loading ? "Crear" : "..."}
        </ButtonYellow>
      </ViewY>
    </Screen>
  );
};

export default RoutineAddScreen;
