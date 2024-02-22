import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    console.log('[PLAYER REMOTE]. Play.');
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener('remote-pause', () => {
    console.log('[PLAYER REMOTE]. Pause.');
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener('remote-stop', () => {
    console.log('[PLAYER REMOTE]. Destroy.');
    TrackPlayer.destroy();
  });
}