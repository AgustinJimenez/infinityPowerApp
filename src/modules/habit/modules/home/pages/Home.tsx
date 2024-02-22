import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import interrogaImage from 'src/assets/images/interroga.png';
import checkHabitoImage from 'src/assets/images/habits_3.png';

import { RootNavigationProps } from 'src/root/rootRoutes';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import { habitObjectiveActions, habitObjectiveSelector } from '../../objectives/handlers/redux';

import HeaderLeft from '../components/HeaderLeft';
import HabitProgress from '../components/HabitProgress';
import ObjectiveCard from '../../objectives/ObjectiveCard';
import { activityActions } from '../../../../activity/handlers/redux';
import { EmptyComponent } from '../../objectives/components/EmptyComponent';

const HomeHabit: React.FC = () => {
	const navigation = useNavigation<RootNavigationProps>();
	const dispatch = useAppDispatch();
	//  const { objectives } = useAppSelector(habitObjectiveSelector);

	const viewStyleBorder = tw`pb-3 mx-5`
	viewStyleBorder.borderBottomWidth = 0.5
	viewStyleBorder.borderColor = "#ccc"

	const objectives = useSelector((state) => state.habitObjective.objectives || []);

	const percentHabi = useSelector((state) => state.activity.percent_habit || 0);

	const handleHabitProgress = () => {
		console.log('HabitProgress');
	};

	const checkHabitStyle = tw`w-24 h-24 rounded-full border-white border-4`
	checkHabitStyle.borderColor = "#404247"

	const CheckHabit = ({}) => {
		return <ViewY spacing={1} style={tw`flex items-center`}>
			<View style={tw`flex justify-center items-center w-24 h-24`}>
				<View style={tw`absolute top-0 left-0`}>
					<Image
					style={checkHabitStyle}
					source={checkHabitoImage}
					/>
				</View>
			</View>
	  	</ViewY>
	}

	useEffect(() => {
		dispatch(habitObjectiveActions.getObjectives());

		dispatch(activityActions.percentHabit());
	}, []);

	console.log('user_objective_habit');
	console.log(objectives.length);

	return (
		<Screen scrollEnabled={true}>
			<Header text={'Hábitos'} RightComponent={HeaderLeft} LeftComponent={EmptyComponent} />
				{/* <HabitProgress /> */}
			<CheckHabit/>

			<ViewY spacing={4}>
				<ViewX style={tw`justify-center items-center mt-3`}>
					<TouchableOpacity style={tw`border rounded-md px-5 mr-1 py-3 border-white`} onPress={() => navigation.navigate("ObjectiveHabit")}>
						<Text style={tw`text-white font-bold`}>
						Crear Nuevo Objetivo
						</Text>
					</TouchableOpacity>
					<View style={tw`w-5 h-5 bg-gray-400 rounded-full ml-1 justify-center items-center`}>
						<Image source={interrogaImage}/>
					</View>
				</ViewX>
				<ViewX style={tw`justify-between items-end`}>
					<Text style={tw`text-white text-base`}>Mis Objetivos</Text>
					<TouchableOpacity onPress={handleHabitProgress}>
						<Icon name="users" size={30} color="#fff" />
						{/* <ActivityBell /> */}
					</TouchableOpacity>
				</ViewX>

				{!objectives.length &&
				<ViewX style={viewStyleBorder}>
					<Text style={tw`text-white mt-5`}>No tienes ningún Hábito activo</Text>
				</ViewX>
				}
				
				{objectives.map((objective, id) => {
					return <ObjectiveCard
            title={objective.name}
            footerDescription={objective.description}
            streakPercentage={objective.percent+"%"}
            streakLabel="Racha"
            dataToEvaluate={[ 100, 0, 100, 100, 0, 50, 50 ]}
          />
				})}

			</ViewY>
		</Screen>
	);
};

export default HomeHabit;
