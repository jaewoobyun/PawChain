import React from 'react';
import { Platform } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator,
	createAppContainer
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import LoginScreen from '../screens/LoginScreen';

import HomeStack from './HomeStackNavigator';
import NewPostStack from './NewPostStackNavigator';
import SettingsStack from './SettingsStackNavigator';
import DonationUsageScreen from '../screens/DonationUsageScreen';

const config = Platform.select({
	web     : { headerMode: 'screen' },
	default : {}
});

const DefaultNavigationOptions = {
	headerTintColor : 'white',
	headerStyle     : {
		backgroundColor : 'tomato'
	}
};

const DonationUsageStack = createStackNavigator(
	{
		DonationUsage : DonationUsageScreen
	},
	config
);

DonationUsageStack.navigationOptions = {
	tabBarLabel : 'Donations',
	tabBarIcon  : ({ focused }) => (
		<TabBarIcon
			focused={focused}
			name={Platform.OS === 'ios' ? 'ios-cash' : 'ios-cash'}
		/>
	)
};

const MainTab = createBottomTabNavigator(
	{
		Home     : HomeStack,
		NewPost  : NewPostStack,
		Donation : DonationUsageStack,
		Settings : SettingsStack
	},
	{
		tabBarOptions : {
			activeTintColor   : 'tomato',
			inactiveTintColor : 'gray'
		}
	}
);

const RootStack = createStackNavigator(
	{
		Main  : {
			screen : MainTab
		},
		//
		Login : LoginScreen
	},
	{
		mode       : 'modal',
		headerMode : 'none'
	}
);

const AppContainer = createAppContainer(RootStack);
export default AppContainer;
