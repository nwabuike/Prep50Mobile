/* eslint-disable prettier/prettier */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {Component, useReducer} from 'react';
import {StyleSheet, StatusBar, ActivityIndicator} from 'react-native';
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
      payment:[]
    };
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  } /* End constructor. */
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


  toSubscription() {
    this.props.navigation.navigate('PaymentGateWay');
  }

  render() {
    const {user, loader, payment} = this.state;

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
                  {user[0]['firstname']} {user[0]['othername']} {user[0]['lastname']}
                  
                </Text>
              </Body>
            </ListItem>
            <Separator bordered>
              <Text>ACCOUNT</Text>
            </Separator>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: 'red'}}>
                  <Icon active name="person-add-sharp" />
                </Button>
              </Left>
              <Body>
                <Text>Phone Number :- {user[0]['phone']}</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: 'red'}}>
                  <Icon active name="person-add-sharp" />
                </Button>
              </Left>
              <Body>
                <Text>Email :- {user[0]['email']}</Text>
                
              </Body>
              <Right />
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{backgroundColor: 'red'}}>
                  <Icon active name="book-sharp" />
                </Button>
              </Left>
              <Body>
                {
                  payment === 1 ? (
                    <Text>{payment[0]['id']} Active Account</Text>
                  ):( <Text>{payment.id}Demo Account</Text>
                    )
                }
              </Body>
              <Right>
                <Button
                  onPress={() => this.toSubscription()}
                  style={{backgroundColor: 'red'}}>
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
                <Button style={{backgroundColor: 'red'}}>
                  <Text>Check</Text>
                  <Icon active name="arrow-forward" />
                </Button>
              </Right>
            </ListItem>
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
