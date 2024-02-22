import { StyleSheet } from 'react-native'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  container: {},
  scrollContainer: {
    paddingBottom: scale(8),
    alignItems: 'center',
  },
  title: {
    width: '60%',
    marginTop: scale(),
  },
  inputContainer: {
    width: '90%',
    minHeight: scale(2),
    backgroundColor: 'rgba(255,255,255,1)',
    borderRadius: scale(0.3),
    overflow: 'hidden',
  },
  bgTransparent: {
    backgroundColor: 'transparent',
  },
  bgSemiTransparent: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  placeholder: {
    color: 'rgba(120,120,120,1)',
  },
  input: {
    width: '95%',
    marginTop: scale(0.6),
    marginBottom: scale(0.4),
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputLabel: {
    position: 'absolute',
    top: 5,
    left: 10,
    fontWeight: '400',
  },
  inputLabelOut: {
    position: 'absolute',
    fontWeight: '400',
  },
  colorWhite: {
    color: 'rgba(255, 255, 255, 1)',
  },
  colorBlack: {
    color: 'rgba(0, 0, 0, 0.6)',
  },
  inputLabelDayPicker: {
    top: scale(),
  },
  dayPickerContainer: {},
  errorMessageText: { color: 'red', marginTop: scale(0.2), marginBottom: scale(0.5) },
  righTopButtonContainer: {
    position: 'absolute',
    top: scale(1.2),
    right: scale(0.6),
  },
  readyLabelText: {
    color: 'rgba(13,223,202,1)',
    textAlign: 'right',
    fontSize: scale(0.5),
    fontWeight: '700',
  },
  imageTrash: {
    width: scale(),
    height: scale(),
  },
  objectiveNameOnEdit: {
    color: 'rgba(255, 255, 255, 1)',
    fontWeight: '700',
    fontSize: scale(0.6),
    textAlign: 'center',
    marginVertical: scale(),
  },
  timeLabelContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: scale(1.3),
    alignSelf: 'center',
    justifyContent: 'center',
    top: scale(0.9),
    borderRadius: scale(0.15),
  },
  timeLabel: {
    top: scale(0.7),
    left: scale(0.2),
  },
  timeLabelCenter: {
    color: 'rgba(0, 0, 0, 1)',
    textAlign: 'center',
    paddingVertical: scale(0.2),
    fontWeight: '700',
  },
  evaluatorsContainer: {
    width: '80%',
    alignSelf: 'center',
    marginVertical: scale(0.7),
    justifyContent: 'center',
    flexDirection: 'row',
    //backgroundColor: 'red',
    flexWrap: 'wrap',
  },
  avatarRow: {
    marginRight: 0,
  },
  avatarContact: {
    marginTop: 0,
    alignSelf: 'center',
  },
  evaluatorsInputsTitleContainer: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: scale(0.2),
    //backgroundColor: 'red',
  },
  titleColumnEvaluators: {
    flex: 1,
    color: 'rgba(0, 0, 0, 1)',
    marginTop: scale(0.2),
    marginHorizontal: scale(0.3),
    textAlign: 'center',
    //backgroundColor: 'red',
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 1)',
    height: 0.5,
    width: '100%',
    alignItems: 'center',
  },
  evaluatorsGroup: {
    //backgroundColor: 'green',
    overflow: 'hidden',
  },
  overflowHidden: {
    overflow: 'hidden',
  },
  removeEvaluatorImage: {
    width: scale(0.4),
    height: scale(0.4),
    marginRight: scale(0.3),
  },
  removeEvaluatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: scale(0.3),
    //backgroundColor: 'red',
  },
  evaluatorContainer: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    width: '180%',
    paddingVertical: scale(0.3),
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  switchContainer: {
    width: '30%',
    alignItems: 'center',
  },
  deleteEvaluatorContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    flex: 1,
  },
  deleteEvaluatorText: {
    color: 'rgba(255, 255, 255, 1)',
    width: scale(3),
    marginHorizontal: scale(0.4),
    alignSelf: 'flex-end',
    fontWeight: '400',
    fontSize: scale(0.4),
    textAlign: 'center',
    textAlignVertical: 'center',
    textShadowColor: 'rgba(0, 0, 0, 1)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  evaluatorsContent: {
    overflow: 'hidden',
  },
  evaluatorsInputContainer: {
    paddingHorizontal: scale(0.5),
  },
  addEvaluatorIconContainer: {
    justifyContent: 'flex-start',
    marginHorizontal: scale(),
    marginBottom: scale(0.3),
  },
  addEvaluatorIcon: { color: 'rgba(255, 255, 255, 1)' },
  addEvaluatorIconDisabled: { color: 'rgba(90, 90, 90, 1)' },
  stoppedAtTxt: {
    width: '100%',
    textAlign: 'left',
  },
})

export default styles
