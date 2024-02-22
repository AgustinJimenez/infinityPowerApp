import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import IconChevron from 'react-native-vector-icons/Entypo';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_URL } from 'src/constants';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationPhraseActions } from '../handlers/redux';


const PhrasesBackgroundUpload = ({ user_routine_phrases }) => {
    const [routinePhrases, setRoutinePhrases] = useState([]);

    const images = useSelector(state => state.meditationPhrase.images) || {}

    const [phraseIdx, setPhraseIdx] = useState(null);

    const [phraseSelected, setPhraseSelected] = useState({})

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    // Al mostrar por primera vez el componente
    useEffect(() => {
        setRoutinePhrases([...user_routine_phrases])
        setPhraseIdx(0)

        const images = {}
        for (let index = 0; index < user_routine_phrases.length; index++) {
            const phrase = user_routine_phrases[index];

            images[phrase.id] = phrase.image
        }

        console.log({ images })
        setImages(images)
    }, [])

    // cuando se cambia el phraseIdx
    // al usar las flechas
    useEffect(() => {
        if (routinePhrases.length == 0) return

        setPhraseSelected(routinePhrases[phraseIdx])
        console.log("imagen", phraseIdx, routinePhrases[phraseIdx]?.image)
    }, [phraseIdx])

    const onUploadPress = async () => {
        dispatch(meditationPhraseActions.imageGallery({ routine_phrase: phraseSelected }))
    };


    const setImages = (images) => {
        dispatch(meditationPhraseActions.imagesSet({ images }))
    }

    const onDeleteImage = () => {
        dispatch(meditationPhraseActions.imagesSet({ images: { ...images, [phraseSelected.id]: "" } }))
    }

    const image = images[phraseSelected.id] ? STORAGE_URL + "/" + images[phraseSelected.id] : ""

    console.log({ images, image })
    return (

        <ViewY style={tw`flex-grow`} spacing={4}>
            <ViewX style={tw`items-center px-16 min-h-30`}>
                <Text style={tw`text-white text-center text-xl font-bold flex-wrap flex-1`}>{phraseSelected?.user_phrase?.text_affirmative}</Text>
            </ViewX>
            <ViewX style={tw`flex flex-grow items-center justify-center`} spacing={2}>
                <View style={tw`flex items-center w-14 h-16`}>
                    <TouchableOpacity
                        style={tw`flex h-16`}
                        onPress={() => setPhraseIdx(phraseIdx > 0 ? phraseIdx - 1 : phraseIdx)}
                    >
                        <IconChevron name="chevron-thin-left" size={50} color={phraseIdx > 0 ? "#fff" : "#555"} />
                    </TouchableOpacity>
                </View>
                <View style={tw`flex flex-row relative justify-center items-center flex flex-grow rounded-xl rounded-xl bg-gray-600 opacity-75 overflow-hidden`}>

                    {!!image && (
                        <Image
                            source={{ uri: image }}
                            style={tw`flex-grow h-full `}
                        />
                    )}
                    {!image && (
                        <ViewX style={tw`justify-center items-center `}>
                            {!image && (
                                <TouchableOpacity
                                    style={tw`flex items-center justify-center w-16 h-16 border-2 border-white rounded-full `}
                                    onPress={onUploadPress}>

                                    <Icon name="plus" size={50} color="#fff" />
                                </TouchableOpacity>
                            )}
                        </ViewX>
                    )}
                </View>
                <View style={tw`flex items-center w-14 h-16`}>

                    <TouchableOpacity
                        style={tw`flex h-16`}
                        onPress={() => setPhraseIdx(routinePhrases.length > phraseIdx + 1 ? phraseIdx + 1 : phraseIdx)}
                    >
                        <IconChevron name="chevron-thin-right" size={50} color={routinePhrases.length > phraseIdx + 1 ? "#fff" : "#555"} />
                    </TouchableOpacity>
                </View>

            </ViewX>
            <ViewX style={tw`w-full justify-center items-center flex flex-row `} spacing={2}>
                {routinePhrases.map((phrase, idx) => {
                    if (idx != phraseIdx) {
                        return <View style={tw`bg-gray-400 rounded-full h-2 w-2`}></View>
                    }

                    return <View style={tw`bg-teal-400 rounded-full h-2 w-2`}></View>
                })
                }
            </ViewX>
            <ViewX style={tw` justify-center  items-center h-16`}>
                {!!image && (<ViewX spacing={16} style={tw` justify-center  items-center`}>
                    <TouchableOpacity
                        style={tw`flex items-center justify-center `}
                        onPress={onUploadPress}>
                        <View style={tw`relative`}>
                            <MaterialIcon name={'picture-o'} size={36} color="#fff" />
                            <View style={tw`absolute flex justify-center items-center -top-2 -right-2 bg-black bg-opacity-25 rounded-full `} >
                                <MaterialIcon name="refresh" size={20} color="#fff" style={tw`h-full w-full shadow-md`} />
                            </View>

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={tw`flex items-center justify-center `}
                        onPress={() => onDeleteImage()}>
                        <View style={tw`relative`}>
                            <MaterialIcon name={'trash-o'} size={36} color="#fff" />
                        </View>
                    </TouchableOpacity>

                </ViewX>
                )}
            </ViewX>

        </ViewY >

    );
};

export default PhrasesBackgroundUpload;
