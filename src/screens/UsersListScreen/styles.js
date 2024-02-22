import { StyleSheet } from 'react-native'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  container: {},
  item: {
    margin: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    alignSelf: 'center',
    top: 5,
    color: 'white',
  },
  imageView: {
    backgroundColor: 'black',
    height: scale(2),
    width: scale(2),
    alignSelf: 'center',
    shadowColor: 'lightgray',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.6,
    borderRadius: scale(2) / 2,
    shadowRadius: 1,
  },
  buttonView: {
    height: scale(2),
    alignSelf: 'center',
    bottom: scale(2.5),
    width: scale(2),
    alignItems: 'center',
  },
  topText: {
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    color: 'white',
    alignSelf: 'center',
    padding: 10,
  },
})
export default styles
