import React from 'react'
import { Text, View, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import * as fn from '../helpers/scripts'
import scale from '../helpers/scale'
import Loader from 'helpers/loader'
import request from '../helpers/request'
import { setDatasetListToObjectReducer } from '../redux/actions'
import { datasetSelector } from '../redux/selectors'
import { connect } from 'react-redux'
import { BarChart } from 'react-native-charts-wrapper'
import BottomNavigationBar from '../components/BottomNavigationBar'

class FocusingMediumsStatsScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      last_focus: null,
      bnt: 0,
      bnt_atention: 0,
      bnt_block: 0,
      bnt_perception: 0,
      left_margin: 60,
      right_margin: 60,
      height_pillar: (global.height * 2) / 5 - 20,
      width_meter: 20,
      width_bar: global.width - 60 - 60,
    }
    // this.setState({width_bar : global.width - this.state.left_margin - this.state.right_margin});
  }
  static navigationOptions = {
    header: null,
  }
  componentDidMount() {
    if (this.props.questions.length) this.props.navigation.replace('FocusQuestionaryScreen')
    /*var capsule_score = await AsyncStorage.getItem('capsule_score');
        if(capsule_score !== null){ 
            score = JSON.parse(capsule_score);
            bnt = (score.bnt_con + score.bnt_pra) / 2;
            bnt = Number(bnt.toFixed(0))
            this.setState({
                bnt : bnt,
                bnt_atention : Number(score.bnt_con.toFixed(0)),
                bnt_block :  Number(score.bnt_pra.toFixed(0))
            });
        }*/
    AsyncStorage.setItem('reprocess', 'true')
    this.loadLastFocus()
  }

  loadLastFocus = async () => {
    newObj = {}

    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone

    await this.setState({ loading: true })
    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])

    let { data, error } = await request({
      url: 'mobile/users/last_focus',
      method: 'POST',
      data: formdata,
    })

    if (!!data['last_focus'] && !error) {
      await this.setState({
        last_focus: data['last_focus'],
        bnt: data['last_focus']['focus'],
        bnt_atention: data['last_focus']['atention'],
        bnt_perception: data['last_focus']['perception'],
        bnt_block: data['last_focus']['block'],
        loading: false,
      })
    } else {
      this.setState({ loading: false })
    }
  }

  mentalFocusStatsChartData = () =>
    Object.keys(this.props.mental_focus_stats).map(focusingMediumCode => ({
      y: this.props.mental_focus_stats[focusingMediumCode],
      x: focusingMediumCode,
    }))

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          backgroundColor: 'black'
        }}
      >
        <Loader loading={this.state.loading} />
        <View style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Image
              source={require('img/home-focus.png')}
              style={{
                width: 90,
                height: 90,
                resizeMode: 'contain',
                marginTop: 10,
                marginBottom: 20,
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: global.authButtonColor,
              borderRadius: 12,
              marginTop: 10,
              marginLeft: 20,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              marginRight: 20,
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: 'white',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {this.props.mental_focus_percentage}%
            </Text>
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center' }}>{global?.language?.mental_focusing}</Text>
          </View>
          {/* <View style={{ width: '90%', height: scale(1), backgroundColor: 'white', alignSelf: 'center', marginTop: 20 }}>
            <BarChart
              style={{ flex: 1 }}
              data={{
                dataSets: [
                  {
                    values: this.mentalFocusStatsChartData(),
                  },
                ],
              }}
            />
          </View> */}
          <View
            style={{
              marginTop: 20,
              marginLeft: this.state.left_margin,
              marginRight: this.state.right_margin - 20,
            }}
          >
            <View
              style={{
                width: 1,
                height: this.state.height_pillar,
                backgroundColor: 'white',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <View
              style={{
                width: global.width - this.state.left_margin - this.state.right_margin + 20,
                height: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: this.state.height_pillar,
                left: 0,
              }}
            />
            <View
              style={{
                width: this.state.width_meter,
                height: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: this.state.height_pillar / 6,
                left: -this.state.width_meter / 2,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: -this.state.width_meter / 2 - 40,
                top: this.state.height_pillar / 6 - 10,
              }}
            >
              100%
            </Text>
            <View
              style={{
                width: this.state.width_meter,
                height: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: (this.state.height_pillar * 2) / 6,
                left: -this.state.width_meter / 2,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: -this.state.width_meter / 2 - 40,
                top: (this.state.height_pillar * 2) / 6 - 10,
              }}
            >
              80%
            </Text>
            <View
              style={{
                width: this.state.width_meter,
                height: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: (this.state.height_pillar * 3) / 6,
                left: -this.state.width_meter / 2,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: -this.state.width_meter / 2 - 40,
                top: (this.state.height_pillar * 3) / 6 - 10,
              }}
            >
              60%
            </Text>
            <View
              style={{
                width: this.state.width_meter,
                height: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: (this.state.height_pillar * 4) / 6,
                left: -this.state.width_meter / 2,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: -this.state.width_meter / 2 - 40,
                top: (this.state.height_pillar * 4) / 6 - 10,
              }}
            >
              40%
            </Text>
            <View
              style={{
                width: this.state.width_meter,
                height: 1,
                backgroundColor: 'white',
                position: 'absolute',
                top: (this.state.height_pillar * 5) / 6,
                left: -this.state.width_meter / 2,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: -this.state.width_meter / 2 - 40,
                top: (this.state.height_pillar * 5) / 6 - 10,
              }}
            >
              20%
            </Text>
            <View
              style={{
                width: this.state.width_bar / 4,
                height: (((this.state.height_pillar * 5) / 6) * this.state.bnt_atention) / 100,
                backgroundColor: global.authButtonColor,
                position: 'absolute',
                top: this.state.height_pillar - (((this.state.height_pillar * 5) / 6) * this.state.bnt_atention) / 100,
                left: this.state.width_bar / 6,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: this.state.width_bar / 6 + this.state.width_bar / 16,
                top: this.state.height_pillar - (((this.state.height_pillar * 5) / 6) * this.state.bnt_atention) / 100 - 30,
              }}
            >
              {this.state.bnt_atention}%
            </Text>
            <View
              style={{
                width: this.state.width_bar / 4,
                height: (((this.state.height_pillar * 5) / 6) * this.state.bnt_block) / 100,
                backgroundColor: global.authButtonColor,
                position: 'absolute',
                top: this.state.height_pillar - (((this.state.height_pillar * 5) / 6) * this.state.bnt_block) / 100,
                left: (this.state.width_bar / 6) * 3,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: (this.state.width_bar / 6) * 3 + this.state.width_bar / 16,
                top: this.state.height_pillar - (((this.state.height_pillar * 5) / 6) * this.state.bnt_block) / 100 - 30,
              }}
            >
              {'60'}%
            </Text>
            <View
              style={{
                width: this.state.width_bar / 4,
                height: (((this.state.height_pillar * 5) / 6) * this.state.bnt_perception) / 100,
                backgroundColor: global.authButtonColor,
                position: 'absolute',
                top: this.state.height_pillar - (((this.state.height_pillar * 5) / 6) * this.state.bnt_perception) / 100,
                left: (this.state.width_bar / 6) * 5,
              }}
            />
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                left: (this.state.width_bar / 6) * 5 + this.state.width_bar / 16,
                top: this.state.height_pillar - (((this.state.height_pillar * 5) / 6) * this.state.bnt_perception) / 100 - 30,
              }}
            >
              {this.state.bnt_perception}%
            </Text>
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                textAlign: 'center',
                paddingHorizontal: 7,
                fontSize: 12,
                width: this.state.width_bar / 4 + this.state.width_bar / 8,
                left: this.state.width_bar / 6 - this.state.width_bar / 16,
                top: this.state.height_pillar + 10,
              }}
            >
              {global?.language?.label_atention}
            </Text>
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                textAlign: 'center',
                paddingHorizontal: 7,
                fontSize: 12,
                width: this.state.width_bar / 4 + this.state.width_bar / 8,
                left: (this.state.width_bar / 6) * 3 - this.state.width_bar / 16,
                top: this.state.height_pillar + 10,
              }}
            >
              {global?.language?.label_block}
            </Text>
            <Text
              style={{
                color: 'white',
                position: 'absolute',
                textAlign: 'center',
                paddingHorizontal: 7,
                fontSize: 12,
                width: this.state.width_bar / 4 + this.state.width_bar / 8,
                left: (this.state.width_bar / 6) * 5 - this.state.width_bar / 16,
                top: this.state.height_pillar + 10,
              }}
            >
              {global?.language?.label_perception}
            </Text>
          </View>
        </View>
        <BottomNavigationBar hasBack />
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  questions: datasetSelector(state, 'questions', { list_format: true }),
  mental_focus_percentage: datasetSelector(state, 'mental_focus_percentage') || 0,
  mental_focus_stats: datasetSelector(state, 'mental_focus_stats'),
})
const mapDispatchToProps = dispatch => ({
  //setQuestionsAction: data => dispatch(setDatasetListToObjectReducer(data, 'questions')),
})

export default connect(mapStateToProps, mapDispatchToProps)(FocusingMediumsStatsScreen)
