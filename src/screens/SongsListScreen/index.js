import React from 'react'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { globalStyles, secondaryColor } from '../../helpers/styles'
import { ScrollView } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import { PhrasesContext } from '../../context/PhrasesProvider'
import ModalSelector from 'react-native-modal-selector'
import Modal from '../../helpers/modal2'
import Loader from '../../helpers/loader'
import { datasetSelector } from '../../redux/selectors'
import { connect } from 'react-redux'
import BottomNavigationBar from '../../components/BottomNavigationBar'
import { tailwind } from '../../tailwind'
import { ImageBackground } from 'react-native'
import BgMainIconImg from '../../img/background-home.jpg'
import { NotificationCountIcon } from '../../components/NotificationIconComponent'
import { Icon } from 'native-base'

class SongsListScreen extends React.Component {
  state = {
    songs: [],
    phrases: [],
    applang: null,
    displayRoutine: null,
    newRoutineName: '',
    modalText1: '',
    modalText2: '',
    modalText3: '',
    modalText4: '',
    modal3: false,
    enableRemovePhrase: false,
    scrollOffset: 0,
    scrollEnable: true,
    showEditRoutineName: false,
    showModalOrder: false,
  }

  static navigationOptions = {
    header: null,
  }

  static contextType = PhrasesContext

  componentDidMount() {
    this.setState({ loading: true, applang: this.props.app_configuration.language })
  }

  disableScroll = () => {
    this.setState({ scrollEnable: false })
  }
  enableScroll = () => {
    this.setState({ scrollEnable: true })
  }

