import React from 'react'
import { View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'
import { TextField } from 'react-native-material-textfield'

class PasswordInputText extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      icEye: 'visibility-off',
      isPassword: true,
    }
  }

  getRef = ref => {
    if (this.props.getRef) this.props.getRef(ref)
  }

  changePwdType = () => {
    const { isPassword } = this.state
    // set new state value
    this.setState({
      icEye: isPassword ? 'visibility' : 'visibility-off',
      isPassword: !isPassword,
    })
  }

  render() {
    const { iconSize, iconColor, label, style, txtColor, title, titleSize } = this.props
    const { icEye, isPassword } = this.state

    return (
      <View style={style}>
        <TextField
          {...this.props}
          returnKeyType='done'
          ref={this.getRef}
          secureTextEntry={isPassword}
          label={label}
          title={title}
          titleFontSize={titleSize}
          textColor={txtColor}
          tintColor={txtColor}
          baseColor={txtColor}
        />
        <Icon style={styles.icon} name={icEye} size={iconSize} color={txtColor} onPress={this.changePwdType} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: 33,
    right: 0,
  },
})

PasswordInputText.defaultProps = {
  iconSize: 25,
  label: 'Password',
  iconColor: '#222222',
}

PasswordInputText.propTypes = {
  iconSize: PropTypes.number,
  label: PropTypes.string,
  iconColor: PropTypes.string,
}

export default PasswordInputText
