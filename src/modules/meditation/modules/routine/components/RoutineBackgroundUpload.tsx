import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_URL } from 'src/constants';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationRoutineActions } from '../handlers/redux';


const RoutineBackgroundUpload = ({ routine }) => {
  console.log({ routine })
  const image = useSelector(state => state.meditationRoutine.image) || ""
  const dispatch = useDispatch();


  useEffect(() => {
    console.log(routine)
    setImage(routine?.image)
  }, [routine?.image])

  const onUploadPress = async () => {
    dispatch(meditationRoutineActions.imageGallery({}))
  };


  const setImage = (image) => {
    dispatch(meditationRoutineActions.imageSet({ image }))
  }

  const onDeleteImage = () => {
    dispatch(meditationRoutineActions.imageSet({ image: "" }))
  }


  return (

    <ViewY style={tw`justify-center items-center`}>
      <View style={tw`w-80 h-118  relative  overflow-hidden`}>
        <View
          style={tw`absolute left-0 top-0 bottom-0  rounded-xl bg-gray-600 opacity-75 h-full w-full`}></View>
        {!!image && (
          <Image
            source={{ uri: STORAGE_URL + "/" + image }}
            style={tw`absolute left-0 top-0 bottom-0  rounded-xl bg-gray-600 opacity-75 h-full w-full`}
          />
        )}
        <ViewX style={tw`justify-center items-center h-full`}>
          {!image && (
            <TouchableOpacity
              style={tw`flex items-center justify-center w-16 h-16 border-2 border-white rounded-full `}
              onPress={onUploadPress}>

              <Icon name="plus" size={50} color="#fff" />
            </TouchableOpacity>

          )}

        </ViewX>
      </View>
      {(!!image && < ViewX spacing={16} style={tw`top-2`}>
        <TouchableOpacity
          style={tw`flex items-center justify-center `}
          onPress={onUploadPress}>
          <View style={tw`relative`}>
            <MaterialIcon name={'picture-o'} size={36} color="#fff" />
            <View style={tw`absolute flex justify-center items-center -top-2 -right-2 bg-black bg-opacity-25 rounded-full `} >
              <MaterialIcon name="refresh" size={20} color="#fff" style={tw`h-full w-full shadow-md `} /></View>

          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex items-center justify-center `}
          onPress={() => onDeleteImage()}>
          <View style={tw`relative`}>
            <MaterialIcon name={'trash-o'} size={36} color="#fff" />
          </View>
        </TouchableOpacity>

      </ViewX>)
      }
    </ViewY >

  );
};

export default RoutineBackgroundUpload;
