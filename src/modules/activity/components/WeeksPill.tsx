import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { tw } from 'src/root/tw';

const WeeksPill = ({ active = false, children = ``, ...props }) => {
    const dispatch = useDispatch();

    const activeStyle = tw`border border-white bg-white/25 h-5 w-20 mx-0.5 items-center -py-1  text-xs rounded-xl`;
    const inactiveStyle = tw`border border-white mx-0.5 h-5 w-18 text-xs items-center -py-1 bg-green-500  rounded-xl`;

    const [tab, setTab] = useState(0);

    return (
        <View style={active ? activeStyle : inactiveStyle} {...props}>
            <Text style={tw`text-white text-xs`}>
                {children}
            </Text>

        </View>
    );
};


export default WeeksPill