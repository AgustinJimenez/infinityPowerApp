import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
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

const ObjetivosMedioEspecifico = ({ route, navigation }) => {
  const viewStyleBorder = tw`justify-center pt-3 mx-5`
  viewStyleBorder.borderTopWidth = 0.5
  viewStyleBorder.borderColor = "#ccc"

  const Objetivo = ({ id, titulo, info }) => {
    const tituloStyle = tw`flex-1 text-lg text-white font-bold`
    tituloStyle.color = "#0DDFCA"
    
    return <TouchableOpacity style={tw`my-3`} onPress={() => navigation.navigate('DescripcionObjetivo', {id: id})}>
      <ViewY spacing={0} style={{borderRadius:17, backgroundColor:'rgba(0, 0, 0, 0.5)'}}>
            <Card style={tw`p-5`}>
              <ViewX spacing={4}>
                <ViewY spacing={4} style={tw`flex-grow`}>
                  <ViewY spacing={0} style={tw`flex-grow justify-center`}>
                    {titulo && <ViewX>
                      <Text style={tituloStyle}>{titulo}</Text>
                    </ViewX>}
                    {info && <ViewX>
                      <Text style={tw`flex-wrap flex-1 mt-1 text-xs text-white`}>{info}</Text>
                    </ViewX>}
                  </ViewY>
                </ViewY>
              </ViewX >
            </Card>
        </ViewY>
      </TouchableOpacity>
  }  

  const objetivos = {
    1: [
      {titulo: "La Fórmula", id: 1},
      {titulo: "Una persona exitosa ve oportunidades en cada dificultad", id: 2},
      {titulo: "Mejora tu Objetividad", id: 3},
      {titulo: "Historia de Resiliencia", id: 4},
      {titulo: "El optimista ve una oportunidad en cada dificultad", id: 5},
    ],
    2: [
      {titulo: "Los 5 sentidos para calmar la mente, clarificarla y fortalecer su dominio", id: 6},
      {titulo: "Las dos Preguntas", id: 7},
      {titulo: "Esos pequeños grandes momentos", id: 8},
    ],
    3: [
      {titulo: "Identifica y Bloquea al Pensamiento Negativo", id: 9},
      {titulo: "Reconocer e ignorar al saboteador mental", id: 10},
    ]
  }

  const dispatch = useDispatch();

  const idObjetivo = route.params.id;

  return (
    <Screen scrollEnabled={true}>
      <Header
        text={'Mejora de Percepción'}
        RightComponent={RightComponent}
        LeftComponent={LeftComponent}/>
      <ViewY spacing={4}>
        <Text style={tw`text-white text-center text-lg`}>Selecciona uno de los títulos, léelo y conviértelo en Objetivo </Text>
        {objetivos[idObjetivo].map(objective => {
          return <Objetivo id={objective.id} titulo={objective.titulo} info={""}/>
        })}
      </ViewY>
    </Screen>
  );
};

export default ObjetivosMedioEspecifico;
