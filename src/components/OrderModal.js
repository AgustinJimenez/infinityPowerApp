import React from 'react'
import { Modal, View, Text, TouchableOpacity, Image } from 'react-native'
import DraggableFlatlist from './DraggableFlatlist'

const OrderModal = ({ show, rutinas, handleShow, handleMoveRoutine }) => {
  return (
    <Modal transparent={true} animationType='none' visible={show} onRequestClose={() => {}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#00000040',
        }}
      >
        <View
          style={{
            backgroundColor: '#FFFFFF',
            height: '90%',
            minHeight: 180,
            width: 300,
            borderRadius: 10,
            padding: 20,
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <Text style={{ color: 'black', fontSize: 18, textAlign: 'center', borderBottomColor: '#5c9c93', borderBottomWidth: 1, paddingBottom: 10 }}>
            {global?.language?.label_reorder_routines}
          </Text>

          <DraggableFlatlist
            data={rutinas}
            keyExtractor={(item, index) => `draggable-item-${item.id}`}
            onMoveEnd={data => handleMoveRoutine(data)}
            renderItem={({ item, index, move, moveEnd }) => {
              return (
                <TouchableOpacity onLongPress={move}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderBottomColor: '#5c9c93',
                      borderBottomWidth: 1,
                      paddingVertical: 20,
                      backgroundColor: 'white',
                    }}
                  >
                    <Text style={{ color: 'black' }}>{item.name}</Text>
                    <View style={{}}>
                      <Image source={require('img/reorder_gray.png')} style={{ width: 20, height: 20, marginRight: 10 }}></Image>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}
          />
          <TouchableOpacity onPress={() => handleShow()}>
            <Text style={{ color: 'black', textAlign: 'center', borderTopColor: '#5c9c93', borderTopWidth: 1, paddingTop: 10 }}>{global?.language?.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}
export default OrderModal
