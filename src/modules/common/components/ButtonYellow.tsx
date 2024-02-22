import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { tw } from 'src/root/tw'

const ButtonYellow = ({ children, style = {}, ...props }) => {
    return (
        <TouchableOpacity
            style={[tw`px-20 p-2 rounded-lg bg-orange-500`, style]}
            {...props}>
            <Text style={tw`text-white text-lg text-center font-bold`}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

export default ButtonYellow