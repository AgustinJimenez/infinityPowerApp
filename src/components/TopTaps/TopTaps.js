import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from 'native-base'
import { View } from 'react-native-animatable'
import topTabsStyle from '../../stylesheets/TopTapStyle'
import DeviceInfo from 'react-native-device-info'
import { globalStyles } from '../../helpers/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
export default class TopTabs extends Component {
  constructor() {
    super()
    this.state = {
      currentTabIndex: 0, // eslint-disable-line
      tabsStyles: [topTabsStyle.topTabButtonOn, topTabsStyle.topTabButtonOff],
    }
  }
  componentDidMount() {}
  render() {
    var underlineColor_1 = global.authButtonColor
    var underlineColor_2 = global.authButtonColor
    if (this.state.currentTabIndex == 0) underlineColor_2 = 'transparent'
    else underlineColor_1 = 'transparent'

    return (
      <View style={topTabsStyle.view}>
        <View style={{ flex: 1, flexDirection: 'column', height: global.topTabButtonHeight }}>
          <Button full activeOpacity={1} style={this.state.tabsStyles[0]} onPress={this.props.switch(0)}>
            <Text style={topTabsStyle.text} uppercase={false}>
              {global?.language?.register}
            </Text>
          </Button>
          <View style={[globalStyles.authTabUnderLine, { backgroundColor: underlineColor_1 }]}></View>
        </View>
        <View style={{ flex: 1, flexDirection: 'column', height: global.topTabButtonHeight }}>
          <Button full activeOpacity={1} style={this.state.tabsStyles[1]} onPress={this.props.switch(1)}>
            <Text style={topTabsStyle.text} uppercase={false}>
              {global?.language?.enter}
            </Text>
          </Button>
          <View style={[globalStyles.authTabUnderLine, { backgroundColor: underlineColor_2 }]}></View>
        </View>
      </View>
    )
  }
}

TopTabs.propTypes = {
  switch: PropTypes.func.isRequired,
}
