import { StyleSheet } from 'react-native'
import { AsyncStorage, Dimensions } from 'react-native'
import colors from './colors'

//getting screen width and height
const { height, width } = Dimensions.get('window')

global.height = height
global.width = width
export const scale = (number = 1) => (number / 10) * width
global.topTabButtonHeight = height / 12
colors.initColor()

export const primaryColor = 'rgba(0, 221, 199, 1)'
export const activeColor = '#73dd62'
export const secondaryColor = (o = 1) => `rgba(41, 44, 51, ${o})` //background: 41,44,51,1;
export const thirdsColor = '#232324'
export const fourthColor = 'rgba(0, 219, 125, 1)'

export const globalStyles = StyleSheet.create({
  input: {
    height: 40,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    margin: 3,
  },
  button: {
    height: 40,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
    margin: 3,
    borderColor: '#ccc',
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 10,
  },
  boxwhite: {
    width: '100%',
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 5,
  },
  boxgray: {
    flex: 1,
    backgroundColor: '#e4e4e4',
    borderRadius: 8,
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    margin: 4,
  },
  labelgray: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 4,
    padding: 4,
    margin: 4,
  },
  explainText: {
    color: '#f5f5f5',
  },
  textCenter: {
    textAlign: 'center',
  },
  colorOrange: {
    color: '#a6802f',
  },
  font1: {
    fontSize: 25,
  },
  font2: {
    fontSize: 8,
  },
  font3: {
    fontSize: 22,
    color: '#666',
  },
  verticalContainer: {
    flex: 1,
    flexDirection: 'column',
    width: global.width,
  },
  horiziontalContainer: {
    flex: 1,
    flexDirection: 'row',
    width: global.width,
  },
  centerText: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  centerImage: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  //authscreenpage
  authContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: 'black',
    borderRadius: 12,
    margin: 8,
    alignSelf: 'center',
    height: global.height - 24,
  },
  authContainer: {
    flexDirection: 'row',
    backgroundColor: 'black',
    flex: 1,
    width: global.width,
    height: global.height,
  },
  authButtonStyle: {
    width: global.width / 3,
    backgroundColor: global.authButtonColor,
    padding: 6,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  autoTextButtonStyle: {
    color: 'white',
    alignItems: 'center',
  },
  authTabUnderLine: {
    height: 3,
    backgroundColor: global.authButtonColor,
    width: global.width / 2 - 12,
    position: 'absolute',
    marginTop: global.topTabButtonHeight - 1,
  },
  authFormStyle: {
    width: (global.width * 3) / 4,
  },
  //Main Screen
  mainCurvedContainer: {
    flex: 1,
    height: (global.height / 3) * 2 + 45,
    width: global.width,
    alignItems: 'center',
  },
  curvedBgImgStyle: {
    width: '100%',
    height: '100%',
  },
  homePercentagesBox: {
    alignItems: 'center',
    alignSelf: 'center',
    width: scale(9),
    borderRadius: scale(),
    backgroundColor: 'rgba(1,1,1, 0.5)',
  },
  dailyMeterContainer: {
    alignSelf: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    height: scale(2),
  },
  meterDivideLine: {
    width: 2,
    backgroundColor: 'rgba(170,170,170,1)',
    height: '100%',
    height: '93%',
    alignSelf: 'flex-end',
  },
  meterTextContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    marginVertical: scale(0.8),
  },
  textPercentage: {
    fontSize: scale(0.8), //35,
    fontWeight: 'bold',
  },
  textDescription: {
    fontSize: scale(0.3),
  },
  bottomCreateButton: {
    bottom: 20,
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: global.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newHomeButton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: global.mainColor,
  },
  capsuleLayout: {
    marginLeft: global.width / 5,
    marginTop: -15,
    width: 70,
  },
  summaryLayout: {
    width: (global.width * 4) / 5,
    height: width / 3,
    alignSelf: 'center',
    marginTop: 10,
  },
  reminderLayout: {
    width: (global.width * 4) / 5,
    alignSelf: 'center',
    marginTop: 50,
    flexDirection: 'column',
  },
  summaryTabStyle: {
    width: (global.width * 4) / 5,
    height: width / 3,
  },
  mainText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '400',
    marginLeft: 5,
  },
  subText: {
    fontSize: 18,
    color: 'grey',
    marginLeft: 0,
    fontStyle: 'italic',
    textAlign: 'justify',
  },
  resourceTabButtonSelected: {
    width: (global.width * 4) / 10,
    height: 50,
    marginLeft: (global.width * 4) / 10,
    backgroundColor: global.mainColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1,
    borderWidth: 0,
    borderColor: global.mainColor,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resourceTabButtonDeselected: {
    width: (global.width * 4) / 10,
    height: 50,
    marginLeft: (global.width * 4) / 10,
    backgroundColor: global.mainColor,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1,
    marginTop: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  summeryTabButtonSelected: {
    width: (global.width * 4) / 10,
    height: 50,
    marginLeft: 0,
    borderColor: global.mainColor,
    borderBottomColor: 'black',
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: -2,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: global.mainColor,
  },
  summeryTabButtonDeselected: {
    width: (global.width * 4) / 10,
    height: 50,
    borderColor: global.mainColor,
    backgroundColor: 'black',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    zIndex: 1,
    marginTop: 5,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: global.mainColor,
  },
  summaryPanelActive: {
    width: (global.width * 4) / 5,
    height: 120,
    backgroundColor: 'black',
    borderRadius: 10,
    borderColor: global.mainColor,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    zIndex: -1,
    marginTop: 40,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: 0,
  },
  resourcePanelActive: {
    width: (global.width * 4) / 5,
    height: 120,
    backgroundColor: global.mainColor,
    borderRadius: 10,
    zIndex: -1,
    marginTop: 40,
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
  },
  primaryBg: {
    backgroundColor: '#292c33', //'rgba(50,53,60,1)',
  },
  //bottom bar styles
  bottomDivideLine: {
    width: 1,
    backgroundColor: 'white',
    height: 30,
  },

  advancedConfigLayout: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  //information page screen
  informationLayout: {
    width: global.width,
    height: global.height,
    backgroundColor: 'black',
  },
  titleBar: {
    // width : global.width,
    width: '100%',
    height: 50,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'black',
    alignItems: 'center',
  },
  infoBg: {
    backgroundColor: 'black',
    marginTop: 20,
    borderRadius: 6,
    paddingBottom: 10,
  },
  infoPoint: {
    width: 5,
    height: 5,
    borderRadius: 10,
    marginTop: 7,
    backgroundColor: 'green',
  },
  horizonLine: {
    marginTop: 10,
    backgroundColor: global.mainColor,
    height: 2,
  },

  //info2 page
  topBar: {
    flexDirection: 'row',
    width: global.width,
    height: 50,
  },
  //Profile Page
  ProfileImageContainer: {
    width: global.width,
    height: (width * 2) / 3 - 40,
    // position : 'absolute',
    marginTop: 0,
  },
  nameContainer: {
    // marginTop : width * 2 / 3 - 60,
    // position : 'absolute'
  },
  arrowButtonContainer: {
    borderColor: 'white',
    borderRadius: 10,
    height: 40,
    flexDirection: 'row',
    borderWidth: 2,
    marginTop: 10,
  },
  arrowImageStyle: {
    width: 13,
    height: 20,
  },
  //wishlist page
  roundedContainer: {
    borderRadius: 10,
    backgroundColor: 'black',
    paddingBottom: 10,
  },
  //Capsule Page
  capsule_description: {
    marginTop: 10,
    marginBottom: 80,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    flex: 1,
  },
  bottomButtonStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    bottom: 10,
    width: global.width,
  },
  CapsuleBottomCreateButton: {
    height: 60,
    width: 60,
    borderRadius: 100,
    backgroundColor: global.mainColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  //Routine Page
  timePickerContainer: {
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  borderItemStyle: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'white',
  },
  // RoutineSchedulePage
  wallpaperLayout: {
    // flex : 1,
    height: 120,
    flexDirection: 'row',
  },
  routineLayout: {
    flex: 6,
    height: 120,
    backgroundColor: 'black',
    opacity: 0.8,
    marginLeft: -20,
    zIndex: 10,
    borderRadius: 10,
    paddingLeft: 25,
  },
  wallPaperButton: {
    borderRadius: 10,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginTop: 20,
  },
  selectLayout: {
    borderRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: 'gray',
    padding: 8,
  },
  grayTextStyle: {
    color: '#cccccc',
    marginRight: 10,
  },

  //Affirmation Page
  roundedInputStyle: {
    backgroundColor: global.pageBkColor,
    borderRadius: 10,
    padding: 10,
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
    width: '100%',
    height: (width * 1) / 3,
  },
  labelText: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: 'white',
  },
  //(Account Page/Consecutive Success)
  beltContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingLeft: 15,
    paddingBottom: 9,
  },
  //VideoPlayer Page
  backgroundVideo: {
    width: '100%',
    height: (width * 3) / 5,
  },
  categoryListTitle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 21,
    fontWeight: 'bold',
  },
  categoryListItemContainer: {
    flexDirection: 'column',
    marginHorizontal: 10,
    paddingTop: 20,
  },
  categoryListItemTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  categoryListItemText: { color: '#fff', fontSize: 18 },
  categoryListItemSubText: { fontWeight: 'normal', color: '#fff' },
  categoryListItemIconContainer: {
    width: 48,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  categoryListItemIconImage: { width: 28, height: 28 },
  listDivider: {
    backgroundColor: global.mainColor,
    height: 2,
    marginTop: 60,
  },
  dayDot: { width: 13, height: 13, flex: 1 },
  dayDotContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textShadow: { textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 5, textShadowColor: 'black' },
  title: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: scale(0.7),
    paddingTop: scale(0.4),
  },
  messageBox: {
    backgroundColor: 'rgba(35,35,36,1)',
    paddingHorizontal: scale(0.6),
    paddingTop: scale(0.2),
    marginVertical: scale(0.15),
    borderRadius: scale(0.4),
    paddingBottom: scale(0.2),
    marginStart: scale(),
    marginEnd: scale(0.4),
  },
  greenTextRight: {
    alignSelf: 'flex-end',
    marginBottom: scale(0.3),
  },
  greenText: {
    color: 'rgba(13,223,202,1)',
    fontSize: scale(0.45),
  },
  darkTransparentBox: {
    backgroundColor: secondaryColor(0.5),
    paddingHorizontal: scale(0.35),
    paddingVertical: scale(0.5),
    marginHorizontal: scale(0.6),
    marginVertical: scale(0.3),
    borderRadius: scale(0.4),
  },
})
//
