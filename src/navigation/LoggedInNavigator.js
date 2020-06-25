
import React from 'react'

import ExploreContainer from '../screens/ExploreContainer';
import TripsContainer from '../screens/TripsContainer';
import SavedContainer from '../screens/SavedContainer';
import ProfileContainer from '../screens/ProfileContainer';
import InboxContainer from '../screens/InboxContainer';
import ExperienceDetailContainer from '../screens/ExperienceDetail';
import { View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class HomeTabNavigator extends React.Component {
  componentDidMount() {
    this.props.navigation.setOptions({ headerShown: false })
  }
  render() {
    return (
      <Tab.Navigator

        tabBarPosition={'bottom'}
        tabBarOptions={{
          labelStyle: {
            fontWeight: '600',
            marginBottom: 5,
          },
          activeTintColor: Colors.pink,
        }}
      >
        <Tab.Screen
          name="Explore"
          component={ExploreContainer}
          options={{
            tabBarLabel: 'EXPLORE',
            tabBarIcon: () => (
              <View>
                <Icon name="search" size={20} />
              </View>
            )
          }}
        />
        <Tab.Screen name="Saved" component={SavedContainer} options={{ tabBarLabel: 'SAVED' }} />
        <Tab.Screen name="Trips" component={TripsContainer} options={{ tabBarLabel: 'TRIPS' }} />
        <Tab.Screen name="Inbox" component={InboxContainer} options={{ tabBarLabel: 'INBOX' }} />
        <Tab.Screen name="Profile" component={ProfileContainer} options={{ tabBarLabel: 'PROFILE' }} />
      </Tab.Navigator>
    );
  }

}
const DetailNavigator = (props) => {
  return (
    <Stack.Navigator headerMode={'screen'}>
      <Stack.Screen name="Explore" component={HomeTabNavigator} navigationOptions={{ headerShown: false }} />
      <Stack.Screen name="ExperienceDetail" component={ExperienceDetailContainer} navigationOptions={{ headerShown: true }} />
    </Stack.Navigator>
  )
}

export default DetailNavigator
