import React from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'native-base'
import HomeBase from '../../components/HomeBase'
import ListItemsBox from '../../components/ListItemsBox'
import capitalizeWords from '../../helpers/capitalizeWords'
import { scale, globalStyles } from '../../helpers/styles'
import user_prof from '../../img/user_no_border.png'
import prof_star from '../../img/prof_star.png'
import { updateBeltInfoScreenDatasSagaAction } from '../../sagas/actions'
import { withTranslation } from 'react-i18next'
import { connect } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { NavigationEvents } from 'react-navigation'

class BeltInfoScreen extends React.Component {
  constructor(props) {
    const {params} = props.navigation.state;
    super(props)
    this.state = {
      refreshing: false,
      loading: false, //should be
      white_colour_code : '#ffffff',
      yellow_colour_code : '#ff9900',
      green_colour_code : '#009900',
      black_colour_code : '#000000',
      currentBelt: 'yellow', //#000
      beltColor: 'transparent',
      nextBeltColor: 'transparent',
      user: null,
      consecutive_achievements: '',
      isStreakActive: false,
      consecutive_achievements_to_next_level: '',
    }
  }

  componentDidMount() {
    this.props.updateBeltInfoScreenDatas()
  }

  renderCurrentProfileView(title, beltColor = '#fff', hasStar = false) {
    return (
      <View style={{ width: '80%', height: scale(1), marginTop: -30, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ ...globalStyles.title, width: '55%', fontSize: 20, textAlign: 'left' }}>{title}</Text>
        <View
          style={{
            width: scale(1.3),
            height: scale(1.3),
            left: 10,
            top: -20,
            borderWidth: 4,
            borderRadius: 100,
            borderColor: beltColor,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Image source={user_prof} resizeMode='contain' style={{ width: '80%', height: '80%', marginBottom: 7 }} />
          {hasStar ? (
            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute' }}>
              <Image
                source={prof_star}
                resizeMode='contain'
                style={{ width: scale(0.35), height: scale(0.35), marginBottom: scale(-0.02), marginRight: scale(-0.075) }}
              />
            </View>
          ) : null}
        </View>
      </View>
    )
  }
  renderLeftProfileView(title, newNeltColor, hasStar = false) {
    if (newNeltColor == 'null' && hasStar == false) {
      return null
    }
    if (this.props.belt.colour == newNeltColor && hasStar == false) {
      return null
    }
    return (
      <View
        style={{
          width: '80%',
          height: scale(1.5),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: title == capitalizeWords(global?.language?.label_master_black_belt) ? 0 : -20,
        }}
      >
        <Text style={{ ...globalStyles.title, width: '90%', fontSize: 20, textAlign: 'right' }}>{title}</Text>
        <View
          style={{
            width: scale(1.3),
            height: scale(1.3),
            left: 0,
            top: scale(1.5) / 4,
            borderWidth: 4,
            borderRadius: 100,
            borderColor: newNeltColor,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Image source={user_prof} resizeMode='contain' style={{ width: '75%', height: '75%', marginBottom: 7 }} />
          {hasStar ? (
            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute' }}>
              <Image
                source={prof_star}
                resizeMode='contain'
                style={{ width: scale(0.35), height: scale(0.35), marginBottom: scale(-0.02), marginRight: scale(-0.075) }}
              />
            </View>
          ) : null}
        </View>
        <View style={{ width: '85%', marginLeft: '15%', height: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: newNeltColor }} />
        <Text
          numberOfLines={2}
          style={{
            ...globalStyles.title,
            width: '70%',
            marginLeft: '30%',
            fontSize: 20,
            textAlign: 'right',
            marginTop: -15,
            color: '#b2b2b2',
            fontWeight: '400',
            fontSize: scale(0.25),
          }}
        >
          {title}
          {title}
          {title}
        </Text>
      </View>
    )
  }
  renderRightProfileView(title, beltColor = '#fff', hasStar = false) {
    let selectedBG = '#73dd62'
    let normalBG = '#616365'
    let beltHeight = 13
    if (beltColor == 'null' && hasStar == false) {
      return null
    }
    if (this.props.belt.colour == beltColor && hasStar == false) {
      return null
    }
    return (
      <View style={{ width: '80%', height: scale(1.5), justifyContent: 'center', alignItems: 'flex-end', marginTop: -20 }}>
        <Text style={{ ...globalStyles.title, width: '100%', fontSize: 20, textAlign: 'left' }}>
          {capitalizeWords(global?.language?.label_master_black_belt)}
        </Text>
        <View
          style={{
            width: scale(1.3),
            height: scale(1.3),
            right: 0,
            top: scale(1.5) / 4,
            borderWidth: 4,
            borderRadius: 100,
            borderColor: beltColor,
            justifyContent: 'flex-end',
            alignItems: 'center',
            position: 'absolute',
          }}
        >
          <Image source={user_prof} resizeMode='contain' style={{ width: '80%', height: '80%', marginBottom: 7 }} />
          {hasStar ? (
            <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute' }}>
              <Image
                source={prof_star}
                resizeMode='contain'
                style={{ width: scale(0.35), height: scale(0.35), marginBottom: scale(-0.02), marginRight: scale(-0.075) }}
              />
            </View>
          ) : null}
        </View>
        <View style={{ width: '85%', marginRight: '15%', height: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: beltColor }} />
        <Text
          numberOfLines={2}
          style={{
            ...globalStyles.title,
            width: '70%',
            marginRight: '30%',
            fontSize: 20,
            textAlign: 'left',
            marginTop: -15,
            color: '#b2b2b2',
            fontWeight: '400',
            fontSize: scale(0.25),
          }}
        >
          {title}
          {title}
          {title}
        </Text>
      </View>
    )
  }
  renderLeftToRightBelt(isDisplay = true, whichOne = '',step = '') {
    if (isDisplay == false) {
      return null
    }
    let selectedBG = '#73dd62'
    let normalBG = '#616365'
    let beltHeight = 13
    return (
      <View style={{ height: 80, width: '50%', marginLeft: '1%', marginTop: 30, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
        <View style={{ height: beltHeight, width: '30%', borderRadius: 10, backgroundColor: normalBG }}> 
        <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>
        {whichOne == 5 ? (step === 'first' ? 'Current Week' : '1') : (step === 'second' ? 'Current Week' : '')}</Text>
        </View>
        <View style={{ height: beltHeight, marginLeft: '33%', width: '30%', marginTop: 10, borderRadius: 10, backgroundColor: normalBG }}>
        <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>
        {whichOne == 4 ? (step === 'first' ? 'Current Week' : '1') : (step === 'second' ? 'Current Week' : '')}</Text>
        </View>
        <View style={{ height: beltHeight, marginLeft: '66%', width: '30%', marginTop: 10, borderRadius: 10, backgroundColor: normalBG }}> 
        <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>
        {whichOne == 3 ? (step === 'first' ? 'Current Week' : '1') : (step === 'second' ? 'Current Week' : '')}</Text>
        </View>
      </View>
    )
  }
  renderRightToLeftBelt(isDisplay = true, whichOne = '',step = '') {
    if (isDisplay == false) {
      return null
    }
    let selectedBG = '#73dd62'
    let normalBG = '#616365'
    let beltHeight = 13
    return (
      <View style={{ height: 80, width: '50%', marginLeft: '1%', marginTop: 30, justifyContent: 'flex-start', alignItems: 'flex-end' }}>
        <View style={{ height: beltHeight, width: '30%', borderRadius: 10, backgroundColor: normalBG }}>
        <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>
        {whichOne == 2 ? (step === 'first' ? 'Current Week' : '1') : (step === 'second' ? 'Current Week' : '')}</Text>
        </View>
        <View style={{ height: beltHeight, marginRight: '33%', width: '30%', marginTop: 10, borderRadius: 10, backgroundColor: normalBG }}>
        <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>
        {whichOne == 1 ? (step === 'first' ? 'Current Week' : '1') : (step === 'second' ? 'Current Week' : '')}</Text>
        </View>
        <View style={{ height: beltHeight, marginRight: '66%', width: '30%', marginTop: 10, borderRadius: 10, backgroundColor: normalBG }}>
        <Text style={[globalStyles.centerText, { textAlign: 'center', width: '100%' }, { fontSize: scale(0.22), color: 'white' }]}>
        {whichOne == 0 ? (step === 'first' ? 'Current Week' : '1') : (step === 'second' ? 'Current Week' : '')}</Text>
        </View>
      </View>
    )
  }
  render() {
    console.log('THIS :- ', { belts: this.props.belts, belt: this.props.belt, last_consecutives_achieved_weeks: this.props.last_consecutives_achieved_weeks })
    console.log('colour :----',this.props.belt.colour)
    console.log('colour 2 :----',this.state.white_colour_code)
    return (
      <HomeBase hasBackButton showActionButton={false} showLogo={true}>
        <View style={{ height: '100%', width: '100%' }}>
          <ScrollView>
            <View style={{ width: '100%', height: scale(3), justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
              <Text style={{ ...globalStyles.title, width: '50%', fontSize: 20, textAlign: 'center' }}>
                {capitalizeWords(global?.language?.belt_info_title)}
              </Text>
            </View>
            <View style={{ width: '100%', flex: 1, marginBottom: scale(1.5), justifyContent: 'flex-start', alignItems: 'center' }}>
              {this.renderLeftProfileView(
                capitalizeWords(global?.language?.label_master_black_belt),
                this.props.belt.colour === 'null' ? this.state.black_colour_code : this.props.belt.colour ? this.state.black_colour_code : 'null',
                true,
              )}
              {this.renderLeftToRightBelt()}

              {this.renderRightProfileView(
                capitalizeWords(global?.language?.label_black_belt),
                this.props.belt.colour === 'null' ? this.state.black_colour_code : this.props.belt.colour ? this.state.black_colour_code : 'null',
              )}
              {this.renderRightToLeftBelt(this.props.belt.consecutive_weeks > 6 ? (this.props.belt.colour != this.state.green_colour_code ? true : false) : true, (this.props.belt.consecutive_weeks < 10 ? this.props.belt.consecutive_weeks : '','second') )}

              {this.renderLeftProfileView(
                capitalizeWords(global?.language?.label_green_belt),
                this.props.belt.colour === this.state.white_colour_code ? this.state.green_colour_code : this.props.belt.colour ? (this.props.belt.colour === this.state.black_colour_code ? 'null' : this.state.green_colour_code) : 'null',
              )}
              {this.renderLeftToRightBelt(this.props.belt.consecutive_weeks > 3 ? (this.props.belt.colour === this.state.green_colour_code ? true : false) : true, 'one', (this.props.belt.consecutive_weeks < 7 ? this.props.belt.consecutive_weeks : '','first') )}

              {this.renderRightProfileView(
                capitalizeWords(global?.language?.label_yellow_belt),
                this.props.belt.colour === this.state.yellow_colour_code ? this.state.yellow_colour_code : this.props.belt.colour != this.state.white_colour_code ? 'null' : this.state.yellow_colour_code,
              )}
              {this.renderRightToLeftBelt(this.props.belt.consecutive_weeks > 0 ? (this.props.belt.colour === this.state.yellow_colour_code ? true : false) : true, this.props.belt.consecutive_weeks < 3 ? this.props.belt.consecutive_weeks : '','first')}

              {this.renderCurrentProfileView(capitalizeWords(global?.language?.label_white_belt), this.props.belt.colour)}
              <View style={{ width: '100%', height: 50 }} />
            </View>
          </ScrollView>
        </View>
      </HomeBase>
    )
  }
}

const mapStateToProps = state => ({
  belts: datasetSelector(state, 'belts', { list_format: true }),
  belt: datasetSelector(state, 'belt'),
  last_consecutives_achieved_weeks: datasetSelector(state, 'last_consecutives_achieved_weeks'),
})
const mapDispatchToProps = dispatch => ({
  updateBeltInfoScreenDatas: () => dispatch(updateBeltInfoScreenDatasSagaAction()),
})
BeltInfoScreen = withTranslation()(BeltInfoScreen)
BeltInfoScreen = connect(mapStateToProps, mapDispatchToProps)(BeltInfoScreen)
export default BeltInfoScreen
