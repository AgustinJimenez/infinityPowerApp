import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import BackgroundTimer from 'react-native-background-timer';
import { useDispatch, useSelector } from 'react-redux';
import { navigation } from 'src/constants';
import { activityActions } from 'src/modules/activity/handlers/redux';
import { ActivityStack } from 'src/modules/activity/handlers/routes';
import { HabitStack } from 'src/modules/habit/root/rootRoute';
import { AuthStack } from 'src/modules/auth/handlers/routes';
import { MeditationStack } from 'src/modules/meditation/root/rootRoute';
import { FocusStack } from 'src/modules/focus/root/rootRoute';
import Spinner from 'react-native-loading-spinner-overlay';
export type RootStackParams = {
  HomeHabit: undefined;
  ObjectiveHabit: undefined;
  MeditationHome: undefined;
  MeditationPhraseMusic: undefined;
  MeditationRoutineAdd: undefined;
};

export type RootNavigationProps = NativeStackNavigationProp<RootStackParams>;

const Stack = createNativeStackNavigator<RootStackParams>();

const RootStacks = [...AuthStack, ...MeditationStack, ...ActivityStack, ...HabitStack, ...FocusStack];

export const RootNavigation = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const calling = useSelector(state => state.auth.calling);

  useEffect(() => {
    if (token) {
      dispatch(activityActions.resumen());
      BackgroundTimer.runBackgroundTimer(() => {
        dispatch(activityActions.resumen());
      }, 5000);
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }

    return () => {
      BackgroundTimer.stopBackgroundTimer();
    };
  }, [token]);

  return (
    <NavigationContainer ref={navigation}>
      {/* <Image source={image} style={tw`absolute w-full h-full `} /> */}
      <Spinner
        visible={calling}
        textContent={''}
        textStyle={{color:'#ffffff'}}
      />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            // backgroundColor: 'transparent',
          },
        }}>
        {RootStacks.map(StackScreen => (
          <Stack.Screen key={StackScreen.name} {...StackScreen} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
