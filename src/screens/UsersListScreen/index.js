import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native'
import { scale, secondaryColor } from '../../helpers/styles'
import { withNavigation } from 'react-navigation'
import request from '../../helpers/request'
import styles from './styles'
import { ActivityIndicator } from 'react-native'

const placeholderBase64image = 'data:img/profile.png;base64 [yourbase64imagedata]'

class UsersListScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      userData: [],
    }
  }

  getUsersData = async () => {
    // const [userData, setUserData] = useState([]);
    await this.setState({ isLoading: true })
    let { error, data, message, response } = await request({
      url: 'mobile/users/friends_to_evaluate',
      method: 'POST',
      //debug: true,
      show_message: true,
    })
    await this.setState({ isLoading: false })
    this.setState({ userData: data.users })
  }

  componentDidMount() {
    this.getUsersData()
  }

  render() {
    return (
      <View style={{ width: '100%', height: '100%', backgroundColor: secondaryColor(0.8) }}>
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-end',
          }}
        >
          <View style={{ width: '100%', alignSelf: 'flex-end', justifyContent: 'center', positon: 'absolute', bottom: scale(2.1) }}>
            <View
              style={{ width: this.props.navigation?.state?.params?.notes != '' ? '100%' : 0, alignSelf: 'center', backgroundColor: 'rgba(0, 221, 199, 0.53)' }}
            >
              <View style={{ width: '90%', borderRadius: 10, margin: 5, alignSelf: 'center', backgroundColor: 'rgba(0, 221, 199, 0.53)' }}>
                <Text style={styles.topText}>{this.props.navigation?.state?.params?.notes}</Text>
              </View>
            </View>
            {(() => {
              if (this.state.isLoading) return <ActivityIndicator size='large' style={{ marginVertical: scale(0.5) }} />

              return (
                <FlatList
                  horizontal={false}
                  style={{ alignSelf: 'center', top: 8 }}
                  data={this.state.userData}
                  numColumns={3}
                  scrollEnabled={false}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={({ id }, index) => id}
                  renderItem={({ item }) => {
                    return (
                      <View style={styles.item}>
                        <Image
                          source={{ uri: item.image ? item.image : placeholderBase64image }}
                          defaultSource={require('img/profile.png')}
                          style={styles.imageView}
                        />
                        <Text style={styles.title}>{item.name}</Text>
                        <TouchableOpacity
                          style={styles.buttonView}
                          onPress={() =>
                            this.props.navigation.navigate('ObjectiveSelectionScreen', {
                              notes: this.props.navigation?.state?.params?.notes,
                              dataSelected: item,
                              newPhoto: this.props.navigation?.state?.params?.newPhoto,
                              newAudio: this.props.navigation?.state?.params?.newAudio,
                            })
                          }
                        />
                      </View>
                    )
                  }}
                />
              )
            })()}
          </View>
        </SafeAreaView>
      </View>
    )
  }
}

export default withNavigation(UsersListScreen)
