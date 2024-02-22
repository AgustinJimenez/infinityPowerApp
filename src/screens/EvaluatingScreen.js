import React from 'react'
import { View, Image, FlatList, Dimensions, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import { globalStyles } from '../helpers/styles'
const { width } = Dimensions.get('window')
import person from '../img/icon_account.png'
import capitalizeWords from '../helpers/capitalizeWords'
import Loader from '../helpers/loader'
import BottomNavigationBar from '../components/BottomNavigationBar'

class EvaluatingScreen extends React.Component {
  static navigationOptions = {
    //To hide the NavigationBar from current Screen
    header: null,
  }
  constructor() {
    super()
    this.state = {
      objectiveName: '',
      description: '',
      expand2: false,
      evaluated: null,
      loading: true,
    }

    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
  }
  componentWillMount() {
    this.getUserObjectives()
  }
  onlyNotes = () => this.props.navigation.getParam('onlyNotes')
  userId = () => this.props.navigation.getParam('muserId')
  userName = () => this.props.navigation.getParam('muserName')

  getUserObjectives = async () => {
    newObj = {}

    let token = await AsyncStorage.getItem('userToken')
    let tokenType = await AsyncStorage.getItem('userTokenType')
    let imei = await AsyncStorage.getItem('user')

    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone
    newObj['tokenType'] = tokenType
    newObj['token'] = token

    this.setState({ loading: true })
    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])
    formdata.append('muser_id', this.userId())

    fetch(fn.url + 'actions/get_user_objectives_list', {
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
  render() {
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
            showsVerticalScrollIndicator
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
                {capitalizeWords(global?.language?.habit)}
              </Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: 30 }}>
              <View
                style={{
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: global.txtWhiteColor,
                    fontWeight: '400',
                    width: '100%',
                    textAlign: 'center',
                  }}
                >
                  {global?.language?.evaluating}
                </Text>
              </View>
              <View
                style={{
                  height: 70,
                  backgroundColor: 'black',
                  width: '100%',
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                }}
              >
                <Image source={person} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                <Text style={{ color: 'white', fontSize: 16, marginLeft: 5 }} numberOfLines={1}>
                  {` ${this.userName()}`}
                </Text>
              </View>
              <View style={{ maxHeight: 450 }}>
                <FlatList
                  data={this.state.evaluated}
                  contentContainerStyle={{
                    marginHorizontal: 20,
                  }}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('EvaluationScreen', {
                          objectiveObject: item,
                          onlyNotes: this.onlyNotes(),
                        })
                      }
                      style={{
                        width: '100%',
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
                        <View style={{ width: '5%' }}>
                          <Text
                            style={{
                              color: global.mainColor,
                              fontSize: 16,
                              marginLeft: 5,
                            }}
                          >
                            {' '}
                            •
                          </Text>
                        </View>
                        <View style={{ width: '75%' }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              marginLeft: 5,
                            }}
                            numberOfLines={1}
                          >
                            {' '}
                            {item.objective}
                          </Text>
                        </View>
                        <View style={{ width: '20%' }}>
                          <Text
                            style={{
                              color: 'white',
                              fontSize: 16,
                              marginLeft: 5,
                            }}
                          >
                            {' '}
                            {`${item.achieved}%`}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: global.mainColor,
                          width: '90%',
                          height: 1,
                          marginTop: 5,
                        }}
                      />
                      <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '5%' }}>
                          <Text
                            style={{
                              color: global.mainColor,
                              fontSize: 16,
                              marginLeft: 5,
                            }}
                          >
                            {' '}
                          </Text>
                        </View>
                        <View style={{ width: '55%' }} />
                        <View style={{ width: '40%' }}>
                          <Text
                            style={{
                              color: global.mainColor,
                              fontSize: 16,
                              marginRight: 15,
                              textAlign: 'right',
                            }}
                          >
                            {item.consistency > 75 ? global?.language?.label_consistent : global?.language?.not_consistent}
                          </Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={item => item.key}
                />
              </View>
            </View>
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
        </SafeAreaView>
      </View>
    )
  }
}

export default EvaluatingScreen
