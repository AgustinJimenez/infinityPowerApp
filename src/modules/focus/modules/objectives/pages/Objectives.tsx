import React, { useState } from 'react';
import { Image, ImageBackground, KeyboardAvoidingView, Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux';
import Header from 'src/modules/common/components/Header';
import Screen from 'src/modules/common/components/Screen';
import { ViewX, ViewY } from 'src/modules/common/components/utils/ViewUtils';
import { tw } from 'src/root/tw';
import interrogaImage from 'src/assets/images/interroga.png';
import checkHabitoImage from 'src/assets/images/habits_3.png';
import backgroundImage from 'src/assets/images/new-home.png';
import CardStatic from '../components/CardStatic';
import CardWithDate from '../components/CardWithDate';
import DayTouched from '../components/DayTouched';
import { EmptyComponent } from '../components/EmptyComponent';
import HeaderRight from '../components/HeaderRight';
import ObjectEditable from '../components/ObjectEditable';
import { styles } from '../components/styles';
import { focusObjectiveActions, focusObjectiveSelector } from '../handlers/redux';
import { diffDays } from 'src/modules/constants/date';
import { Icon } from 'react-native-elements';
import Card from 'src/modules/common/components/Card';

export interface HandleStringProps {
  [key: string]: string;
}

export interface HandleDaysProps {
  [key: string]: boolean;
}

export interface HandleChangeDateProps {
  date: string;
  dateFormatter: string;
}

const ObjectiveFocus = ({ route, navigation }) => {

  const objetivos = {
    1: {
        titulo: "Mejoro mi perspectiva teniendo siempre presente la fórmula “Resultado = Evento + Respuesta”",
        gatillo: "Al enfrentar un obstáculo, una situación indiferente o una circunstancia favorable.",
        descripcion: "Intento percibir la situación, entendiendo que el evento instalado ya sucedió, ya es un hecho, pero la respuesta es la oportunidad de centrarme en la manera de afrontar, aprovechar o potenciar ese evento.",
        id: 1,
    },
    2: {
        titulo: "Enfocarme en la oportunidad de cada obstáculo",
        gatillo: "Situaciones que me generen miedo o angustia y representan para mí un obstáculo o una adversidad.",
        descripcion:"Ante cada situación que represente para mí un obstáculo, buscar siempre identificar la mejor oportunidad y enfocarme completamente en ella, ya sea en su búsqueda o en su concreción.",
        id: 2,
    },
    3: {
        titulo: "Mejoro mi perspectiva percibiendo el obstáculo como si le estuviera ocurriendo a una persona cercana",
        id: 3,
        gatillo: "Al enfrentar un obstáculo o un evento desafiante",
        descripcion:"Intento percibir el evento o el obstáculo como si le estuviera ocurriendo a una persona cercana ¿qué le diría?, ¿qué le aconsejaría?, ¿cómo analizaría la situación?",
    },
    4: {
        titulo: "Mejoro mi perspectiva como lo haría (nombre de la persona a quien admiro)",
        id: 4,
        gatillo: "Al enfrentar un obstáculo o un evento desafiante",
        descripcion:"Tengo presente en todo momento la respuesta de la persona que para mí representa el ideal en este ámbito, preguntándome, ¿Cómo respondería (nombre) en esta situación?, ¿Qué haría o que diría? de forma a lograr la respuesta que me haga sentir orgullo y me permita superar la adversidad.",
    },
    5: {
        titulo: "Ante cada situación que represente para mí un obstáculo buscar siempre identificar cual es la oportunidad",
        id: 5,
        gatillo: "Situaciones que me generen miedo o angustia y representan para mí un obstáculo o una adversidad",
        descripcion:"Ante cada situación que represente para mí un obstáculo o una dificultad y por ende me genere miedo o angustia, identificar la oportunidad que el obstáculo encierra de modo que, al superarlo, salga aún con más fortaleza que antes de enfrentar la adversidad; una solución que me merezca la admiración y el reconocimiento de todos. Al enfocarme en eso, traeré esa oportunidad aprovechada y la viviré en el presente como si fuera realidad una y otra vez. Esa será mi fuente de energía y motivación",
    },
    6: {
        titulo: "Respirar conscientemente",
        id: 6,
        gatillo: " Indica los momentos del día para realizar el ejercicio",
        descripcion:"Fijar un tiempo, puede ser de un minuto o más, una o varias veces al día. Respirar profundamente centrando toda la atención en mi respiración, por el tiempo que me haya fijado",
    },
    7: {
        titulo: "Utilizo las dos preguntas para evaluar permanentemente y reorientar si fuera necesario, mi Atención y Concentración en la actividad que estoy desarrollando",
        id: 7,
        gatillo: "-",
        descripcion:"Recibo de forma aleatoria las dos preguntas de modo a evaluar si lo que estoy haciendo se corresponde con lo que estoy pensando para rectificar mis pensamientos alineándolos a mi actividad, en caso de ser necesario",
    },
    8: {
        titulo: "Utilizo mi Atención y Concentración para potenciar cada pequeño gran momento",
        id: 8,
        gatillo: "Cualquier buena experiencia por pequeña que sea",
        descripcion:"Me regalo permanentemente instantes de celebración potenciando la emoción que mis experiencias me generan y haciendo que esa emoción se hunda en mi interior",
    },
    9: {
        titulo: "Identifico y Bloqueo mis Pensamientos Negativos con Afirmaciones",
        id: 9,
        gatillo: "Al darme cuenta que mi mente está siendo abordada por pensamientos negativos",
        descripcion:"Identifico el pensamiento negativo para crear una afirmación o visualización totalmente opuesta, la cual repito por unos minutos hasta cerciorarme que el pensamiento negativo se ha bloqueado y ha desaparecido, evitando así que afecte mi salud mental y emocional",
    },
    10: {
        titulo: "Identifico e ignoro a mi saboteador interno, tomo el control de mi mente y la enfoco solo en aquello que deseo",
        id: 10,
        gatillo: "Al darme cuenta que mi mente está siendo abordada por pensamientos negativos",
        descripcion:"Soy consciente de la existencia de mi saboteador interno y de sus intenciones. Lo personifico, identifico e ignoro, impidiéndole ganar el control de mi mente y evitando que me afecte mental y emocionalmente. Yo tengo el control de mi mente; no el saboteador",
    },
  }

  const idObjetivo = route.params.id;

  const dispatch = useAppDispatch();
  const [canSave, setCanSave] = useState(false);
  const [checkFecha, setCheckFecha] = useState(false);
  const [checkRecordatorio, setCheckRecordatorio] = useState(false);
  const [diasDiferencia, setDiasDiferencia] = useState(0);
  const [modalRecordatorio, setModalRecordatorio] = useState(false);
  const { objective, dateToDeadLine } = useAppSelector(focusObjectiveSelector);

  const checkGuardar = () => {
    setCanSave(true)
  }

  const handleString = (inputValue: HandleStringProps) => {
    dispatch(focusObjectiveActions.objectiveChangeData(inputValue));
  };

  const handleDays = (inputValue: HandleDaysProps) => {
    dispatch(focusObjectiveActions.objectiveChangeDay(inputValue));
  };

  const handleAllDays = () => {
    dispatch(focusObjectiveActions.objectiveAvailableAllDays());
  };

  const onConfirm = date => {
    const hours = date.getHours();
    const hour = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');

    let hourFormatted = hour;

    if (hours >= 12) {
      hourFormatted = `${hour}`;
    } else {
      hourFormatted = `${hour}`;
    }

    handleString({ hour: hourFormatted });
    setCheckRecordatorio(true)
    checkGuardar()
  };

  const handleChangeDate = (dateValues: HandleChangeDateProps) => {
    dispatch(focusObjectiveActions.objectiveChangeDateDeadLine(dateValues.date));
    handleString({ deadline: dateValues.dateFormatter });
    const dateArray = dateValues.dateFormatter.split("-")
    const dateString = dateArray[0] + "-" + dateArray[2] + "-" + dateArray[1]
    setDiasDiferencia(diffDays(new Date(dateString), new Date().setHours(0, 0, 0)))
    setCheckFecha(true)
    checkGuardar()
  };

  const estiloRecordatorio = tw`text-sm text-white font-bold`
  if (!checkRecordatorio) {
    estiloRecordatorio.color = "#0DDFCA"
  } else {
    estiloRecordatorio.color = "white"
  }

  const estiloRecordatorioModal = tw`text-lg text-white font-bold`
  estiloRecordatorioModal.color = "#0DDFCA"

  return (
    <Screen scrollEnabled={true}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Header RightComponent={canSave && HeaderRight} LeftComponent={EmptyComponent} />
        <ViewY style={tw`py-5 mt-5`} spacing={1}>
          <View style={tw`flex-row justify-center items-center`}>
            <Text style={tw`font-bold text-white text-center text-xl`}>{objetivos[idObjetivo].titulo}</Text>
          </View>

          <Card style={[styles.backgroundBlackOpacity, {}]}>
            <ViewY>
              <Text style={tw`text-white text-xs`}>{"Descripción del Objetivo"}</Text>
              <Text
                style={[tw`rounded-xl text-base text-white py-2`, styles.maxWidthBox]}
              >
                {objetivos[idObjetivo].descripcion}
              </Text>
            </ViewY>
          </Card>

          <Card style={[styles.backgroundBlackOpacity, {}]}>
            <ViewY>
              <Text style={tw`text-white text-xs`}>{"Disparador del Hábito a reemplazar"}</Text>
              <Text
                style={[tw`rounded-xl text-base text-white py-2`, styles.maxWidthBox]}
              >
                {objetivos[idObjetivo].gatillo}
              </Text>
            </ViewY>
          </Card>
               
          <View style={tw`flex-row justify-center items-center mt-5 ml-5`}>
            {checkFecha && <Image style={tw`w-10 h-10 mr-2`} source={checkHabitoImage}/>}
            {!checkFecha && <View style={tw`w-10 mr-2`}/>}
            <CardWithDate
              title="Fecha Límite"
              description={!checkFecha ? "Campo obligatorio" : ""}
              mainDate={checkFecha ? dateToDeadLine : ""}
              infoDate={checkFecha ? "Queda " + diasDiferencia + " días" : ""}
              handleChangeDate={handleChangeDate}
            />
          </View>

          <View style={tw`border-white border-t border-b flex-row pb-2 justify-center items-center mt-3 ml-5`}>
            {checkRecordatorio && <Image style={tw`w-10 h-10 mr-2`} source={checkHabitoImage}/>}
            {!checkRecordatorio && <View style={tw`w-10 mr-2`}/>}
            <ViewX spacing={2}>
              <ViewY spacing={2} style={tw`flex-grow`}>
                <ViewY spacing={0} style={tw`flex-grow justify-center`}>
                  <ViewX spacing={0}>
                    <Text style={tw`flex-wrap mt-2 font-medium flex-1 text-sm text-white`}>
                      Días de evaluación y Recordatorio sobre los días de auto evaluación
                    </Text>
                  </ViewX>
                  <ViewX spacing={0}>
                    <Text style={!checkRecordatorio ? tw`flex-wrap mb-2 flex-1 text-xs text-white` : tw`text-xl text-white font-bold`}>
                      {!checkRecordatorio ? "Campo obligatorio" : objective.hour}
                    </Text>
                  </ViewX>
                  <ViewX>
                    <TouchableOpacity style={tw`flex-wrap flex-1`} onPress={() => setModalRecordatorio(!modalRecordatorio)}>
                      {!checkRecordatorio && <Text style={estiloRecordatorio}>{"Definir días de evaluación y recordatorios"}</Text>}
                      <ViewX>
                        {objective && objective.monday && <Text
                          style={styles.textoDiaLetra}>
                            Lu.
                        </Text>}
                        {objective && objective.tuesday && <Text
                          style={styles.textoDiaLetra}>
                            {" Ma."}
                        </Text>}
                        {objective && objective.wednesday && <Text
                          style={styles.textoDiaLetra}>
                            {" Mi."}
                        </Text>}
                        {objective && objective.thursday && <Text
                          style={styles.textoDiaLetra}>
                            {" Ju."}
                        </Text>}
                        {objective && objective.friday && <Text
                          style={styles.textoDiaLetra}>
                            {" Vi."}
                        </Text>}
                        {objective && objective.saturday && <Text
                          style={styles.textoDiaLetra}>
                            {" Sa."}
                        </Text>}
                        {objective && objective.sunday && <Text
                          style={styles.textoDiaLetra}>
                            {" Do."}
                        </Text>}
                      </ViewX>
                    </TouchableOpacity>
                  </ViewX>
                </ViewY>
              </ViewY>
            </ViewX>
          </View>
          
          <Modal
            transparent={false}
            visible={modalRecordatorio}
            onRequestClose={() => {
              setModalRecordatorio(!modalRecordatorio);
            }}  
          >
            <View style={styles.container}>
              <ImageBackground source={backgroundImage} resizeMode="cover" style={styles.image}>
                <View style={styles.header}>
                  <TouchableOpacity onPress={() => {
                    setModalRecordatorio(!modalRecordatorio)
                    
                  }}>
                    <Text style={estiloRecordatorioModal}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {
                    setCheckRecordatorio(true)
                    checkGuardar()
                    setModalRecordatorio(!modalRecordatorio)
                  }}>
                    <Text style={estiloRecordatorioModal}>Guardar</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.tituloView}>
                  <Text style={styles.tituloRecordatorios}>Recordatorios</Text>
                </View>
                <View style={styles.tituloView}>
                  <Text style={styles.subTituloRecordatorios}>{objetivos[idObjetivo].titulo}</Text>
                    <CardStatic title="" mainDate={objective && (objective.hour ? objective.hour.replace(" am", "").replace(" pm", "") : "08:00")} onConfirm={onConfirm} isWithTimePicker={true} />
                </View>
                <ViewX style={styles.dias}>
                  <DayTouched dayName="monday" label="L" dayValue={objective && objective.monday} handleDays={handleDays} />
                  <DayTouched dayName="tuesday" label="M" dayValue={objective && objective.tuesday} handleDays={handleDays} />
                  <DayTouched dayName="wednesday" label="M" dayValue={objective && objective.wednesday} handleDays={handleDays} />
                  <DayTouched dayName="thursday" label="J" dayValue={objective && objective.thursday} handleDays={handleDays} />
                  <DayTouched dayName="friday" label="V" dayValue={objective && objective.friday} handleDays={handleDays} />
                  <DayTouched dayName="saturday" label="S" dayValue={objective && objective.saturday} handleDays={handleDays} />
                  <DayTouched dayName="sunday" label="D" dayValue={objective && objective.sunday} handleDays={handleDays} />
                </ViewX>

                <View style={tw`items-center mt-4`}>
                  <TouchableOpacity style={tw`mx-1`} onPress={handleAllDays}>
                    <ViewX spacing={0} style={tw`py-2 px-4 border border-white rounded-lg`}>
                      <Text style={tw`text-base text-white`}>Todos los días</Text>
                    </ViewX>
                  </TouchableOpacity>
                </View>
              </ImageBackground>
            </View>
          </Modal>

          <View style={tw`flex-row pb-2 justify-center items-center ml-5`}>
            <View style={tw`w-10 mr-2`}/>
            <ViewX spacing={2}>
              <ViewY spacing={2} style={tw`flex-grow`}>
                <ViewY spacing={0} style={tw`flex-grow justify-center`}>
                  <ViewX spacing={0}>
                    <Text style={tw`flex-wrap mt-2 font-medium flex-1 text-sm text-white`}>
                      Evaluadores
                      <View style={tw`w-5 h-5 bg-gray-400 ml-3 rounded-full justify-center items-center`}>
                        <Image source={interrogaImage}/>
                      </View>
                    </Text>
                  </ViewX>
                  <View style={styles.avatar}>
                    <Text style={tw` text-white`}>
                      CG
                    </Text>
                  </View>
                  <ViewX spacing={0}>
                    <Text style={tw`flex-wrap mb-2 flex-1 text-xs text-white`}>
                      {"Puedes incluir más evaluadores a tu objetivo.\nSelecciónalos de tu lista de contactos"}
                    </Text>
                  </ViewX>
                  <ViewX>
                    <Text style={estiloRecordatorio}>{"Definir evaluadores"}</Text>
                  </ViewX>
                </ViewY>
              </ViewY>
            </ViewX>
          </View>

        </ViewY>
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default ObjectiveFocus;
