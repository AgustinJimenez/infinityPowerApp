import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import Logo from 'src/assets/logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import dimensiones from 'src/assets/images/dimensiones.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import textImg from 'src/assets/images/text.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import whiteLogo from 'src/assets/images/infinite_logo.png';
import Screen from 'src/modules/common/components/Screen';
import { ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';


import Slick from 'react-native-slick';

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slide2: {
    flex: 1,
  },
  slide3: {
    flex: 1
  }
});
const Onboarding = ({navigation}) => {


  return (
    <Screen footer={false} style={tw`items-center flex-1`}>
      <Slick style={styles.wrapper} dotColor={'#ffffff50'} activeDotColor={'#FFFFFF'} showsButtons={false} >
        <View style={styles.slide1}>
          <ViewY style={tw`items-center`}>
            <Logo />
          </ViewY>
          <ViewY spacing={8} style={tw`px-10 mt-8`}>
            <Text style={tw`text-white text-lg text-center font-600`}>
              Descubre y utiliza el infinito poder de tu mente para mejorar tu vida y la de tus seres queridos.
            </Text>
          </ViewY>
        </View>
        <View style={styles.slide2}>
          <Image source={whiteLogo} style={tw`h-10 w-30`} resizeMode={'contain'} />
          <ViewY spacing={8} style={tw`px-10 items-center mt-30`}>
            <Text style={tw`text-white text-lg text-center font-600`}>
            Con las herramientas mundialmente reconocidas que Infinite Power pone en tus manos podrás desarrollar tus 3 dimensiones
            </Text>
            <Image source={dimensiones} style={tw`mt-8`} resizeMode={'contain'} />
          </ViewY>
        </View>
        <View style={styles.slide3}>
          <Image source={whiteLogo} style={tw`h-10 w-30`} resizeMode={'contain'} />
          <ViewY spacing={8} style={tw`px-10 items-center mt-20`}>
            <Image source={textImg} resizeMode={'contain'} />
          </ViewY>
        </View>
      </Slick>
    </Screen>
  );
};


export default Onboarding;