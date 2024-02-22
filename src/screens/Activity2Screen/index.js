import React from 'react'
import { Text, View, ScrollView, Image, ImageBackground, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SafeAreaView } from 'react-navigation'
import * as fn from 'helpers/scripts'
import { globalStyles } from '../../helpers/styles'
import * as Progress from 'react-native-progress'
import Orientation from 'react-native-orientation-locker'
import Loader from 'helpers/loader'
import { PieChart } from 'react-native-svg-charts'
import WeekDaysMarker from '../../components/WeekDaysMarker'
import { connect } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { setDatasetToReducer } from '../../redux/actions'
import request from '../../helpers/request'

class Activity2Screen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      week_data: null,
      date_range: '',
    }
  }

  static navigationOptions = {
    header: null,
  }

  componentDidMount() {
    this.init()
  }

  init = async () => {
    //console.log('Activity2Screen ===> ', this.props.navigation.state.params)
    Orientation.lockToPortrait()
    let week = this.props.general_datas.week_number
    let year = this.props.general_datas.week_year
    let date_range = this.props.navigation.getParam('date_range')
    this.setState({ date_range })
    let user = await AsyncStorage.getItem('user')
    user = JSON.parse(user)

    //console.log('language', user)
    this.setState({
      nombre: user.name,
      applang: user.default_language,
    })
    auxlang = `get_screens_translations_${user.default_language}`

    let lang = await AsyncStorage.getItem(auxlang)
    lang = JSON.parse(lang)
    lang = lang.result
    this.setState({
      label1: lang.weekDetailScreen.header.label,
      label2: lang.weekDetailScreen.music_detail.label,
      label3: lang.weekDetailScreen.tone_detail.label,
      label4: lang.weekDetailScreen.mode_detail.label,
    })

    let { data, error } = await request({
      url: 'mobile/get_week_details_activity',
      method: 'POST',
      data: {
        lang: user.default_language,
        imei: user.imei,
        timezone: user.timezone,
        week_number: week,
        year_number: year,
      },
      //debug: true,
    })
    await this.setState({
      loading: false,
    })
    if (error || !data) return

    let porcentaje = data.current_week.days_achieved.split(' / ')
    porcentaje = (porcentaje[0] * 100) / porcentaje[1] / 100
    this.setState({
      loading: false,
      week_data: data,
      porcentaje: porcentaje,
    })
    // TONES
    let tones = data.tones
    tones = Object.values(data?.tones || {})
    // console.log('tones:', tones)
    let newArray = []
    let totalTone = 0
    tones.map(value1 => {
      value1.map(value2 => {
        if (typeof newArray[value2.label] === 'undefined') {
          newArray[value2.label] = 0
        }
        newArray[value2.label] = parseFloat(newArray[value2.label]) + parseFloat(value2.total_minutes)
      })
    })
    totalTone = 0
    let tones2 = Object.keys(newArray)
    let newArray2 = []
    let tmpArr = []
    tones2.map(value => {
      newArray2.push({
        label: value,
        value: newArray[value],
      })
      if (newArray[value] > 0) {
        tmpArr.push(newArray[value])
      }
      totalTone += newArray[value]
    })
    let pieData = tmpArr
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: this.randomColor(index),
          onPress: () => {
            //console.log(value)
          },
        },
        key: `pie-${index}`,
      }))
    this.setState({
      tonesArray: newArray2,
      tonesTotal: totalTone,
      pieData: pieData,
    })

    // MUSICS
    let musics = data.musics
    musics = Object.values(data?.musics || {})
    newArray = []
    let totalMusic = 0
    musics.map(value1 => {
      value1.map(value2 => {
        if (typeof newArray[value2.label] === 'undefined') {
          newArray[value2.label] = 0
        }
        newArray[value2.label] = parseFloat(newArray[value2.label]) + parseFloat(value2.total_minutes)
      })
    })
    totalMusic = 0
    let musics2 = Object.keys(newArray)
    newArray2 = []
    data = []
    musics2.map(value => {
      newArray2.push({
        label: value,
        value: newArray[value],
      })
      if (newArray[value] > 0) {
        data.push(newArray[value])
      }
      totalMusic += newArray[value]
    })
    pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: this.randomColor(index),
          onPress: () => {
            //console.log(value)
          },
        },
        key: `pie-${index}`,
      }))
    console.log(pieData)
    this.setState({
      musicsArray: newArray2,
      musicsTotal: totalMusic,
      pieData2: pieData,
    })

    // MODES
    let modes = data.modes
    modes = Object.values(data?.modes || {})
    newArray = []
    totalMode = 0
    modes.map(value1 => {
      value1.map(value2 => {
        if (typeof newArray[value2.label] === 'undefined') {
          newArray[value2.label] = 0
        }
        newArray[value2.label] = parseFloat(newArray[value2.label]) + parseFloat(value2.total_minutes)
      })
    })
    //console.log(newArray)
    let totalMode = 0
    modes2 = Object.keys(newArray)
    newArray2 = []
    data = []
    modes2.map(value => {
      newArray2.push({
        label: value,
        value: newArray[value],
      })
      if (newArray[value] > 0) {
        data.push(newArray[value])
      }
      totalMode += newArray[value]
    })
    pieData = data
      .filter(value => value > 0)
      .map((value, index) => ({
        value,
        svg: {
          fill: this.randomColor(index),
          onPress: () => {
            //console.log(value)
          },
        },
        key: `pie-${index}`,
      }))
    this.setState({
      modesArray: newArray2,
      modesTotal: totalMode,
      pieData3: pieData,
    })
  }

  randomColor = index => {
    switch (index) {
      case 0:
        return global.mainColor
      case 1:
        return '#808080'
      case 2:
        return '#ffffff'
      case 3:
        return '#9102f0'
    }
  }

  render() {
    let d = new Date()
    let curDate = d.getDay()
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'flex-start',
          backgroundColor: 'black',
        }}
      >
        <Loader loading={this.state.loading} />
        <View style={globalStyles.titleBar}>
          <Text style={{ fontSize: 20, color: 'white' }}>{global.language[this.state.date_range ? 'date_range' : 'title_current_activity']}</Text>
        </View>
        <ScrollView style={{ padding: 40 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <WeekDaysMarker />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 40, marginBottom: 20 }}>
            <Text style={{ fontStyle: 'italic', color: 'white' }}>{this.state.label3}</Text>
          </View>
          <View style={{}}>
            <View style={{ width: '100%', position: 'absolute' }}>
              {this.state.tonesArray != null &&
                this.state.tonesArray.length > 0 &&
                this.state.tonesArray.map((value, index) => {
                  return (
                    <View key={index} style={{ flex: 1 }}>
                      {index == 0 && <View style={{ width: '90%' }}></View>}
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ width: 2, height: '100%', backgroundColor: global.authButtonColor }}></View>
                        <View style={{ width: '60%', flexDirection: 'row', backgroundColor: 'transparent' }}>
                          <Text style={{ flex: 1, color: '#fff', padding: 5 }}>{value.label}</Text>
                          <Text style={{ flex: 1, color: '#fff', padding: 5, textAlign: 'right' }}>{parseFloat(value.value).toFixed(2)} min.</Text>
                        </View>
                      </View>

                      <View style={{ width: '80%' }}></View>

                      {index == this.state.tonesArray.length - 1 && (
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <View style={{ width: 2, height: '100%', backgroundColor: global.authButtonColor }}></View>
                            <View style={{ width: '60%', flexDirection: 'row', backgroundColor: 'transparent' }}>
                              <Text style={[{ flex: 1, padding: 5, color: 'white', fontWeight: 'bold' }]}>Total</Text>
                              <Text style={[{ flex: 1, padding: 5, textAlign: 'right', color: 'white', fontWeight: 'bold' }]}>
                                {parseFloat(this.state.tonesTotal).toFixed(2)} min.
                              </Text>
                            </View>
                          </View>
                          <View style={{ width: '80%' }}></View>
                        </View>
                      )}
                    </View>
                  )
                })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }}>
                {this.state.pieData != null && <PieChart style={{ height: 100, marginTop: 20, marginLeft: 35 }} data={this.state.pieData} />}
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60, marginBottom: 20 }}>
            <Text style={{ fontStyle: 'italic', color: 'white' }}>{this.state.label2}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            <View style={{ width: '100%', position: 'absolute', justifyContent: 'center', marginTop: 20 }}>
              {this.state.musicsArray != null &&
                this.state.musicsArray.length > 0 &&
                this.state.musicsArray.map((value, index) => {
                  return (
                    <View key={index} style={{ flex: 1 }}>
                      {index == 0 && <View style={{ width: '90%' }}></View>}
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ width: 2, height: '100%', backgroundColor: global.authButtonColor }}></View>
                        <View style={{ width: '60%', flexDirection: 'row', backgroundColor: 'transparent' }}>
                          <Text style={{ flex: 1, color: '#fff', padding: 5 }}>{value.label}</Text>
                          <Text style={{ flex: 1, color: '#fff', padding: 5, textAlign: 'right' }}>{parseFloat(value.value).toFixed(2)} min.</Text>
                        </View>
                      </View>
                      {/*   <View style={{  width: '80%', height: 2 ,backgroundColor:global.authButtonColor}}>
                                            </View> */}
                      {index == this.state.musicsArray.length - 1 && (
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <View style={{ width: 2, height: '100%', backgroundColor: global.authButtonColor }}></View>
                            <View style={{ width: '60%', flexDirection: 'row', backgroundColor: 'transparent' }}>
                              <Text style={[{ flex: 1, padding: 5, color: 'white', fontWeight: 'bold' }]}>Total</Text>
                              <Text style={[{ flex: 1, padding: 5, textAlign: 'right', color: 'white', fontWeight: 'bold' }]}>
                                {parseFloat(this.state.musicsTotal).toFixed(2)} min.
                              </Text>
                            </View>
                          </View>
                          <View style={{ width: '80%' }}></View>
                        </View>
                      )}
                    </View>
                  )
                })}
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }}>
                {this.state.pieData2 != null && <PieChart style={{ height: 100, marginTop: 0, marginLeft: 35 }} data={this.state.pieData2} />}
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 60, marginBottom: 20 }}>
            <Text style={{ fontStyle: 'italic', color: 'white' }}>{this.state.label4}</Text>
          </View>
          <View style={{}}>
            <View style={{ width: '100%', position: 'absolute' }}>
              {!!this.state.modesArray &&
                this.state.modesArray.length > 0 &&
                this.state.modesArray.map((value, index) => {
                  return (
                    <View key={index} style={{ flex: 1 }}>
                      {index == 0 && <View />}
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <View style={{ width: 2, height: '100%', backgroundColor: global.authButtonColor }}></View>
                        <View style={{ width: '60%', flexDirection: 'row', backgroundColor: 'transparent' }}>
                          <Text style={{ flex: 1, color: '#fff', padding: 5 }}>{value.label}</Text>
                          <Text style={{ flex: 1, color: '#fff', padding: 5, textAlign: 'right' }}>{parseFloat(value.value).toFixed(2)} min.</Text>
                        </View>
                      </View>
                      {index == this.state.modesArray.length - 1 && (
                        <View>
                          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <View style={{ width: 2, height: '100%', backgroundColor: global.authButtonColor }}></View>
                            <View style={{ width: '60%', flexDirection: 'row' }}>
                              <Text style={[{ flex: 1, padding: 5, color: 'white', fontWeight: 'bold' }]}>Total</Text>
                              <Text style={[{ flex: 1, padding: 5, textAlign: 'right', color: 'white', fontWeight: 'bold' }]}>
                                {parseFloat(this.state.modesTotal).toFixed(2)} min.
                              </Text>
                            </View>
                          </View>
                        </View>
                      )}
                    </View>
                  )
                })}
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }} />
              <View style={{ flex: 1 }}>
                {this.state.pieData3 != null && <PieChart style={{ height: 100, marginLeft: 35, marginTop: -20 }} data={this.state.pieData3} />}
              </View>
            </View>
          </View>
          <View style={{ height: 150 }} />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const mapStateToProps = state => ({
  general_datas: datasetSelector(state, 'general_datas'),
  imei: datasetSelector(state, 'imei'),
})
const mapDispatchToProps = dispatch => ({
  setGeneralDatas: data => dispatch(setDatasetToReducer(data, 'general_datas')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Activity2Screen)
