import React from 'react'
import {
  ActivityIndicator,
  View,
  Image,
  FlatList,
  Dimensions,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  RefreshControl,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Video from 'react-native-video'
import { globalStyles } from '../helpers/styles'
const { width } = Dimensions.get('window')
import expand from '../img/expand.png'
import collapse from '../img/collapse.png'
import person from '../img/icon_account.png'
import icon_plus_img from '../img/icon_plus.png'
import samplevideo from '../img/video.mp4'
import { Toast, Icon } from 'native-base'
import Dialog, { DialogContent, DialogFooter, DialogButton, DialogTitle } from 'react-native-popup-dialog'
import ModalSelector from 'react-native-modal-selector'
import request from '../helpers/request'
import { NavigationEvents } from 'react-navigation'
import { connect } from 'react-redux'
import { datasetSelector } from '../redux/selectors'
import capitalizeWords from '../helpers/capitalizeWords'
import BottomNavigationBar from '../components/BottomNavigationBar'
import { setDatasetToReducer } from '../redux/actions'

class ObjectiveListScreen extends React.Component {
  objectiveOptionsModal = null
  constructor() {
    super()
    this.state = {
      onlyNotes: false,
      length: 0,
      slides: [],
      isSlideDone: false,
      showVideo: false,
      load: true,
      loading: false,
      evaluated: [],
      useInviteCode: '',
      showInviteCodeDialog: false,
      expand1: true,
      expand2: true,
      editEnabled: false,
      refreshing: false,
    }
    this.index = 0
    this.user = null
    this.token = null
    this.tokenType = null
  }
  inviteCodeModalShowTimer = null
  componentDidMount() {
    //console.log('DIDMOUNT ACTION ==> ', this.props.navigation.state.params)
    const code = this.props.navigation.getParam('code')
    if (!!code) this.setState({ showInviteCodeDialog: true, useInviteCode: code })
  }
  onEnd = () => {
    this.setState({ showVideo: false, load: false })
  }
  onLoad = () => {
    this.setState({ showVideo: false, load: false })
  }
  loadObjectives = async (manageLoadingState = true) => {
    let newObj = {}

    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone

    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])
    if (manageLoadingState) await this.setState({ loading: true })
    let { data, error } = await request({
      url: 'actions/get_objective_list',
      method: 'POST',
      data: formdata,
      //debug: true,
    })
    if (!error) {
      let obj = {}
      data.map(objective => {
        obj[objective.id] = objective
      })
      this.props.setObjectivesAction(obj)
    }
    if (manageLoadingState) await this.setState({ loading: false })
  }
  loadEvaluated = async (manageLoadingState = true) => {
    newObj = {}
    let user = null
    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone
    user = imei

    let formdata = new FormData()
    formdata.append('lang', newObj['lang'])
    formdata.append('imei', newObj['imei'])
    formdata.append('timezone', newObj['timezone'])
    if (manageLoadingState) await this.setState({ loading: true })
    let { error, data } = await request({
      url: 'actions/get_evaluated_list',
      method: 'POST',
      data: formdata,
    })
    if (!error) {
      const evaluated_user = data.filter(el => el.id != user.id)
      await this.setState({ evaluated: evaluated_user })
    }
    if (manageLoadingState) await this.setState({ loading: false })
  }
  useInviteCode = async () => {
    if (!this.state.showInviteCodeDialog) return

    await this.setState({ showInviteCodeDialog: false })

    newObj = {}
    let imei = await AsyncStorage.getItem('user')
    imei = JSON.parse(imei)
    newObj['lang'] = global.lang
    newObj['imei'] = imei.imei
    newObj['timezone'] = imei.timezone

    await this.setState({ loading: true })
    let { data, error } = await request({
      url: 'actions/use_invite_code',
      method: 'POST',
      data: {
        lang: newObj['lang'],
        imei: newObj['imei'],
        timezone: newObj['timezone'],
        code: this.state.useInviteCode,
      },
    })
    await this.setState({ loading: false })

    if (!error && data.evaluator) {
      await this.loadEvaluated()
      await this.setState({ useInviteCode: '' })
      Toast.show({
        text: 'Objetivo de amigo agregado para evaluar',
        duration: 2000,
        type: 'success',
      })
    } else
      Toast.show({
        text: 'Código de amigo no encontrado',
        duration: 2000,
        type: 'warning',
      })
  }
  videoRender() {
    return (
      <View style={[globalStyles.informationLayout, { width: '100%', height: '100%' }]}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Video
            source={samplevideo} // Can be a URL or a local file.
            ref={ref => {
              this.player = ref
            }}
            onLoad={this.onLoad}
            onEnd={this.onEnd} // Store reference
            // onBuffer={this.onBuffer}                // Callback when remote video is buffering
            // onError={this.videoError}               // Callback when video cannot be loaded
            style={globalStyles.backgroundVideo}
          />
        </SafeAreaView>

        <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton />
      </View>
    )
  }
  editLabelOnPress = () => this.setState({ editEnabled: true })
  readyLabelOnPress = async () => {
    await this.setState({ editEnabled: false })
  }
  renderHeader = () => {
    return (
      <>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View
            style={{
              width: '87%',
              height: width / 5,
              backgroundColor: 'black',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                alignItems: 'flex-start',
              }}
              onPress={() => {
                if (this.state['editEnabled']) this.readyLabelOnPress()
                else this.editLabelOnPress()
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  textAlignVertical: 'center',
                  color: '#fff',
                  fontWeight: '300',
                  textDecorationLine: 'underline',
                }}
              >
                {!this.state['editEnabled'] ? global.language['label_edit'] : global.language['ready']}
              </Text>
            </TouchableOpacity>

            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text
                style={{
                  width: '80%',
                  fontSize: 22,
                  color: '#fff',
                  textAlign: 'center',
                  fontWeight: '600',
                }}
              >
                {capitalizeWords(global.language['habits'])}
              </Text>
              <View style={{ width: '20%', justifyContent: 'center' }}>{this.state['loading'] && <ActivityIndicator color={global.mainColor} />}</View>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('CreateObjectiveScreen')}
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}
            >
              <Image
                source={icon_plus_img}
                style={{
                  width: 28,
                  height: 28,
                  flexDirection: 'row',
                  resizeMode: 'contain',
                  flex: 1,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  myObjetivesExpandableTitle = () => {
    return (
      <View
        style={{
          width: '90%',
          height: 40,
          borderColor: 'white',
          borderWidth: 1,
          borderRadius: 10,
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: '80%',
            height: '100%',
            justifyContent: 'center',
          }}
        >
          <Text style={[globalStyles.mainText, { marginLeft: 15 }]}>{global.language ? global?.language?.my_objectives : null}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.setState({ expand1: !this.state.expand1 })}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image source={this.state.expand1 ? collapse : expand} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>
    )
  }
  objectiveList = () => {
    let obj_ids = Object.keys(this.props.objectives).reverse()
    let list = obj_ids.map(id => this.props.objectives[id])
    //console.log('HERE ==> ', { obj_ids, list })
    return list
  }
  renderMyObjectivesList = () =>
    this.state.expand1 && <FlatList data={this.objectiveList()} renderItem={this.renderObjectiveItem} keyExtractor={item => item.id} />

  deleteObjective = async objective_id => {
    let { error } = await request({
      url: 'actions/delete_objective',
      method: 'post',
      data: {
        objective_id,
      },
    })
    if (!error) {
      this.loadObjectives()
      Toast.show({
        text: global?.['language']?.['delete_objective_success'],
        duration: 2000,
        type: 'success',
      })
    } else
      Toast.show({
        text: global?.['language']?.['delete_objective_error'],
        duration: 2000,
        type: 'danger',
      })
  }
  renderObjectiveItemIcon = item => {
    //api/actions/delete_objective
    let IconComponent = null
    if (this.state['editEnabled'])
      IconComponent = (
        <TouchableOpacity
          style={
            {
              /* backgroundColor: 'green' */
            }
          }
          onPress={() => {
            Alert.alert(global?.['language']?.['atention'], global?.['language']?.['delete_objective_warning'], [
              {
                text: global?.['language']?.['yes'],
                onPress: () => this.deleteObjective(item.id),
              },
              {
                text: global?.['language']?.['no'],
                onPress: () => {},
              },
            ])
          }}
        >
          <View
            style={{
              width: 15,
              height: 15,
              borderRadius: 7.5,
              position: 'absolute',
              backgroundColor: 'white',
              marginTop: 5,
              marginLeft: 5,
            }}
          />
          <Icon name='circle-with-minus' type='Entypo' style={{ color: 'red', fontSize: 22 }} />
        </TouchableOpacity>
      )
    else IconComponent = <Icon name='dot-single' type='Entypo' style={{ color: '#20B2AA85', fontSize: 16 }} />

    return (
      <View
        style={{
          width: this.state['editEnabled'] ? '10%' : '5%',
          alignItems: 'flex-end',
          // /backgroundColor: 'green',
          paddingRight: 5,
        }}
      >
        {IconComponent}
      </View>
    )
  }
  isOnlyNotes = () => this.props.navigation.getParam('onlyNotes', false)
  renderObjectiveItem = ({ item }) => {
    return (
      <>
        <ModalSelector
          ref={ref => {
            if (!!ref) {
              if (!this.objectiveOptionsModal) this.objectiveOptionsModal = {}

              this.objectiveOptionsModal[item.id] = ref
            }
          }}
          data={[
            {
              key: 0,
              value: 'evaluate',
              label: global?.language?.evaluate,
            },
            {
              key: 1,
              value: 'generate_note',
              label: global?.language?.generate_note,
            },
            {
              key: 2,
              value: 'see_progress',
              label: global?.language?.progress,
            },
          ]}
          cancelText={global?.language?.cancel}
          onChange={selected => {
            switch (selected['value']) {
              case 'evaluate':
                this.props.navigation.navigate('EvaluationScreen', {
                  objective_id: item.id,
                  onlyNotes: this.isOnlyNotes(),
                })
                break
              case 'generate_note':
                this.props.navigation.navigate('EvaluationScreen', {
                  objective_id: item.id,
                  onlyNotes: true,
                })
                break
              case 'see_progress':
                this.props.navigation.navigate('ObjectiveDetailsScreen', {
                  objective_id: item.id,
                })
                break

              default:
                break
            }
          }}
        >
          <React.Fragment />
        </ModalSelector>

        <View
          style={{
            minHeight: 70,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 1,
            paddingVertical: 10,
          }}
        >
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              //backgroundColor: 'blue',
            }}
          >
            {this.renderObjectiveItemIcon(item)}

            <TouchableOpacity
              style={{
                width: '90%',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (this.state['editEnabled']) {
                  this.props.navigation.navigate('DetailObjetive', {
                    objective: item,
                    editable: true,
                  })
                  return
                }

                if (!!this.objectiveOptionsModal[item.id] && !!this.objectiveOptionsModal[item.id].open) this.objectiveOptionsModal[item.id].open()
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <Text
                  style={{
                    width: '75%',
                    color: 'white',
                    fontSize: 16,
                    marginLeft: 5,
                    borderRightColor: '#20B2AA85',
                    borderRightWidth: 1,
                    paddingRight: 5,
                    //backgroundColor: 'blue',
                  }}
                >
                  {item.objective}
                </Text>

                <Text
                  style={{
                    width: '25%',
                    color: 'white',
                    fontSize: 16,
                    //backgroundColor: 'green',
                  }}
                >
                  {`${item.achieved}%`}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: 'black',
                  width: '90%',
                  height: 3,
                  marginTop: 5,
                }}
              />
              {this.renderObjectiveConsistencyStatus(item)}
            </TouchableOpacity>
          </View>
        </View>
      </>
    )
  }
  renderObjectiveConsistencyStatus = item => {
    let isConsistent = item.consistency >= 75
    //console.log('renderObjectiveConsistencyStatus ===> ', { id: item.id, objective: item.objective, consistency: item.consistency, item })

    return (
      <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={{ width: '55%' }} />
        <View style={{ width: '45%' }}>
          <Text
            style={{
              color: isConsistent ? '#20B2AA85' : 'grey',
              fontSize: 16,
              marginRight: 15,
              textAlign: 'right',
            }}
          >
            {isConsistent ? global?.['language']?.['label_consistent'] : global?.['language']?.['not_consistent']}
          </Text>
        </View>
      </View>
    )
  }

  loadDatas = async () => {
    await this.setState({ loading: true })
    await this.loadObjectives(false)
    await this.loadEvaluated(false)
    await this.setState({ loading: false })
  }
  refreshData = async () => {
    await this.setState({ refreshing: true })
    await this.loadObjectives(false)
    await this.loadEvaluated(false)
    await this.setState({ refreshing: false })
  }
  mainRender() {
    return (
      <View style={globalStyles.informationLayout}>
        <NavigationEvents
          onWillFocus={payload => {
            this.loadDatas()
          }}
        />
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'center',
          }}
        >
          <ScrollView
            refreshControl={<RefreshControl refreshing={this['state']['refreshing']} onRefresh={this.refreshData} tintColor='white' />}
            horizontal={false}
            showsVerticalScrollIndicator
            disableScrollViewPanResponder
            style={{ marginBottom: 80 }}
          >
            {this.renderHeader()}
            <View style={{ alignItems: 'center', marginTop: 30 }}>
              {this.myObjetivesExpandableTitle()}
              {this.renderMyObjectivesList()}
              <View
                style={{
                  width: '90%',
                  height: 40,
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 10,
                  flexDirection: 'row',
                  marginTop: 20,
                }}
              >
                <View
                  style={{
                    width: '80%',
                    height: '100%',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={[globalStyles.mainText, { marginLeft: 15 }]}>{global.language ? global?.language?.evaluating_to : null}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => this.setState({ expand2: !this.state.expand2 })}
                  style={{
                    width: '20%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image source={this.state.expand2 ? collapse : expand} style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
              </View>
              {this.state.expand2 ? (
                <View
                  style={{
                    width: '89%',
                    backgroundColor: 'black',
                    maxHeight: 200,
                    marginTop: 8,
                    borderRadius: 10,
                    marginBottom: 40,
                  }}
                >
                  <FlatList
                    data={this.state.evaluated}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.navigate('EvaluatingScreen', {
                            muserId: item.id,
                            muserName: item.name,
                            onlyNotes: this.isOnlyNotes(),
                          })
                        }
                        style={{
                          width: '100%',
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 5,
                          marginBottom: 1,
                        }}
                      >
                        <View style={{ width: '100%', flexDirection: 'row' }}>
                          <View
                            style={{
                              width: '15%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                          >
                            <Image
                              source={person}
                              style={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <View style={{ width: '85%' }}>
                            <Text
                              style={{
                                color: 'white',
                                fontSize: 16,
                                marginLeft: 5,
                              }}
                              numberOfLines={1}
                            >
                              {` ${item.name}`}
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
                      </TouchableOpacity>
                    )}
                    keyExtractor={item => item.id}
                  />
                </View>
              ) : null}
              <View
                style={{
                  width: '90%',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
              >
                <TouchableOpacity
                  onPress={() => this.setState({ showInviteCodeDialog: true })}
                  style={{
                    backgroundColor: global.mainColor,
                    marginTop: 10,
                    paddingTop: 5,
                    paddingBottom: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 20,
                  }}
                >
                  <Text style={{ color: 'white' }}>{global.language ? global?.language?.friend_code : null}</Text>
                </TouchableOpacity>
              </View>
              <Dialog
                width={0.8}
                visible={this.state.showInviteCodeDialog}
                onTouchOutside={() => {
                  this.setState({ showInviteCodeDialog: false })
                }}
                dialogTitle={
                  <DialogTitle
                    title={global.language ? global?.language?.friend_code : null}
                    hasTitleBar={false}
                    style={{
                      backgroundColor: 'white',
                      color: 'black',
                      justifyContent: 'center',
                    }}
                    textStyle={{
                      color: 'black',
                    }}
                    align='left'
                  />
                }
                footer={
                  <DialogFooter>
                    <DialogButton
                      text='Cerrar'
                      style={{
                        backgroundColor: 'white',
                      }}
                      textStyle={{
                        color: 'black',
                      }}
                      onPress={() => {
                        this.setState({ showInviteCodeDialog: false })
                      }}
                    />

                    <DialogButton
                      disabled={this.state.loading && this.state.showInviteCodeDialog}
                      text='Ingresar'
                      style={{
                        backgroundColor: 'white',
                      }}
                      textStyle={{
                        color: 'black',
                      }}
                      onPress={() => {
                        clearTimeout(this.inviteCodeModalShowTimer)
                        this.inviteCodeModalShowTimer = setTimeout(this.useInviteCode, 500)
                      }}
                    />
                  </DialogFooter>
                }
              >
                <DialogContent
                  style={{
                    color: 'black',
                    backgroundColor: 'white',
                    minHeight: 150,
                    justifyContent: 'center',
                  }}
                >
                  <View>
                    <TextInput
                      returnKeyType='done'
                      textAlign='left'
                      value={this.state.useInviteCode}
                      placeholder='Código'
                      placeholderTextColor='gray'
                      onChangeText={text => this.setState({ useInviteCode: text })}
                      style={{ paddingTop: 15, color: 'black' }}
                    />
                  </View>
                </DialogContent>
              </Dialog>
            </View>
          </ScrollView>
          <BottomNavigationBar hasPlay={this.state.hasPlay} hasBack invisiblePlayButton nextButton={false} />
        </SafeAreaView>
      </View>
    )
  }
  render() {
    return this.state.showVideo ? this.videoRender() : this.mainRender()
  }
}

const mapStateToProps = state => ({
  objectives: datasetSelector(state, 'objectives'),
})
const mapDispatchToProps = dispatch => ({
  setObjectivesAction: data => dispatch(setDatasetToReducer(data, 'objectives')),
})

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveListScreen)
