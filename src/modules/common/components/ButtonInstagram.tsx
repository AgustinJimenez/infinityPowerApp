import { Image, Text, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import InstagramLogin from 'react-native-instagram-login';
import { tw } from 'src/root/tw'
import { ViewX } from 'src/modules/common/components/utils/ViewUtils';
import {INSTAGRAM_APP_ID, INSTAGRAM_APP_SECRET, INSTAGRAM_REDIRECT_URL} from '../../../constants';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
/* @ts-ignore */
import instagram from 'src/assets/images/instagram.png';

const ButtonInstagram = ({ children, style = {}, ...props }) => {
    const [instagramLogin, setInstagramLogin] = useState(null);

    const loginWithInstagram = () => {
        if(instagramLogin) {
          instagramLogin.show();
        }
    };

    const setIgToken = (data) => {
        if(props.cbPress) {
            props.cbPress(data);
        }
    }
    
    return (
        <TouchableOpacity
            style={[tw`px-20 py-2 rounded-lg`, {backgroundColor: '#F7723E'}, style]}
            onPress={() => loginWithInstagram()}
            {...props}>
           <ViewX>
                <Image source={instagram} style={[tw`mr-10`, style]} resizeMode={'contain'} />
                <Text style={tw`text-white text-sm text-center font-medium`}>{children}</Text>
            </ViewX>
            <InstagramLogin
                ref={ref => (setInstagramLogin(ref))}
                appId={INSTAGRAM_APP_ID}
                appSecret={INSTAGRAM_APP_SECRET}
                redirectUrl={INSTAGRAM_REDIRECT_URL}
                scopes={['user_profile', 'user_media', 'public_profile']}
                onLoginSuccess={setIgToken}
                onLoginFailure={(data) => console.log(data)}
            />
        </TouchableOpacity>
    )
}

export default ButtonInstagram