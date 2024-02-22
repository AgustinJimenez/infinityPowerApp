import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from "react-native-vector-icons/MaterialIcons"
import { tw } from 'src/root/tw'
import { ViewX, ViewY } from './utils/ViewUtils'
import Home from 'src/assets/svg/home.svg';
import User from 'src/assets/svg/user.svg';
import Info from 'src/assets/svg/info.svg';
import Edit from 'src/assets/svg/edit.svg';
import Rectangulo from 'src/assets/svg/rectangulo.svg';

const Footer = () => {
    const rowStyle = tw`p-3 px-8 justify-between rounded-t-3xl bg-black bg-opacity-38`
    rowStyle.borderTopRightRadius = 40
    rowStyle.borderTopLeftRadius = 40
    
    const navigation = useNavigation()
    const ruta = useRoute()

    return (
        <ViewY style={tw` `}>
            <ViewX style={rowStyle}>
                <ViewX style={tw`items-center`}>
                    <TouchableOpacity style={tw`rounded-full h-10 w-10`} onPress={() => navigation.navigate('ActivityHome')} >
                        <Home width="25" height="25" />
                        {ruta.name === "ActivityHome" && <Rectangulo width="25" height="25" />}
                    </TouchableOpacity>
                </ViewX>
                <ViewX style={tw`items-center`}>
                    <TouchableOpacity style={tw`rounded-full h-10 w-10`}  >
                        <Info width="25" height="25" />
                    </TouchableOpacity>
                </ViewX>
                <ViewX style={tw`items-center`}>
                    <TouchableOpacity style={tw`rounded-full h-10 w-10`} >
                        <User width="25" height="25" />
                    </TouchableOpacity>
                </ViewX>
                <ViewX style={tw`items-center`}>
                    <TouchableOpacity style={tw`rounded-full h-10 w-10`} >
                        <Edit width="25" height="25"/>
                    </TouchableOpacity>
                </ViewX>
            </ViewX>
        </ViewY>
    )
}

export default Footer