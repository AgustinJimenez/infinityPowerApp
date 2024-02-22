import React from 'react'
import { View, FlatList, Dimensions, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import { globalStyles } from '../../helpers/styles'
const { width } = Dimensions.get('window')
import Loader from 'helpers/loader'
import BottomNavigationBar from '../../components/BottomNavigationBar'

class ProgressListScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      objectives: [],
    }
    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
  }
  componentDidMount() {
    this.loadObjectives()
  }
  loadObjectives = async () => {
    newObj = {}
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

    fetch(fn.url + 'actions/get_objective_list', {
      method: 'POST',
      headers: new Headers({
        Authorization: newObj['tokenType'] + ' ' + newObj['token'],
      }),
      body: formdata,
    })
      .then(response => response.json())
      .then(json => {
        console.log(json)

        this.setState({ loading: false, objectives: json.result })
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
              Progreso
            </Text>
          </View>
          <ScrollView contentContainerStyle={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
            <View
              style={{
                width: '89%',
                backgroundColor: 'black',
                marginTop: 8,
                borderRadius: 10,
                paddingBottom: 75,
              }}
            >
              <FlatList
                data={this.state.objectives}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('ObjectiveDetailsScreen', {
                        objective: item,
                      })
                    }
                    style={{
                      width: '100%',
                      minHeight: 70,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginVertical: 5,
                      borderColor: '#20B2AA85',
                      borderWidth: 1,
                      borderRadius: 5,
                      paddingVertical: 10,
                    }}
                  >
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <View style={{ width: '5%' }}>
                        <Text
                          style={{
                            color: '#20B2AA85',
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
                            borderRightColor: '#20B2AA85',
                            borderRightWidth: 1,
                            paddingRight: 5,
                          }}
                        >
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
                        backgroundColor: 'black',
                        width: '90%',
                        height: 3,
                        marginTop: 5,
                      }}
                    />
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                      <View style={{ width: '5%' }}>
                        <Text
                          style={{
                            color: '#20B2AA85',
                            fontSize: 16,
                            marginLeft: 5,
                          }}
                        >
                          {' '}
                        </Text>
                      </View>
                      <View style={{ width: '55%' }}>
                        <Text style={{ color: '#999', fontSize: 16, marginLeft: 5 }} numberOfLines={1}>
                          {' '}
                          {item.achieved_split}
                        </Text>
                      </View>
                      {item.consistency_status === 'Consistent' && (
                        <View style={{ width: '40%' }}>
                          <Text
                            style={{
                              color: '#20B2AA85',
                              fontSize: 16,
                              marginRight: 15,
                              textAlign: 'right',
                            }}
                          >
                            {' '}
                            {item.consistency_status}
                          </Text>
                        </View>
                      )}
                    </View>
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
export default ProgressListScreen
