import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {Image, Switch, Text, TouchableOpacity, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import Card from 'src/modules/common/components/Card';
import CardTitle from 'src/modules/common/components/CardTitle';
import LineSeven from 'src/modules/common/components/charts/LineSeven';
import {ViewX, ViewY} from 'src/modules/common/components/utils/ViewUtils';
import {meditationRoutineActions} from 'src/modules/meditation/modules/routine/handlers/redux';
import {tw} from 'src/root/tw';
import PhraseListItem from '../../phrase/components/PhraseListItem';
import {meditationPhraseActions} from '../../phrase/handlers/redux';
import { meditationPlayerActions, modeType } from 'src/modules/meditation/modules/player/handlers/redux';
import lapizImage from 'src/assets/images/lapizEditable.png'
import basureroImage from 'src/assets/images/basurero_icono.png'

const PlayButton = data => () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <TouchableOpacity
        style={tw`w-10 h-10 bg-white rounded-full justify-center items-center`}
        onPress={() => {
          dispatch(meditationPlayerActions.routineSet(data));
          navigation.navigate('MeditationPlayerConfiguration', {routine: data});
        }}>
        <Icon name="play-arrow" size={30} color="#333" />
      </TouchableOpacity>
    </>
  );
};

const RoutineCard = ({data = {}}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const {
    user_routine_phrases = [],
    name = '',
    active_date_at,
    inactive_date_at,
    id,
  } = data;

  const [newName, setNewName] = useState(name);

  useEffect(() => {
    setEnabled(data.enabled);
  }, [data.enabled]);

  const onActivePress = enabled => () => {
    setEnabled(enabled);

    if (enabled) {
      dispatch(meditationRoutineActions.routineSetDeactive({routine: data}));
    } else {
      dispatch(meditationRoutineActions.routineSetActive({routine: data}));
    }
  };

  const deletePress = () => {
    dispatch(meditationRoutineActions.routineDelete( data ))
  }

  const onReminderPress = () => {
    dispatch(meditationRoutineActions.routineSet({routine: data}));

    navigation.navigate('MeditationReminder');
  };

  const updateName = () => {
    dispatch(meditationRoutineActions.routineUpdate({name: newName, id : id}));
  };

  let a = moment();
  let b = moment(active_date_at);
  let c = 0;
  if (!data.enabled) {
    b = moment(inactive_date_at);
  }
  c = a.diff(b, 'days'); // 1


  return (
    <ViewY spacing={6}>
      <ViewY spacing={0} style={{borderRadius:17, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
        <Card>
          {isEditing?<TextInput
          style={{color:'#fff', backgroundColor:'transparent', width:'50%', borderRadius:6}}
          placeholder=""
          onChangeText={newText => setNewName(newText)}
          defaultValue={name}
          autoFocus={true}
        />:null}
          <CardTitle
            RightComponent={
              enabled
                ? 
                  open ? 
                    !isEditing ? 
                      () => <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                        <Text style={tw`text-white`}>
                          <Image style={tw`h-5 w-5`} source={lapizImage} />
                        </Text>
                      </TouchableOpacity>
                    : 
                      () => <View style={tw`flex-row`}>
                        <TouchableOpacity onPress={deletePress}>
                          <Text style={tw`text-white mr-2`}>
                            <Image style={tw`h-7 w-7`} source={basureroImage} />
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={
                              () => { setIsEditing(!isEditing);  updateName(); }
                            }>
                          <Text style={tw`text-green-400`}>
                            Guardar
                          </Text>
                        </TouchableOpacity>
                      </View>
                  : PlayButton(data)
                : () => (
                    <Switch onChange={onActivePress(enabled)} value={enabled} />
                )              
            }
            title={!isEditing?name:''}></CardTitle>
          {(!open || !enabled) && (
            <ViewY spacing={2}>
              {enabled && (
                <View style={tw`relative pr-12`}>
                  <LineSeven data={data.week} />
                  <View
                    style={tw`absolute -right-6 rounded-lg bg-black px-4 py-2 shadow flex justify-center flex-col`}>
                    <Text
                      style={tw`flex text-md text-white text-center font-bold`}>
                      {data.percent}%
                    </Text>
                    <Text style={tw`flex text-xs text-white text-center`}>
                      {data.executions_days}/{data.routine_active_days}
                    </Text>
                  </View>
                </View>
              )}
              <ViewX style={tw`justify-between`}>
                <Text style={tw`text-white text-xs`}>
                  Rutina {enabled ? 'activa' : 'inactiva'} hace {c} dias
                </Text>
                <Text style={tw`text-white text-xs`}>Racha: {data.streak}</Text>
              </ViewX>
            </ViewY>
          )}
          {!!open && enabled && (
            <ViewY spacing={2}>
              <ViewX style={tw`justify-between items-center`}>
                <Text style={tw`text-white text-xs`}>
                  Rutina {enabled ? 'activa' : 'inactiva'} hace {c} dias
                </Text>
                <Switch onChange={onActivePress(enabled)} value={enabled} />
              </ViewX>
              {user_routine_phrases.map(phrase => (
                phrase.user_phrase != null ? <PhraseListItem key={phrase.id} isEditing={isEditing} data={phrase.user_phrase} phrase={phrase} /> : null
              ))}
            </ViewY>
          )}
        </Card>
        {enabled && (
          <ViewX style={tw`justify-center absolute bottom-0 left-0 right-0`}>
            <TouchableOpacity
              onPress={() => setOpen(!open)}
              style={tw`w-8 h-8 bg-gray-800 rounded-full -mb-4 justify-center items-center`}>
              {!!open && <Icon name="expand-less" size={32} color="#fff" />}
              {!open && <Icon name="expand-more" size={32} color="#fff" />}
            </TouchableOpacity>
          </ViewX>
        )}
      </ViewY>
      {!!open && enabled && (
        <ViewX spacing={2} style={tw`justify-center items-center`}>
          <TouchableOpacity onPress={onReminderPress}>
            <Icon name="notifications" size={30} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={tw`border border-white py-2 px-2 rounded-3xl`}
            onPress={() =>
              dispatch(meditationPhraseActions.phrasesRoutine({routine: data}))
            }>
            <Text style={tw`text-white`}>Agregar Afirmacion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('MeditationRoutineBackground', {
                routine: data,
              })
            }>
            <Icon name="collections" size={30} color="#fff" />
          </TouchableOpacity>
        </ViewX>
      )}
    </ViewY>
  );
};

export default RoutineCard;
