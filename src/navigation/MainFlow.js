import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlayList from '../screens/PlayList';
import Player from '../screens/Player';

const Stack = createStackNavigator();

const MainFlow = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PlayList" component={PlayList} />
      <Stack.Screen name="Player" component={Player} />
    </Stack.Navigator>
  );
};

export default MainFlow;
