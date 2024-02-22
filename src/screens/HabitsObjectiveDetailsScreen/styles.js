import { StyleSheet } from 'react-native'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  container: {},
  title: {
    fontWeight: '700',
    fontSize: scale(0.6),
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    width: '90%',
    marginTop: scale(),
    alignSelf: 'center',
  },
  smallText: {
    fontWeight: '400',
    fontSize: scale(0.4),
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    width: '100%',
    marginTop: scale(0.8),
    marginBottom: scale(0.4),
  },
  scrollContainer: {
    paddingBottom: scale(8),
  },
  achievedPercentage: {
    alignItems: 'center',
    width: '100%',
  },
  last7daysEvaluations: {
    paddingHorizontal: '10%',
  },
  streakBlock: {
    width: '60%',
    alignSelf: 'center',
  },
  strakInfo: {
    fontWeight: '400',
    fontSize: scale(0.4),
    color: 'rgba(255,255,255,1)',
    textAlign: 'right',
  },
  howEvaluatedMe: {
    marginTop: scale(1),
  },
  bottomLabel: {
    marginTop: scale(0.1),
    marginBottom: scale(0.1),
  },
})
export { styles }
