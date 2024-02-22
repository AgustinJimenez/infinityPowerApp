import { Toast } from 'native-base'
import React from 'react'
import { ActivityIndicator } from 'react-native'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import capitalizeWords from '../../../helpers/capitalizeWords'
import request from '../../../helpers/request'
import { scale, globalStyles } from '../../../helpers/styles'
import { setDatasetToReducer } from '../../../redux/actions'
import { fetchNotificationsCountSagaAction, removeActivityFromStoreByIdSagaAction } from '../../../sagas/actions'
import AudioPlayer from '../AudioPlayer'
import screenStyles from '../styles'

class NoteInputs extends React.Component {
  state = {
    isLoading: false,
  }

  checkUserNotification = async () => {
    await this.setState({ isLoading: true })
    let { error } = await request({
      method: 'POST',
      url: 'actions/check_notifications',
      data: {
        ids: [this.props?.notification_id],
      },
      //debug: true,
    })
    if (error) {
      await this.setState({ isLoading: false })
      return Toast.show({
        text: global?.['language']?.['unexpected_error'],
        duration: 2000,
        type: 'danger',
      })
    }

    this.props.fetchNotificationsCount()
    this.props.removeActivityFromStoreById([this.props.activity_id], async () => await this.setState({ isLoading: false }))
  }

  note = () => this.props.data

  renderNoteText = () => {
    let note = this.note()
    if (!!note.note) return <Text style={{ color: 'white', paddingVertical: scale(0.4) }}>{note.note}</Text>
  }
  renderNoteAudio = () => {
    let note = this.note()
    if (!!note.audio_link) return <AudioPlayer audioLink={note['audio_link']} title={'' /* note.text */} id={0} />
  }
  renderNoteImage = () => {
    let note = this.note()
    if (!!note['photo_link'])
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.setNewPhotoPreviewSource({ uri: note['photo_link'] })
            this.props.setNewPhotoPreviewShow(true)
          }}
        >
          <Image
            source={{ uri: note['photo_link'] }}
            resizeMode='contain'
            style={{ width: '80%', height: scale(5), marginTop: scale(0.3), borderRadius: scale(0.3) }}
          />
        </TouchableOpacity>
      )
  }
  render() {
    return (
      <View style={{ width: '100%' }}>
        <View style={[globalStyles.messageBox]}>
          {this.renderNoteImage()}
          {this.renderNoteText()}
          {this.renderNoteAudio()}
          <Text style={{ color: 'gray', textAlign: 'right' }}>{this.note().date}</Text>
        </View>

        <TouchableOpacity style={[screenStyles.greenTextRight, {}]} onPress={() => this.checkUserNotification()}>
          {this.state.isLoading ? (
            <ActivityIndicator style={{ marginRight: scale(0.2) }} />
          ) : (
            <Text style={[globalStyles.greenText, { alignSelf: 'flex-end' }]}>{capitalizeWords(global.language.ready)}</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  //is_refreshing_today_activity_list: datasetSelector(state, 'is_refreshing_today_activity_list'),
})
const mapDispatchToProps = dispatch => ({
  setNewPhotoPreviewShow: value => dispatch(setDatasetToReducer(value, 'today_activities_photo_preview_must_show')),
  setNewPhotoPreviewSource: value => dispatch(setDatasetToReducer(value, 'today_activities_photo_preview_source')),
  fetchNotificationsCount: () => dispatch(fetchNotificationsCountSagaAction()),
  removeActivityFromStoreById: (ids = [], callback = () => {}) => dispatch(removeActivityFromStoreByIdSagaAction({ ids, callback })),
})
export default connect(mapStateToProps, mapDispatchToProps)(NoteInputs)
