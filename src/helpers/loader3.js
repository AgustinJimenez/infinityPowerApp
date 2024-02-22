import React from 'react'
import { StyleSheet, View, Modal, Text } from 'react-native'
import * as fn from 'helpers/scripts'
import capitalizeWords from './capitalizeWords'

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: global.authButtonColor,
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper2: {
    backgroundColor: global.authButtonColor,
    height: 220,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
})

const Loader3 = props => (
  <Modal transparent={false} animationType='none' visible={props.loading}>
    <View style={[styles.modalBackground]}>
      <View style={[props.modalText == null ? styles.activityIndicatorWrapper : styles.activityIndicatorWrapper2, { flexDirection: 'row' }]}>
        {props.modalText != null && (
          <Text style={{ textAlign: 'center', fontSize: 60, fontWeight: 'bold', flexDirection: 'column', color: 'white' }}>
            <Text style={{ color: '#fff' }}>{capitalizeWords(global?.['language']?.['get_in_ready']) + '\n'}</Text>
            <Text style={{ color: '#fff' }}>{props.modalText}</Text>
          </Text>
        )}
      </View>
    </View>
  </Modal>
)

export default Loader3
