import React, { Component, Fragment } from 'react'
import { View, Text, Switch, TouchableOpacity, Alert, Image, ScrollView } from 'react-native'
import { NavigationEvents, SafeAreaView } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import * as fn from 'helpers/scripts'
import { FlatList } from 'react-native-gesture-handler'
import { PhrasesContext } from '../context/PhrasesProvider'
import Modal from '../helpers/modal2'
import ModalSelector from 'react-native-modal-selector'
import Loader from 'helpers/loader'
import BottomNavigationBar from '../components/BottomNavigationBar'
import Dialog, { DialogContent, DialogTitle, DialogButton, DialogFooter } from 'react-native-popup-dialog'
import capitalizeWords from '../helpers/capitalizeWords'
import { tailwind } from '../tailwind'
import BgMainIconImg from '../img/background-home.jpg'
import AffirmationAddedIcon from '../img/affirmation_added_icon.png'
import { ImageBackground } from 'react-native'
import { secondaryColor } from '../helpers/styles'
import { connect } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import { Icon } from 'native-base'

class PhrasesScreen extends Component {
  state = {
    phrases: [],
    selectedPhrases: [],
    modalText1: '',
    modalText2: '',
    modalText3: '',
    modalText4: '',
    modal3: false,
    selectedForRemove: [],
  }

  static navigationOptions = {
    header: null,
  }

  static contextType = PhrasesContext

  componentDidMount() {
    this.loadPhrases()
  }

