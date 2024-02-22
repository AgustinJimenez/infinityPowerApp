import PlayerConfiguration from '../pages/PlayerConfiguration';
import PlayerLoading from '../pages/PlayerLoading';
import Player from '../pages/PlayerScreen';

export const PlayerStack = [
  {
    name: 'MeditationPlayerConfiguration',
    component: PlayerConfiguration,
  },
  {
    name: 'MeditationPlayer',
    component: Player,
  },
  {
    name: 'MeditationPlayerLoading',
    component: PlayerLoading,
  },
];
