import React from 'react'
import { Text, View, ImageBackground, Image } from 'react-native'
import ImageCamera from '../img/camera.png'

class Card extends React.Component {
  constructor() {
    super()
  }
  static navigationOptions = {
    header: null,
  }
  async componentDidMount() {}

  render() {
    const { width, height, image, no, title, type, edit } = this.props
    if (type == null) {
      return (
        <ImageBackground
          source={image == null ? image : image}
          style={[{ width: width, height: height, flexDirection: 'column' }, edit ? { justifyContent: 'center' } : { justifyContent: 'flex-end' }]}
          imageStyle={{ resizeMode: 'cover', borderRadius: 24 }}
        >
          {!this.props.edit && !this.props.fullImg && (
            <View
              style={{
                width: '100%',
                alignSelf: 'flex-end',
                backgroundColor: 'white',
                alignItems: 'center',
                flexDirection: 'column',
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
                paddingBottom: 10,
                height: 65,
                paddingLeft: 2,
                paddingRight: 2,
              }}
            >
              <View
                style={{
                  borderRadius: 30,
                  backgroundColor: global.authButtonColor,
                  alignSelf: 'center',
                  color: 'white',
                  width: 25,
                  height: 25,
                  position: 'absolute',
                  marginTop: -10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text style={{ alignSelf: 'center', color: 'white', padding: 5, fontSize: no > 9 ? 11 : 15 }}>{no}</Text>
              </View>
              <View style={{ flexShrink: 1, paddingTop: 15, paddingBottom: 0, marginLeft: 2, marginRight: 2 }}>
                <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', textAlign: 'center', fontSize: 13 }}>{title}</Text>
              </View>
            </View>
          )}
          {this.props.edit && this.props.fullImg && (
            <View style={{ width: width, height: height, justifyContent: 'space-between', flexDirection: 'column' }}>
              <Image
                source={ImageCamera}
                style={{ backgroundColor: '#5c9c93', borderRadius: 20, padding: 20, margin: 5, alignSelf: 'flex-end', width: 20, height: 20 }}
              />
            </View>
          )}
          {this.props.edit && !this.props.fullImg && (
            <View style={{ width: width, height: height, justifyContent: 'space-between', flexDirection: 'column' }}>
              <Image
                source={ImageCamera}
                style={{ backgroundColor: '#5c9c93', borderRadius: 20, padding: 20, margin: 5, alignSelf: 'flex-end', width: 20, height: 20 }}
              />

              <View
                style={{
                  width: '100%',
                  backgroundColor: 'white',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  borderBottomLeftRadius: 24,
                  borderBottomRightRadius: 24,
                  paddingBottom: 10,
                  height: 65,
                  paddingLeft: 2,
                  paddingRight: 2,
                }}
              >
                <View
                  style={{
                    borderRadius: 30,
                    backgroundColor: global.authButtonColor,
                    alignSelf: 'center',
                    color: 'white',
                    width: 25,
                    height: 25,
                    position: 'absolute',
                    marginTop: -10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ alignSelf: 'center', color: 'white', padding: 5, fontSize: no > 9 ? 11 : 15 }}>{no}</Text>
                </View>
                <View style={{ flexShrink: 1, paddingTop: 15, paddingBottom: 0, marginLeft: 2, marginRight: 2 }}>
                  <Text style={{ flex: 1, flexWrap: 'wrap', color: 'black', textAlign: 'center', fontSize: 13 }}>{title}</Text>
                </View>
              </View>
            </View>
          )}
        </ImageBackground>
      )
    } else {
      return (
        <View style={{ width: width, height: height, justifyContent: 'center', borderRadius: 24, alignItems: 'center', backgroundColor: 'white' }}>
          <View
            style={{
              width: width / 3,
              height: width / 3,
              backgroundColor: global.authButtonColor,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>+</Text>
          </View>
        </View>
      )
    }
  }
}

export default Card
