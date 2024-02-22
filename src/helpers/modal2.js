import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Modal,
    Text,
    TouchableOpacity,
} from 'react-native';

const Modal2 = props => {
    const {
        state,
        ...attributes
    } = props;

    return (
        <Modal
            transparent={true}
            animationType={'none'}
            visible={state.state.modal3}
            onRequestClose={() => {  }}>
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper2}>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>
                        {state.state.modalText1}
                    </Text>
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'black'}}>
                        {state.state.modalText2}
                    </Text>
                    <Text style={{ textAlign: 'left', fontWeight: 'bold', marginTop: 40, color: 'black' }}>
                        {state.state.modalText3}
                    </Text>
                    <Text style={{ textAlign: 'center', marginTop: 20, color: 'black' }}>
                        {state.state.modalText4}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        state.setState({
                            modal3: false
                        })
                    }}>
                        <View style={{alignItems: 'center', marginTop: 40, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'gray', marginBottom: 10}}>
                            <Text style={{ color: 'black' }}> 
                                CERRAR
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper2: {
        backgroundColor: '#FFFFFF',
        width: 300,
        borderRadius: 10,
        padding: 20,
        display: 'flex',
        justifyContent: 'space-around'
    }
});

export default Modal2;