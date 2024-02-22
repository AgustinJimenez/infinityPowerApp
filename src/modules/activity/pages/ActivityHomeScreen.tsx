import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import InfoIcon from 'react-native-vector-icons/Entypo';
import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch, useSelector } from 'react-redux';
import image from 'src/assets/images/infinite_logo.png';
import filesImage from 'src/assets/images/Vector.png';
import calendarioImage from 'src/assets/images/calendario.png';
import checkImage from 'src/assets/images/check.png';
import starImage from 'src/assets/images/estrella.png';
import starGoldImage from 'src/assets/images/starGold.png';
import circlePlusImage from 'src/assets/images/circuloPlus.png';
import plusImage from 'src/assets/images/plus.png';
import notes from 'src/assets/images/notes.png';
import Progress from 'src/modules/common/components/charts/Progress';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { meditationRoutineActions } from 'src/modules/meditation/modules/routine/handlers/redux';
import { tw } from 'src/root/tw';

import { RootNavigationProps } from '../../../root/rootRoutes';

import ActivityBell from '../components/ActivityBell';
import WeeksPill from '../components/WeeksPill';
import { activityActions } from '../handlers/redux';

const ButtonDay = ({ active = false, children = 'texto', dia=1, actualDay=new Date(), ...props }) => {
	const dispatch = useDispatch();

	const activeStyle = tw`w-10 h-14 justify-center items-center py-2  rounded-lg`;
	activeStyle.backgroundColor="#73DD62"
	const currentDayStyle = tw`bg-opacity-50 bg-black border-2 border-white w-10 h-14 justify-center items-center  py-2 rounded-lg`;
	const inactiveStyle = tw`bg-opacity-50 bg-black  w-10 h-14 justify-center items-center py-2  rounded-lg`;

	if(dia === actualDay.getDate()){
		if (active) {
			currentDayStyle.backgroundColor="#73DD62"
		}
		return (
			<TouchableOpacity style={currentDayStyle} {...props}>
				<Text style={tw`text-white/50 text-xs ${active ? 'font-bold' : ''}`}>{children}</Text>
				<Text style={tw`text-white font-bold mt-2`}>{dia}</Text>
			</TouchableOpacity>
		);
	}
	return (
		<TouchableOpacity style={active ? activeStyle : inactiveStyle} {...props}>
			<Text style={tw`text-white/50 text-xs ${active ? 'font-bold' : ''}`}>{children}</Text>
			<Text style={tw`text-white font-bold mt-2`}>{dia}</Text>
		</TouchableOpacity>
	);
};

const BotonTutorial = ({ children = 'texto', dia=1, actualDay=new Date(), ...props }) => {

}

const TrianguloTutorial = ({children="", top=0, right=0, left=0, invertido=false}) => {
	if (left > 0) {
		return <View style={{
			width: 0,
			height: 0,
			backgroundColor: "transparent",
			borderStyle: "solid",
			borderLeftWidth: 10,
			borderRightWidth: 10,
			borderBottomWidth: !invertido ? 20 : 0,
			borderTopWidth: invertido ? 20 : 0,
			borderLeftColor: "transparent",
			borderRightColor: "transparent",
			borderBottomColor: !invertido ? "#F1F2F2" : "transparent",
			borderTopColor: invertido ? "#F1F2F2" : "transparent",
			position: "absolute",
			top: top,
			left: left
		}}></View>
	}
	return <View style={{
		width: 0,
		height: 0,
		backgroundColor: "transparent",
		borderStyle: "solid",
		borderLeftWidth: 10,
		borderRightWidth: 10,
		borderBottomWidth: !invertido ? 20 : 0,
		borderTopWidth: invertido ? 20 : 0,
		borderLeftColor: "transparent",
		borderRightColor: "transparent",
		borderBottomColor: !invertido ? "#F1F2F2" : "transparent",
		borderTopColor: invertido ? "#F1F2F2" : "transparent",
		position: "absolute",
		top: top,
		right: right
	}}></View>
}

