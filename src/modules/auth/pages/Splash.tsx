import React, {useEffect, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
/* @ts-ignore */
import Logo from 'src/assets/logo.svg';
import ButtonYellow from 'src/modules/common/components/ButtonYellow';
import Screen from 'src/modules/common/components/Screen';
import {ViewY} from 'src/modules/common/components/utils/ViewUtils';
import {tw} from 'src/root/tw';
import {authActions} from '../handlers/redux';
import image from 'src/assets/images/infinite_logo.png';
import BackgroundTimer from 'react-native-background-timer';
import { activityActions } from 'src/modules/activity/handlers/redux';


const Splash = ({navigation}) => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const confirmed = useSelector(state => state.auth.confirmed);
  
  useEffect(() => {
    if (token && confirmed) {
      dispatch(activityActions.resumen());
      BackgroundTimer.runBackgroundTimer(() => {
        dispatch(activityActions.resumen());
      }, 5000);
      navigation.navigate('ActivityHome')
    // } else if(token && !confirmed) {
    //   navigation.navigate('ConfirmEmail')
    //   BackgroundTimer.stopBackgroundTimer();
    } else {
        navigation.navigate('Login')
        BackgroundTimer.stopBackgroundTimer();
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [token, confirmed]);

  

  return (
    <Screen footer={false} style={tw`items-center flex-1 bg-black justify-center`}>
        <Image source={image} style={tw` h-16 w-20  `} resizeMode={'contain'} />
    </Screen>
  );
};

export default Splash;
