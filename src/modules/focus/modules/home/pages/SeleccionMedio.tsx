import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import ActivityBell from 'src/modules/activity/components/ActivityBell';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import Card from 'src/modules/common/components/Card';
import CardTitle from 'src/modules/common/components/CardTitle';

const RightComponent = ({ }) => {
  const navigation = useNavigation();
  return (
    <ActivityBell></ActivityBell>
  );
};

const LeftComponent = ({ }) => {
  const navigation = useNavigation();
  return (
    <></>
  );
};

const SeleccionMedio = ({ navigation }) => {
  const viewStyleBorder = tw`justify-center pt-3 mx-5`
  viewStyleBorder.borderTopWidth = 0.5
  viewStyleBorder.borderColor = "#ccc"

  const dispatch = useDispatch();

  const Medio = ({ titulo, descripcion, info, porcentaje, id }) => {
    return <ViewY spacing={0} style={{borderRadius:17, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
          <Card style={tw`p-5`}>
              <CardTitle
              title={titulo}
              description={descripcion}
              info={info}
              RightComponent={() => <ViewY>
                  <View style={tw``}>
                  <View
                      style={tw`absolute -right-6 rounded-lg bg-black px-4 py-2 shadow flex justify-center flex-col`}>
                      <Text
                      style={tw`flex text-md text-white text-center font-bold`}>
                      {porcentaje}%
                      </Text>
                      <Text style={tw`flex text-xs text-white text-center`}>
                      Ultimo Test
                      </Text>
                  </View>
                  </View>
              </ViewY>}
              ></CardTitle>
          </Card>
          <TouchableOpacity
          onPress={() => {
              navigation.navigate('ObjetivosMedioEspecifico', {id: id})
          }}
          style={tw`items-center my-3 w-full h-10`}>
              <Text style={{color: "#0DDFCA"}}>
                  Crear Objetivo
              </Text>
          </TouchableOpacity>
      </ViewY>
  }

  return (
    <Screen scrollEnabled={true}>
      <Header
        text={'Consciente'}
        RightComponent={RightComponent}
        LeftComponent={LeftComponent}></Header>
      

      <ViewY spacing={4}>
        <Text style={tw`text-white text-center text-lg`}>Selecciona un Medio de Enfoque </Text>
        <Medio id={1} titulo={"Mejora de Percepción"} descripcion={"No tienes objetivos activos"} info={"\nMejora la manera en que ves y entiendes lo que ocurre a tu alrededor. Potencia tu voz constructiva e identifica la oportunidad aún en la adversidad."} porcentaje={"60"}/>
        <Medio id={2} titulo={"Atención y Concentración"} descripcion={"No tienes objetivos activos"} info={"\nGana claridad y dominio mental. Aprovecha más cada momento. Potencia cada experiencia positiva. Sé más eficiente en todo lo que hagas."} porcentaje={"60"}/>
        <Medio id={3} titulo={"Bloqueo de Pensamientos Negativos"} descripcion={"No tienes objetivos activos"} info={"\nEvita concentrar tu energía en pensamientos negativos. Mantén callada tu voz interna destructiva y cuida tu salud mental y emocional."} porcentaje={"60"}/>
      </ViewY>
    </Screen>
  );
};

export default SeleccionMedio;
