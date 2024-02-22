import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, View, StyleProp, ViewStyle } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import image from 'src/assets/images/new-home.png';
import { downloadFile } from 'src/modules/meditation/modules/player/handlers/audioPlayer';
import { tw } from 'src/root/tw';
import Footer from './Footer';
import { ViewY } from './utils/ViewUtils';

interface ScreenProps {
  children?: React.ReactNode;
  scrollEnabled?: boolean;
  safeTop?: boolean;
  footer?: boolean;
  background?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

interface BackgroundStateProps {
  uri?: string;
}

const Screen = ({ children, style, scrollEnabled = false, footer = true, background }: ScreenProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const route = useRoute();
  const token = useSelector(state => state.auth.token);
  const resumen = useSelector(state => state.activity.resumen);
  const confirmed = useSelector(state => state.auth.confirmed);
  const pages = ['Login', 'Register', 'Onboarding', 'ConfirmEmail'];
  const [backgroundCustom, setBackgroundCustom] = useState<BackgroundStateProps>({});

  const downloadBackground = async () => {
    const path = await downloadFile('/' + background);

    console.log({ path });
    setBackgroundCustom({ uri: 'file://' + path });
  };

  useEffect(() => {
    background && downloadBackground(background);
  }, [background]);

  useEffect(() => {
    if (!token && !pages.includes(route.name)) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    }

    // if(token && !confirmed) {
    //   navigation.navigate('ConfirmEmail')
    // }

    if (!!token && route.name == 'Login') {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ActivityHome' }],
      });
    }
  }, [token, confirmed]);

  let opacity = 'bg-opacity-0';
  if (backgroundCustom.uri) opacity = 'bg-opacity-50';

  return (
    <View style={tw` flex-grow `}>
      {!!backgroundCustom.uri && <Image source={backgroundCustom} style={tw`absolute w-full h-full`} />}
      {!backgroundCustom.uri && <Image source={image} style={tw`absolute w-full h-full`} />}
      <ViewY spacing={0} style={tw`bg-black flex-grow ${opacity}`}>
        <SafeAreaView style={tw`flex-1 flex-col`}>
          {scrollEnabled && (
            <ScrollView style={tw`flex-1 pb-4`}>
              <ViewY spacing={4} style={[tw`p-4`, style]}>
                {children}
              </ViewY>
            </ScrollView>
          )}
          {!scrollEnabled && (
            <ViewY spacing={4} style={[tw`p-4`, style]}>
              {children}
            </ViewY>
          )}
        </SafeAreaView>
        {footer && <Footer></Footer>}
      </ViewY>
    </View>
  );
};

export default Screen;
