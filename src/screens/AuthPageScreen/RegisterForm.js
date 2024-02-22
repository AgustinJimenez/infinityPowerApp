import React from 'react'
import { View, Keyboard } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import DeviceInfo from 'react-native-device-info'
import * as fn from 'helpers/scripts'
import md5 from 'md5'
import PasswordInputText from '../../components/Auth/passwordInput'
import { TextField } from 'react-native-material-textfield'
import { Button } from 'react-native-elements'
import { globalStyles } from '../../helpers/styles'
import Configure from '../../api/Configure'
import request from '../../helpers/request'
import stringIsEmail from '../../helpers/stringIsEmail'
import * as RNLocalize from 'react-native-localize'
import { setDatasetToReducer } from '../../redux/actions'
import { connect } from 'react-redux'

class RegisterScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
      // username: 'Alexey',
      username: '',
      email: '',
      password: '',
      applang: 'es',
      zIndex: 0,
      input: [],
    }
  }
  // email: 'test15@gmail.com',
  //         password: '1234567',
  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    this.init()
  }
  init = async () => {
    let lang = ''
    try {
      lang = DeviceInfo.getDeviceLocale()
    } catch (err) {}
    lang = lang.substr(0, 2)
    this.setState({
      applang: lang,
    })
    newlang = `get_init_data_${lang}`
    let value = await AsyncStorage.getItem(newlang)
    value = JSON.parse(value)
    //console.log(value)
    if (!!value && !!value.result)
      this.setState({
        htcreateaccount: value.result.initialScreenTranslations.registerScreen.create_account.label,
        // htlogin: value.result.initialScreenTranslations.loginScreen.log_in.label,
      })
  }
  register = async () => {
    if (this.state.username == '' || this.state.email == '' || this.state.password == '') return alert(global?.language?.msg_warn_fieldsfill)

    Keyboard.dismiss()
    instance = this
    await this.setState({
      loading: true,
    })
    uniqueId = DeviceInfo.getUniqueId()
    str_md5v = md5(uniqueId)
    let { data, message, error } = await request({
      url: 'auth/register',
      method: 'POST',
      data: {
        email: this.state.email,
        password: this.state.password,
        name: this.state.username,
        lang: this.state.applang,
        imei: str_md5v,
        timezone: RNLocalize.getTimeZone(),
      },
      //debug: true,
      show_message: true,
      onSuccessMessage: global?.language?.user_registered_successfully,
    })
    await this.setState({
      loading: false,
    })

    if (!error) {
      AsyncStorage.setItem('userToken', data.token)
      AsyncStorage.setItem('userTokenType', data.token_type)

      var user = data.user
      user.userdefault_language = global.lang
      user.default_language = global.lang

      //init capsule status
      global.bnt_con = 0
      global.bnt_pra = 0
      global.ta_con = 0
      global.ta_pra = 0

      AsyncStorage.setItem('user', JSON.stringify(user))
      this.props.setUserData(user)
      AsyncStorage.setItem('isFirst', 'true')
      global.configure = Configure
      global.navigation = this.props.nav
      Configure.loadData()
    }
  }
  changeZindex = () => {
    if (this.state.zIndex === 0) {
      this.setState({ zIndex: 2 })
    } else {
      this.setState({ zIndex: 0 })
    }
  }
  formIsValid = () => {
    let isValid = true
    if (!stringIsEmail(this.state.email)) isValid = false
    if (this.state.password?.trim() === '' && this.state.password?.trim()?.length < 3) isValid = false
    if (this.state.username.trim() === '' && this.state.username.trim().length < 3) isValid = false

    return isValid
  }
  render() {
    var titleSize = 16
    let formIsValid = this.formIsValid()

    if (this.props.hidden) return null
    return (
      <View style={[globalStyles.authFormStyle, { margin: 20, flex: 1, backgroundColor: 'transparent' }]}>
        <TextField
          ref={ref => {
            this.username = ref
          }}
          returnKeyType='done'
          value={this.state.username}
          label={global?.language?.user_name}
          baseColor={global.txtWhiteColor}
          textColor={global.txtWhiteColor}
          onChangeText={username => this.setState({ username })}
        />
        <TextField
          ref={ref => {
            this.email = ref
          }}
          returnKeyType='done'
          label={global?.language?.email}
          value={this.state.email}
          baseColor={global.txtWhiteColor}
          textColor={global.txtWhiteColor}
          onChangeText={email => {
            //email = email.toLowerCase()
            this.setState({ email })
          }}
        />

        <PasswordInputText
          getRef={input => (this.input = input)}
          value={this.state.password}
          txtColor={global.txtWhiteColor}
          titleSize={titleSize}
          label={global?.language?.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button
          loading={this.state.loading}
          disabled={!formIsValid}
          title={global?.language?.accept}
          buttonStyle={globalStyles.authButtonStyle}
          //backgroundColor={buttonColor}
          onPress={() => this.register()}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  //imei: datasetSelector(state, 'imei'),
})
const mapDispatchToProps = dispatch => ({
  setUserData: user => dispatch(setDatasetToReducer(user, 'user')),
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
