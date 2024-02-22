import TrackPlayer from 'react-native-track-player';

module.exports = async function () {
  TrackPlayer.addEventListener('remote-play', () => {
    console.log('[MUSIC REMOTE]. Play.');
    TrackPlayer.play();
  });
  TrackPlayer.addEventListener('remote-pause', () => {
    console.log('[MUSIC REMOTE]. Pause.');
    TrackPlayer.pause();
  });
  TrackPlayer.addEventListener('remote-stop', () => {
    console.log('[MUSIC REMOTE]. Destroy.');
    TrackPlayer.destroy();
  });
  TrackPlayer.addEventListener('remote-seek', (position) => {
    console.log('[MUSIC REMOTE]. Seek to ' + position);
    TrackPlayer.seekTo(position);
  })
  TrackPlayer.addEventListener('remote-jump-forward', (interval) => {
    console.log('[MUSIC REMOTE]. Jump forward from ' + TrackPlayer.getPosition() + ' to ' + (TrackPlayer.getPosition() + interval));
    TrackPlayer.seekTo(TrackPlayer.getPosition() + interval);
  })
  TrackPlayer.addEventListener('remote-jump-backward', (interval) => {
    let newpos = TrackPlayer.getPosition() - interval;
    if (newpos < 0) newpos = 0;
    console.log('[MUSIC REMOTE]. Jump backwards from ' + TrackPlayer.getPosition() + ' to ' + newpos);
    TrackPlayer.seekTo(newpos);
  })
}