import React, {Component, useReducer, useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  FooterTab,
  Footer,
  Card,
  Thumbnail,
  Header,
  Title,
  Separator,
  CardItem,
} from 'native-base';
import Database from '../database';
import AnimatedLoader from 'react-native-animated-loader';
import FooterSect from './Footer';
import HeaderSect from './Header';
const db = new Database();
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F93106',
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
  },
  footer: {
    backgroundColor: 'red',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  mb: {
    marginBottom: 15,
    marginTop:15
  },
  ButtonNav: {
    padding: 20,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default class subjDash extends Component {
  constructor(inProps) {
    super(inProps);

    this.state = {
      subj: [],
      id: '',
      subjName: '',
      loader: true,
    };
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  } /* End constructor. */
  toSubjDash(){
    this.props.navigation.navigate('SubjDash');
}
toUserProfile(){
  this.props.navigation.navigate('UserDash');
}
toHome(){
this.props.navigation.navigate('Dash');
}

  componentDidMount() {
    db.getSubj()
      .then((res) => {
        this.setState({subj: res});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // toSubscription(){
  //     this.props.navigation.navigate('Subscription');
  // }
  // toTopicDash(){
  //     // e.preventDefault();

  //     this.props.navigation.navigate('Topic',item);
  // }

  render() {
    const {subj, loader} = this.state;

    if (subj.length < 1) {
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
        <SafeAreaView style={{flex: 1}}>
          <Container>
          <Header style={styles.header}>
          <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back-sharp" />
              </Button>
            </Left>
                        <Body>
                            <Title>Subject Dash</Title>
                        </Body>
                    </Header>
            <Content padder>
                <Card>
                    <CardItem>
                        <Body>
                            <Text>
                                Select Any Subject You Want answer the Question Under it.
                            </Text>
                        </Body>
                    </CardItem>
                </Card>
                
            <Card style={styles.mb}>
                    <FlatList
                data={subj}
                renderItem={({item}) => (
                    <ListItem>
                <Left>
                  <Text> <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('TopicDash', item)
                    }>
                    <Text style={styles.container}>{item.subjName}</Text>
                  </TouchableOpacity></Text>
                </Left>
              </ListItem>
                 
                  
                )}
              />
              </Card>
            </Content> 
            <Footer style={styles.container}>
          <FooterTab style={styles.footer}>
            <Button vertical onPress={() => this.toHome()}>
              <Icon style={{color:"white"}}  name="home-sharp" />
              <Text style={{color:"white"}}>Home</Text>
            </Button>
            <Button vertical onPress={() => this.toUserProfile()}>
              <Icon style={{color:"white"}} name="people-sharp" />
              <Text style={{color:"white"}}>Profile</Text>
            </Button>
            <Button style={{color:"white"}} vertical onPress={() => this.toSubjDash()}>
              <Icon  style={{color:"white"}}name="book-sharp" />
              <Text style={{color:"white"}}>Subject</Text>
            </Button>
          </FooterTab>
        </Footer>
          </Container>
        </SafeAreaView>
      );
    }
  }
}
