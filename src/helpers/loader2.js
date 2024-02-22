import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
  Text,
} from 'react-native';

const Loader2 = props => {
  const {
    loading,
    modalText,
    isNotesSection,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {}}>
      <View style={isNotesSection ? styles.modalBackground2 : styles.modalBackground}>
        <View style={ isNotesSection ? styles.activityIndicatorWrapperNotes : ((modalText == null) ? styles.activityIndicatorWrapper : styles.activityIndicatorWrapper2)}>
          <ActivityIndicator
            animating={loading} size = "large" />
          {modalText != null && <Text style={{textAlign: 'center'}}>
            {modalText}
          </Text>}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    paddingBottom: 100,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000040'
  },
  modalBackground2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  activityIndicatorWrapperNotes: {
    backgroundColor: '#FFFFFF',
    height: 70,
    width: 70,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  activityIndicatorWrapper2: {
    backgroundColor: '#FFFFFF',
    height: 120,
    width: 300,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  }
});

export default Loader2;