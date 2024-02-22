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
import { habitObjectiveActions, habitObjectiveSelector } from '../handlers/redux';
import { diffDays } from 'src/modules/constants/date';
import { Card, Icon } from 'react-native-elements';

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

const ObjectiveHabit: React.FC = () => {
  const dispatch = useAppDispatch();
  const [canSave, setCanSave] = useState(false);
  const [checkTitulo, setCheckTitulo] = useState(false);
  const [checkFecha, setCheckFecha] = useState(false);
  const [checkRecordatorio, setCheckRecordatorio] = useState(false);
  const [diasDiferencia, setDiasDiferencia] = useState(0);
  const [modalRecordatorio, setModalRecordatorio] = useState(false);
  const { objective, dateToDeadLine } = useAppSelector(habitObjectiveSelector);

  const checkGuardar = () => {
    if (checkFecha && checkTitulo && checkRecordatorio) {
      setCanSave(true)
    } else {
      setCanSave(false)
    }
  }

  const handleString = (inputValue: HandleStringProps) => {
    dispatch(habitObjectiveActions.objectiveChangeData(inputValue));
    if(inputValue["name"]) {
      setCheckTitulo(true)
      checkGuardar()
    } else if (inputValue["name"] === "") {
      setCheckTitulo(false)
    }
  };

  const handleDays = (inputValue: HandleDaysProps) => {
    dispatch(habitObjectiveActions.objectiveChangeDay(inputValue));
  };

  const handleAllDays = () => {
    dispatch(habitObjectiveActions.objectiveAvailableAllDays());
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
    dispatch(habitObjectiveActions.objectiveChangeDateDeadLine(dateValues.date));
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
            {checkTitulo && <Image style={tw`w-10 h-10 mr-3`} source={checkHabitoImage}/>}
            {!checkTitulo && <View style={tw`w-10`}/>}
            <ObjectEditable
              title="Titulo de objetivo"
              name="name"
              onBlur={handleString}
              styleCard={styles.cardContent}
              isCentered={true}
              placeholder="Campo obligatorio."
            />
            <View style={tw`w-5 h-5 bg-gray-400 ml-3 rounded-full justify-center items-center`}>
						  <Image source={interrogaImage}/>
					  </View>
          </View>

          <ObjectEditable
            title="Descripción del objetivo"
            name="description"
            onBlur={handleString}
            styleCard={styles.marginCard}
            placeholder={"Campo opcional. \n\nPuedes usarlo para describir el objetivo con más detalle o sus beneficios o qué o quién te inspiró a definirlo."}
          />

          <ObjectEditable
            title="Disparador del Hábito a ser reemplazado"
            name="trigger"
            onBlur={handleString}
            styleCard={styles.marginCard}
            placeholder={"Campo opcional.\n\nLos hábitos que desea reemplazar tienen un disparador que lo activa. Identificarlo aumenta sus posibilidades de eliminarlo."}
          />
               
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
                  <Text style={styles.subTituloRecordatorios}>Seleccione hora y días de recordatorio</Text>
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

export default ObjectiveHabit;