const ActivityHomeScreen = () => {
	const navigation = useNavigation<RootNavigationProps>();
	const dispatch = useDispatch();

	const routines = useSelector((state) => state.meditationRoutine.routines || []);
	const resumen = useSelector((state) => state.activity.resumen || {});
	const belts = useSelector((state) => state.activity.belts || {});
	const weeks = useSelector((state) => state.activity.weeks || []);
	const { week = [], steps = [] } = resumen;
	const actualDay = new Date();
	const [weekDates, setWeekdates] = useState([0, 0, 0, 0, 0, 0, 0])
	const [carga, setCarga] = useState(true)
	const [tutorial, setTutorial] = useState(6)

	const percentHabi = useSelector((state) => state.activity.percent_habit || 0);
	const countWeek = weeks.length;

	const beltActuality = tw`border-2 w-8 h-8 right-4 rounded-full relative justify-end items-center overflow-hidden`;
	const nextBelt = tw`border-2 w-8 h-8 left-4 rounded-full relative justify-end  items-center overflow-hidden`;
	const dialogueStyle = tw`absolute w-full pl-4 pr-7 py-4 z-50 rounded-md`
	dialogueStyle.backgroundColor = "#F1F2F2"

	useEffect(() => {
		dispatch(meditationRoutineActions.routines());
		dispatch(activityActions.belts());
		dispatch(activityActions.weeks());

		dispatch(activityActions.percentHabit());
		dispatch(meditationRoutineActions.musics());
		dispatch(meditationRoutineActions.tones());
		let weekDatesCopy = weekDates;
		let diaCiclo = new Date();
		let i = diaCiclo.getDay();
		while (i < 7) {
			weekDatesCopy[diaCiclo.getDay()] = diaCiclo.getDate();
			diaCiclo = new Date(diaCiclo.setDate(diaCiclo.getDate() + 1));
		  i++;
		}
		diaCiclo = new Date()
		i = diaCiclo.getDay();
		while (i > -1) {
			weekDatesCopy[diaCiclo.getDay()] = diaCiclo.getDate();
			diaCiclo = new Date(diaCiclo.setDate(diaCiclo.getDate() - 1));
		  i--;
		}
		setWeekdates(weekDatesCopy);
		console.log(actualDay)
		setTimeout(() => setCarga(false), 2500)
	}, []);

	const total = routines.filter((r) => r.enabled).map((r) => r.routine_active_days).reduce((a, b) => a + b, 0);
	const num = routines.filter((r) => r.enabled).map((r) => r.executions_days).reduce((a, b) => a + b, 0);

	const percent = total > 0 ? 100 / total * num : 0;

	return carga ? (
		<Screen footer={false} style={tw`items-center flex-1 bg-black justify-center`}>
        	<Image source={image} style={tw` h-16 w-20  `} resizeMode={'contain'} />
    	</Screen>
	) : (
		<Screen scrollEnabled={true} style={tw`h-full pb-5`}>
			<Header
				LeftComponent={() => <Image source={image} style={tw` h-16 w-20  `} resizeMode={'contain'} />}
				RightComponent={() => <ActivityBell />}
			/>
			
			<ViewY style={{zIndex: 0}} spacing={8}>
				<ViewY style={tw`flex-col justify-between h-35`}>
					<ViewY spacing={4} style={tw`justify-center items-center`}>
						<View style={tw`flex justify-center items-center`}>
							{tutorial === 0 &&
								<ViewY style={dialogueStyle}>
									<TrianguloTutorial top={-30} right={10}/>
									<ViewX style={tw`px-5`}>
										<Image style={tw`mr-3`} source={filesImage}></Image>
										<Text>Aquí encontrarás todas las Actividades que hayas creado para el día.</Text>
									</ViewX>
									<ViewX style={tw`justify-end`}>
										<TouchableOpacity onPress={() => setTutorial(tutorial + 1)}>
											<Text style={{color: "#FB7B04"}}>
												Siguiente
											</Text>
										</TouchableOpacity>
									</ViewX>
								</ViewY>
							}
							<Text style={tw`text-white text-sm`}>Mie, Mayo 25</Text>
							<Text style={tw`text-white text-3xl font-bold`}>Hola </Text>
							<ViewX style={tw`items-center`}>
								<Text style={tw`text-white text-1xl font-bold`}>Cinturón actual: Blanco </Text>
								<TouchableOpacity onPress={() => setTutorial(0)}>
									<View
										style={tw`border-2 w-6 h-6 rounded-full`}
										{...{ borderColor: belts.color != undefined ? belts.color : '#ffff', borderWidth: 4 }}
									>
									</View>
								</TouchableOpacity>
							</ViewX>
							
						</View>
					</ViewY>
				</ViewY>
				<View style={tw`flex flex-grow`}>
				{tutorial === 4 &&
					<ViewY style={dialogueStyle} {...{top: -70}}>
						<TrianguloTutorial top={-30} right={60}/>
						<ViewX style={tw`px-5`}>
							<Image source={circlePlusImage} style={tw`mr-2`}/>
							<Text style={tw``}>Los Cinturones, como en las artes marciales, miden tu nivel de práctica. Cuanto más alto sea el grado de tu cinturón, más persistencia y disciplina habrás demostrado en tus Actividades y más probable es que alcances tus objetivos.</Text>
						</ViewX>
						<ViewX style={tw`px-5 mt-4 justify-between`}>
								<View
									style={tw`border-2 w-7 h-7 rounded-full mr-5=`}
									{...{ borderColor: "white", borderWidth: 4 }}
								>
								</View>
								<View
									style={tw`border-2 w-7 h-7 rounded-full mr-5`}
									{...{ borderColor: "#FFD600", borderWidth: 4 }}
								>
								</View>
								<View
									style={tw`border-2 w-7 h-7 rounded-full mr-5`}
									{...{ borderColor: "#9EFA56", borderWidth: 4 }}
								>
								</View>
								<View
									style={tw`border-2 w-7 h-7 rounded-full mr-5`}
									{...{ borderColor: "black", borderWidth: 4 }}
								>
								</View>
								<View
									style={tw`border-2 w-7 h-7 rounded-full mr-5 justify-items-center`}
									{...{ borderColor: "black", borderWidth: 4 }}
								>
									<Image source={starGoldImage} style={{position: "absolute", bottom: -10, right: 1}}/>
								</View>
						</ViewX>
						<ViewX style={tw`justify-between mt-3 pl-4`}>
							<TouchableOpacity onPress={() => setTutorial(tutorial - 1)}>
								<Text style={{color: "#FB7B04"}}>
									Anterior
								</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setTutorial(tutorial + 1)}>
								<Text style={{color: "#FB7B04"}}>
									Siguiente
								</Text>
							</TouchableOpacity>
						</ViewX>
					</ViewY>
				}
				{tutorial === 5 &&
								<ViewY style={dialogueStyle} {...{bottom: -10}}>
									<TrianguloTutorial top={-30} left={150}/>
									<ViewX style={tw`px-5`}>
										<Image style={tw`mr-2`} source={plusImage}></Image>
										<Text>Con estos botones accede a las herramientas y crea las Actividades con las cuales podrás alcanzar tus objetivos.</Text>
									</ViewX>
									<ViewX style={tw`justify-end mt-3`}>
										<TouchableOpacity onPress={() => setTutorial(6)}>
											<Text style={{color: "#FB7B04"}}>
												Finalizar
											</Text>
										</TouchableOpacity>
									</ViewX>
								</ViewY>
							}
					<ViewY
						spacing={1}
						style={tw`bg-black bg-opacity-50 rounded-lg p-3 items-center justify-center`}
					>
						<ViewX>
							<TouchableOpacity
								onPress={() => navigation.navigate('MeditationHome')}
								style={tw` items-center justify-center`}
							>
								<Progress value={percent} percent={percent} title={'Subconsciente'} />
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => navigation.navigate('HomeFocus')}
								style={tw` items-center justify-center mr-2`}
							>
								<Progress value={0} percent={0} title={' Consciente'} />
							</TouchableOpacity>

							<TouchableOpacity
								onPress={() => navigation.navigate('HomeHabit')}
								style={tw` items-center justify-center`}
							>
								<Progress value={percentHabi} percent={percentHabi} title={'Hábitos'} />
							</TouchableOpacity>
						</ViewX>
						{tutorial === 2 &&
							<ViewY style={dialogueStyle} {...{right: -180 , top: -70}}>
								<TrianguloTutorial invertido={true} top={75} left={40}/>
								<ViewX style={tw`px-5`}>
									<Image style={tw`mr-3`} source={calendarioImage}></Image>
									<Text>Al lograr 5 días o más estarás logrando la semana</Text>
								</ViewX>
								<ViewX style={tw`justify-between mt-3 pl-4`}>
									<TouchableOpacity onPress={() => setTutorial(tutorial - 1)}>
										<Text style={{color: "#FB7B04"}}>
											Anterior
										</Text>
									</TouchableOpacity>
									<TouchableOpacity onPress={() => setTutorial(tutorial + 1)}>
										<Text style={{color: "#FB7B04"}}>
											Siguiente
										</Text>
									</TouchableOpacity>
								</ViewX>
							</ViewY>
						}
					</ViewY>
					<ViewY
						spacing={2}
					>
						<ViewX spacing={0} style={tw`my-8 justify-center items-center relative`}>
								<View
									style={beltActuality}
									{...{ borderColor: belts.color != undefined ? belts.color : '#ffffff' }}
								>
									{/* <View style={tw`justify-center items-center p-1`}>
										<Text style={tw`text-white text-sm font-bold`}>CG</Text>
									</View> */}
									<View style={tw`absolute justify-center items-center`}>
										<UserIcon name={'user'} size={30} color="#fff" />
									</View>
								</View>
								{/* {weeks.map(w => <WeeksPill active={!w.enable} />)} */}
								<ViewX>
									<WeeksPill active={tutorial !== 3 && tutorial !== 2 && weeks.length>0?!weeks[0].enable:false} />
									<WeeksPill active={tutorial !== 3 && weeks.length>0?!weeks[1].enable:false} />
									<WeeksPill active={tutorial !== 3 && weeks.length>0? !weeks[2].enable:false} />
								</ViewX>
								<View
									style={nextBelt}
									{...{
										borderColor:
											belts.next_belt_colour != null ? belts.next_belt_colour.colour : '#ffffff'
									}}
								>
									{/* <View style={tw`justify-center items-center p-1`}>
										<Text style={tw`text-white text-sm font-bold`}>CG</Text>
									</View> */}
									<View style={tw`absolute justify-center items-center`}>
										<UserIcon name={'user'} size={30} color="#fff" />
									</View>
								</View>
						</ViewX>
					</ViewY>
					
				</View>
			</ViewY>

			<ViewX spacing={3} style={tw`flex-col items-center justify-center`}>
				<ButtonDay dia={weekDates[0]} actualDay={actualDay} active={week[0]}>Dom</ButtonDay>
				<ButtonDay dia={weekDates[1]} actualDay={actualDay} active={week[1]}>Lun</ButtonDay>
				<ButtonDay dia={weekDates[2]} actualDay={actualDay} active={week[2]}>Mar</ButtonDay>
				<ButtonDay dia={weekDates[3]} actualDay={actualDay} active={week[3]}>Mie</ButtonDay>
				<ButtonDay dia={weekDates[4]} actualDay={actualDay} active={week[4] || tutorial === 1}>Jue</ButtonDay>
				<ButtonDay dia={weekDates[5]} actualDay={actualDay} active={week[5]}>Vie</ButtonDay>
				<ButtonDay dia={weekDates[6]} actualDay={actualDay} active={week[6]}>Sab</ButtonDay>
			</ViewX>
			{tutorial === 3 &&
				<ViewY style={dialogueStyle} {...{bottom: 0}}>
					<TrianguloTutorial top={-30} right={0}/>
					<ViewX style={tw`px-5`}>
						<Image source={starImage} style={tw`mr-3`}/>
						<Text>Al lograr 3 semanas consecutivas alcanzas el siguiente <Text style={tw`font-bold`}>Cinturón</Text>!</Text>
					</ViewX>
					<ViewX style={tw`justify-between mt-3 pl-4`}>
						<TouchableOpacity onPress={() => setTutorial(tutorial - 1)}>
							<Text style={{color: "#FB7B04"}}>
								Anterior
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setTutorial(tutorial + 1)}>
							<Text style={{color: "#FB7B04"}}>
								Siguiente
							</Text>
						</TouchableOpacity>
					</ViewX>
				</ViewY>
			}
			{tutorial === 1 &&
				<ViewY style={dialogueStyle}>
					<TrianguloTutorial top={-30} right={90}/>
					<ViewX style={tw`px-5`}>
						<Image style={tw`mr-3 h-3.5 w-3.5`} source={checkImage}/>
						<Text>Para lograr un día de la semana debes completar todas las <Text style={tw`font-bold`}>Actividades</Text> de ese día</Text>
					</ViewX>
					<ViewX style={tw`justify-between mt-3 pl-4`}>
						<TouchableOpacity onPress={() => setTutorial(tutorial - 1)}>
							<Text style={{color: "#FB7B04"}}>
								Anterior
							</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => setTutorial(tutorial + 1)}>
							<Text style={{color: "#FB7B04"}}>
								Siguiente
							</Text>
						</TouchableOpacity>
					</ViewX>
				</ViewY>
			}
		</Screen>
	);
};

export default ActivityHomeScreen;
