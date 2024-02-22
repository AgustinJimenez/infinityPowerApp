import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    topTabButtonOn: {
        height: global.topTabButtonHeight, width: width / 2 - 12, backgroundColor: 'black',justifyContent:'center',alignItems:'center'
      },
      topTabButtonOff: {
        height: global.topTabButtonHeight, width: width / 2 - 12, backgroundColor: 'black',justifyContent:'center',alignItems:'center'
      },
      view: {
        flexDirection: 'row',
        flex : 1,
        width : global.width - 24
        },
      text: {
        fontSize: 18, fontWeight: '500', color: '#ffffff',
      }
});