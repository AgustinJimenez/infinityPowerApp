import React from 'react'
import { Text, View, TouchableOpacity, Image, ScrollView, Switch, TextInput } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView, NavigationEvents } from 'react-navigation'
import * as fn from 'helpers/scripts'
import Loader from 'helpers/loader'
import { globalStyles } from '../../helpers/styles'
/* import ImagePicker from 'react-native-image-picker'; */
import ImagePicker from 'react-native-image-crop-picker'
import RNFetchBlob from 'rn-fetch-blob'
import NetInfo from '@react-native-community/netinfo'
import ModalSelector from 'react-native-modal-selector'
import Dialog, { DialogTitle, DialogContent, DialogFooter, DialogButton } from 'react-native-popup-dialog'
import Language from 'helpers/languages'
import { connect } from 'react-redux'
import { setDatasetToReducer } from '../../redux/actions'
import { clearDatasetsSagaAction } from '../../sagas/actions'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'
import ImageAuthLogo from '../../img/auth_logo.png'
class ProfileScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      desde: '',
      data: null,
      randomMotivation: '',
      currentBelt: null,
      checked: false,
      isConnected: true,
      isProfileImage: false,
      avatarSource: null,
      user_id: null,
      lang: '',
      label1: global?.language?.label_regisered_since,
      visibleNameDialog: false,
      user: null,
      profileImage: null,
    }
  }
  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    this.init()
  }
  init = async () => {
    this.userdata = this.props.user
    this.image = this.props.user.image

    this.setState({
      applang: this.props.user.default_language,
      image: this.props.user.image,
      user_id: this.props.user.id,
      user: this.props.user,
    })

    let auxlang = `get_screens_translations_${this.props.user.default_language}`

    let res = await AsyncStorage.getItem(auxlang)
    res = JSON.parse(res)
    res = res.result
    this.setState({
      label1: global?.language?.label_regisered_since,
      label2: res.userProfileScreen.my_wish_list.label,
      label3: res.userProfileScreen.my_achievements.label,
      label4: res.userProfileScreen.my_custom_phrases.label,
      label5: res.userProfileScreen.my_routine.label,
    })

    let isConnected = await NetInfo.isConnected.fetch()

    this.setState({
      checked: true,
      isConnected,
    })

    await this.setState({
      loading: false,
    })

    await this.setState({
      lang: this.props.app_configuration.language,
      switch: this.props.app_configuration.push_notifications,
    })

    this.recargarDatos()
  }

  elegirImagen = async () => {
    let image = await ImagePicker.openPicker({
      cropping: true,
      includeBase64: true,
    })

    await this.setState({ image: image.path })
    let user = this.props.user
    user.image = image.path
    await AsyncStorage.setItem('user', JSON.stringify(user))
    this.props.setUserData(user)
    try {
      await this.uploadImage(image.data)
    } catch (e) {
    } finally {
      this.setState({
        loading: false,
      })
    }
  }
  uploadImage = async source => {
    var pic = source
    //uploading Profile Photo
    //fetch(fn.url + 'mobile/users/upload_profile_photo',{
    //console.log('________photouploading started_________');
    this.setState({ loading: true })
    let token = await AsyncStorage.getItem('userToken')
    let tokenType = await AsyncStorage.getItem('userTokenType')
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)

    let resp = await RNFetchBlob.fetch(
      'POST',
      fn.url + 'mobile/users/upload_profile_photo',
      {
        Authorization: tokenType + ' ' + token,
        'Content-Type': 'multipart/form-data',
        otherHeader: 'foo',
      },
      [
        {
          name: 'photo',
          filename: 'photo.png',
          type: 'image/png',
          data: pic,
        },
        { name: 'tag', data: 'photo.png' },
      ],
    ).uploadProgress({ interval: 250 }, (written, total) => {
      //console.log('written : ' + written + ' total : ' + total);
    })
    let json = await resp.json()
    if (json.status == 1) {
      //do the necessary action
      user.image = json.message
      AsyncStorage.setItem('user', JSON.stringify(user))
      this.props.setUserData(user)
    }
  }
  recharge = async () => {
    this.setState({
      applang: this.props.user.default_language,
    })
    let auxlang = `get_screens_translations_${this.props.user.default_language}`
    let lang = await AsyncStorage.getItem(auxlang)
    lang = JSON.parse(lang)
    lang = lang.result
    this.setState({
      label1: global?.language?.label_regisered_since,
      label2: lang.userProfileScreen.my_wish_list.label,
      label3: lang.userProfileScreen.my_achievements.label,
      label4: lang.userProfileScreen.my_custom_phrases.label,
      label5: lang.userProfileScreen.my_routine.label,
    })

    let profile_data_response = await AsyncStorage.getItem('get_profile_data')
    profile_data_response = JSON.parse(profile_data_response)
    this.setState({
      loading: false,
      desde: profile_data_response.result.user.registered_since,
    })
    if (profile_data_response.status == 1) {
      this.setState({
        data: profile_data_response.result,
      })
      if (profile_data_response.result.randomMotivation != null) {
        this.setState({
          randomMotivation: '" ' + profile_data_response.result.randomMotivation.content + ' "',
        })
      }
    }

    let currentBelt = await AsyncStorage.getItem('currentBelt')
    this.setState({
      currentBelt,
    })
  }
  recargarDatos = async () => {
    this.setState({
      applang: this.props.user.default_language,
    })

    let auxlang = `get_screens_translations_${this.props.user.default_language}`

    let value = await AsyncStorage.getItem(auxlang)
    value = JSON.parse(value)
    value = value.result
    this.setState({
      label1: global?.language?.label_regisered_since,
      label2: value.userProfileScreen.my_wish_list.label,
      label3: value.userProfileScreen.my_achievements.label,
      label4: value.userProfileScreen.my_custom_phrases.label,
      label5: value.userProfileScreen.my_routine.label,
    })

    if (!this.state.isConnected) return
    let { response, error } = await request({
      url: 'mobile/users/get_profile_data',
      method: 'POST',
      data: {
        lang: this.props.user.default_language,
        imei: this.props.imei,
        timezone: this.props.timezone,
      },
    })

    this.setState({
      loading: false,
    })
    if (!error) {
      AsyncStorage.setItem('get_profile_data', JSON.stringify(response.data))
      this.recharge()
    }
  }
  renderCircle = () => {
    if (this.state.currentBelt != null) {
    } else {
      return null
    }
  }
  validate = async (lang, push) => {
    await this.setState({ loading: true })
    let { error } = await request({
      url: 'mobile/save_app_configuration',
      method: 'POST',
      data: {
        lang: this.props.user.default_language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        push_notifications: push,
        language: lang,
      },
      //debug: true,
    })
    await this.setState({
      loading: false,
    })
    if (error) return

    this.props.user.push_notifications = push
    this.props.user.default_language = lang
    AsyncStorage.setItem('user', JSON.stringify(user))
    this.props.setUserData(user)
    AsyncStorage.setItem('reprocess', 'true')
    this.setState({
      lang: global.lange,
      switch: push,
      applang: global.lange,
    })
    auxlang = `get_screens_translations_${user.default_language}`
    let closesession = 'Cerrar sesión'
    if (user.default_language == 'en') closesession = 'Close session'

    if (user.default_language == 'pt') closesession = 'Fechar sessão'

    this.reloadLanguage(lang)
    let auxlang = await AsyncStorage.getItem(auxlang)
    auxlang = JSON.parse(auxlang)
    auxlang = auxlang.result

    this.setState({
      label1: auxlang.userProfileScreen.registered_since.label,
      label2: auxlang.appConfigurationScreen.language.label,
      label3: auxlang.appConfigurationScreen.notifications.label,
      label4: auxlang.appConfigurationScreen.help_support.label,
      label5: closesession,
    })
  }

  reloadLanguage = async lang => {
    global.lange = lang
    global.lang = lang
    Language.loadLanguage() //loading app language
    global.language = global.appLanguages[global.lang]
    await this.setState({ loading: true, lang: lange })
    AsyncStorage.setItem('reprocess', 'true')
    let values = await Promise.all([this.categories(), this.get_routine_list()])
    //console.log('SettingsPage all settled.' + values)
    this.setState({ loading: false })

    //saving language settings
    AsyncStorage.setItem('app_lang', global.lange)
  }
  categories = () => {
    let instance = this
    return new Promise((resolve, reject) => {
      fetch(fn.url + 'categories', {
        method: 'POST',
        headers: new Headers({
          Authorization: instance.state.tokenType + ' ' + instance.state.token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: 'lang=' + global.lange + '&imei=' + instance.state.user.imei + '&timezone=' + instance.state.user.timezone,
      })
        .then(response => response.json())
        .then(json => {
          if (json.status == 1) {
            let categories = json.result
            let obj = {}
            categories.map(item => {
              obj[item.id] = item
            })
            this.props.setCategoriesAction(obj)
            this.props.setCategoriesCompleteAction(json)
            AsyncStorage.setItem('categories_complete', JSON.stringify(json))
            AsyncStorage.setItem('categories', JSON.stringify(categories))
          }
          resolve(json)
        })
        .catch(e => {
          reject(e)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  get_routine_list = () => {
    let instance = this
    return new Promise((resolve, reject) => {
      fetch(fn.url + 'mobile/users/routine_list', {
        method: 'POST',
        headers: new Headers({
          Authorization: instance.state.tokenType + ' ' + instance.state.token,
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: 'lang=' + global.lange + '&imei=' + instance.state.user.imei + '&timezone=' + instance.state.user.timezone,
      })
        .then(response => response.json())
        .then(json => {
          if (json.status == 1) {
            var data = json.data
            AsyncStorage.setItem('routine_list', JSON.stringify(data))
            //console.log('Main Page fetch routine list ...');
          }
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  logoutProcess = async () => {
    await this.setState({
      loading: true,
    })
    await request({
      url: 'auth/logout',
      method: 'POST',
      data: {
        imei: this.props.imei,
        timezone: this.props.timezone,
        lang: this.props.app_configuration.language,
      },
      //body: 'name=' + imei.name + '&lang=es&imei=' + imei.imei + '&timezone=GTM-4',
    })
    AsyncStorage.clear()
    this.props.clearDatasets()
    this.props.navigation.navigate('WalkthroughScreen')
    this.setState({
      loading: false,
    })
  }
  logout = () => {
    if (this.state.isConnected) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.logoutProcess()
          }}
        >
          <View style={globalStyles.arrowButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 10,
              }}
            >
              <Text style={{ color: '#fff' }}>{global?.language?.label_clear_session}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Image source={require('img/icon_rightarrow.png')} style={globalStyles.arrowImageStyle} />
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState({
              loading: false,
            })
            AsyncStorage.clear()
            this.props.navigation.navigate('WalkthroughScreen')
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginTop: 10,
              height: 55,
              borderRadius: 3,
              borderColor: 'white',
              borderWidth: 2,
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Text style={{ color: '#fff' }}>{global?.language?.label_clear_session}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Image source={require('img/icon_rightarrow.png')} style={globalStyles.arrowImageStyle} />
            </View>
          </View>
        </TouchableOpacity>
      )
    }
  }

  nameDialogHandler = () => {
    this.setState({ visibleNameDialog: true })
  }

  saveNameHandler = async () => {
    if (!this.state.isConnected) return

    await this.setState({ loading: true })
    let { error } = await request({
      url: 'mobile/users/change_name',
      method: 'POST',
      data: {
        lang: this.props.user.default_language,
        imei: this.props.imei,
        timezone: this.props.timezone,
        name: this.state.tmpNombre,
        image: null,
      },
      //debug: true
    })
    await this.setState({ loading: false })
    if (error) return

    let user = this.props.user
    user.name = this.state.tmpNombre
    AsyncStorage.setItem('user', JSON.stringify(user))
    this.props.setUserData(user)
    this.forceUpdate()
  }

  render() {
    //console.log('Render Profile');

    let lang, notification, dialogName
    if (this.state.isConnected) {
      const data = [
        { key: 0, value: 'es', label: global.language['spanish'] },
        { key: 1, value: 'en', label: global.language['english'] },
      ]
      lang = (
        <ModalSelector
          data={data}
          initValue='Seleccionar un idioma'
          supportedOrientations={['portrait']}
          accessible
          scrollViewAccesisibilityLabel={'Scrollable options'}
          cancelButtonAccessibilityLabel={'Cancel Button'}
          cancelText={global?.['language']?.['cancel']}
          onChange={({ value }) => this.validate(value, this.state.switch)}
        >
          <View style={globalStyles.arrowButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 10,
                paddingRight: 10,
              }}
            >
              <Text style={{ color: '#fff' }}>{global?.language?.label_language}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingRight: 10,
              }}
            >
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>{this.state.lang}</Text>
            </View>
          </View>
        </ModalSelector>
      )
      notification = (
        <TouchableOpacity
          onPress={() => {
            this.validate(this.state.lang, !this.state.switch)
          }}
        >
          <View style={globalStyles.arrowButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
                paddingLeft: 10,
              }}
            >
              <Text style={{ color: '#fff' }}>{global?.language?.label_notification}</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
                paddingLeft: 10,
              }}
            >
              <Switch
                trackColor={{ false: 'white', true: '#5c9c93' }}
                value={this.state.switch}
                onValueChange={() => {
                  this.setState({
                    switch: !this.state.switch,
                  })
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      )
    } else {
      lang = (
        <View>
          <View style={globalStyles.arrowButtonContainer}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Text style={{ color: '#fff' }}>{global?.language?.label_language}:</Text>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
            >
              <Text style={{ fontWeight: 'bold', color: '#fff' }}>{this.state.lang}</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              marginTop: 10,
              borderRadius: 3,
              borderColor: 'white',
              borderWidth: 2,
              alignItems: 'center',
            }}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#fff' }}>{global?.language?.label_notification}:</Text>
            </View>

            <Switch
              disabled
              value={this.state.switch}
              onValueChange={() => {
                this.setState({
                  switch: !this.state.switch,
                })
              }}
            />
          </View>
        </View>
      )
      notification = (
        <View
          style={{
            flexDirection: 'row',
            padding: 10,
            marginTop: 10,
            borderRadius: 3,
            borderColor: 'white',
            borderWidth: 2,
            alignItems: 'center',
          }}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff' }}>{global?.language?.label_notification}:</Text>
          </View>

          <Switch
            disabled
            value={this.state.switch}
            onValueChange={() => {
              this.setState({
                switch: !this.state.switch,
              })
            }}
          />
        </View>
      )
    }

    /*  if ( this.state.visibleNameDialog ) { */
    dialogName = (
      <Dialog
        width={0.8}
        visible={this.state.visibleNameDialog}
        onTouchOutside={() => {
          this.setState({ visibleNameDialog: false })
          //console.log('Borrar el dialog');
        }}
        dialogTitle={
          <DialogTitle
            title={global?.language?.label_change_name_title}
            style={{
              backgroundColor: 'white',
              color: 'black',
              justifyContent: 'center',
            }}
            textStyle={{
              color: 'black',
            }}
            hasTitleBar={false}
            align='left'
          />
        }
        footer={
          <DialogFooter style={{ color: '#FFFFFF' }}>
            <DialogButton
              text={global?.language?.close}
              style={{
                backgroundColor: 'white',
              }}
              textStyle={{
                color: 'black',
              }}
              onPress={() => {
                this.setState({ visibleNameDialog: false })
              }}
            />
            <DialogButton
              text={global?.language?.label_save}
              style={{
                backgroundColor: 'white',
              }}
              textStyle={{
                color: 'black',
              }}
              onPress={() => {
                //console.log('Fue aceptado');
                this.setState({ visibleNameDialog: false })
                this.saveNameHandler()
              }}
            />
          </DialogFooter>
        }
      >
        <DialogContent
          style={{
            flexDirection: 'column',
            minHeight: 100,
            justifyContent: 'center',
            color: 'white',
            backgroundColor: 'white',
          }}
        >
          <View>
            <TextInput
              returnKeyType='done'
              placeholder='Cambiar nombre'
              placeholderTextColor='gray'
              style={{ color: 'black' }}
              onChangeText={text => this.setState({ tmpNombre: text })}
            />
          </View>
        </DialogContent>
      </Dialog>
    )
    /*  }else{ */

    return (
      <View source={require('img/mainbg.png')} style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
        <NavigationEvents
          onWillFocus={async payload => {
            let reprocess = await AsyncStorage.getItem('reprocess')
            if (reprocess == 'true') {
              this.recargarDatos()
              // AsyncStorage.setItem('reprocess', 'false')
            } else {
              this.recharge()
            }
          }}
        />
        <Loader loading={this.state.loading} />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {dialogName}

          <ScrollView style={{}}>
            <View
              style={{
                justifyContent: 'flex-end',
                width: global.width,
                zIndex: 4,
                flex: 1,
                flexDirection: 'row',
                backgroundColor: 'transparent',
                position: 'absolute',
              }}
            >
              <Image
                source={ImageAuthLogo}
                style={{
                  width: 100,
                  height: 60,
                  resizeMode: 'contain',
                  marginTop: 15,
                  marginRight: 15,
                  zIndex: 4,
                }}
              />
            </View>
            <View style={{ flex: 1, marginTop: 60 }}>
              <TouchableOpacity
                onPress={() => {
                  this.elegirImagen()
                }}
                style={{ zIndex: 3 }}
              >
                <View style={[globalStyles.ProfileImageContainer, { zIndex: 2 }, { justifyContent: 'center', alignItems: 'center' }]}>
                  {!!this.props.user.image && (
                    <Image
                      source={{ uri: this.state.image }}
                      style={{
                        width: 160,
                        height: 160,
                        borderRadius: 80,
                        zIndex: 0,
                      }}
                      resizeMode={'cover'}
                    />
                  )}
                  {!this.props.user.image && (
                    <Image
                      source={require('img/bg_no_profile.png')}
                      style={{
                        width: 160,
                        height: 160,
                        borderRadius: 80,
                        zIndex: 0,
                      }}
                      resizeMode='cover'
                    />
                  )}
                </View>
              </TouchableOpacity>
              {/*   <Image source={require('img/img_bk_curved.png')} style={{ width:global.width, height:40,resizeMode:"stretch",zIndex : 1,position:"absolute",marginTop:global.width * 2 / 3 - 75,alignSelf:"flex-end"}} /> */}
            </View>
            <TouchableOpacity
              onPress={() => {
                //console.log('[Profile Name]');
                this.nameDialogHandler()
              }}
            >
              <View style={globalStyles.nameContainer}>
                <View
                  style={{
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 35, marginTop: 10, color: 'white' }}>{this.props.user.name}</Text>
                  <Text style={{ fontSize: 15, marginTop: 0, color: 'white' }}>
                    {this.state.label1}: {this.state.desde}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ paddingLeft: 40, paddingRight: 40 }}>
              <TouchableOpacity
                onPress={() => {
                  //console.log('Change Password');
                }}
              >
                <View style={globalStyles.arrowButtonContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: 10,
                      paddingRight: 10,
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 15 }}>{global?.language?.change_password}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    <Image source={require('img/icon_rightarrow.png')} style={globalStyles.arrowImageStyle} />
                  </View>
                </View>
              </TouchableOpacity>
              {lang}
              <TouchableOpacity
                onPress={() => {
                  alert('Webview a página de ayuda y soporte.')
                }}
              >
                <View style={globalStyles.arrowButtonContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      paddingLeft: 10,
                    }}
                  >
                    <Text style={{ color: '#fff' }}>{global?.language?.label_support}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                    }}
                  >
                    <Image source={require('img/icon_rightarrow.png')} style={globalStyles.arrowImageStyle} />
                  </View>
                </View>
              </TouchableOpacity>
              {notification}
              {this.logout()}
            </View>
            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  //actions_porcentage: datasetSelector(state, 'home_actions_porcentage),
  timezone: datasetSelector(state, 'timezone'),
  imei: datasetSelector(state, 'imei'),
  app_configuration: datasetSelector(state, 'app_configuration'),
  user: datasetSelector(state, 'user'),
})
const mapDispatchToProps = dispatch => ({
  clearDatasets: data => dispatch(clearDatasetsSagaAction()),
  setCategoriesAction: data => dispatch(setDatasetToReducer(data, 'categories')),
  setCategoriesCompleteAction: data => dispatch(setDatasetToReducer(data, 'categories_complete')),
  setUserData: user => dispatch(setDatasetToReducer(user, 'user')),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
