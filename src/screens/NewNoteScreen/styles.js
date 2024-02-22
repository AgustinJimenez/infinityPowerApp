import { StyleSheet } from 'react-native'
import colors from '../../helpers/colors'
import { scale, secondaryColor } from '../../helpers/styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: secondaryColor(0.8),
  },
  imageContainer: { position: 'absolute', height: '100%', width: '100%', flexDirection: 'row', justifyContent: 'flex-end' },
  image: { height: '100%', width: '100%' },
  inputsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: scale(2.4),
    right: scale(0.5),
    left: scale(0.5),
    alignItems: 'center',
    justifyContent: 'space-between',
    //backgroundColor: 'blue',
  },
  inputBox: {
    flexDirection: 'row',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#000',
    shadowOpacity: 0.5,
  },
  microphoneIconContainer: {
    flex: 0.4,
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  hidden: {
    flex: 0,
    opacity: 0,
  },
  cameraIconContainer: {
    //paddingHorizontal: scale(0.4),
    justifyContent: 'center',
    alignItems: 'flex-start',
    //backgroundColor: 'red',
  },
  safeArea: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  scrollContainer: {
    height: '100%',
  },
  noteTextInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 0.7,
    paddingHorizontal: scale(0.4),
    paddingTop: scale(0.2),
    paddingBottom: scale(0.3),
    backgroundColor: '#737782',
  },
  recordView: {},
  sendButton: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',

    //backgroundColor: 'red',
  },
  button: {
    color: 'rgba(255, 255, 255, 1)',
    fontSize: scale(0.6),
  },
})

export default styles
