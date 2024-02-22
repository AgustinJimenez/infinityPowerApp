import { Dimensions } from 'react-native'

const scale = (number = 1) => {
  return Dimensions.get('window').width * number
}

export default scale
