import { StyleSheet } from 'react-native'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: scale(0.3),
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: scale(0.6),
    //width: scale(0.7),
    //height: scale(0.7),
    //borderRadius: scale(0.7) / 2,
  },
  redColor: {
    color: 'rgba(255,0,61,1)',
  },
  greenColor: {
    color: 'rgba(47,211,21,1)',
  },
  whiteColor: {
    color: 'rgba(255,255,255,1)',
  },
  statusContainer: {
    borderRadius: scale(0.5),
  },
  redBg: {
    backgroundColor: 'rgba(255,0,61,1)',
  },
  greenBg: {
    backgroundColor: 'rgba(47,211,21,1)',
  },
  evaluationsStatusCountsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  evaluationsCountsContainer: {
    minWidth: '10%',
  },
  evaluationsAchievedCountsContainer: {},
  stoppedAtTxt: {
    color: 'rgba(255,255,255,1)',
    width: '100%',
  },
  countText: {
    color: 'rgba(255,255,255,1)',
    textAlign: 'right',
    paddingRight: scale(0.3),
  },
})

export default styles
