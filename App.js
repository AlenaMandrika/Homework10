import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './app/components/home';
import Login from './app/components/login';
import Register from './app/components/register';
import Facebook from './app/components/facebook';
import Profile from './app/components/profile';


const UsersManager = StackNavigator({
  Home: { screen: HomeScreen },
  Login: { screen: Login },
  Register: {screen: Register},
  Facebook: {screen: Facebook},
  Profile: {screen: Profile},
});

export default UsersManager;
