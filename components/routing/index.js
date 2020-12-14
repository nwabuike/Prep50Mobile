import 'react-native-gesture-handler';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
// import { createStackNavigator } from '@react-navigation/stack';
// // import { NavigationContainer } from '@react-navigation/native';

//App Screens
import SignUp from '../gateway/SignUp';
import SignIn from '../gateway/SignIn';
// import logOut from '../gateway/logOut';
import Dash from '../Dash';
import Subscription from '../Subscription';
import UserDash from '../UserDash';
// import Loading from './components/Loading';
// import SplashScreen from '../Apploading';
import AuthAppLoading from '../Loading';
import SubjDash from '../subjDash';
import TopicDash from '../topicDash';
import ObjectiveDash from '../objDash';
import QuestionDash from '../quesDash';
// import Navigator from './components/HomeStack';

const AuthStack = createStackNavigator(
  {
    Home: Dash,
    Subscription: Subscription,
    SignIn: SignIn,
    // Logout: LogOut,
    SignUp: SignUp,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignIn',
  },
);

const AppStack = createStackNavigator(
  {
    User: UserDash,
    SubjDash,
    TopicDash,
    ObjectiveDash,
    QuestionDash
  },
  {
    headerMode: 'none',
    initialRouteName: 'QuestionDash',
  },
);

const AppNavigator = 
  createAppContainer(
    createSwitchNavigator(
      {
        AppLoading: AuthAppLoading,
        Auth: AuthStack,
        App: AppStack,
      },
      {
        backBehavior: 'initialRoute',
        initialRouteName:'AppLoading',
      },
    ),
  );
// const checkUser = createStackNavigator(

// )
export default createRootNavigation = 
  createAppContainer(AppNavigator);
// export default createAppContainer(AppNavigator)
