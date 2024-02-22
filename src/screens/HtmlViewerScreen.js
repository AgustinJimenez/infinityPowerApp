import React from 'react'
import { Text, View, TouchableOpacity, Image, Picker, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import * as fn from 'helpers/scripts'
import WebView from 'react-native-webview'
import { globalStyles } from '../helpers/styles'
import Dialog, { DialogContent, DialogTitle } from 'react-native-popup-dialog'
import NoteIconImage from 'img/icon_note.png'
import NoteBlackIconImage from 'img/icon_note_black.png'
import InfoIconImage from 'img/icon_info.png'
import InfoIconBlackImage from 'img/icon_info_black.png'

import TextIconImage from 'img/icon_text.png'
import TextIconBlackImage from 'img/icon_text_black.png'
import { datasetSelector } from '../redux/selectors'
import { setDatasetToReducer } from '../redux/actions'
import { connect } from 'react-redux'
import request from '../helpers/request'
import BottomNavigationBar from '../components/BottomNavigationBar'

class HtmlViewerScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }
  static MAX_ALLOW_TIME = 2000000000000

  constructor(props) {
    super(props)
    this.state = {
      isDaymode: false,
      isLarge: false,
      item: props.navigation.getParam('item'),
      fontSize: null,
      visibleFontDialog: false,
      webViewHasLoadedContent: false,
      content: null,
      loading: true,
    }

    this.fontSizeList = []
    for (var i = 15; i <= 30; i++) this.fontSizeList.push(i.toString())
  }

  componentDidMount() {
    this.prepareDatas()
  }
  renderBottonButtonContent = () => this.props.navigation.getParam('bottonButtonContent')

  prepareDatas = async () => {
    let { data, error } = await request({
      url: 'mobile/users/html_viewer_styles_config',
      method: 'POST',
      //debug: true,
    })
    if (!error && !!data) {
      if (!!data.styles_to_remove) this.props.setHtmlViewerStylesBlacklist(data.styles_to_remove)
      if (!!data.template) this.props.setHtmlViewerTemplate(data.template)
    }

    //this.updateText()
    await this.setState({
      isVisible: false,
    })

    this.isShowing = false
  }

  changeTextMode = () => this.setState({ visibleFontDialog: true })

  changeDayMode = async () => {
    await this.setState(state => {
      state['isDaymode'] = !state['isDaymode']
      return state
    })
    //this.updateText()
  }
  updateFontSize = fontSize => this.setState({ fontSize })

  renderFontSizeDialog = () => {
    return (
      <Dialog
        width={0.8}
        visible={this.state.visibleFontDialog}
        style={{ width: '80%' }}
        onTouchOutside={() => {
          this.setState({ visibleFontDialog: false })
        }}
        dialogTitle={
          <DialogTitle
            title={global?.language?.title_select_font}
            style={{
              backgroundColor: 'white',
              color: 'black',
            }}
            hasTitleBar={false}
            align='left'
          />
        }
      >
        <DialogContent
          style={{
            flexDirection: 'column',
            height: 100,
            justifyContent: 'center',
            backgroundColor: 'white',
            color: 'black',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              padding: 5,
              height: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* <Text style={{marginRight:10,color:'black',alignSelf:'center'}}>{global?.language?.label_size}</Text> */}
            <Picker style={{ flex: 1, color: 'black' }} mode='dropdown' selectedValue={this.state.fontSize} onValueChange={this.updateFontSize}>
              {this.fontSizeList.map((value, i) => {
                return <Picker.Item label={value} value={value} key={i} color='black' />
              })}
            </Picker>
          </View>
        </DialogContent>
      </Dialog>
    )
  }
  screenTouched = () => {
    if (this.isShowing) return
    this.setState({ isVisible: true })

    this.isShowing = true
    setTimeout(() => {
      this.setState({ isVisible: false })
      this.isShowing = false
    }, 4000)
  }

  switchableBackgroundColor = () => {
    let bgColor = this.state.isDaymode ? 'white' : 'black'
    //console.log('switchableBackgroundColor ===> ', bgColor)
    return bgColor
  }

  renderTopToolBar = () => {
    if (this.state.isVisible)
      return (
        <View
          style={[
            globalStyles.topBar,
            {
              backgroundColor: this.switchableBackgroundColor(),
              opacity: this.state.fadeIn,
            },
          ]}
        >
          <View style={{ position: 'absolute', top: 10, width: '100%' }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                height: 30,
              }}
            >
              <View style={{ flex: 1, flexDirection: 'row', height: 30 }}>
                <View
                  style={[
                    globalStyles.bottomDivideLine,
                    {
                      backgroundColor: this.switchableBackgroundColor(),
                    },
                  ]}
                />
                <TouchableOpacity style={{ flex: 1 }} onPress={() => this.props.navigation.goBack()}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={this.state.isDaymode ? InfoIconBlackImage : InfoIconImage} style={{ width: 8.25, height: 20.25 }} />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    globalStyles.bottomDivideLine,
                    {
                      backgroundColor: this.switchableBackgroundColor(),
                    },
                  ]}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row', height: 30 }}>
                <View
                  style={[
                    globalStyles.bottomDivideLine,
                    {
                      backgroundColor: this.switchableBackgroundColor(),
                    },
                  ]}
                />
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    this.changeTextMode()
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={!this.state.isDaymode ? TextIconImage : TextIconBlackImage} style={{ width: 30, height: 30 }} />
                  </View>
                </TouchableOpacity>
                <View
                  style={[
                    globalStyles.bottomDivideLine,
                    {
                      backgroundColor: this.switchableBackgroundColor(),
                    },
                  ]}
                />
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    this.changeDayMode()
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Image source={!this.state.isDaymode ? NoteIconImage : NoteBlackIconImage} style={{ width: 18, height: 22.5 }} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )
  }
  renderWebViewContent = html => {
    return (
      <WebView
        originWhitelist={['*']}
        source={{ html, baseUrl: '' }}
        //scalesPageToFit={false}
        contentMode='mobile'
        bounces
        onLoadEnd={event => {
          //console.log('onLoadEnd ===> ', event)
          this.setState({ loading: true })
        }}
        onLoadStart={event => {
          setTimeout(() => {
            this.setState({ webViewHasLoadedContent: true, loading: false })
          }, 500)
        }}
        useWebKit
        allowUniversalAccessFromFileURLs
        showsVerticalScrollIndicator={false}
        style={{
          opacity: this.state.webViewHasLoadedContent ? 1 : 0,
          backgroundColor: 'black',
          margin: 15,
          borderRadius: 10,
          padding: 30,
          paddingBottom: 300,
        }}
      />
    )
  }
  renderLoadingIcon = () => {
    if (this.state.loading && !this.state.webViewHasLoadedContent)
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      )
  }
  render() {
    let html = this.getContent()
    //console.log('RENDER ===> ', html)
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: this.switchableBackgroundColor(),
        }}
        onTouchStart={e => this.screenTouched()}
      >
        <SafeAreaView
          style={{
            flex: 1,
            alignItems: 'stretch',
            justifyContent: 'flex-start',
          }}
        >
          {this.renderFontSizeDialog()}
          {this.renderTopToolBar()}
          {!this.state.isVisible && <View style={globalStyles.topBar} />}
          {this.renderLoadingIcon()}
          {this.renderWebViewContent(html)}
          {this.renderConvertToActionButton()}
          {this.renderNavigationButtons()}
        </SafeAreaView>
      </View>
    )
  }
  getContent = () => {
    let content = this.state.item.content
    let blackList = this.props.html_viewer_styles_blacklist
    let template = this.props.html_viewer_template

    for (let styleToRemoveStr of blackList) content = content.split(styleToRemoveStr).join('')

    let dayModeColor = this.state['isDaymode'] ? 'white' : 'black'
    let invertedColorDay = this.state['isDaymode'] ? 'black' : 'white'
    let fontSize = !!this.state['fontSize'] ? this.state['fontSize'] : ''

    template = template.split('#dayModeColor').join(dayModeColor)
    template = template.split('#invertedColorDay').join(invertedColorDay)
    template = template.split('#fontSize').join(fontSize)
    content = template.split('#content').join(content)

    //console.log('<====================================>\n', content, '\n<====================================>', blackList)
    return content
  }

  renderNavigationButtons = () => {
    if (this.state.isVisible) return <BottomNavigationBar hasBack />
  }

  title = () => this.props.navigation.getParam('item')['title']
  description = () => this.props.navigation.getParam('item')['description']
  trigger = () => this.props.navigation.getParam('item')['trigger']
  id = () => this.props.navigation.getParam('item')['id']
  showButton = () => this.props.navigation.getParam('showButton')
  renderConvertToActionButton = () => {
    let bottonButtonContent = this.renderBottonButtonContent()
    //console.log('renderConvertToActionButton ==> ', bottonButtonContent)
    if (!!bottonButtonContent && !!bottonButtonContent.type)
      return (
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            bottom: 60,
          }}
        >
          <View style={{ flexDirection: 'row' }}>{bottonButtonContent}</View>
        </View>
      )
  }
}

const mapStateToProps = state => ({
  html_viewer_styles_blacklist: datasetSelector(state, 'html_viewer_styles_blacklist'),
  html_viewer_template: datasetSelector(state, 'html_viewer_template'),
})
const mapDispatchToProps = dispatch => ({
  setHtmlViewerStylesBlacklist: data => dispatch(setDatasetToReducer(data, 'html_viewer_styles_blacklist')),
  setHtmlViewerTemplate: data => dispatch(setDatasetToReducer(data, 'html_viewer_template')),
})
export default connect(mapStateToProps, mapDispatchToProps)(HtmlViewerScreen)
