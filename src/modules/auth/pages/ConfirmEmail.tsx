import React, {useState, useEffect} from 'react';
import {Text, TextInput, TouchableOpacity, View, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
/* @ts-ignore */
import Logo from 'src/assets/logo.svg';
import ButtonYellow from 'src/modules/common/components/ButtonYellow';
import Screen from 'src/modules/common/components/Screen';
import {ViewY} from 'src/modules/common/components/utils/ViewUtils';
import {tw} from 'src/root/tw';
import {authActions} from '../handlers/redux';
import BackgroundTimer from 'react-native-background-timer';
import { activityActions } from 'src/modules/activity/handlers/redux';

const ConfirmEmail = ({navigation}) => {
  const dispatch = useDispatch();

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');

  const user = useSelector(state => state.auth.user);
  const pin = useSelector(state => state.auth.pin);

  console.log('pin', pin);
  const onVerify = () => {
    // if (!email || !password) return;

    // dispatch(authActions.login({email, password}));
    if(pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '') {
      return;
    }

    const pin_input = pin1 + pin2 + pin3 + pin4;
    console.log('pin_input', pin_input);
    console.log('pin', pin);
    if(pin == pin_input) {
      dispatch(authActions.setConfirmed({confirmed: true}));
      dispatch(activityActions.resumen());
      BackgroundTimer.runBackgroundTimer(() => {
        dispatch(activityActions.resumen());
      }, 5000);
      navigation.navigate('ActivityHome')
    }
    else {
      Alert.alert(
        "",
        "Not correct pin",
      );
    }
  };


  return (
    <Screen footer={false} style={tw`items-center flex-1`} scrollEnabled={true}>
      <ViewY spacing={8} style={tw`items-stretch flex-1 pt-16`}>
        <ViewY style={tw`items-center`}>
          <Logo />
        </ViewY>
        <ViewY spacing={4}>
          <Text style={tw`text-white text-md text-center`}>
          Gracias por descargar Infinite Power, por favor ingrese aquí el código que recibirá en su correo.. para completar su registro.
          </Text>
          <View style={tw`flex-row justify-center`}>
            <TextInput
              autoCorrect={false}
              maxLength={1}
              placeholderTextColor={`#888`}
              onChangeText={text => setPin1(text)}
              value={pin1}
              style={tw`border text-xl text-white text-center mx-2 border-white grow`}></TextInput>
            <TextInput
              autoCorrect={false}
              maxLength={1}
              placeholderTextColor={`#888`}
              onChangeText={text => setPin2(text)}
              value={pin2}
              style={tw`border text-xl text-white text-center mx-2 border-white grow`}></TextInput>
            <TextInput
              autoCorrect={false}
              maxLength={1}
              placeholderTextColor={`#888`}
              onChangeText={text => setPin3(text)}
              value={pin3}
              style={tw`border text-xl text-white text-center mx-2 border-white grow`}></TextInput>
            <TextInput
              autoCorrect={false}
              maxLength={1}
              placeholderTextColor={`#888`}
              onChangeText={text => setPin4(text)}
              value={pin4}
              style={tw`border text-xl text-white text-center mx-2 border-white grow`}></TextInput>
          </View>
          <ButtonYellow onPress={onVerify}>Verificar</ButtonYellow>
        </ViewY>
      </ViewY>
    </Screen>
  );
};

export default ConfirmEmail;
