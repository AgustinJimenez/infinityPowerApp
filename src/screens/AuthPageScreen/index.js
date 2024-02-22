import React from 'react'
import { Text, View, Image, SafeAreaView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import TopTabs from '../../components/TopTaps/TopTaps'
import { globalStyles } from '../../helpers/styles'
import LoginScreen from './LoginForm'
import RegisterScreen from './RegisterForm'
class AuthPageScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      isRegister: true,
    }
  }
  static navigationOptions = {
    header: null,
  }
  async componentDidMount() {
    //this.props.navigation.navigate('App');
  }
  switchScreens = index => () => {
    if (this.topTabs.state.currentTabIndex !== index) {
      if (index === 0) {
        //   this.loginScreen.animationView.fadeInLeft(600).then(this.changeZindex);
        //   this.signInScreen.animationView.fadeOutRight(400);
        this.setState({
          isRegister: true,
        })
      } else {
        //   this.loginScreen.animationView.fadeOutLeft(400);
        //   this.signInScreen.animationView.fadeInRight(600).then(this.changeZindex);
        this.setState({
          isRegister: false,
        })
      }
      //this.topTabs.state.tabsStyles.reverse();
      this.topTabs.setState({ currentTabIndex: index })
    }
  }
  changeZindex = () => {
    this.signInScreen.changeZindex()
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <KeyboardAwareScrollView>
          <View style={globalStyles.authContainer}>
            <View style={[globalStyles.authContent, { borderRadius: 0, margin: 0, height: global.height }]}>
              <View style={{ backgroundColor: 'black', flex: 1, justifyContent: 'space-between', flexDirection: 'column', borderRadius: 12 }}>
                <View style={{ flex: 1, alignItems: 'flex-end', padding: 6, paddingTop: 20 }}>
                  <Image source={require('img/infinite-power.png')} style={{ width: 100, height: 50 }}></Image>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 50 }}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 35, color: 'white' }}>LOGIN</Text>
                    <Image source={require('img/icon_draw.png')} style={{ width: 100, height: 45 }}></Image>
                  </View>
                  <Text style={{ fontSize: 20, color: 'white', marginTop: -10 }}>{global?.language?.to_your_account.toUpperCase()}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 30, height: 50 }}>
                  <Text style={{ fontSize: 20, color: 'white' }}>{global?.language?.and_enjoy_all_the_advantages}</Text>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: -30 }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{global?.language?.app_name} </Text>
                    <Text style={{ fontSize: 20, color: 'white' }}>{global?.language?.offers_you}</Text>
                  </View>
                </View>
                <TopTabs
                  ref={ref => {
                    this.topTabs = ref
                  }}
                  switch={this.switchScreens}
                />
              </View>
              {/* backgroundColor:'black' */}
              <View style={{ backgroundColor: 'black', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <RegisterScreen
                  ref={ref => {
                    this.signInScreen = ref
                  }}
                  hidden={!this.state.isRegister}
                  nav={this.props.navigation}
                />
                <LoginScreen
                  ref={ref => {
                    this.loginScreen = ref
                  }}
                  hidden={this.state.isRegister}
                  nav={this.props.navigation}
                />
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    )
  }
}
export default AuthPageScreen
