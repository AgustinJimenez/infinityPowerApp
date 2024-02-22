import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { tw } from 'src/root/tw';

const PendingPill = ({ active = false, children = ``, ...props }) => {
    return (
        <View style={tw` items-center py-1 px-2  bg-white rounded-xl`} {...props}>
            <Text style={tw`text-xs text-black font-semibold`}>
                {children}
            </Text>
        </View>
    );
};


export default PendingPill