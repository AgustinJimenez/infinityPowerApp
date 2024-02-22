import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { tw } from 'src/root/tw';

const ButtonPill = ({ active = false, children = `texto`, ...props }) => {
  const dispatch = useDispatch();

  const activeStyle = tw`border border-teal-400 w-46 items-center py-2 bg-teal-400  rounded-xl`;
  const inactiveStyle = tw`border border-white  w-46 items-center py-2  rounded-xl`;

  const [tab, setTab] = useState(0);

  return (
    <TouchableOpacity style={active ? activeStyle : inactiveStyle} {...props}>
      <Text style={tw`text-white ${active ? 'font-bold' : ''}`}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonPill;
