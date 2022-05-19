import React, {Component} from 'react';
import NavigationFlows from './NavigationFlows';
import SplashScreen from 'react-native-splash-screen';

class App extends Component {
  componentDidMount() {
    SplashScreen.show();
  }

  render() {
    return (
      <>
        <NavigationFlows />
      </>
    );
  }
}

export default App;
