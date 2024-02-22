import React from 'react'
import { View, TouchableOpacity, FlatList, Image, Text } from 'react-native'
import { scale, globalStyles } from '../../helpers/styles'
import AudioPlayer from './AudioPlayer'
import screenStyles from './styles'
import capitalizeWords from '../../helpers/capitalizeWords'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { setDatasetToReducer } from '../../redux/actions'

const render_toggle_notes_list_label = (showDetails, allow_show_one_note) => {
  let id_label = ''

  if (showDetails) {
    if (allow_show_one_note) id_label = 'show_less_notes'
    else id_label = 'hide_notes'
  } else {
    if (allow_show_one_note) id_label = 'show_more_notes'
    else id_label = 'show_notes'
  }
  return capitalizeWords(global?.['language']?.[id_label], { firstOnly: true })
}

const EvaluationNotesList = ({ objective_id, allow_show_one_note = true }) => {
  const dispatch = useDispatch()
  const [showDetails, toggleShowDetails] = React.useState(false)
  const setNewPhotoPreviewShow = React.useCallback(value => dispatch(setDatasetToReducer(value, 'today_activities_photo_preview_must_show')))
  const setNewPhotoPreviewSource = React.useCallback(value => dispatch(setDatasetToReducer(value, 'today_activities_photo_preview_source')))

  let notes = []
  notes = useSelector(state => datasetSelector(state, 'notes', { list_format: true }))
  //console.log('EvaluationInputs ===> ', { notes })
  if (!objective_id) notes = []
  notes =
    notes
      .filter(note => note['objective_id'] === objective_id)
      .map(note => ({
        id: note['id'],
        text: note['note'],
        date: moment(note['created_at']).format('DD/MM/YYYY HH:mm'),
        image_link: note['photo_link'],
        audio_link: note['audio_link'],
      }))
      .sort((prevNote, nextNote) => nextNote['id'] - prevNote['id']) || []
  if (!notes) notes = []

  let allowed_notes = showDetails ? notes : notes?.slice(0, allow_show_one_note ? 1 : 0)

  return (
    <>
      <FlatList
        scrollEnabled={false}
        style={{ marginBottom: scale(0.1) }}
        data={allowed_notes}
        ListFooterComponentStyle={{
          flex: 0.5,
          alignItems: 'flex-end',
        }}
        keyExtractor={(item, index) => String(index)}
        renderItem={iterator => {
          let note = iterator['item']
          let key = iterator['index']
          return (
            <View key={key} style={[globalStyles.messageBox]}>
              {!!note['image_link'] && (
                <TouchableOpacity
                  onPress={() => {
                    setNewPhotoPreviewSource({ uri: note['image_link'] })
                    setNewPhotoPreviewShow(true)
                  }}
                >
                  <Image source={{ uri: note['image_link'] }} resizeMode='contain' style={{ width: '80%', height: scale(5), borderRadius: scale(0.3) }} />
                </TouchableOpacity>
              )}
              {!!note.text && <Text style={{ color: 'white', paddingVertical: scale(0.3), fontSize: scale(0.4) }}>{note.text}</Text>}
              {!!note['audio_link'] && <AudioPlayer audioLink={note['audio_link']} title={note.text} key={key} id={key} />}
              <Text style={{ color: 'gray', textAlign: 'right', fontSize: scale(0.35) }}>{note.date}</Text>
            </View>
          )
        }}
      />
      <TouchableOpacity style={globalStyles.greenTextRight} onPress={() => toggleShowDetails(!showDetails)}>
        {!!notes && notes?.length > 1 && <Text style={globalStyles.greenText}>{render_toggle_notes_list_label(showDetails, allow_show_one_note)}</Text>}
      </TouchableOpacity>
    </>
  )
}

export default EvaluationNotesList
