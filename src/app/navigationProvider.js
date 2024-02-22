import { Easing, Animated } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import MainScreen from '../screens/MainScreen'
import WalkthroughScreen from '../screens/WalkthroughScreen'
import PrePlayRoutineScreen from '../screens/PrePlayRoutineScreen'
import PlayRoutineScreen from '../screens/PlayRoutineScreen'
import ProfileScreen from '../screens/ProfileScreen'
import AffirmationFormScreen from '../screens/AffirmationFormScreen'
import RoutineConfigurationScreen from '../screens/RoutineConfigurationScreen'
import Activity2Screen from '../screens/Activity2Screen'
import AffirmationCategoryListScreen from '../screens/AffirmationCategoryListScreen'
import PhrasesScreen from '../screens/PhrasesScreen'
import EvaluationListScreen from '../screens/EvaluationListScreen'
import ProgressListScreen from '../screens/ProgressListScreen'
import FocusQuestionaryScreen from '../screens/FocusQuestionaryScreen'
import HabitsListScreen from '../screens/HabitsListScreen'
import HtmlViewerScreen from '../screens/HtmlViewerScreen'
import TodayActivitiesScreen from '../screens/TodayActivitiesScreen'

//import additional library
import AuthPageScreen from '../screens/AuthPageScreen'
import HabitsHomeScreen from '../screens/HabitsHomeScreen'

import FocusingMediumsStatsScreen from '../screens/FocusingMediumsStatsScreen'
import CreateObjectiveScreen from '../screens/CreateObjectiveScreen'
import ObjectiveListScreen from '../screens/ObjectiveListScreen'
import ObjectiveDetailsScreen from '../screens/ObjectiveDetailsScreen'
import EvaluatingScreen from '../screens/EvaluatingScreen'
import EvaluationScreen from '../screens/EvaluationScreen'
import CalendarScreen from '../screens/CalendarScreen'
import SongsListScreen from '../screens/SongsListScreen'
import SongsPlayerScreen from '../screens/SongsPlayerScreen'
import DetailObjetiveScreen from '../screens/DetailObjetiveScreen'
import CalendarDetailScreen from '../screens/CalendarDetailScreen'
import AuthLoadingScreen from '../screens/AuthLoadingScreen'
import InfoScreen from '../screens/InfoScreen'
import BeltInfoScreen from '../screens/BeltInfo'
import NewNoteScreen from '../screens/NewNoteScreen'
import UsersListScreen from '../screens/UsersListScreen'
import ObjectiveSelectionScreen from '../screens/ObjectiveSelectionScreen'
import MeditationHomeScreen from '../screens/MeditationHomeScreen'
import FriendsHabitsScreens from '../screens/FriendsHabitsScreens'
import HabitsObjectiveDetailsScreen from '../screens/HabitsObjectiveDetailsScreen'
import HabitsCreateEditObjectiveScreen from '../screens/HabitsCreateEditObjectiveScreen'
import BottomNavigationBar from '../components/BottomNavigationBar'

let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1]
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0],
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
}

let FadeIn = (index, position) => {
  const opacity = position.interpolate({
    inputRange: [index - 1, index],
    outputRange: [0, 1],
  })

  return { opacity }
}

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps
      const width = layout.initWidth
      const { index, route } = scene
      const params = route.params || {}
      const transition = params.transition || 'default'
      return {
        fadeIn: FadeIn(index, position),
        default: SlideFromRight(index, position, width),
      }[transition]
    },
  }
}

const HomeTabStack = createStackNavigator(
  {
    Main: MainScreen,
    AffirmationCategoryListScreen,
    Activity2Screen,
    Affirmations: AffirmationFormScreen,
    RoutineConfiguration: RoutineConfigurationScreen,
    PrePlayRoutineScreen,
    PlayRoutineScreen,
    FocusingMediumsStatsScreen,
    ObjectiveListScreen,
    ObjectiveDetailsScreen,
    EvaluatingScreen,
    EvaluationScreen,
    CalendarScreen,
    PhrasesScreen,
    SongsListScreen,
    SongsPlayerScreen,
    ActionEvaluationList: EvaluationListScreen,
    ActionProgressList: ProgressListScreen,
    FocusQuestionaryScreen,
    DetailObjetive: DetailObjetiveScreen,
    CalendarDetail: CalendarDetailScreen,
    Habits: HabitsListScreen,
    HtmlViewerScreen,
    TodayActivitiesScreen,
    InfoScreen,
    BeltInfoScreen,
    NewNoteScreen,
    UsersListScreen,
    ObjectiveSelectionScreen,
    MeditationHome: MeditationHomeScreen,
    HabitsHome: HabitsHomeScreen,
    FriendsHabits: FriendsHabitsScreens,
    HabitsObjectiveDetails: HabitsObjectiveDetailsScreen,
    CreateObjectiveScreen,
    HabitsCreateEditObjective: HabitsCreateEditObjectiveScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
)

const ProfileTabStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
)
const AuthScreens = {
  WalkthroughScreen,
  AuthPage: AuthPageScreen,
}
const AppScreens = {
  Home: HomeTabStack,
  Profile: ProfileTabStack,
}
const AuthStack = createStackNavigator(AuthScreens, {
  transitionConfig: TransitionConfiguration,
})
const AppStack = createBottomTabNavigator(AppScreens, {
  transitionConfig: TransitionConfiguration,
  headerMode: 'float',
  cardStyle: { backgroundColor: 'black' },
  headerBackTitleVisible: true,
  /* defaultNavigationOptions: {
    header: null,
  }, */
  tabBarComponent: BottomNavigationBar,
})

const AppNavigationContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoadingScreen,
      Auth: AuthStack,
      App: AppStack,
    },
    {
      initialRouteName: 'AuthLoadingScreen',
    },
  ),
)

export default AppNavigationContainer
