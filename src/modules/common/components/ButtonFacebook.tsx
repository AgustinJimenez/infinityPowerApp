import { Image, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    AccessToken,
    GraphRequest,
    GraphRequestManager,
    LoginManager,
} from 'react-native-fbsdk';
import { tw } from 'src/root/tw'
import { ViewX } from 'src/modules/common/components/utils/ViewUtils';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import fb from 'src/assets/images/fb.png';

const ButtonFacebook = ({ children, style = {}, ...props }) => {
    const getFBInfoFromToken = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
            string: 'id,email,name,first_name,last_name',
            },
        };
        const profileRequest = new GraphRequest(
            '/me',
            {token, parameters: PROFILE_REQUEST_PARAMS},
            (error, user) => {
                if (error) {
                    console.log('login info has error: ' + error);
                } else {
                    if(props.cbPress) {
                        props.cbPress(user);
                    }
                }
            },
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    };
    const loginWithFacebook = () => {
        LoginManager.logInWithPermissions(['public_profile','email']).then(
            login => {
              if (login.isCancelled) {
                console.log('Login cancelled');
              } else {
                AccessToken.getCurrentAccessToken().then(data => {
                  const accessToken = data.accessToken.toString();
                  getFBInfoFromToken(accessToken);
                });
              }
            },
            error => {
              console.log('Login fail with error: ' + error);
            },
        );
    };

    return (
        <TouchableOpacity
            style={[tw`px-20 py-2 rounded-lg bg-blue-700`, style]}
            onPress={() => loginWithFacebook()}
            {...props}>
           <ViewX>
                <Image source={fb} style={[tw`mr-10`, style]} resizeMode={'contain'} />
                <Text style={tw`text-white text-sm text-center font-medium`}>{children}</Text>
            </ViewX>
        </TouchableOpacity>
    )
}

export default ButtonFacebook