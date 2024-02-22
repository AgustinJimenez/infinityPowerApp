import { Audio } from 'expo-av';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { default as Icon, default as IconPlay } from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';
import { tw } from 'src/root/tw';

const PlayPhraseAudio = ({ audio }) => {
    const dispatch = useDispatch();
    const [play, setPlay] = useState(false)

    const playback = async () => {
        console.log({ audio })
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
            });

            await audio.playAsync()

        } catch (error) {

        }
    }

    const stopPlayback = async () => {
        try {
            await audio.stopAsync()
        } catch (error) {
            console.log({ error })
        }
    }
    return (

        <View>
            {!play && <TouchableOpacity
                onPress={() => {
                    playback(); setPlay(true)
                }}
                style={tw`w-10 h-10 bg-white rounded-full justify-center items-center`}
            >
                <Icon name="play-arrow" size={30} color="#333" />
            </TouchableOpacity>}
            {!!play && <TouchableOpacity onPress={() => {
                stopPlayback(); setPlay(false)
            }} style={tw`w-10 h-10 bg-white rounded-full justify-center items-center`}>
                <IconPlay name={'stop'} size={30} color="#000000" style={tw``} />
            </TouchableOpacity>}

        </View>
    )
}

export default PlayPhraseAudio
