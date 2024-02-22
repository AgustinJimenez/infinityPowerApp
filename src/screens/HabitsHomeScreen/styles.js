import { StyleSheet } from 'react-native'
import { scale } from '../../helpers/styles'

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scale(8),
  },
  listContainer: {
    marginTop: scale(7.3),
    width: '100%',
  },
  title: {
    fontWeight: '700',
    fontSize: scale(0.6),
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    width: '100%',
  },
  no_data_text: {
    fontWeight: '400',
    fontSize: scale(0.6),
    color: 'rgba(255,255,255,1)',
    textAlign: 'center',
    width: '100%',
    marginVertical: scale(0.6),
  },
  addButtonIcon: {
    color: 'rgba(255,255,255,1)',
  },
  addButtonIconContainer: {
    position: 'absolute',
    top: scale(1.2),
    right: scale(0.8),
  },
  myRoutinesLabel: {
    flex: 0.7,
    fontWeight: '400',
    fontSize: scale(0.55),
    color: 'rgba(255,255,255,1)',
    //backgroundColor: 'blue',
  },
  noteIconContainer: {
    flex: 0.3,
    fontWeight: '400',
    color: 'rgba(255,255,255,1)',
    //backgroundColor: 'green',
    alignItems: 'flex-end',
  },
  noteIcon: {
    color: 'rgba(255,255,255,1)',
  },
  myRoutinesNoteIconContainer: {
    //flex: 1,
    flexDirection: 'row',
    top: scale(1.5),
    paddingHorizontal: scale(),
  },
  listItemContainer: {},
  listItemTitle: {
    color: 'rgba(255,255,255,1)',
    left: scale(0.3),
    marginBottom: scale(0.4),
    fontWeight: '700',
    fontSize: scale(0.37),
    alignSelf: 'center',
  },
  topListItemContainer: {
    flexDirection: 'row',
    marginTop: -scale(0.2),
  },
  playIconContainer: {
    flex: 0.12,
  },
  playIcon: {
    color: 'rgba(255,255,255,1)',
  },
  chartContainer: {
    //backgroundColor: 'red',
    width: '80%',
    height: scale(2),
  },
  middleListItemContainer: {
    flexDirection: 'row',
  },
  averageAchievementPercentageContainer: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    borderRadius: 8,
    paddingVertical: scale(0.15),
    paddingHorizontal: scale(0.3),
    right: -scale(0.2),
    top: '50%',
  },
  averageAchievementPercentageText: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontWeight: '700',
    fontSize: 14,
  },
  averageAchievementPercentageSubtext: {
    textAlign: 'center',
    color: 'rgba(255,255,255,1)',
    fontWeight: '400',
    fontSize: 10,
  },
  bottomListItemContainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: scale(0.5),
  },
  bottomListItemText: {
    flex: 1,
    textAlign: 'left',
    color: 'rgba(255,255,255,1)',
    fontWeight: '300',
    fontSize: scale(0.3),
    marginTop: scale(0.2),
  },
  middleRightButtonImage: { width: scale(0.846), height: scale(0.564) },
  topComponentsContainer: {
    position: 'absolute',
    top: scale(),
    width: '100%',
  },
})
export default styles
