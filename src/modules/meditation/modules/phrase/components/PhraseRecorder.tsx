import {useFocusEffect} from '@react-navigation/native';
import {Audio} from 'expo-av';
import React, {useRef, useState} from 'react';
import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {Countdown} from 'react-native-element-timer';
import {
  default as IconAngle,
  default as IconMic,
} from 'react-native-vector-icons/FontAwesome';
import IconReplay from 'react-native-vector-icons/FontAwesome5';
import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
import {useDispatch} from 'react-redux';
import image from 'src/assets/images/infinite_icono.png';
import ListItem from 'src/modules/common/components/ListItem';
import {ViewX, ViewY} from 'src/modules/common/components/utils/ViewUtils';
import {tw, twGetTextColor} from 'src/root/tw';
import PlayPhraseAudio from './PlayPhraseAudio';

const Icon = ({is_edited}) => (
  <View style={tw`w-12 min-h-11 rounded-full `}>
    {!is_edited && (
      <Image
        source={image}
        style={tw`absolute w-full h-full  `}
        resizeMode={'contain'}
      />
    )}
    {!!is_edited && (
      <View
        style={tw`border-2 w-10 h-10 border-white rounded-full relative justify-end items-center overflow-hidden`}>
        <View
          style={tw`w-full absolute -bottom-1 flex flex-row justify-center`}>
          <UserIcon name={'user'} size={30} color="#fff" />
        </View>
      </View>
    )}
  </View>
);

const AngleIcon = ({onPress}) => (
  <View style={tw`w-12 min-h-11 `}>
    <TouchableOpacity onPress={onPress}>
      <IconAngle name={'angle-up'} size={42} color="#fff" />
    </TouchableOpacity>
  </View>
);

