import { Slider } from 'react-native-elements';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { convertMsToHM } from 'src/constants';
import CardCollapse from 'src/modules/common/components/CardCollapse';
import CardTitle from 'src/modules/common/components/CardTitle';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { playListNormal, playListRandom } from 'src/modules/meditation/modules/player/handlers/audioPlayer';
import { tw } from 'src/root/tw';
import { meditationPlayerActions } from '../handlers/redux';

const Time = (time) => () => (
	<View style={tw`justify-center`}>
		<Text style={tw`text-white text-sm`}>{time}</Text>
	</View>
);

const TimeCard = ({ phrases }) => {
	const dispatch = useDispatch();

	const setRepeat = (value) => {
		dispatch(meditationPlayerActions.repeatSet(value));
	};
	const repeat = useSelector((state) => state.meditationPlayer.repeat);

	const setPause = (value) => {
		dispatch(meditationPlayerActions.pauseSet(value));
	};
	const pause = useSelector((state) => state.meditationPlayer.pause);

	const total = useSelector((state) => state.meditationPlayer.total);

	const time = convertMsToHM(total);
	setRepeat(repeat);
	setPause(pause);

	return (
		<CardCollapse>
			<CardTitle title={'Tiempo'} RightComponent={Time(time)} />

			<ViewY style={tw`items-center mb-2`}>
				<Text style={tw`text-white text-sm`}>Duracion total de la rutina</Text>
				<Text style={tw`text-white text-base`}>{time}</Text>
			</ViewY>
			<ViewY spacing={4}>
				<ViewY spacing={2}>
					<ViewX spacing={8}>
						<ViewX style={tw`flex-grow`}>
							<Text style={tw`text-white flex-1 flex-wrap`}>
								Cantidad de repeticiones por cada afirmacion
							</Text>
						</ViewX>
						<Text style={tw`text-white`}>{repeat}</Text>
					</ViewX>
					<Slider
						value={repeat}
						onValueChange={(value) => {
							setRepeat(value);
						}}
						maximumValue={20}
            minimumValue={1}
						step={1}
            thumbStyle={{ height: 25, width: 25, backgroundColor: '#fff' }}
					/>
				</ViewY>
				<ViewY>
					<ViewX spacing={8}>
						<ViewX style={tw`flex-grow`}>
							<Text style={tw`text-white flex-1 flex-wrap`}>Duracion de pausas en segundos</Text>
						</ViewX>
						<Text style={tw`text-white`}>{pause}</Text>
					</ViewX>
					<Slider
						value={pause}
						onValueChange={(value) => {
							setPause(value);
						}}
						maximumValue={20}
            minimumValue={1}
						step={1}
            thumbStyle={{ height: 25, width: 25, backgroundColor: '#fff' }}
					/>
				</ViewY>
			</ViewY>
			{/* <Text style={tw`text-white`}>{JSON.stringify(playlist, null, 4)}</Text> */}
		</CardCollapse>
	);
};

export default TimeCard;
