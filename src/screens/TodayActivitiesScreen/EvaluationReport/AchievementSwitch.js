import React from 'react'
import { useSelector } from 'react-redux'
import Switch from '../../../components/Switch'
import { scale } from '../../../helpers/styles'
import { evaluationRelatedInfoSelector } from './selectors'


const AchievementSwitch = ({ evaluation_id }) => {

    let { isAchievedDay } = useSelector( state => evaluationRelatedInfoSelector(state, {evaluation_id}) )

    return (
        <Switch value={isAchievedDay} disabled containerStyle={{ width: scale(1.6), height: scale(0.8), marginVertical: scale(0.3) }} iconContainerStyle={{ height: scale(0.8), width: scale(0.8) }} iconStyle={{fontSize: scale(0.6), }} />
    )
}
export default AchievementSwitch