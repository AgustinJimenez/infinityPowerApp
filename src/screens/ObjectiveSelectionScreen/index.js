import React from 'react'
import { ActivityIndicator } from 'react-native'
import { Text, View, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native'
import request from '../../helpers/request'
import styles from './styles'
import { withTranslation } from 'react-i18next'

const placeholderBase64image = 'data:img/profile.png;base64 [yourbase64imagedata]'
class ObjectiveSelectionScreen extends React.Component {
  state = {
    note_text: '',
    note_photo: '',
    note_audio: '',
    user_selected: '',
    objectives: [],
    objective_id: 0,
    isSubmiting: false,
    isLoading: false,
  }
  constructor(props) {
    super(props)
    this.objectiveSelected = this.objectiveSelected.bind(this)
    this.state = {
      note_text: this.props.navigation?.state?.params?.notes,
      note_photo: this.props.navigation?.state?.params?.newPhoto,
      note_audio: this.props.navigation?.state?.params?.newAudio,
      user_selected: this.props.navigation?.state?.params?.dataSelected,
    }
  }

  objectiveSelected = objective_id => this.setState({ objective_id })
  submitNote = async () => {
    if (!this.state.objective_id) return alert(this.props.t('must_select_a_objective'))
    await this.setState({ isSubmiting: true })

    let { error } = await request({
      url: 'actions/create_note',
      method: 'POST',
      data: { objective_id: this.state.objective_id, note: this.state.note_text, photo: this.state.note_photo, audio: this.state.note_audio },
      //debug: true,
      show_message: true,
    })

    if (!error) return this.props.navigation.navigate('Main')

    this.setState({ isSubmiting: false })
  }

  getUsersObjectiveData = async () => {
    await this.setState({ isLoading: true })
    let { data } = await request({
      url: 'mobile/users/objectives_to_evaluate',
      method: 'POST',
      data: {
        objective_users_ids: [this.state.user_selected.id],
      },
      //debug: true,
      show_message: true,
    })
    await this.setState({ isLoading: false, objectives: data?.objectives || [] })
  }

  componentDidMount() {
    this.getUsersObjectiveData()
  }

  render() {
    //console.log('here ==> ', this.state.objectives)
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.contentContainer}>
          {!!this.state.note_text && (
            <View style={[styles.topContainer]}>
              <View style={[styles.topSubContainer]}>
                <Text style={styles.topText}>{this.state.note_text}</Text>
              </View>
            </View>
          )}
          <View style={styles.userViewContainer}>
            <View style={styles.userView}>
              <Image
                defaultSource={require('img/profile.png')}
                source={{ uri: this.state.user_selected.image ? this.state.user_selected.image : placeholderBase64image }}
                style={styles.selectedUser}
              />
              <Text style={styles.UserName}>{this.state.user_selected.name}</Text>
            </View>
          </View>
          <View style={styles.objectiveListContainer}>
            <View style={styles.objectiveList}>
              {(() => {
                if (this.state.isLoading)
                  return (
                    <View style={styles.loaderContainer}>
                      <ActivityIndicator size='large' />
                    </View>
                  )
                return (this.state.objectives || []).map((objective, key) => {
                  return (
                    <View style={styles.objectiveListItem} key={key}>
                      <Image
                        source={objective.id == this.state.objective_id ? require('img/selectedIcon.png') : require('img/unSelectedObjective.png')}
                        style={styles.imageView}
                      />
                      <Text numberOfLines={2} style={styles.title}>
                        {objective.objective}
                      </Text>
                      <TouchableOpacity style={styles.buttonView} onPress={() => this.objectiveSelected(objective.id)} />
                    </View>
                  )
                })
              })()}
            </View>
          </View>
        </ScrollView>

        {(() => {
          if (this.state.isSubmiting)
            return (
              <View style={styles.bottomFloatingActionContainer}>
                <ActivityIndicator size='large' />
              </View>
            )

          return (
            <View style={[styles.sendButtonContainer, styles.bottomFloatingActionContainer]}>
              <Text style={styles.topText2}>Send</Text>
              <TouchableOpacity style={{ width: '100%', height: 44, position: 'absolute' }} onPress={() => this.submitNote()} />
            </View>
          )
        })()}
      </SafeAreaView>
    )
  }
}

export default withTranslation()(ObjectiveSelectionScreen)
