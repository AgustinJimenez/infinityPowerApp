import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Switch, Text, TouchableOpacity, View, Modal } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Header from 'src/modules/common/components/Header';
import ListItem from 'src/modules/common/components/ListItem';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw, twGetTextColor } from 'src/root/tw';
import PhrasesRoutineListCount from '../components/PhrasesRoutineListCount';
import { meditationPhraseActions } from '../handlers/redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LeftComponent = ({}) => {
	const navigation = useNavigation();

	return (
		<TouchableOpacity onPress={() => navigation.navigate('MeditationHome')}>
			<Text style={tw`text-white text-base text-teal-300`}>Cancelar</Text>
		</TouchableOpacity>
	);
};

const RightComponent = ({}) => {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const phrases_routine_list = useSelector((state) => state.meditationPhrase.phrases_routine_list || []);
	// const count =
	//   phrases_routine_list.filter(phrase => !phrase.user_phrase_id).length || 0;

	// if (count == 0) return null;
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate('MeditationPhraseCategoryList');
				dispatch(meditationPhraseActions.phrasesRoutineSave({}));
			}}
		>
			<Text style={tw`text-white text-base text-teal-300`}>Guardar</Text>
		</TouchableOpacity>
	);
};

const PhrasePersonalAffirmation = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const [ modalAfirmaciones, setModalAfirmaciones ] = useState(false);
	const [ phraseExtra, setPhraseExtra ] = useState({});

	const phrases = useSelector((state) => state.meditationPhrase.phrases);
	const category_phrases = phrases.filter((f) => f.user_id);

	const phrases_routine_list = useSelector((state) => state.meditationPhrase.phrases_routine_list || []);

  const LeftComponentSelect = ({}) => {
    const navigation = useNavigation();
  
    return (
      <TouchableOpacity onPress={() => setModalAfirmaciones(false)}>
        <Text style={tw`text-white text-base text-teal-300`}>Cancelar</Text>
      </TouchableOpacity>
    );
  };

  const RightComponentSelect = ({}) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
  
    const phrases_routine_list = useSelector((state) => state.meditationPhrase.phrases_routine_list || []);
    // const count =
    //   phrases_routine_list.filter(phrase => !phrase.user_phrase_id).length || 0;
  
    // if (count == 0) return null;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('MeditationPhraseCategoryList');
          dispatch(meditationPhraseActions.phrasesRoutineSave({}));
        }}
      >
        <Text style={tw`text-white text-base text-teal-300`}>Guardar</Text>
      </TouchableOpacity>
    );
  };

	const onSwitchTouch = (phrase, exists) => () => {
		if (!exists && phrases_routine_list.length < 5) {
      dispatch(meditationPhraseActions.phrasesRoutineAdd({ phrase }));
      setModalAfirmaciones(false)
    }else {
      dispatch(meditationPhraseActions.phrasesRoutineRemove({ phrase }));
      setModalAfirmaciones(true);
      setPhraseExtra(phrase)
    }
	};

  const onSwitchTouchSelect = (phrase, exists) => () => {
      dispatch(meditationPhraseActions.phrasesRoutineRemove({ phrase })); 
      dispatch(meditationPhraseActions.phrasesRoutineAdd({ phraseExtra }));
      setModalAfirmaciones(false);
	};

	const renderSwitch = (phrase) => () => {
		const data = phrases_routine_list.filter(function(routine_phrase) {
			return routine_phrase != null;
		});

		const exists = data.find((p) => p.idx == phrase.idx);
		return <Switch onTouchEnd={onSwitchTouch(phrase, !!exists)} value={!!exists} />;
	};

  const renderSwitchSelect = (phrase) => () => {
		const data = phrases_routine_list.filter(function(routine_phrase) {
			return routine_phrase != null;
		});

		const exists = data.find((p) => p.idx == phrase.idx);
		return <Switch onTouchEnd={onSwitchTouchSelect(phrase, false)} value={true} />;
	};

	const [ phrase, setPhrase ] = useState(false);

	const HeadIcon = () => (
		<View
			style={[
				tw`w-8 h-8 rounded-full justify-center items-center`,
				{ backgroundColor: twGetTextColor('text-teal-400') }
			]}
		>
			<Icon name="psychology" size={28} color="#fff" />
		</View>
	);

	const EmptyIcon = () => <View style={tw`w-8 h-8 rounded-full bg-black bg-opacity-50`} />;

	let count = 0;
	phrases_routine_list.map((routine_phrase) => {
		if (routine_phrase != null) {
			count++;
		}
	});

	return (
		<Screen scrollEnabled={true} style={tw` flex flex-grow`}>
			<Header text={'Agregar Afirmaciones'} LeftComponent={LeftComponent} RightComponent={RightComponent} />
			<ViewY spacing={4} style={tw`items-center`}>
				<ViewX style={tw`w-full`}>
					<Text style={tw`flex-1 px-4 text-center text-white flex-wrap`}>
						Navega en las categorías y selecciona entre 1 y 5 afirmaciones para la rutina Perseverancia
					</Text>
				</ViewX>
				<PhrasesRoutineListCount />
				<View style={tw`items-center`}>
					<Text style={tw`text-white font-bold text-2xl`}>Personal</Text>
				</View>

				<TouchableOpacity
					onPress={() => {
						dispatch(meditationPhraseActions.phraseSet({ phrase: {} }));
						navigation.navigate('MeditationPhraseNewAffirmation');
					}}
					style={tw`border border-white py-4 px-6 rounded-3xl`}
				>
					<Text style={tw`text-white text-white font-bold`}>Crear Nueva Afirmacion</Text>
				</TouchableOpacity>
			</ViewY>

			{!!phrase && (
				<ViewY spacing={tw`4`} style={tw`border-b border-white border-opacity-25 `}>
					<Text style={tw`text-white py-6`}>No tines ninguna afirmación personal.</Text>
				</ViewY>
			)}

			{category_phrases.map((phrase, idx) => (
				<ListItem
					key={idx}
					style={tw`border-b`}
					RightComponent={renderSwitch({
						...phrase,
						idx: '_' + phrase.user_phrase_id
					})}
					text={phrase.text_affirmative}
				/>
			))}

			<Modal
				transparent={true}
				visible={modalAfirmaciones}
				onRequestClose={() => {
					setModalAfirmaciones(!modalAfirmaciones);
				}}
			>
				<Screen scrollEnabled={true} style={tw` flex flex-grow`}>
					<Header
						text={'Modificar Afirmaciones'}
						LeftComponent={LeftComponentSelect}
						RightComponent={RightComponentSelect}
					/>
					<ViewY spacing={4} style={tw`items-center`}>
						<ViewX style={tw`w-full`}>
							<Text style={tw`flex-1 px-4 text-center text-white flex-wrap`}>
								Ya tienes 5 afirmaciones, puedes reemplazar una con la seleccionada anteriormente
							</Text>
						</ViewX>
						<PhrasesRoutineListCount />
					</ViewY>

					{phrases_routine_list.map((phrase, idx) => (
						<ListItem
							key={idx}
							style={tw`border-b`}
							RightComponent={renderSwitchSelect({
								...phrase,
								idx: '_' + phrase.user_phrase_id
							})}
							text={phrase.text_affirmative}
						/>
					))}

				</Screen>
			</Modal>
		</Screen>
	);
};

export default PhrasePersonalAffirmation;
