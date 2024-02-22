import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import UserIcon from 'react-native-vector-icons/SimpleLineIcons';
import { useDispatch } from 'react-redux';
import image from 'src/assets/images/infinite_icono.png';
import ListItem from 'src/modules/common/components/ListItem';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import { meditationPhraseActions } from '../handlers/redux';
import basureroImage from 'src/assets/images/basurero_icono.png';

const Icon = ({ is_edited }) => (
	<View style={tw`w-12 min-h-11 rounded-full `}>
		{!is_edited && <Image source={image} style={tw`absolute w-full h-full  `} resizeMode={'contain'} />}
		{!!is_edited && (
			<View
				style={tw`border-2 w-10 h-10 border-white rounded-full relative justify-end items-center overflow-hidden`}
			>
				<View style={tw`w-full absolute -bottom-1 flex flex-row justify-center`}>
					<UserIcon name={'user'} size={30} color="#fff" />
				</View>
			</View>
		)}
	</View>
);

const PhraseListItem = ({ data = {}, isEditing = false, phrase = {} }) => {
	console.log(data);
	const { id = '' } = data;
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const { is_edited = false } = data;

	const handleDeletePhrase = () => {
    	dispatch(meditationPhraseActions.phraseDelete({data, phrase}));
	};

	return (
		<ListItem
			style={tw`border-t`}
			RightComponent={() =>
				isEditing ? (
					<TouchableOpacity onPress={handleDeletePhrase}>
						<Image style={tw`h-10 w-10`} source={basureroImage} />
					</TouchableOpacity>
				) : null}
			LeftComponent={() => <Icon is_edited={is_edited > 0} />}
		>
			<ViewY style={tw`flex-grow min-h-10`}>
				<TouchableOpacity
					onPress={() => {
						dispatch(meditationPhraseActions.phraseSet({ phrase: data }));

						navigation.navigate('MeditationPhraseCustom');
					}}
				>
					<ViewX style={tw`items-center flex-grow min-h-10`}>
						<Text style={tw`text-white flex-wrap text-base flex-1 flex`}>{data.text_affirmative}</Text>
					</ViewX>
				</TouchableOpacity>
			</ViewY>
		</ListItem>
	);
};

export default PhraseListItem;
