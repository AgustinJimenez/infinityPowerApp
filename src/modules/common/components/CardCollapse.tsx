import { View, Text, Button, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import tw from "twrnc";
import { ViewX, ViewY } from './utils/ViewUtils';

import Icon from "react-native-vector-icons/MaterialIcons";

const CardCollapse = ({ children }) => {
    const [open, setOpen] = useState(false)
    let titleChild = null
    let hiddenChildren = null
    if (!children.length) {
        titleChild = children

    } else {
        titleChild = children[0] || null
        hiddenChildren = children.filter((child, idx) => idx != 0)
    }

    return (
        <ViewY style={tw`rounded-xl bg-black bg-opacity-75`}>
            <ViewY style={tw`p-4`}>
                {titleChild}
            </ViewY>
            {!!hiddenChildren && open && <ViewY spacing={2} style={tw`p-4 pt-0`}>
                {hiddenChildren}
            </ViewY>}
            <ViewX style={tw`justify-center absolute bottom-0 left-0 right-0`}>
                <TouchableOpacity onPress={() => setOpen(!open)} style={tw`w-8 h-8 bg-black border border-gray-800 rounded-full -mb-4 justify-center items-center`}>
                    {!!open && <Icon name="expand-less" size={30} color="#fff" />}
                    {!open && <Icon name="expand-more" size={30} color="#fff" />}

                </TouchableOpacity>
            </ViewX>
        </ViewY>
    )
}

export default CardCollapse