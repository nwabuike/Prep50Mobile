import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  FooterTab,
  Right,
  Body,
  Icon,
  Text,
  Card,
  Thumbnail,
  ListItem,
  Footer,
  CardItem,
} from 'native-base';
import AnimatedLoader from 'react-native-animated-loader';
// import {  } from "../state/actions";
// import store from "../state/store";
// import { NavigationContainer, DrawerActions } from '@react-navigation/native';
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from '@react-navigation/drawer';
// import Core from "../Core";
import {connect} from 'react-redux';
import Database from '../database';
const db = new Database();

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F93106',
  },
  footer: {
    backgroundColor: 'red',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignContent: 'center',
  },
  mb15: {
    marginTop: 50,
    backgroundColor: 'red',
    padding: 20,
    marginLeft: 80,
  },
});
const logo = require('./img/icon.jpg');

class Dash extends React.Component {
  constructor(inProps) {
    super(inProps);

    this.state = {
      user: [],
      loader: true,
    };
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  } /* End constructor. */

  toSubjDash() {
    db.getPayment()
      .then((data) => {
        let len = data.length;

        if (len < 1) {
          this.goPay();
        } else {
          this.goSubj();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  goPay = () => {
    this.props.navigation.navigate('UserDash');
  }

  goSubj = () => {
    this.props.navigation.navigate('SubjDash');
  }

  toUserProfile() {
    this.props.navigation.navigate('UserDash');
  }
  toHome() {
    this.props.navigation.navigate('Dash');
  }
  componentDidMount() {
    db.getUser()
      .then((res) => {
        this.setState({user: res});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const {user, loader} = this.state;
    if (user.length < 1) {
      return (
        <AnimatedLoader
          visible={loader}
          overlayColor="#FFFFFF"
          animationStyle={styles.lottie}
          speed={1}
          source={require('../data.json')}
        />
      );
    } else {
      return (
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Left></Left>
            <Body>
              <Title>DashBoard</Title>
            </Body>
            <Right>
              <Button transparent>
                <Icon name="heart-sharp" />
              </Button>
              <Button transparent onPress={() => this.toUserProfile()}>
                <Icon name="people-sharp" />
              </Button>
            </Right>
          </Header>
          <Content style={{marginTop: 15}} padder>
            <Card>
              <CardItem>
                <Left>
                  <Thumbnail source={logo} />
                  <Body>
                    <Text>
                      Welcome {user[0]['firstname']} {user[0]['lastname']}
                    </Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <Card>
              <CardItem>
                <Body>
                  <Text>
                    NativeBase is a free and open source framework that enable
                    developers to build high-quality mobile apps using React
                    Native iOS and Android apps with a fusion of ES6.
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    NativeBase builds a layer on top of React Native that
                    provides you with basic set of components for mobile
                    application development.
                  </Text>
                </Body>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Get on the mobile fast track with NativeBase, the
                    fastest-growing platform and tool set for iOS and Android
                    development.
                  </Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>GeekyAnts</Text>
              </CardItem>
            </Card>
            <Button
              rounded
              success
              style={styles.mb15}
              onPress={() => this.toSubjDash()}>
              <Text>Start Learning</Text>
            </Button>
          </Content>
          <Footer style={styles.container}>
            <FooterTab style={styles.footer}>
              <Button vertical onPress={() => this.toHome()}>
                <Icon style={{color: 'white'}} name="home-sharp" />

                <Text style={{color: 'white'}}>Home</Text>
              </Button>
              <Button vertical onPress={() => this.toUserProfile()}>
                <Icon style={{color: 'white'}} name="people-sharp" />
                <Text style={{color: 'white'}}>Profile</Text>
              </Button>
              <Button vertical onPress={() => this.toSubjDash()}>
                <Icon style={{color: 'white'}} name="book-sharp" />
                <Text style={{color: 'white'}}>Subject</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}

/**
 * Function to map state to Component props.
 **/
const mapStateToProps = (inState) => {
  return {
    //serverConn : inState.serverState.connection
  };
};

//Export components.
// export default connect(mapStateToProps)(Dash);
export default Dash;
