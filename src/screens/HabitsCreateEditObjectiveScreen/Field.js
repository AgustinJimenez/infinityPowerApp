import React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import capitalizeWords from '../../helpers/capitalizeWords'
import { useSelector } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import DayPicker from '../../components/DayPicker2'
import styles from './styles'
import { scale } from '../../helpers/styles'
import ObjectiveEvaluatorsInputs from './ObjectiveEvaluatorsInputs'
import FieldLabel from './FieldLabel'

const InputDateLeftDays = ({ value }) => {
  value = value?.clone?.()?.startOf?.('day')
  let now = moment().startOf('day')
  let diffInDays = Math.abs(now.diff(value, 'days', false))

  if (diffInDays <= 0) return null

  let leftDays = capitalizeWords(global?.language?.days_left.replace('$days', diffInDays))

  if (diffInDays === 1) leftDays = leftDays.slice(0, -1)

  return <Text style={[{ top: scale(0.8), left: scale(0.2) }, !!value ? styles.colorWhite : {}]}>{leftDays}</Text>
}

const FieldContainer = ({ type, isTitle, onPress, children, style, value, focusOn }) => {
  let containerStyle = [styles.inputContainer]
  if (!!isTitle) containerStyle.push(styles.title)

  if (type === 'day') containerStyle.push(styles.bgTransparent)
  else if (!!value && !focusOn && type !== 'evaluators') containerStyle.push(styles.bgSemiTransparent)

  return (
    <TouchableOpacity disabled={type === 'text' || type === 'evaluators'} style={[...containerStyle, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  )
}

const Field = ({
  value = null,
  onChangeValue = newValue => {},
  isTitle = false,
  label = '',
  containerStyle = {},
  placeholder = '',
  returnKeyType = 'next',
  inputRef,
  nextRef,
  type = 'text' || 'date' || 'day' || 'evaluators',
  showRemainingDays = false,
  showIsRequiredMessage = false,
  objective_id = null,
  inviteCode = null,
  isEdit = false,
  cansSubmitForm = false,
  saveOrUpdateObjective = opts => {},
}) => {
  const [showModal, setModalVisibility] = React.useState(false)
  const [focusOn, setFocusOn] = React.useState(false)
  const user = useSelector(state => datasetSelector(state, 'user'))

  return (
    <>
      <FieldContainer type={type} value={value} isTitle={isTitle} onPress={() => setModalVisibility(true)} style={containerStyle} focusOn={focusOn}>
        {(function renderInputContent() {
          if (type === 'text')
            return (
              <>
                <FieldLabel type={type} text={label} focusOn={focusOn} value={value} />
                <TextInput
                  defaultValue={value}
                  ref={inputRef}
                  style={[styles.input, !!value && !focusOn ? styles.colorWhite : {}]}
                  placeholderTextColor='rgba(120, 120, 120, 1)'
                  placeholder={placeholder}
                  returnKeyType={returnKeyType}
                  onSubmitEditing={() => nextRef.current?.focus?.()}
                  onChangeText={text => onChangeValue(text)}
                  onFocus={() => setFocusOn(true)}
                  onBlur={() => setFocusOn(false)}
                  multiline
                />
              </>
            )
          else if (type === 'date' || type === 'time') {
            return (
              <>
                <FieldLabel type={type} text={label} focusOn={focusOn} value={value} />

                {type === 'date' && <Text style={[styles.timeLabel, !!value ? styles.colorWhite : {}]}>{capitalizeWords(value?.format?.('LL'))}</Text>}
                {type === 'time' && (
                  <View style={styles.timeLabelContainer}>
                    <Text style={[styles.timeLabelCenter, styles.colorBlack]}>{capitalizeWords(value?.format?.('HH:mm'))}</Text>
                  </View>
                )}

                {!!showRemainingDays && <InputDateLeftDays value={value} />}
                <DateTimePickerModal
                  minimumDate={moment().startOf('day').toDate()}
                  onCancel={() => setModalVisibility(false)}
                  onConfirm={date => {
                    onChangeValue(date)
                    setModalVisibility(false)
                  }}
                  isVisible={showModal}
                  date={value?.toDate?.()}
                  cancelTextIOS={capitalizeWords(global?.language?.cancel)}
                  confirmTextIOS={capitalizeWords(global?.language?.confirm)}
                  headerTextIOS={capitalizeWords(global?.language?.[type === 'date' ? 'pick_a_date' : 'pick_a_time'])}
                  locale={user?.default_language}
                  is24Hour
                  mode={type}
                />
              </>
            )
          } else if (type === 'day') {
            //console.log('HERE ===> ', value)
            return (
              <>
                <FieldLabel type={type} text={label} />
                <Text />
                <Text />
                <DayPicker days={value} onSelectDay={onChangeValue} containerStyle={styles.dayPickerContainer} />
              </>
            )
          } else if (type === 'evaluators') {
            return (
              <>
                <ObjectiveEvaluatorsInputs
                  type={type}
                  evaluators={value}
                  label={label}
                  focusOn={focusOn}
                  onFocus={() => setFocusOn(true)}
                  objective_id={objective_id}
                  inviteCode={inviteCode}
                  isEdit={isEdit}
                  onDeleteEvaluator={newEvaluators => onChangeValue(newEvaluators)}
                  onUpdateEvaluators={newEvaluators => onChangeValue(newEvaluators)}
                  cansSubmitForm={cansSubmitForm}
                  saveOrUpdateObjective={saveOrUpdateObjective}
                />
              </>
            )
          }
        })()}
      </FieldContainer>
      <Text style={styles.errorMessageText}>
        {(function renderErrorMessageText() {
          let message = ''
          if (showIsRequiredMessage) {
            message = `*${capitalizeWords(global?.['language']?.['the_field_is_required'], { firstOnly: true, excludeWordWithLength: 1 })}`
          }
          return message
        })()}
      </Text>
    </>
  )
}

export default Field
