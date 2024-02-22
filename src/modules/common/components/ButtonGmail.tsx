import { Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { tw } from 'src/root/tw';
// import {
//   GoogleSignin,
//   statusCodes,
// } from '@react-native-google-signin/google-signin';

import { ViewX } from 'src/modules/common/components/utils/ViewUtils';
import { GOOGLE_WEBCLIENT_ID } from '../../../constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import gmail from 'src/assets/images/g-logo.png';

const ButtonGmail = ({ children, style = {}, ...props }) => {
  // const loginWithGoogle = () => {
  //   GoogleSignin.configure({
  //     // scopes: ['https://'],
  //     webClientId: GOOGLE_WEBCLIENT_ID,
  //     // offlineAccess: true
  //   });

  //   GoogleSignin.hasPlayServices().then((hasPlayService) => {
  //     if (hasPlayService) {
  //         GoogleSignin.signIn().then((userInfo) => {
  //           console.log(JSON.stringify(userInfo))
  //         }).catch((e) => {
  //           console.log("ERROR1 IS: " + JSON.stringify(e));
  //         })
  //     }
  //   }).catch((e) => {
  //     console.log("ERROR2 IS: " + JSON.stringify(e));
  //   })
  // };

  return (
    <TouchableOpacity
      style={[tw`px-20 py-2 rounded-lg bg-gray-50`, style]}
      onPress={() => loginWithGoogle()}
      {...props}>
      <ViewX>
        <Image source={gmail} style={[tw`mr-10`, style]} resizeMode={'contain'} />
        <Text style={tw`text-gray-900 text-sm text-center font-medium`}>{children}</Text>
      </ViewX>
    </TouchableOpacity>
  );
};

export default ButtonGmail;
