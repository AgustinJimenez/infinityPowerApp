import React from 'react'
import { Text, View } from 'react-native'
import { tw } from 'src/root/tw'
import { ViewX, ViewY } from './utils/ViewUtils'

const ListItem = ({ text, LeftComponent, RightComponent, style, title, children }) => {
    return (
        <View style={[style, tw`py-2 border-white flex flex-col`]}>
            <ViewX spacing={2} style={tw``}>
                {!!LeftComponent && <LeftComponent />}
                <ViewY style={tw`flex-grow min-h-10`}>
                    {(!!title || !!text) && <ViewY style={tw`flex-grow min-h-10`}>
                        {!!title && <ViewX style={tw`items-center flex-grow`}>
                            <Text style={tw`text-white flex-wrap flex-1 text-lg font-bold`}>{title}</Text>
                        </ViewX>}
                        {!!text && <ViewX style={tw`items-center flex-grow`}>
                            <Text style={tw`text-white flex-wrap text-base flex-1`}>{text}</Text>
                        </ViewX>}
                    </ViewY>}
                    {!!children && children}
                </ViewY>
                {!!RightComponent && <RightComponent />}
            </ViewX>
        </View>
    )
}

export default ListItem