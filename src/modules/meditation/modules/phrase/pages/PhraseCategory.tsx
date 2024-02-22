import {useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import {Switch, Text, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Header from 'src/modules/common/components/Header';
import ListItem from 'src/modules/common/components/ListItem';
import Screen from 'src/modules/common/components/Screen';
import {ViewX, ViewY} from 'src/modules/common/components/utils/ViewUtils';
import {tw} from 'src/root/tw';
import PhrasesRoutineListCount from '../components/PhrasesRoutineListCount';
import {meditationPhraseActions} from '../handlers/redux';

const LeftComponent = ({}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('MeditationPhraseCategoryList')}>
      <MaterialIcon name="arrow-back-ios" size={30} color="#fff" />
    </TouchableOpacity>
  );
};

const RightComponent = ({}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const phrases_routine_list = useSelector(
    state => state.meditationPhrase.phrases_routine_list || [],
  );
  // const count =
  //   phrases_routine_list.filter(phrase => !phrase.user_phrase_id).length || 0;

  // if (count == 0) return null;
  return (
    <TouchableOpacity
      onPress={() => dispatch(meditationPhraseActions.phrasesRoutineSave({}))}>
      <Text style={tw`text-white text-base text-teal-300`}>Guardar</Text>
    </TouchableOpacity>
  );
};

const PhraseCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const phrases = useSelector(state => state.meditationPhrase.phrases || []);
  const phrases_routine_list = useSelector(
    state => state.meditationPhrase.phrases_routine_list || [],
  );

  const {category = {}} = route.params || {};

  if (!category.id) {
    navigation.goBack();
  }

  const category_phrases = phrases.filter(
    phrase => phrase.category_id * 1 == category.id * 1,
  );

  const onSwitchTouch = (phrase, exists) => () => {
    if (!exists && phrases_routine_list.length < 5)
      dispatch(meditationPhraseActions.phrasesRoutineAdd({phrase}));
    else dispatch(meditationPhraseActions.phrasesRoutineRemove({phrase}));
  };

  const renderSwitch = phrase => () => {

    const data = phrases_routine_list.filter(function(routine_phrase){
      return routine_phrase != null
    });

    const exists = data.find(p => p.idx == phrase.idx);


    return (
      <Switch
        onTouchEnd={onSwitchTouch(phrase, !!exists)}
        value={!!exists}></Switch>
    );
  };

  return (
    <Screen scrollEnabled={true}>
      <Header
        text={'Agregar Afirmacion'}
        LeftComponent={LeftComponent}
        RightComponent={RightComponent}></Header>

      <ViewY spacing={2} style={tw`items-center`}>
        <ViewX style={tw`w-full`}>
          <Text style={tw`flex-1 px-4 text-center text-white flex-wrap`}>
            Navega en las categorías y selecciona entre 1 y 5 afirmaciones para
            la rutina Perseverancia
          </Text>
        </ViewX>
        <PhrasesRoutineListCount></PhrasesRoutineListCount>
      </ViewY>
      <ViewY spacing={2}>
        <ViewX>
          <Text
            style={tw`flex-1 px-4 text-xl font-bold text-center text-white flex-wrap`}>
            {category.name}
          </Text>
        </ViewX>
        {category_phrases.map((phrase, idx) => (
          <ListItem
            key={idx}
            style={tw`border-b`}
            RightComponent={renderSwitch({...phrase, idx: phrase.id})}
            text={phrase.text_affirmative}
          />
        ))}
      </ViewY>
    </Screen>
  );
};

export default PhraseCategory;
