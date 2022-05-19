import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainFlow from './navigation/MainFlow';

const NavigationFlows = () => {
  return (
    <>
      <NavigationContainer>
        <MainFlow />
      </NavigationContainer>
    </>
  );
};

export default NavigationFlows;
