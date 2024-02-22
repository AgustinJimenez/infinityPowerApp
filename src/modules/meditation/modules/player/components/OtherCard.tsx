import React from 'react'
import { Switch, Text } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import CardCollapse from 'src/modules/common/components/CardCollapse'
import CardTitle from 'src/modules/common/components/CardTitle'
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils'
import { meditationPlayerActions } from 'src/modules/meditation/modules/player/handlers/redux'
import { tw } from 'src/root/tw'


const OtherCard = () => {
    const dispatch = useDispatch()

    const aleatorio = useSelector(state => state.meditationPlayer.aleatorio);
    const setAleatorio = value => {
        dispatch(meditationPlayerActions.aleatorioSet(value));
    };

    const backgroundVisible = useSelector(state => state.meditationPlayer.backgroundVisible);
    const setBackgroundVisible = value => {
        dispatch(meditationPlayerActions.backgroundVisibleSet(value));
    };

    return (
        <CardCollapse>
            <CardTitle title={"Otros"}></CardTitle>
            <ViewY spacing={2}>
                <ViewX style={tw`justify-between`}>
                    <Text style={tw`text-white`}>Activar imagen de fondo</Text>
                    <Switch value={backgroundVisible} onValueChange={(value) => setBackgroundVisible(value)}></Switch>
                </ViewX>
                <ViewX style={tw`justify-between`}>
                    <Text style={tw`text-white`}>Modo dormir</Text>
                    <Switch></Switch>
                </ViewX>
                <ViewX style={tw`justify-between`}>
                    <Text style={tw`text-white`}>Aleatorio</Text>
                    <Switch value={aleatorio} onValueChange={(value) => setAleatorio(value)}></Switch>
                </ViewX>
            </ViewY>
        </CardCollapse>
    )
}

export default OtherCard