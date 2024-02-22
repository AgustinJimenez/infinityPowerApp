import PhraseCategory from '../pages/PhraseCategory';
import PhraseCategoryList from '../pages/PhraseCategoryList';
import PhraseCustomScreen from '../pages/PhraseCustomScreen';
import PhraseMusic from '../pages/PhraseMusic';
import PhraseNewAffirmation from '../pages/PhraseNewAffirmation';
import PhrasePersonalAffirmation from '../pages/PhrasePersonalAffirmation';

export const PhraseStack = [
  {
    name: 'MeditationPhraseCategory',
    component: PhraseCategory,
  },
  {
    name: 'MeditationPhraseCategoryList',
    component: PhraseCategoryList,
  },
  {
    name: 'MeditationPhraseMusic',
    component: PhraseMusic,
  },
  {
    name: 'MeditationPhraseCustom',
    component: PhraseCustomScreen,
  },
  {
    name: 'MeditationPhrasePersonalAffirmation',
    component: PhrasePersonalAffirmation,
  },
  {
    name: 'MeditationPhraseNewAffirmation',
    component: PhraseNewAffirmation,
  },
];
