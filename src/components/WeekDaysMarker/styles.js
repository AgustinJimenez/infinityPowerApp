import { StyleSheet } from 'react-native'
import { globalStyles, scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  todayResumeTextContainer: { paddingHorizontal: scale(0.8) },
  todayResumeText: { textAlign: 'right', color: 'white' },
  dayListContainer: { flexDirection: 'row', width: '100%', justifyContent: 'center', marginVertical: scale(0.25) },
  dayContainer: {
    flexDirection: 'column',
    marginHorizontal: scale(0.11),
    paddingVertical: scale(0.30),
    paddingHorizontal: scale(0.22),
    borderRadius: scale(0.2),
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
  dayInitial: { color: 'white', textAlign: 'center' },
  dayNumber: { color: 'white', fontWeight: '800', textAlign: 'center',marginTop:5 },
  textShadow: globalStyles.textShadow,
})
export default styles