const PhraseRecorder = ({
  text = '',
  onChangeText = null,
  audio = null,
  onChangeAudio = null,
  textRecord = 'Grabar con mi voz',
  allowReset = false,
  onPressReset = null,
  is_edited = false,
}) => {
  const [state, setState] = useState(0);
  const [circle, setCircle] = useState(5);
  const [replay, setReplay] = useState(false);
  const [play, setPlay] = useState(false);
  const countdownRef = useRef(null);
  const [collapse, setCollapse] = useState(true);
  const [recording, setRecording] = React.useState();
  const [uri, setUri] = useState('');
  const dispatch = useDispatch();
  const sound = new Audio.Sound();
  const [edit, setEdit] = useState(false);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      console.log('Starting recording..');
      const {recording} = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    setUri(recording.getURI());
    console.log('Recording stopped and stored at', uri);
  };

  const playback = async () => {
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: true,
    });

    await sound.unloadAsync();
    await sound.loadAsync({uri});
    await sound.playAsync();
  };

  const stopPlayback = async () => {
    await sound.stopAsync();
  };

  useFocusEffect(() => {
    return () => {
      !!recording && recording.stopAndUnloadAsync();
    };
  });

  return (
    <View
      style={tw`bg-black bg-opacity-50 flex-col rounded p-4 rounded-xl justify-center`}>
      <ViewY style={tw`flex flex-grow `}>
        <Countdown
          ref={countdownRef}
          style={tw`text-white w-0 h-0`}
          textStyle={tw`text-white`}
          initialSeconds={4}
          onTimes={e => {
            console.log({e});
            setCircle(e);

            if (e == 0) {
              console.log('termino');
              setState(2);
              startRecording();
            }
          }}
        />
        <ListItem
          LeftComponent={() => {
            return <Icon is_edited={is_edited} />;
          }}
          RightComponent={() => {
            if (collapse == true) {
              return !!audio ? (
                <PlayPhraseAudio audio={audio}></PlayPhraseAudio>
              ) : null;
            }

            return (
              <AngleIcon
                onPress={() => {
                  setCollapse(true);
                }}
              />
            );
          }}>
          <TextInput
            value={text}
            style={tw` text-white w-60`}
            multiline={true}
            onChangeText={onChangeText}
            placeholder={
              'Escribe aquí la afirmación que quieras incorporar a tu Rutina y luego grábala con tu voz'
            }
            placeholderTextColor={twGetTextColor('text-white')}></TextInput>
          {!collapse && (
            <ViewY
              spacing={4}
              style={tw`justify-center items-center m-4 relative`}>
              <View>
                <Text style={tw`text-2xl text-white`}>00:00</Text>
              </View>
              <View style={tw`relative w-38 h-38 justify-center items-center `}>
                {!replay && (
                  <>
                    <View
                      style={tw`rounded-full ${
                        circle < 3 ? 'bg-red-500' : 'bg-gray-100'
                      }  w-38 h-38 justify-center items-center`}>
                      <View
                        style={tw`rounded-full ${
                          circle < 4
                            ? 'bg-red-600 bg-opacity-50'
                            : 'bg-gray-300'
                        } justify-center items-center w-30 h-30`}>
                        <View
                          style={tw`rounded-full ${
                            circle < 5 ? 'bg-red-600' : 'bg-gray-500'
                          } w-22 h-22 justify-center items-center`}></View>
                      </View>
                    </View>

                    <View
                      style={tw`absolute flex justify-center items-center w-full h-full`}>
                      <View style={tw`flex justify-center items-center`}>
                        {(circle == 0 || circle == 5) && (
                          <IconMic name={'microphone'} size={38} color="#fff" />
                        )}
                        {circle > 1 && circle < 5 && (
                          <Text
                            style={tw`text-white text-5xl font-bold leading-relaxed`}>
                            {circle - 1}
                          </Text>
                        )}
                        {circle == 1 && (
                          <Text
                            style={tw`text-white text-xl font-bold leading-relaxed`}>
                            {'¡Comienza!'}
                          </Text>
                        )}
                      </View>
                    </View>
                  </>
                )}
                {!!replay && !play && (
                  <TouchableOpacity
                    onPress={() => {
                      setPlay(true);
                      playback();
                    }}
                    style={tw`w-24 h-24 bg-white pl-2 rounded-full justify-center items-center`}>
                    <IconReplay
                      name={'play'}
                      size={40}
                      color="#000000"
                      style={tw``}
                    />
                  </TouchableOpacity>
                )}
                {!!replay && !!play && (
                  <TouchableOpacity
                    onPress={() => {
                      setPlay(false);
                      stopPlayback();
                    }}
                    style={tw`w-24 h-24 bg-white rounded-full justify-center items-center`}>
                    <IconReplay
                      name={'stop'}
                      size={40}
                      color="#000000"
                      style={tw``}
                    />
                  </TouchableOpacity>
                )}
              </View>

              {state == 0 && (
                <TouchableOpacity
                  onPress={() => {
                    countdownRef.current.start();
                    setCircle(4);
                    setState(1);
                    setReplay(false);
                    {
                      recording ? stopRecording : startRecording;
                    }
                  }}
                  style={tw`bg-red-600 border border-red-600 justify-center items-center rounded-3xl px-2 py-1`}>
                  <Text style={tw`text-white text-base `}>
                    Iniciar Grabación
                  </Text>
                </TouchableOpacity>
              )}
              {state == 1 && (
                <TouchableOpacity
                  onPress={() => {
                    countdownRef.current.stop();
                    setState(0);
                    setCircle(5);
                    setReplay(false);
                  }}
                  style={tw`bg-white border border-white justify-center items-center rounded-3xl px-2 py-1`}>
                  <Text style={tw`text-red-600 text-base `}>Cancelar</Text>
                </TouchableOpacity>
              )}
              {state == 2 && (
                <TouchableOpacity
                  onPress={() => {
                    setState(3);
                    setReplay(true);
                    setCircle(5);
                    stopRecording();
                  }}
                  style={tw`bg-white border border-white justify-center items-center rounded-3xl px-2 py-1`}>
                  <Text style={tw`text-black text-base `}>
                    Detener Grabación
                  </Text>
                </TouchableOpacity>
              )}
              {state == 3 && (
                <ViewX spacing={2} style={tw` `}>
                  <TouchableOpacity
                    onPress={() => {
                      setState(0);
                      setReplay(false);
                      setCircle(5);
                    }}
                    style={tw`bg-black border border-white justify-center items-center rounded-3xl px-2 py-1`}>
                    <Text style={tw`text-white text-base `}>Eliminar</Text>
                  </TouchableOpacity>
                  {
                    <TouchableOpacity
                      onPress={() => {
                        /* setState(0); */ setReplay(false);
                        setCircle(5);
                        onChangeAudio(uri);
                        setCollapse(true);
                      }}
                      style={tw`bg-teal-400 border border-teal-400 justify-center items-center rounded-3xl px-2 py-1`}>
                      <Text style={tw`text-white text-base `}>Guardar</Text>
                    </TouchableOpacity>
                  }
                </ViewX>
              )}
            </ViewY>
          )}
        </ListItem>
        <ViewX spacing={2} style={tw`justify-between`}>
          {!!collapse && (
            <TouchableOpacity
              onPress={() => {
                setCollapse(false);
              }}>
              <Text style={tw`text-teal-400`}>{textRecord}</Text>
            </TouchableOpacity>
          )}
          {!!collapse && !!allowReset && (
            <TouchableOpacity onPress={onPressReset}>
              <Text style={tw`text-teal-400`}>Restablecer</Text>
            </TouchableOpacity>
          )}
        </ViewX>
      </ViewY>
    </View>
  );
};

export default PhraseRecorder;