  loadPhrases = () => {
    this.setState({ loading: true })
    instance = this
    const { params } = this.props.navigation.state
    const routineId = params ? params.routineId : null
    const categoryId = params ? params.categoryId : null
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(value => {
          const user = JSON.parse(value)
          fetch(fn.url + 'mobile/users/get_profile_data', {
            method: 'POST',
            headers: new Headers({
              Authorization: tokenType + ' ' + token,
              'Content-Type': 'application/x-www-form-urlencoded',
            }),
            body: 'lang=' + this.state.applang + '&imei=' + user.imei + '&timezone=' + this.state.appgmt + '&routine_id=' + routineId,
          })
            .then(res => res.json())
            .then(json => {
              console.log(json)
              let phrases = json.result.routinePhrases.items.map(el => {
                return {
                  ...el,
                  selected: false,
                }
              })

              this.setState({ routinePhrases: phrases })
            })

          if (categoryId == null || categoryId == undefined) {
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
                  console.log(json.result.userPhrasesDraft.items)
                  const result = json.result.userPhrasesDraft.items.map(el => {
                    return { ...el, phrase_id: el.muser_phrase_id }
                  })

                  let array = result.map(el => {
                    if (el.status == 0) {
                      let indice = false
                      result.forEach((element, index) => {
                        if (element.text_affirmative == el.text_affirmative && element.text_gratitude == el.text_gratitude && element.status != el.status) {
                          indice = true
                          console.log('entre hasta aca')
                        }
                      })
                      if (indice == true) {
                        console.log('no se guardo')
                      } else {
                        return el
                      }
                    } else {
                      return el
                    }
                  })
                  console.log('result', result)
                  console.log('final', array)
                  array = array.filter(el => el != undefined)
                  console.log('final2', array)

                  let newCategoryPhrases = array.map(el => {
                    this.context.selectedPhrases.forEach(phrase => {
                      if (el.phrase_id == phrase.phrase_id) {
                        el.selected = true
                      }

                      if (el.phrase_id != phrase.phrase_id && el.selected != true) {
                        el.selected = false
                      }
                    })
                    return el
                  })

                  newCategoryPhrases = newCategoryPhrases.map(el => {
                    return { ...el, disabled: false }
                  })

                  const phrasesInRoutine = this.context.actualPhrases
                  newCategoryPhrases = newCategoryPhrases.map(phrase => {
                    phrasesInRoutine.forEach(el => {
                      if (el.id == phrase.phrase_id && phrase.disabled == false) {
                        phrase.disabled = true
                        phrase.selected = true
                      }
                    })
                    return phrase
                  })
                  this.setState({ phrases: newCategoryPhrases, loading: false })
                }
              })
          } else {
            fetch(fn.url + 'phrases', {
              method: 'POST',
              headers: new Headers({
                Authorization: tokenType + ' ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
              }),
              body: 'lang=' + global.lange + '&imei=' + user.imei + '&timezone=' + user.timezone + '&routine_id=' + routineId + '&category_id=' + categoryId,
            })
              .then(response => response.json())
              .then(json => {
                instance.setState({
                  loading: false,
                })

                if (json.status == 1) {
                  console.log('eljson', json)

                  let newCategoryPhrases = json.result.map(el => {
                    this.context.selectedPhrases.forEach(phrase => {
                      if (el.phrase_id == phrase.phrase_id) {
                        el.selected = true
                      }

                      if (el.phrase_id != phrase.phrase_id && el.selected != true) {
                        el.selected = false
                      }
                    })
                    return el
                  })
                  newCategoryPhrases = newCategoryPhrases.map(el => {
                    return { ...el, disabled: false }
                  })

                  const phrasesInRoutine = this.context.actualPhrases
                  newCategoryPhrases = newCategoryPhrases.map(phrase => {
                    phrasesInRoutine.forEach(el => {
                      if (el.id == phrase.phrase_id && phrase.disabled == false) {
                        phrase.disabled = true
                        phrase.selected = true
                      }
                    })
                    return phrase
                  })

                  this.setState({ phrases: newCategoryPhrases, loading: false })
                }
              })
          }
        })
      })
    })
  }

  toggleSwitch = index => {
    const oldPhrases = this.state.phrases
    oldPhrases[index].selected = !oldPhrases[index].selected
    const selectedPhrases = oldPhrases.filter(el => el.selected == true)
    this.setState({ phrases: oldPhrases, selectedPhrases: selectedPhrases })

    this.context.storePhrase(oldPhrases[index])
  }

  savePhrasesHandler = () => {
    console.log('[save]')
    this.setState({ loading: true })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(value => {
          const user = JSON.parse(value)
          this.context.selectedPhrases.map(async item => {
            let newObj = {}
            newObj['lang'] = global.lang
            newObj['imei'] = user.imei
            newObj['timezone'] = user.timezone
            newObj['source'] = item.source
            newObj['phrase_id'] = item.phrase_id
            newObj['destination'] = 'myRoutine'
            newObj['routine_id'] = this.props.navigation.state.params.routineId

            await fetch(fn.url + 'mobile/users/add_phrase_to', {
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
                }
                if (json.result == 0) {
                  fetch(fn.url + 'mobile/users/get_profile_data', {
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
                      '&routine_id=' +
                      this.props.navigation.state.params.routineId,
                  })
                    .then(res => res.json())
                    .then(json => {
                      console.log(json)
                      const phrases = json.result.routinePhrases.items
                      instance.setState({ routinePhrases: phrases, visiblePhrasesChooser: true })
                    })
                }
              })
              .catch(error => {
                this.setState({
                  loading: false,
                })
              })
          })
          this.setState({
            loading: false,
          })
          this.props.navigation.navigate('MeditationHome')
        })
      })
    })
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

  /* renderModalSelection = (item) => {
        return(
            
          
        )
    } */

  onChangeModal = item => option => {
    if (option.value == 'Ver') {
      this.showModal(item)
    }
    if (option.value == 'Editar') {
      this.props.navigation.navigate('Affirmations', {
        item: item,
        phrases: this.state.phrases,
        editablePhrase: true,
      })
    }
    if (option.value == 'Quitar') {
      instance = this
      instance.setState({
        loading: true,
      })
      AsyncStorage.getItem('userToken').then(token => {
        AsyncStorage.getItem('userTokenType').then(tokenType => {
          AsyncStorage.getItem('user').then(imei => {
            imei = JSON.parse(imei)
            //console.log("lang=" + imei.default_language + "&imei=" + imei.imei + "&timezone=" + imei.timezone + "&source=userPhrase" + "&phrase_id=" + item.muser_phrase_id)
            fetch(fn.url + 'mobile/users/remove_phrase_from', {
              method: 'POST',
              headers: new Headers({
                Authorization: tokenType + ' ' + token,
                'Content-Type': 'application/x-www-form-urlencoded',
              }),
              body:
                'lang=' +
                imei.default_language +
                '&imei=' +
                imei.imei +
                '&timezone=' +
                imei.timezone +
                '&source=userPhrase' +
                '&phrase_id=' +
                item.muser_phrase_id,
            })
              .then(response => response.json())
              .then(json => {
                //console.log(json)
                if (json.status == 1) {
                  instance.loadPhrases()
                } else {
                  instance.setState({
                    loading: false,
                  })
                  setTimeout(() => {
                    alert(json.message)
                  }, 100)
                }
              })
              .catch(error => {
                instance.setState({
                  loading: false,
                })
              })
          })
        })
      })
    }
  }

  replacePhraseHandler = phrase => {
    console.log(phrase)
    this.setState({
      loading: true,
    })
    AsyncStorage.getItem('userToken').then(token => {
      AsyncStorage.getItem('userTokenType').then(tokenType => {
        AsyncStorage.getItem('user').then(imei => {
          imei = JSON.parse(imei)
          this.state.selectedForRemove.map(el => {
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
                imei.imei +
                '&timezone=' +
                imei.timezone +
                '&source=myRoutine' +
                '&phrase_id=' +
                el.id +
                '&routine_id=' +
                this.props.navigation.state.params.routineId,
            })
              .then(response => response.json())
              .then(json => {
                this.setState({ loading: false, visiblePhrasesChooser: false })
              })
              .catch(error => {
                this.setState({
                  visiblePhrasesChooser: false,
                  loading: false,
                })
              })
          })
          this.context.selectedPhrases.map(phrase => {
            let newObj = {}
            newObj['imei'] = imei.imei
            newObj['lang'] = global.lang
            newObj['source'] = phrase.source
            newObj['timezone'] = imei.timezone
            newObj['destination'] = 'myRoutine'
            newObj['phrase_id'] = phrase.phrase_id
            newObj['routine_id'] = this.props.navigation.state.params.routineId

            fetch(fn.url + 'mobile/users/add_phrase_to', {
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
                  this.props.navigation.navigate('MeditationHome')
                } else {
                  this.setState({
                    loading: false,
                  })
                }
              })
              .catch(error => {
                this.setState({
                  loading: false,
                })
              })
          })
        })
      })
    })
  }

  routinePhrasesHandle = phrase => {
    console.log('se movio')
    const newRoutinePhrases = this.state.routinePhrases.map(el => {
      if (phrase.id == el.id) {
        el.selected = !el.selected
      }
      return el
    })
    const selectedForRemove = newRoutinePhrases.filter(el => el.selected == true)
    this.setState({ routinePhrases: newRoutinePhrases, selectedForRemove: selectedForRemove })
  }

  phrasesPicker = () => {
    return (
      <View>
        <Dialog
          width={0.8}
          visible={this.state.visiblePhrasesChooser}
          onTouchOutside={() => {
            this.setState({ visiblePhrasesChooser: false })
            console.log('Cerrar el dialog')
          }}
          dialogTitle={
            <DialogTitle
              title=/* {global?.language?.replacePhrase} */ {`${global?.language?.replace_msg1}  ${margenReemplazo} ${global?.language?.replace_msg2} `}
              hasTitleBar={false}
              style={{
                backgroundColor: 'white',
                color: 'black',
                minHeight: 100,
                justifyContent: 'center',
              }}
              textStyle={{
                color: 'black',
              }}
              align='left'
            />
          }
          footer={
            <DialogFooter style={{ color: '#FFFFFF' }}>
              <DialogButton
                text={global?.language?.close}
                style={{
                  backgroundColor: 'white',
                }}
                textStyle={{
                  color: 'black',
                }}
                onPress={() => {
                  this.setState({ visiblePhrasesChooser: false })
                }}
              />
              <DialogButton
                disabled={this.state.selectedForRemove.length != margenReemplazo ? true : false}
                text={global?.language?.label_save}
                style={{
                  backgroundColor: 'white',
                }}
                textStyle={{
                  color: 'black',
                }}
                onPress={() => {
                  console.log('Fue aceptado')
                  this.setState({ visibleNameDialog: false })
                  this.replacePhraseHandler()
                  //this.saveNameHandler();
                }}
              />
            </DialogFooter>
          }
        >
          <DialogContent
            style={{
              backgroundColor: 'white',
              color: 'black',
            }}
          >
            <ScrollView>{this.phrasesDialog()}</ScrollView>
          </DialogContent>
        </Dialog>
      </View>
    )
  }

  phrasesDialog = () => {
    if (!this.state.routinePhrases) {
      return
    }

    return this.state.routinePhrases.map(phrase => {
      return (
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 15,
              paddingBottom: 15,
              borderBottomColor: '#5c9c93',
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                width: '80%',
                color: 'black',
              }}
            >
              {phrase.text_affirmative}
            </Text>
            <Switch
              trackColor={{ false: '#FFFEF8', true: '#5c9c93' }}
              thumbColor={{ false: '#E8E7D1', true: '#5c9c93' }}
              ios_backgroundColor='#3e3e3e'
              onValueChange={() => this.routinePhrasesHandle(phrase)}
              value={!phrase.selected}
            />
          </View>
        </View>
      )
    })
  }

  renderOld() {
    const is_full = this.context.selectedPhrases.length + this.context.numberPhrasesRoutine
    console.log(is_full)
    const margenReemplazo = this.context.selectedPhrases.length + this.context.numberPhrasesRoutine - 5

    let phrasesPicker = null
    let phrases_dialog = null

    return (
      <SafeAreaView style={{ backgroundColor: 'black' }}>
        <NavigationEvents onDidFocus={() => this.loadPhrases()} />
        <Loader loading={this.state.loading} modalText={this.state.modalText} />
        {this.phrasesPicker()}
        <Modal state={this} />
        <View style={{ width: '100%', height: '100%', padding: 20, paddingTop: 30 }}>
          <View style={{ paddingHorizontal: 10, marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 20 }}>{capitalizeWords(global?.['language']?.['category'])} </Text>
            {is_full <= 10 && this.context.selectedPhrases.length <= 5 ? (
              <TouchableOpacity
                onPress={() => {
                  if (is_full > 5 && is_full <= 10 && this.context.selectedPhrases.length <= 5) {
                    this.setState({ visiblePhrasesChooser: true })
                  } else {
                    this.savePhrasesHandler()
                  }
                }}
              >
                <Text style={{ textAlign: 'center', fontSize: 20, color: 'white' }}>{global?.language?.label_save}</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {/* {(this.state.phrases && (this.props.navigation.state.params.categoryId == null || this.props.navigation.state.params.categoryId == undefined)) ?
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity
                                    style={{ marginVertical: 10, width: '80%', borderRadius: 15, height: 40, backgroundColor: '#5c9c93' }}
                                    onPress={() => {
                                        this.props.navigation.navigate('Affirmations')
                                        console.log('navegar')

                                    }}
                                >
                                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontSize: 16 }}>{global?.language?.label_create_affirmation}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            : null} */}
          {this.state.phrases && (
            <FlatList
              data={this.state.phrases}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      paddingVertical: 12,
                      borderBottomColor: '#5c9c93',
                      borderWidth: 1,
                    }}
                  >
                    <ModalSelector
                      style={{ width: '70%' }}
                      data={[
                        { key: 0, value: 'Ver', label: 'Ver' },
                        { key: 1, value: 'Editar', label: global?.language?.label_edit },
                        { key: 2, value: 'Quitar', label: global?.language?.label_remove },
                      ]}
                      onChange={this.onChangeModal(item)}
                    >
                      <Text style={{ color: 'white', fontSize: 18 }}>{item.text_affirmative}</Text>
                    </ModalSelector>
                    {item.audio_affirmative != 'tmp' ? (
                      <Switch
                        trackColor={{ false: '#FFFEF8', true: '#5c9c93' }}
                        disabled={item.disabled}
                        onValueChange={() => this.toggleSwitch(index)}
                        value={item.selected}
                      />
                    ) : (
                      <Fragment>
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('Affirmations', {
                              item: item,
                              phrases: this.state.phrases,
                              editablePhrase: true,
                            })
                          }}
                        >
                          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                            <Image source={require('img/btnrecord.png')} style={{ width: 30, height: 30 }}></Image>
                          </View>
                        </TouchableOpacity>

                        <Switch
                          trackColor={{ false: '#FFFEF8', true: '#5c9c93' }}
                          thumbColor={item.selected ? '#5c9c93' : '#E8E7D1'}
                          disabled={item.disabled}
                          onValueChange={() => this.toggleSwitch(index)}
                          value={item.selected}
                        />
                      </Fragment>
                    )}
                  </View>
                )
              }}
            />
          )}
          <View style={{ height: 75 }}></View>
        </View>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </SafeAreaView>
    )
  }

  render() {
    return (
      <View style={tailwind('w-full h-full relative')}>
        <ImageBackground source={BgMainIconImg} imageStyle={{ resizeMode: 'stretch' }} style={tailwind('absolute h-full w-full ')} />
        <View style={[tailwind('absolute w-full h-full'), { backgroundColor: secondaryColor(0.8) }]}></View>

        <NavigationEvents onDidFocus={() => this.loadPhrases()} />
        {/* <Loader loading={this.state.loading} modalText={this.state.modalText} /> */}
        {/* 
        {this.renderAddAffirmationModal()} */}
        <SafeAreaView style={tailwind('flex')}>
          <ScrollView>
            <View style={tailwind('flex p-6 flex-col justify-start pb-24')}>
              {/* Header */}
              {this.renderHeader()}
              {/* Status */}
              {this.renderStatus()}
              {/* Categories */}
              {this.renderCategory()}
            </View>
          </ScrollView>
        </SafeAreaView>
        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack />
      </View>
    )
  }

  renderHeader = () => {
    const is_full = this.context.selectedPhrases.length + this.context.numberPhrasesRoutine
    console.log(is_full)

    return (
      <View style={tailwind('flex flex-col')}>
        {/* Top Buttons */}
        <View style={tailwind('flex flex-row justify-between mb-2')}>
          <TouchableOpacity
            style={tailwind('relative')}
            onPress={() => {
              this.props.navigation.navigate('AffirmationCategoryListScreen')
            }}
          >
            <Text>{global?.language?.cancel}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if (is_full > 5 && is_full <= 10 && this.context.selectedPhrases.length <= 5) {
                this.setState({ visiblePhrasesChooser: true })
              } else {
                this.savePhrasesHandler()
              }
            }}
          >
            <Text style={tailwind('text-lg text-green-500 text-center')}>{global?.language?.label_save}</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  renderStatus = () => {
    let { routines = [] } = this.props
    let routineId = this.props.navigation?.state?.params?.routineId

    let routine = routines.filter(r => (r.id = routineId)).pop()

    let selectedPhrases = this.context.selectedPhrases || []
    let actualPhrases = this.context.actualPhrases || []

    let actual_count = actualPhrases.length
    let selected_count = selectedPhrases.length
    let count = actual_count + selected_count

    return (
      <View style={tailwind('flex w-full mt-2')}>
        <View style={tailwind('flex justify-center w-full mb-3')}>
          {/* Titulo */}
          <Text style={tailwind('text-3xl font-bold text-white capitalize text-center')}> {global?.['language']?.['affirmations_categories']} </Text>
        </View>
        <View style={tailwind('mb-5')}>
          {/* Info */}
          <Text style={tailwind('text-white text-xl text-center')}>
            {global?.language?.affirmations_categories_subtitle || 'Navega en las categorias y selecciona 1 y 5 afirmaciones para la rutina'} {routine.name}
          </Text>
        </View>
        <View style={tailwind('flex justify-center items-center')}>
          {/* Icons */}
          <View style={tailwind('flex flex-row')}>
            {[1, 2, 3, 4, 5].map(i => {
              return count >= i ? (
                <View style={tailwind('w-12 h-12 rounded-full flex justify-center items-center mx-2 bg-green-400')}>
                  <Image source={AffirmationAddedIcon} resizeMode='contain' style={tailwind('w-8 h-8 mr-1')}></Image>
                </View>
              ) : (
                <View style={tailwind('w-12 h-12 rounded-full flex justify-center items-center mx-2 bg-white bg-opacity-' + (60 - 10 * i))}>
                  {/* <Icon type='FontAwesome' name={'chevron-right'} /> */}
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }

  renderCategory = () => {
    let category = this.props.navigation?.state?.params?.category || {}
    // console.log({ categories: category, categoryId })

    return (
      <View>
        <View style={tailwind('flex justify-center items-center pt-6 pb-3')}>
          <View>
            <Text style={tailwind('text-2xl text-white font-bold')}>{category.name}</Text>
          </View>
        </View>
        {this.state.phrases && (
          <View style={{ marginBottom: 100 }}>
            <FlatList data={this.state.phrases} renderItem={this.renderPhrases} />
          </View>
        )}
      </View>
    )
  }

  renderPhrases = ({ item, index }) => {
    return (
      <View style={[tailwind('flex flex-row justify-between border-b border-white border-opacity-25 px-0')]}>
        <ModalSelector
          style={[{ width: '70%' }, tailwind('flex-row items-center py-4 px-0')]}
          data={[
            { key: 0, value: 'Ver', label: 'Ver' },
            { key: 1, value: 'Editar', label: global?.language?.label_edit },
            { key: 2, value: 'Quitar', label: global?.language?.label_remove },
          ]}
          onChange={this.onChangeModal(item)}
        >
          <Text style={[tailwind('pl-2 pr-1 text-white text-xl')]}>{item.text_affirmative}</Text>
        </ModalSelector>
        <View style={[{ width: '30%' }, tailwind('flex justify-center items-center ')]}>
          <Switch
            trackColor={{ false: '#FFFEF8', true: '#5c9c93' }}
            disabled={item.disabled}
            onValueChange={() => this.toggleSwitch(index)}
            value={item.selected}
          />
        </View>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  categories: datasetSelector(state, 'categories', { list_format: true }),
  routines: datasetSelector(state, 'routines', { list_format: true }),
})
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(PhrasesScreen)
