import React, {Component, useReducer, useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import {Overlay, CheckBox} from 'react-native-elements';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Item,
  CardItem,
  Card,
  // CheckBox,
  Text,
  Icon,
  Footer,
  FooterTab,
  Left,
  Radio,
  Body,
  Right,
  Thumbnail,
  Title,
  Separator,
  List,
} from 'native-base';
import Database from '../database';
import AnimatedLoader from 'react-native-animated-loader';
const db = new Database();
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F93106',
  },
  footer: {
    backgroundColor: '#000000',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  button: {
    width: '48%',
    marginTop: 20,
  },
});

export default class quesDash extends Component {
  constructor(inProps) {
    super(inProps);

    this.state = {
      ques: [],
      option: '',
      formError: '',
      isVisible: false,
      nameVisible: true,
      loader: true,
      correctCount: 0,
      totalCount: this.props.navigation.getParam('questions', []).length,
      activeQuestionIndex: 0,
      answered: false,
      answerCorrect: false,
    };
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  } /* End constructor. */
  onChangeText = (key, val) => {
    if (key == 'subj4') {
      if (val == this.state.subj2 || val == this.state.subj3) {
        alert('Please dont select same subject twice');
      } else {
        this.setState({[key]: val});
      }
    } else if (key == 'subj2') {
      if (val == this.state.subj3 || val == this.state.subj4) {
        alert('Please dont select same subject twice');
      } else {
        this.setState({[key]: val});
      }
    } else if (key == 'subj3') {
      if (val == this.state.subj4 || val == this.state.subj2) {
        alert('Please dont select same subject twice');
      } else {
        this.setState({[key]: val});
      }
    } else {
      this.setState({[key]: val});
    }
  };
  handlePass = (text) => {
    this.setState({pass: text});
  };
  answer = (correct) => {
    this.setState(
      (state) => {
        const nextState = {answered: true};

        if (correct) {
          nextState.correctCount = state.correctCount + 1;
          nextState.answerCorrect = true;
        } else {
          nextState.answerCorrect = false;
        }

        return nextState;
      },
      () => {
        setTimeout(() => this.nextQuestion(), 750);
      },
    );
  };

  nextQuestion = () => {
    this.setState((state) => {
      const nextIndex = state.activeQuestionIndex + 1;

      if (nextIndex >= state.totalCount) {
        return this.props.navigation.popToTop();
      }

      return {
        activeQuestionIndex: nextIndex,
        answered: false,
      };
    });
  };

  onSubmit = (e) => {
    this.setState({isVisible: true});
    var err = 0;

    if (this.state.option == '') {
      err = 1;
    }
  };
  componentDidMount() {
    let id = this.props.navigation.getParam('id');
    console.log(id, 'Question page');
    db.getques(id)
      .then((res) => {
        this.setState({ques: res});
      })
      .catch((err) => {
        console.log(err);
      });
  }

  toSubscription() {
    this.props.navigation.navigate('Subscription');
  }

  render() {
    const {ques, loader} = this.state;
    const questions = this.props.navigation.getParam('questions', []);
    const question = questions[this.state.activeQuestionIndex];

    if (ques.length < 1) {
      // console.log('no record found');
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
              <Title>Question</Title>
            </Body>
            <Right />
          </Header>
          <Content>
            {ques.map((question) => (
              <Card icon key={question.id}>
                <CardItem bordered>
                  <List>
                    <ListItem>
                      {/* <Body> */}
                      <Text>{question.question}</Text>
                      {/* </Body> */}
                    </ListItem>
                    <ListItem>
                      <CheckBox
                        center
                        title="A"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={this.state.option == 'optionA' ? true : false}
                        onPress={(val) =>
                          this.onChangeText('option', 'optionA')
                        }
                      />
                      <Body>
                        <Text>{question.optionA}</Text>
                      </Body>
                    </ListItem>
                    <ListItem>
                      <CheckBox
                        center
                        title="B"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={this.state.option == 'optionB' ? true : false}
                        onPress={(val) =>
                          this.onChangeText('option', 'optionB')
                        }
                      />
                      <Body>
                        <Text>{question.optionB}</Text>
                      </Body>
                    </ListItem>
                    <ListItem>
                      <CheckBox
                        center
                        title="C"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={this.state.option == 'optionC' ? true : false}
                        onPress={(val) =>
                          this.onChangeText('option', 'optionC')
                        }
                      />
                      <Body>
                        <Text>{question.optionC}</Text>
                      </Body>
                    </ListItem>
                    <ListItem>
                      <CheckBox
                        center
                        title="D"
                        checkedIcon="dot-circle-o"
                        uncheckedIcon="circle-o"
                        checked={this.state.option == 'optionD' ? true : false}
                        onPress={(val) =>
                          this.onChangeText('option', 'optionD')
                        }
                      />
                      <Body>
                        <Text>{question.optionD}</Text>
                      </Body>
                    </ListItem>
                  </List>
                </CardItem>
              </Card>
            ))}
            <Body style={styles.button}>
              <Button
                buttonStyle={{backgroundColor: 'red'}}
                title="Sign Up"
                //onPress={() => { onSignIn().then(() => navigate("SignedIn"));}}
                onPress={() => {
                  this.onSubmit();
                }}
              />
            </Body>
          </Content>
          {/* <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer> */}
          <Overlay
            isVisible={this.state.isVisible}
            overlayStyle={styles.loader}>
            <ActivityIndicator size="large" color="#F93106" />
          </Overlay>
        </Container>
      );
    }
  }
}
