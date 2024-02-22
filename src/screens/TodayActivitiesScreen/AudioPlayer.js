import React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import { Icon } from 'native-base'
//import TrackPlayer from 'react-native-track-player'
import { primaryColor, scale } from '../../helpers/styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import secondsToMinutesFormat from '../../helpers/secondsToMinutesFormat'
import RNFetchBlob from 'rn-fetch-blob'
import { connect } from 'react-redux'
import { datasetSelector } from '../../redux/selectors'
import { Player } from '@react-native-community/audio-toolkit'

class AudioPlayer extends React.Component {

    player = new Player()
    interval = null

    state = {
        filePath: null,
        loading: false,
        duration: 0
    }

    componentDidMount = () => {
        this.init()
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
    init = async () => {

        await this.setState({ loading: true })
        let response = {}
        
        try {
            response = await RNFetchBlob
            .config({
                fileCache : true,
                appendExt : 'mp4'
            })
            .fetch('GET', this.props.audioLink)
        } catch(e) {
            return 
        }

        await this.setState({ filePath: `file://${response.path()}` })
        await this.setPlayerInstance()

    }
    setPlayerInstance = async () => new Promise( (resolve, reject) => {
        this.player = new Player(this.state.filePath, { autoDestroy: false })
        .on('ended', this.onPlayerEnded)
        .prepare(async () => {
            await this.setState({ loading: false })
            resolve()
        })
    })

    onPlayerEnded = () => {
        this.forceUpdate(() => clearInterval(this.interval))
    }
    
    togglePlayPausePressed = async () =>
        this.player.playPause(() => {
            if( this.player.isPaused || this.player.isStopped ) 
                clearInterval(this.interval)
            else if( this.player.isPlaying )
                this.interval = setInterval(() => this.forceUpdate(), 50)
        })
    
    currentTime = () => {
        let currentTime = 0
        let item = ''
        if(this.player.isPlaying && this.player.currentTime >= 0){
            currentTime =  this.player.currentTime/1000
            //item = 'first'
            //console.log('THERE ===> ', {duration: this.player.duration, player: this.player.duration, player: this.player.to })
        }else if( this.player.isStopped ){
            currentTime =  this.player.duration/1000
            //item = 'last'
            //console.log('HERE ===> ', {duration: this.player.duration, player: this.player.duration, player: this.player })
        }
        /* 
        console.log('currentTime ===> ', {
            item,
            currentTime, 
            duration: this.player._duration,
            isPlaying: this.player.isPlaying, 
            isStopped: this.player.isStopped, 
            isPaused: this.player.isPaused,
            player: this.player
        })
 */
        return currentTime
    }
    renderPlayerIcon = () => {
        //console.log('renderPlayerIcon ===> ',  {player: this.player, currentTime: this.player.currentTime, duration: this.player.duration })

        if(this.state.loading) return ( <ActivityIndicator style={{ paddingRight: scale(0.3) }} />)
    
        let icon_name = ''
        if(!!this.state.filePath) {

            if(  this.player.canPlay && !this.player.isPlaying )
                icon_name = 'play'
            else
                icon_name = 'pause'

        }
        //console.log('renderPlayerIcon ===> ', {STATE: this.state.state, icon_name})
        return (
            <TouchableOpacity
                style={{ paddingRight: scale(0.3) }}
                onPress={() =>  this.togglePlayPausePressed()}
            >
                <Icon name={icon_name} type='FontAwesome' style={{ fontSize: scale(0.5), color: 'white', alignSelf: 'center', justifyContent: 'center' }} />
            </TouchableOpacity>
        )
    }
    render = () => {
        let currentTime = this.player.currentTime
        if(currentTime<0)
        currentTime = 0
        let duration = this.player._duration
        const progress = 100*currentTime/duration

        return (
        <View style={{ flex: 1, flexDirection: 'row', marginBottom: scale(0.3), alignItems: 'center' }}>
            {this.renderPlayerIcon()}
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <View style={{ backgroundColor: 'rgba(115, 119, 130,1)', height: scale(0.05), justifyContent: 'center', marginVertical: scale(0.4) }}>
                    <View style={{ 
                        width: scale(0.2), 
                        height: scale(0.2), 
                        borderRadius: scale(0.1), 
                        backgroundColor: primaryColor,
                        marginLeft: `${progress}%`
                    }} 
                    />
                </View>
                <Text style={{ color: 'rgba(154,154,154,1)', position: 'absolute', bottom: -scale(0.4) }}>{secondsToMinutesFormat( this.currentTime() )}</Text>
            </View>
        </View>
        )
    }
}

const mapStateToProps = state => ({
    token: datasetSelector(state, 'token'),
    token_type: datasetSelector(state, 'token_type'),
})
const mapDispatchToProps = dispatch => ({})
  
export default connect(mapStateToProps, mapDispatchToProps)(AudioPlayer)