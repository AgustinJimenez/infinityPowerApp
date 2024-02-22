import React, { Component } from 'react'
import { View, Image, FlatList, Text, TouchableOpacity, SafeAreaView, ScrollView, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import { globalStyles } from '../../helpers/styles'
import person from '../../img/icon_account.png'
import Loader from 'helpers/loader'
import { Toast } from 'native-base'
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog'
import BottomNavigationBar from '../../components/BottomNavigationBar'
class EvaluationListScreen extends Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  }
  constructor() {
    super()
    this.state = {
      loading: true,
      objectives: [],
      newInviteCode: '',
      showInviteCodeDialog: false,
    }
    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
  }
  componentDidMount() {
    this.loadEvaluated()
  }
  useInviteCode = async () => {
    let newObj = {}
    await AsyncStorage.getItem('userToken').then(async token => {
      await AsyncStorage.getItem('userTokenType').then(async tokenType => {
        await AsyncStorage.getItem('user').then(async imei => {
          imei = JSON.parse(imei)
          newObj['lang'] = global.lang
          newObj['imei'] = imei.imei
          newObj['timezone'] = imei.timezone
          newObj['tokenType'] = tokenType
          newObj['token'] = token
        })
      })
    })
    this.setState({ loading: true })
    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])
    formdata.append('code', this.state.newInviteCode)

    fetch(fn.url + 'actions/use_invite_code', {
      method: 'POST',
      headers: new Headers({
        Authorization: newObj['tokenType'] + ' ' + newObj['token'],
      }),
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        console.log('response', json)
        if (json.evaluator) {
          this.loadEvaluated()
          this.setState({ newInviteCode: '' })
          Toast.show({
            text: 'Objetivo de amigo agregado para evaluar',
            duration: 2000,
            type: 'success',
          })
        } else {
          Toast.show({
            text: 'Código de amigo no encontrado',
            duration: 2000,
            type: 'warning',
          })
        }
      })
  }
  loadEvaluated = async () => {
    let newObj = {}
    await AsyncStorage.getItem('userToken').then(async token => {
      await AsyncStorage.getItem('userTokenType').then(async tokenType => {
        await AsyncStorage.getItem('user').then(async imei => {
          imei = JSON.parse(imei)
          newObj['lang'] = global.lang
          newObj['imei'] = imei.imei
          newObj['timezone'] = imei.timezone
          newObj['tokenType'] = tokenType
          newObj['token'] = token
        })
      })
    })
    this.setState({ loading: true })
    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])

    fetch(fn.url + 'actions/get_evaluated_list', {
      method: 'POST',
      headers: new Headers({
        Authorization: newObj['tokenType'] + ' ' + newObj['token'],
      }),
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)

        this.setState({ loading: false, evaluated: json.result })
      })
  }

  mainRender() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%' }]}>
        <Loader loading={this.state.loading} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          <ScrollView
            style={{
              margin: 0,
            }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={true}
          >
            <View
              style={{
                width: '100%',
                height: width / 5,
                backgroundColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                {global?.language?.who_evaluate}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginHorizontal: 30,
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ showInviteCodeDialog: true })}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Image source={require('img/icon_plus.png')} style={{ height: 28, width: 28, marginRight: 10, padding: 10 }} />
                <Text style={{ fontSize: 16, color: 'white' }}>{global?.language?.add_friend_code}</Text>
              </TouchableOpacity>
            </View>
            <Dialog
              width={0.8}
              visible={this.state.showInviteCodeDialog}
              onTouchOutside={() => {
                this.setState({ showInviteCodeDialog: false })
              }}
              dialogTitle={
                <DialogTitle
                  title='Ingresar código de amigo'
                  hasTitleBar={false}
                  style={{
                    backgroundColor: 'white',
                    color: 'black',
                    justifyContent: 'center',
                  }}
                  textStyle={{
                    color: 'black',
                  }}
                  align='left'
                />
              }
              footer={
                <DialogFooter>
                  <DialogButton
                    text='Cerrar'
                    style={{
                      backgroundColor: 'white',
                    }}
                    textStyle={{
                      color: 'black',
                    }}
                    onPress={() => {
                      this.setState({ showInviteCodeDialog: false })
                    }}
                  />

                  <DialogButton
                    text='Ingresar'
                    style={{
                      backgroundColor: 'white',
                    }}
                    textStyle={{
                      color: 'black',
                    }}
                    onPress={() => {
                      this.setState({ showInviteCodeDialog: false })
                      this.useInviteCode()
                    }}
                  />
                </DialogFooter>
              }
            >
              <DialogContent style={{ color: 'black', backgroundColor: 'white', minHeight: 150, justifyContent: 'center' }}>
                <View>
                  <TextInput
                    returnKeyType='done'
                    textAlign='left'
                    placeholder='Código'
                    placeholderTextColor='gray'
                    onChangeText={text => this.setState({ newInviteCode: text })}
                    style={{ paddingTop: 15, color: 'black' }}
                  />
                </View>
              </DialogContent>
            </Dialog>
            <View
              style={{
                width: '100%',
                backgroundColor: 'black',
                maxHeight: 500,
                marginTop: 10,
                borderRadius: 10,
                marginBottom: 40,
              }}
            >
              <FlatList
                data={this.state.evaluated}
                contentContainerStyle={{ alignItems: 'center' }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('EvaluatingScreen', {
                        muserId: item.id,
                        muserName: item.name,
                      })
                    }
                    style={{
                      width: '89%',
                      height: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 5,
                      borderColor: '#20B2AA85',
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                  >
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <View
                        style={{
                          width: '15%',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <Image
                          source={person}
                          style={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain',
                          }}
                        />
                      </View>
                      <View style={{ width: '85%' }}>
                        <Text
                          style={{
                            color: 'white',
                            fontSize: 16,
                            marginLeft: 5,
                          }}
                          numberOfLines={1}
                        >
                          {` ${item.name}`}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'black',
                        width: '90%',
                        height: 3,
                        marginTop: 5,
                      }}
                    />
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.key}
              />
            </View>
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton nextButton={false} />
        </SafeAreaView>
      </View>
    )
  }
  render() {
    return this.mainRender()
  }
}
export default EvaluationListScreen
