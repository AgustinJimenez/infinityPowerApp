import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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
    <TouchableOpacity onPress={() => navigation.navigate('MeditationHome')}>
      <Text style={tw`text-white text-base text-teal-300`}>Cancelar</Text>
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

const arrow = () => (
  <View style={tw`h-10 items-center justify-center`}>
    <Text style={tw`text-white text-lg`}>{'>'}</Text>
  </View>
);

const PhraseCategoryList = () => {
  const categories = useSelector(state => state.meditationPhrase.categories);
  const navigation = useNavigation();

  const dispatch = useDispatch();

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
      <ViewY>
        <ViewX>
          <Text
            style={tw`flex-1 px-4 text-xl font-bold text-center text-white flex-wrap`}>
            Categorias
          </Text>
        </ViewX>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MeditationPhrasePersonalAffirmation')
          }>
          <ListItem
            style={tw`border-b`}
            RightComponent={arrow}
            text={'Personal'}
          />
        </TouchableOpacity>
        {categories.map((category, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() =>
              navigation.navigate('MeditationPhraseCategory', {category})
            }>
            <ListItem
              style={tw`border-b`}
              RightComponent={arrow}
              text={category.name}
            />
          </TouchableOpacity>
        ))}
      </ViewY>
    </Screen>
  );
};

export default PhraseCategoryList;
