import React from 'react'
import { Text, View, TouchableOpacity, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import DeviceInfo from 'react-native-device-info'
import md5 from 'md5'
import * as fn from 'helpers/scripts'
import PasswordInputText from '../../components/Auth/passwordInput'
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements'
import { globalStyles } from '../../helpers/styles'
import NetInfo from '@react-native-community/netinfo'
import request from '../../helpers/request'
import { datasetSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import stringIsEmail from '../../helpers/stringIsEmail'
import { setDatasetToReducer } from '../../redux/actions'
import { updateDeviceImeiSagaAction } from '../../sagas/actions'
import { Toast } from 'native-base'
import capitalizeWords from '../../helpers/capitalizeWords'
import { withNavigation } from 'react-navigation'
import Language from 'helpers/languages'
import * as RNLocalize from 'react-native-localize'

class LoginScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      // email: '',//marinacfmallada@gmail.com
      // password: '',
      password: '',
      applang: 'es',
      checked: false,
      isConnected: true,
      htlogin: 'INGRESAR',
    }
  }
  // email: 'test13@gmail.com',
  // password: '1234567',
  // email: 'infinitepowerapp@gmail.com',
  // password: '1234567',
  //email : 'baru.reguerariquelme@gmail.com'
  // password: '1234567'
  //email: 'veronica.quinonez@outlook.com'
  getDeviceLocale = () => {
    let deviceLocale = ''
    try {
      deviceLocale = DeviceInfo.getDeviceLocale()
    } catch (e) {}
    return deviceLocale.substr(0, 2)
  }
  componentDidMount() {
    this.init()
  }

  init = async () => {
    this.props.fetchImemi()
    let lang = this.getDeviceLocale()

    this.setState({
      applang: lang,
    })
    newlang = 'get_init_data_es'
    if (!!lang) newlang = `get_init_data_${lang}`

    let langInfo = await AsyncStorage.getItem(newlang)

    langInfo = JSON.parse(langInfo)
    if (!!langInfo && !!langInfo.result)
      this.setState({
        htwelcome: langInfo.result.initialScreenTranslations.loginScreen.welcome.label,
        htcreateaccount: langInfo.result.initialScreenTranslations.loginScreen.create_account.label,
        htlogin: langInfo.result.initialScreenTranslations.loginScreen.log_in.label,
      })

    let isConnected = await NetInfo.isConnected.fetch()

    this.setState({
      checked: true,
      isConnected,
    })
  }

  validate = async () => {
    if (this.state.login_email == '' || this.state.password == '') {
      alert(global?.language?.msg_warn_fieldsfill)
      return
    }
    Keyboard.dismiss()

    await this.setState({
      loading: true,
    })
    let { error, data, message, response } = await request({
      timeout: 0,
      url: 'auth/login',
      method: 'POST',
      data: {
        email: this.props.login_email,
        password: this.state.password,
        lang: this.state.applang,
        imei: this.props.imei,
        timezone: this.props.timezone,
        notification_token: this.props.fcm_token,
      },
      //debug: true,
      show_message: true,
    })
    await this.setState({
      loading: false,
    })

    if (error) return
    let { token, token_type, user } = data
    AsyncStorage.setItem('userToken', token)
    AsyncStorage.setItem('userTokenType', token_type)
    this.props.setToken(token)
    this.props.setTokenType(token_type)

    //user.userdefault_language = global.lang
    //user.default_language = global.lang
    this.get_screens_translations(token_type, token, this.props.imei, user.timezone, data)
    // this.setState({loading : false});
    global.lange = user.default_language
    global.lang = user.default_language
    Language.loadLanguage() //loading app language
    global.language = global.appLanguages[global.lang]
    await Toast.show({
      text: capitalizeWords(global?.['language']?.['loginSuccess']),
      type: 'success',
      duration: 4000,
    })
  }

  get_screens_translations = async (tokenType, token, imei, timezone, userjson) => {
    //console.log('Login Page__ getting screen transition started.');
    for (let langId of ['es', 'en', 'pt']) {
      var { data, response, error } = await request({
        url: 'get_screens_translations',
        method: 'POST',
        data: {
          lang: langId,
          imei: this.props.imei,
          timezone: RNLocalize.getTimeZone(),
        },
      })
      if (error) return this.setState({ loading: false })

      AsyncStorage.setItem(`get_screens_translations_${langId}`, JSON.stringify(response.data))
      this.props.setLangInfo(data, `get_screens_translations_${langId}`)
    }

    AsyncStorage.setItem('user', JSON.stringify(userjson.user))
    this.props.setUserData(userjson.user)
    AsyncStorage.setItem('isFirst', 'true')

    //init capsule status
    global.bnt_con = 0
    global.bnt_pra = 0
    global.ta_con = 0
    global.ta_pra = 0

    //set tokentype and token
    global.tokenType = userjson.token_type
    global.token = userjson.token
    global.user = userjson.user

    //loading routine_list
    var { data, response, error } = await request({
      url: 'mobile/users/routine_list',
      method: 'POST',
      data: {
        lang: global.lange,
        imei: this.props.imei,
        timezone: this.props.timezone,
      },
    })
    if (error) {
      this.props.nav.navigate('Main', {
        user: JSON.stringify(userjson.user),
        tokenType: userjson.token_type,
        token: userjson.token,
      })
      return this.setState({ loading: false })
    }

    AsyncStorage.setItem('routine_list', JSON.stringify(data))
    // setTimeout(function(){
    this.setState({ loading: false })
    this.props.nav.navigate('App', {
      user: JSON.stringify(userjson.user),
      tokenType: userjson.token_type,
      token: userjson.token,
    })
  }
  forgetPassword = () => {}
  render() {
    var titleSize = 16

    if (this.props.hidden) return null

    return (
      <View style={[globalStyles.authFormStyle, { margin: 20, flex: 1, backgroundColor: 'transparent' }]}>
        {/* <Text style={{color:'white',fontSize:16,marginBottom:-5}}>Email</Text> */}
        <TextField
          ref={ref => {
            this.email = ref
          }}
          returnKeyType='next'
          label='Email'
          baseColor={global.txtWhiteColor}
          editable
          textColor={global.txtWhiteColor}
          value={this.props.login_email}
          onChangeText={email => this.props.setEmail(email)}
          onSubmitEditing={() => {
            this.passwordInput.input.focus()
          }}
          autoCorrect={false}
        />
        <PasswordInputText
          getRef={ref => (this.passwordInput = ref)}
          value={this.state.password}
          txtColor={global.txtWhiteColor}
          titleSize={titleSize}
          label={global?.language?.password}
          onChangeText={password => this.setState({ password })}
        />
        {/* <ActivityIndicator style={{ backgroundColor: 'transparent' }} />  */}
        <Button
          loading={this.state.loading}
          title={global?.language?.log_in}
          buttonStyle={globalStyles.authButtonStyle}
          disabled={!this.emailAndPasswordAreValid()}
          onPress={() => this.validate()}
        />
        <TouchableOpacity style={globalStyles.authTextButtonStyle} onPress={this.forgetPassword()}>
          <Text style={{ color: 'white', alignSelf: 'center' }}>{global?.language?.forget_password}?</Text>
        </TouchableOpacity>
      </View>
    )
  }

  emailAndPasswordAreValid = () => {
    let isValid = true
    let emailIsValid = stringIsEmail(this.props.login_email)
    let passwordIsValid = this.state.password.trim() !== '' && this.state.password.length >= 3

    if (!emailIsValid || !passwordIsValid) isValid = false

    //console.log('emailAndPasswordAreValid ===> ', { emailIsValid, passwordIsValid, isValid })

    return isValid
  }
}

const mapStateToProps = state => ({
  imei: datasetSelector(state, 'imei'),
  timezone: datasetSelector(state, 'timezone'),
  token: datasetSelector(state, 'token'),
  login_email: datasetSelector(state, 'login_email'),
  fcm_token: datasetSelector(state, 'fcm_token'),
})
const mapDispatchToProps = dispatch => ({
  fetchImemi: () => dispatch(updateDeviceImeiSagaAction()),
  setTokenType: data => dispatch(setDatasetToReducer(data, 'token_type')),
  setToken: data => dispatch(setDatasetToReducer(data, 'token')),
  setEmail: email => dispatch(setDatasetToReducer(email, 'login_email')),
  setUserData: user => dispatch(setDatasetToReducer(user, 'user')),
  setLangInfo: (data, lang_id) => dispatch(setDatasetToReducer(data, lang_id)),
})
LoginScreen = withNavigation(LoginScreen)
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
