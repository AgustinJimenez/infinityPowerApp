import { StyleSheet, Dimensions } from 'react-native'
import { scale, secondaryColor } from '../../helpers/styles'

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: secondaryColor(0.8),
    flex: 1,
  },
  contentContainer: {
    width: '100%',
    //height: DeviceInfo.hasNotch() ? win.height - (win.height * 0.2 < 75 ? 75 : win.height * 0.1) - 60 : win.height - scale(2),
    //justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    //backgroundColor: 'clear',
  },
  userViewContainer: {
    flex: 1,
    //backgroundColor: 'red',
    alignItems: 'center',
  },
  topContainer: { justifyContent: 'center', backgroundColor: 'rgba(0, 221, 199, 0.53)' },
  topSubContainer: {
    width: '90%',
    borderRadius: 10,
    margin: 5,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 221, 199, 0.53)',
  },
  bottomFloatingActionContainer: {
    position: 'absolute',
    bottom: scale(2.8),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
  },
  loaderContainer: {
    flex: 1,
    paddingVertical: scale(2),
  },
  sendButtonContainer: {
    height: 44,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: '#292C33',
  },
  objectiveListContainer: { width: '90%', alignSelf: 'center', paddingBottom: scale(4) },
  objectiveList: { width: '100%', borderRadius: 12, backgroundColor: 'rgba(35, 35, 36, 1.0)' },
  objectiveListItem: {
    marginVertical: 15,
    right: 2,
    left: 2,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topText: {
    fontSize: 18,
    padding: 10,
    color: 'white',
    alignSelf: 'center',
    fontFamily: 'Proxima Nova',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageView: {
    height: 28,
    width: 28,
    left: 15,
    marginRight: 4,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'left',
    width: '80%',
    color: 'white',
  },
  userView: {
    height: scale(2),
    marginTop: scale(0.5),
    marginBottom: scale(1.3),
    borderRadius: scale(2) / 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText2: {
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    color: 'white',
    alignSelf: 'center',
    padding: 0,
  },
  UserName: {
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    bottom: -scale(0.5),
    color: 'white',
    position: 'absolute',
    alignSelf: 'center',
  },
  selectedUser: {
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
    position: 'absolute',
    height: scale(2),
    width: '100%',
  },
})
export default styles