  loadSongList = async () => {
    let songs = await AsyncStorage.getItem('songs')
    try {
      if (songs != null) {
        songs = JSON.parse(songs)
        songs = songs.result
        console.log({ songs })
        this.setState({ songs, loading: false })
      }
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  loadRoutineList = () => {
    instance = this
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(value => {
          fetch(fn.url + 'mobile/users/routine_list', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: 'lang=' + global.lange + '&imei=' + user.imei + '&timezone=' + user.timezone,
          })
            .then(response => response.json())
            .then(res => {
              if (res.status == 1) {
                instance.setState({ rutinas: res.data, loading: false })
              }
            })
        })
      })
    })
  }

  handleShow = () => {
    this.setState({ showModalOrder: false })
  }

  loadRoutinePhrases = async (index, displayPhrases) => {
    const routineId = this.state?.rutinas?.[index]?.id
    console.log('loadRoutinePhrases ===> ', { index, displayPhrases, rutinas: this.state.rutinas, routineId })
    instance = this

    let userToken = await AsyncStorage.getItem('userToken')
    let userTokenType = await AsyncStorage.getItem('userTokenType')
    let user = await AsyncStorage.getItem('user')
    let songs = await AsyncStorage.getItem('songs')
    user = JSON.parse(user)
    // console.log({ userToken, userTokenType, user })

    // console.log({ songs })
    this.loadSongList()
    // AsyncStorage.getItem('userToken').then(token => {
    //   AsyncStorage.getItem('userTokenType').then(tokenType => {
    //     AsyncStorage.getItem('user').then(value => {
    //       const user = JSON.parse(value)
    //       fetch(fn.url + 'mobile/users/get_profile_data', {
    //         method: 'POST',
    //         headers: new Headers({
    //           Authorization: tokenType + ' ' + token,
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         }),
    //         body: 'lang=' + this.state.applang + '&imei=' + user.imei + '&timezone=' + this.state.appgmt + '&routine_id=' + routineId,
    //       })
    //         .then(res => res.json())
    //         .then(json => {
    //           const phrases = json.result.routinePhrases.items
    //           if (instance.state.displayRoutine == index && displayPhrases == true) {
    //             instance.setState({ phrases: phrases, displayRoutine: index })
    //           } else if (instance.state.displayRoutine == index && displayPhrases != true) {
    //             instance.setState({ phrases: phrases, displayRoutine: null })
    //           } else {
    //             instance.setState({ phrases: phrases, displayRoutine: index })
    //           }
    //         })
    //     })
    //   })
    // })
  }

  saveRoutineHandler = () => {
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(user => {
          user = JSON.parse(user)
          fetch(fn.url + 'mobile/users/new_routine', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: 'lang=' + global.lang + '&imei=' + user.imei + '&timezone=' + user.timezone + '&routine_name=' + this.state.newRoutineName,
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) this.loadRoutineList()
            })
            .finally(() => {
              this.setState({
                loading: false,
              })
            })
        })
      })
    })
  }

  removeRoutineHandler = index => {
    this.setState({ loading: true })
    let routineId = this.state?.rutinas?.[index]?.id
    if (!routineId) return
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          user = JSON.parse(imei)
          fetch(fn.url + 'mobile/users/remove_routine', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: 'lang=' + global.lang + '&imei=' + user.imei + '&routine_id=' + routineId,
          })
            .then(response => response.json())
            .then(async json => {
              if (json.status == 1) {
                let routines = this.state.rutinas
                routines.splice(index, 1)

                this.setState({
                  rutinas: routines,
                  scrollEnable: false,
                })
              } else {
                alert(global?.language?.msg_removed_failed)
              }
            })
            .catch(error => {
              alert(global?.language?.msg_removed_failed)
            })
            .finally(() => {
              this.setState({
                loading: false,
              })
            })
        })
      })
    })
  }

  removePhrase = item => {
    this.setState({
      loading: true,
    })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          user = JSON.parse(imei)
          fetch(fn.url + 'mobile/users/remove_phrase_from', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
              'lang=' +
              global.lang +
              '&imei=' +
              user.imei +
              '&timezone=' +
              user.timezone +
              '&source=myRoutine' +
              '&phrase_id=' +
              item.id +
              '&routine_id=' +
              item.muser_routine_id,
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) {
                this.loadRoutinePhrases(this.state.displayRoutine, true)
                this.setState({
                  enableRemovePhrase: true,
                })
              }
            })
            .finally(() => {
              this.setState({
                loading: false,
              })
            })
        })
      })
    })
  }

  renderModal = item => {
    return (
      <ModalSelector
        data={[{ key: 0, value: 'quitar', label: global?.language?.label_remove }]}
        onChange={option => {
          if (option.value == 'quitar') {
            this.setState({
              loading: true,
            })
            AsyncStorage.getItem('userToken').then(token => {
              AsyncStorage.getItem('userTokenType').then(tokenType => {
                AsyncStorage.getItem('user').then(imei => {
                  user = JSON.parse(imei)
                  fetch(fn.url + 'mobile/users/remove_phrase_from', {
                    method: 'POST',
                    headers: new Headers({
                      Authorization: tokenType + ' ' + token,
                      'Content-Type': 'application/x-www-form-urlencoded',
                    }),
                    body:
                      'lang=' +
                      global.lang +
                      '&imei=' +
                      user.imei +
                      '&timezone=' +
                      user.timezone +
                      '&source=myRoutine' +
                      '&phrase_id=' +
                      item.id +
                      '&routine_id=' +
                      item.muser_routine_id,
                  }).finally(() => {
                    this.setState({
                      loading: false,
                    })
                  })
                })
              })
            })
          }
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
          <Image source={require('img/send.png')} style={{ width: 20, height: 20 }} />
        </View>
      </ModalSelector>
    )
  }

  showModal = item => {
    this.setState({
      modalText1: global?.language?.label_affirmation,
      modalText2: item.text_affirmative,
      modalText3: global?.language?.label_gratitude,
      modalText4: item.text_gratitude,
      modal3: true,
    })
  }
  handleMoveRoutine = data => {
    this.setState({
      loading: true,
      rutinas: data.data,
    })
    let newArray = []
    data.data.map((value, index) => {
      let newObj = {}
      newObj['id'] = value.id
      newObj['order_by'] = index + 1

      newArray.push(newObj)
    })

    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(user => {
          user = JSON.parse(user)
          let newObj = {}
          newObj['lang'] = user.default_language
          newObj['imei'] = user.imei
          newObj['timezone'] = user.timezone
          newObj['routines'] = newArray

          fetch(fn.url + 'mobile/users/reorder_routines', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify(newObj),
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) {
                this.loadRoutineList()
                /* fetch(fn.url + 'mobile/users/get_profile_data', {
                                        method: 'POST',
                                        headers: new Headers({
                                            'Authorization': tokenType + ' ' + token,
                                            'Content-Type': 'application/x-www-form-urlencoded',
                                        }),
                                        body: "lang=" + global.lange + "&imei=" + user.imei + "&timezone=" + user.timezone
                                    })
                                        .then((response) => response.json())
                                        .then((json) => {
                                            this.setState({
                                                loading: false,
                                            });
                                            if (json.status == 1) {
                                                AsyncStorage.setItem('reprocess', 'true');
                                                AsyncStorage.setItem('get_profile_data', JSON.stringify(json))
                                            }
                                        })
                                        .catch((error) => { }); */
              } else {
                setTimeout(() => {
                  alert(json.message)
                }, 200)
              }
            })
            .finally(() => {
              this.setState({
                loading: false,
              })
            })

          /* }) */
        })
      })
    })
  }

  handleMove = data => {
    this.setState({
      loading: true,
      phrases: data.data,
    })
    let newArray = []
    data.data.map((value, index) => {
      let newObj = {}
      newObj['phrase_id'] = value.id
      newObj['order_by'] = index + 1
      newArray.push(newObj)
    })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(user => {
          user = JSON.parse(user)
          let newObj = {}
          newObj['lang'] = user.default_language
          newObj['imei'] = user.imei
          newObj['timezone'] = user.timezone
          newObj['phrases'] = newArray
          newObj['routine_id'] = this.state.rutinas[this.state.displayRoutine].id
          newObj['name'] = this.state.rutinas[this.state.displayRoutine].name
          fetch(fn.url + 'mobile/users/save_routine', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/json',
            }),
            body: JSON.stringify(newObj),
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) {
                fetch(fn.url + 'mobile/users/get_profile_data', {
                  method: 'POST',
                  headers: new Headers({
                    Authorization: tokenType + ' ' + token,
                    'Content-Type': 'application/x-www-form-urlencoded',
                  }),
                  body: 'lang=' + global.lange + '&imei=' + user.imei + '&timezone=' + user.timezone,
                })
                  .then(response => response.json())
                  .then(json => {
                    if (json.status == 1) {
                      AsyncStorage.setItem('reprocess', 'true')
                      AsyncStorage.setItem('get_profile_data', JSON.stringify(json))
                    }
                  })
                  .catch(error => {})
              } else {
                setTimeout(() => {
                  alert(json.message)
                }, 200)
              }
            })
            .finally(() => {
              this.setState({
                loading: false,
              })
            })
        })
      })
    })
  }

  editPhraseHandler = phrase => {
    this.props.navigation.navigate('Affirmations', {
      item: phrase,
      editRoutinePhrase: true,
    })
  }

  routineNameHandler = index => {
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(user => {
          user = JSON.parse(user)
          fetch(fn.url + 'mobile/users/change_routine_name', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body:
              'lang=' +
              global.lang +
              '&imei=' +
              user.imei +
              '&timezone=' +
              user.timezone +
              '&name=' +
              this.state.newRoutineName +
              '&routine_id=' +
              this.state.rutinas[this.state.displayRoutine].id,
          })
            .then(response => response.json())
            .then(json => {
              if (json.status == 1) {
                this.loadRoutineList()
              }
            })
            .finally(() => {
              this.setState({
                loading: false,
              })
            })
        })
      })
    })
  }

  /*  handleScroll = () => {
         this.setState({ scrollEnable: !this.state.enableScroll})
     } */

  renderOld() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%', paddingTop: 30 }]}>
        <NavigationEvents
          onDidFocus={() => {
            //this.setState({ displayRoutine: null })
            this.loadRoutinePhrases(this.state.displayRoutine, true)
          }}
        />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
            padding: 20,
            paddingTop: 40,
          }}
        >
          <ScrollView
            onScrollEndDrag={({ nativeEvent }) => {
              this.setState({ scrollOffset: nativeEvent.contentOffset['y'] })
            }}
            onMomentumScrollEnd={({ nativeEvent }) => {
              this.setState({ scrollOffset: nativeEvent.contentOffset['y'] })
            }}
            scrollEnabled={this.state.scrollEnable}
          >
            <Loader loading={this.state.loading} />
            <Modal state={this} />
            <View style={{ flexDirection: 'row', width: '100%', height: 50, justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 22 }}> MÚSICAS CANTADAS </Text>
              </View>
            </View>
            {this.state.songs &&
              this.state.songs.map((song, index) => {
                return (
                  <View>
                    {console.log('flatlist index', index)}
                    <View
                      style={{
                        flexDirection: 'row',
                        borderColor: 'white',
                        borderRadius: 10,
                        height: 80,
                        borderWidth: 2,
                        marginTop: 10,
                        justifyContent: 'space-between',
                      }}
                    >
                      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '65%' }}>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('SongsPlayerScreen', {
                              info: song,
                            })
                          }}
                        >
                          <Image source={require('img/circle-play.png')} style={{ width: 50, height: 50, marginLeft: 10 }} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('SongsPlayerScreen', {
                              info: song,
                            })
                          }}
                        >
                          <Text style={{ color: 'white', paddingHorizontal: 10, fontSize: 20 }}>
                            {song.name.length >= 25 ? song.name.slice(0, 25) + '..' : song.name}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              })}
            <View style={{ height: 75 }}></View>
          </ScrollView>

          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
        </SafeAreaView>
      </View>
    )
  }
  renderHeader = () => {
    return (
      <View style={tailwind('flex flex-col')}>
        {/* Top Buttons */}
        <View style={tailwind('flex flex-row justify-between mb-2')}>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('TodayActivitiesScreen')
            }}
          >
            <Icon
              type='MaterialCommunityIcons'
              name={'bell'}
              style={[
                tailwind('text-white  text-4xl'),
                {
                  shadow: { elevation: 10 },
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.5,
                  shadowRadius: 2,
                },
              ]}
            />
            <View style={tailwind('absolute right-0 top-0')}>
              <NotificationCountIcon></NotificationCountIcon>
            </View>
          </TouchableOpacity>
          {/* Title */}
          <View style={tailwind('flex flex-row justify-center')}>
            <Text style={tailwind('text-2xl font-bold text-white capitalize')}>{global?.language?.musical_affirmations}</Text>
          </View>
          {/* empty */}
          <View style={tailwind('w-8')}></View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative')}>
        <NavigationEvents
          onDidFocus={() => {
            //this.setState({ displayRoutine: null })
            this.loadRoutinePhrases(this.state.displayRoutine, true)
          }}
        />
        <Loader loading={this.state.loading} />
        <ImageBackground source={BgMainIconImg} imageStyle={{ resizeMode: 'stretch' }} style={tailwind('absolute h-full w-full ')} />
        <View style={[tailwind('absolute w-full h-full'), { backgroundColor: secondaryColor(0.8) }]}></View>

        <SafeAreaView style={tailwind('flex')}>
          <ScrollView>
            <View style={tailwind('flex p-6 flex-col justify-start pb-24')}>
              {/* Header */}
              {this.renderHeader()}
              <View style={tailwind('mb-5')}></View>
              {this.renderSongs()}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }

  renderSongs = () => {
    return <>{this.state.songs && this.state.songs.map(this.renderSongsItem)}</>
  }

  renderSongsItem = (song, index) => {
    return (
      <View style={tailwind('relative mb-4')}>
        <View style={tailwind('mb-4')}>
          {/* bg transparent */}
          <View style={tailwind('absolute top-0 left-0 w-full h-full bg-black opacity-25 rounded-xl')}></View>
          {/* Song Info */}
          <View style={tailwind('p-5')}>
            {/* Song Title */}
            <View style={tailwind('flex flex-row items-center mb-1')}>
              <View style={tailwind('flex flex-row flex-grow items-center pr-20')}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('SongsPlayerScreen', {
                      info: song,
                    })
                  }}
                >
                  <View style={tailwind('-ml-2 mr-3 -mt-2 -mb-2 h-12 w-12 bg-white rounded-full flex justify-center items-center')}>
                    <Icon type='FontAwesome' name='play' style={tailwind('ml-1 text-black text-2xl')} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('SongsPlayerScreen', {
                      info: song,
                    })
                  }}
                >
                  <View>
                    <Text style={tailwind('font-bold text-lg text-white')}>{song.name.length >= 25 ? song.name.slice(0, 25) + '..' : song.name}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}
const mapStateToProps = state => ({
  app_configuration: datasetSelector(state, 'app_configuration'),
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SongsListScreen)
