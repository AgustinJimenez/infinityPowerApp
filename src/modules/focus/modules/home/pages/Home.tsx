import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import ActivityBell from 'src/modules/activity/components/ActivityBell';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import FocusProgress from '../components/FocusProgress';
import interrogaImage from 'src/assets/images/interroga.png';

const RightComponent = ({ }) => {
  const navigation = useNavigation();
  return (
    <ActivityBell></ActivityBell>
  );
};

const LeftComponent = ({ }) => {
  return (
    <></>
  );
};

const Test = ({ texto, porcentaje }) => {
  return <TouchableOpacity> 
    <ViewY spacing={0} style={{borderRadius:17, backgroundColor:'rgba(0, 0, 0, 0.5)', height: 90}}>
    <ViewX style={tw`justify-between pt-10 pl-10`}>
      <Text style={tw`text-white font-bold w-50`}>
          {texto}
      </Text>
      <View
        style={tw`absolute -top-5 -right-2 rounded-lg bg-black px-4 py-2`}>
        <Text
          style={tw`flex text-md text-white text-center font-bold`}>
          {porcentaje}%
        </Text>
        <Text style={tw`flex text-xs text-white text-center`}>
          Ultimo Test
        </Text>
      </View>
    </ViewX>
    </ViewY>
  </TouchableOpacity>
}


const HomeFocus = ({ navigation }) => {
  const viewStyleBorder = tw`justify-center pt-3 mx-5`
  viewStyleBorder.borderTopWidth = 0.5
  viewStyleBorder.borderColor = "#ccc"

  const dispatch = useDispatch();

  const onMeditationPress = () => { };

  return (
    <Screen scrollEnabled={true}>
      <Header
        text={'Consciente'}
        RightComponent={RightComponent}
        LeftComponent={LeftComponent}></Header>
      <TouchableOpacity onPress={onMeditationPress}>
        <FocusProgress />
      </TouchableOpacity>

      <ViewY spacing={4}>
        <ViewX style={tw`justify-center mt-3`}>
          <TouchableOpacity style={tw`border rounded-md px-5 py-3 border-white`} onPress={() => navigation.navigate("SeleccionMedio")}>
            <Text style={tw`text-white font-bold`}>
              Crear Nuevo Objetivo
            </Text>
          </TouchableOpacity>
        </ViewX>
        <ViewX style={tw`justify-center m-5`}>
          <Text style={tw`text-white font-light`}>No tienes ningún Objetivo de Enfoque Conciente activo</Text>
        </ViewX>
        <ViewX style={viewStyleBorder}>
          <Text style={tw`text-white font-bold`}>Medios para lograr el Enfoque Consciente</Text>
          <View style={tw`w-5 h-5 bg-gray-400 rounded-full ml-1 justify-center items-center`}>
            <Image source={interrogaImage}/>
          </View>
        </ViewX>
        <Test texto={"Mejora de Percepción"} porcentaje={"60"}/>
        <Test texto={"Atención y Concentración"} porcentaje={"60"}/>
        <Test texto={"Bloqueo de Pensamientos Negativos"} porcentaje={"60"}/>
        {/* <ViewX style={tw`justify-between items-end`}>
          <Text style={tw`text-white text-base`}>Mis Rutinas</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('MeditationPhraseMusic')}>
            <Icon name="music" size={30} color="#fff" />
          </TouchableOpacity>
        </ViewX>

        <RoutineList></RoutineList> */}
      </ViewY>
    </Screen>
  );
};

export default HomeFocus;
