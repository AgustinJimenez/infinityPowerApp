import React from 'react'
import { View, Text } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import { connect } from 'react-redux'
import { setDatasetToReducer } from '../redux/actions'
import { callbackVoidSagaAction } from '../sagas/actions'

const slides = [
  {
    key: 'somethun',
    title: 'PANTALLA 1',
    text: 'Pantalla 1 de la bienvenida',
    icon: 'ios-images-outline',
    colors: ['#63E2FF', '#B066FE'],
  },
  {
    key: 'somethun1',
    title: 'PANTALLA 2',
    text: 'Pantalla 2 de la bienvenida',
    icon: 'ios-options-outline',
    colors: ['#A3A1FF', '#3A3897'],
  },
  {
    key: 'somethun2',
    title: 'PANTALLA 3',
    text: 'Pantalla 3 de la bienvenida',
    icon: 'ios-beer-outline',
    colors: ['#29ABE2', '#4F00BC'],
  },
]

class WalkthroughScreen extends React.Component {
  constructor() {
    super()
  }
  static navigationOptions = {
    header: null,
  }
  _renderItem = props => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, padding: 10 }}>{props.title}</Text>
      <Text style={{ color: 'white', padding: 10 }}>{props.text}</Text>
    </View>
  )

  _onDone = () => {
    this.props.setIntroTokenAction(true, () => {
      this.props.navigation.navigate('AuthPage')
    })
  }
  render() {
    return <AppIntroSlider slides={slides} renderItem={this._renderItem} onDone={this._onDone} />
  }
}

const mapStateToProps = state => ({

})
const mapDispatchToProps = dispatch => ({
  setIntroTokenAction: (data, callback) => {
    let action = callbackVoidSagaAction(setDatasetToReducer(data, 'intro_token'), callback)
    return dispatch(action)
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(WalkthroughScreen)
