import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import { View, Text,StyleSheet,}from 'react-native';

import SignIn from './gateway/SignIn';
import SignUp from './gateway/SignUp';
import Loading from './Loading';

const screens = {
  
   Loading:{
      screen:Loading
   },
    SignUp:{
       screen:SignUp
    },
    SignIn:{
      screen:SignIn
   },
    

}
const HomeStack = createStackNavigator (screens);
export default createAppContainer(HomeStack);