import React from 'react'

import { connect } from 'react-redux'
import LoggedOut from '../screens/LoggedOut';
import Login from '../screens/Login';
import SplashScreen from 'react-native-splash-screen'


import LoggedInNavigator from './LoggedInNavigator';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


class MainStackNavigator extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  render() {
    const { token } = this.props
    return (
      <Stack.Navigator headerMode={'none'}>
        {token ? (
          <Stack.Screen name="ExploreContainer" component={LoggedInNavigator} />
        ) : (
            <>
              <Stack.Screen name="LoggedOut" component={LoggedOut} options={{ headerMode: 'screen' }} />
              <Stack.Screen name="Login" component={Login} />
            </>
          )
        }
      </Stack.Navigator>
    )
  }
}

const mapStateToProps = state => ({
  token: state.user.token
});

const ConnectedMainNavigator = connect(mapStateToProps)(MainStackNavigator)


export default () => {
  return (
    <NavigationContainer>
      <ConnectedMainNavigator />
    </NavigationContainer>
  )
}
