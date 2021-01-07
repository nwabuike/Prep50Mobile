/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {Component, useReducer} from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  FooterTab,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Title,
  Separator,
} from 'native-base';
import Database from '../database';
import AnimatedLoader from 'react-native-animated-loader';
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
});

export default class ListIconExample extends Component {
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
 

  toSubscription() {
    this.props.navigation.navigate('PaymentGateWay');
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
        <Container>
          <Header noLeft style={styles.header}>
            <Left />
            <Body>
              <Title>PREP50</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            <Separator bordered>
              <Text>BIO</Text>
            </Separator>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('./img/noUser.jpg')} />
              </Left>
              <Body>
                <Text>
                  {user[0]['firstname']} {user[0]['othername']}{' '}
                  {user[0]['lastname']}
                </Text>
                {/* <Text note>{user[0]['univ']}, {user[0]['dept']}</Text> */}
              </Body>
              <Right>{/* <Text note>{user[0]['dateReg']}</Text> */}</Right>
            </ListItem>
            <Separator bordered>
              <Text>ACCOUNT</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#727C6E'}}>
                  <Icon active name="phone-landscape-sharp" />
                </Button>
              </Left>
              <Body>
                <Text>Phone Number:- {user[0]['phone']}</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#727C6E'}}>
                  <Icon active name="phone-landscape-sharp" />
                </Button>
              </Left>
              <Body>
                <Text>Email:- {user[0]['email']}</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#007AFF'}}>
                  <Icon active name="cash-sharp" />
                </Button>
              </Left>
              <Body>
                <Text>Demo Account</Text>
              </Body>
              <Right>
                <Button onPress={() => this.toSubscription()} style={{backgroundColor:'red'}}>
                  <Text>Pay</Text>
                  <Icon active name="arrow-forward-outline" />
                </Button>
              </Right>
            </ListItem>
            <Separator bordered>
              <Text>APP</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: '#F93106'}}>
                  <Icon active name="download" />
                </Button>
              </Left>
              <Body>
                <Text>Update</Text>
              </Body>
              <Right>
                <Button style={{backgroundColor:'red'}}>
                  <Text>Check</Text>
                  <Icon active name="arrow-forward" />
                </Button>
              </Right>
            </ListItem>
          </Content>

          <Footer style={styles.container}>
            <FooterTab style={styles.footer}>
              <Button vertical onPress={() => this.toHome()}>
                <Icon name="home" />
                <Text>Home</Text>
              </Button>
              <Button vertical onPress={() => this.toUserProfile()}>
                <Icon name="apps" />
                <Text>Profile</Text>
              </Button>
              <Button vertical onPress={() => this.toSubjDash()}>
                <Icon name="book" />
                <Text>Subject</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
  }
}
