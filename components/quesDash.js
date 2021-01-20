import React from 'react';
import {Text, View, StyleSheet, StatusBar} from 'react-native';
import axios from 'axios';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {
  Container,
  Header,
  Content,
  ListItem,
  Icon,
  Left,
  Body,
  Card,
  Right,
  Badge,
  Thumbnail,
  Title,
  Separator,
  Footer,
  FooterTab,
  CardItem,
} from 'native-base';
import {Button} from 'react-native-elements';

import ResultScreen from './ResultScreen';
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

export default class quesDash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      next: 0,
      marks: 0,
      selected:null,
      loader: true,

      numberOfQuestions: null,
      time: {
        minutes: 0,
        seconds: 0,
      },
      result: false,
      finalResult: null,
      ques: [],
      A: '',
      B: '',
      C: '',
      D: '',
      answer: '',
      value3Index: 0,
      value: ''
    };
    this.clickPrev = this.clickPrev.bind(this);
    this.clickNext = this.clickNext.bind(this);
    this.playAgain = this.playAgain.bind(this);
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  }

  componentDidMount() {
    let id = this.props.navigation.getParam('id');
    console.log(id, 'Question page');
    db.getques(id)
      .then((res) => {
        this.setState({ques: res, numberOfQuestions: res.length});
      })
      .catch((err) => {
        console.log(err);
      });

    this.timer = setInterval(() => {
      this.increaseSecond();
    }, 1000);
  }

  increaseSecond = () => {
    let {
      time: {minutes, seconds},
    } = this.state;
    if (seconds < 59) {
      seconds += 1;
    } else {
      seconds = 0;
      minutes += 1;
    }
    this.setState({
      time: {minutes, seconds},
    });
  };
  clickPrev() {
    const {prev, value, marks, numberOfQuestions} = this.state;

    this.setState({
      prev: prev - 1,
    });
    // if (value === 1) {
    // 	this.setState({
    // 		marks: marks - 1,
    // 	})
    // }
    if (prev === numberOfQuestions - 1) {
      clearInterval(this.timer);
    }
  }
  clickNext() {
    const {next, value, answer,ques, marks, numberOfQuestions} = this.state;
    let correct_answer= ques[next].answer;
    console.log(correct_answer);
    console.log(value);
    this.setState({
      next: next + 1,
      value:'',
      
    });

    if (value === correct_answer) {
      this.setState({
        
        marks: marks + 1,
        initialRadioPos: -1,
        formKey: 0,
        
      });
    }
    if (next === numberOfQuestions - 1) {
      clearInterval(this.timer);
      this.setState({
        
      });
    }
  }

  playAgain() {
    // const { time } = this.state;
    this.setState({
      next: 0,
      time: {
        minutes: 0,
        seconds: 0,
      },
      marks: 0,
    });
    this.timer = setInterval(() => {
      this.increaseSecond();
    }, 1000);
  }

  render() {
    const {
      result,
      ques,
      next,
      value,
      answer,
      marks,
      loader,
      numberOfQuestions,
      time: {minutes, seconds},
    } = this.state;
    const {goHome} = this.props;
    if (ques.length < 1) {
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
        <Header style={styles.header}>
          <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back-sharp" />
              </Button>
            </Left>
            <Body>
              <Title>Question</Title>
            </Body>
          </Header>
        <Content>
      <Card style={{flex: 1}}>
        {next === numberOfQuestions ? (
          <CardItem style={{flex: 1}}>
            <ResultScreen
              playAgain={this.playAgain}
              goHome={goHome}
              marks={marks}
              minutes={minutes/numberOfQuestions}
              total={numberOfQuestions}
              seconds={seconds}
            />
          </CardItem>

        ) : (
          <View style={{flex: 1}}>
            {ques.length > 0 && (
              <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                  <CardItem>
                    <Left></Left>
                    <Body>
                      <Badge>
                      <Text style={{marginLeft: 5, marginTop: 5, color:'white', alignContent:'center', alignItems:'center', justifyContent:'center'}}>
                    {`${minutes} min ${seconds} sec \n`}
                  </Text>
                      </Badge>
                      
                    </Body>
                  
                  <Right></Right>
                  </CardItem>
                  <CardItem>
                    <Text>Question {next + 1} / {numberOfQuestions}</Text>
                     </CardItem>
                  <CardItem>
                  <Text style={{marginLeft: 5, marginRight: 5, fontSize: 18}}>
                    ({`${next + 1}).  ${ques[next].question} \n \n`}
                  </Text>
                  </CardItem>
                  <CardItem>
                  <Text style={{display: 'none'}} >
                    {ques[next].answer}
                    </Text>
                  <RadioForm
                    radio_props={[
                      // {label: ques[next].answer, value: ques[next].answer},
                      {label: ques[next].optionA, value:'A', key:'A'},
                      {label: ques[next].optionB, value:'B', key:'B'},
                      {label: ques[next].optionC, value:'C', key:'C'},
                      {label: ques[next].optionD, value:'D', key:'D'},
                    ]}
                    key=''
                    initial={-1}
                    formHorizontal={false}
                    labelHorizontal={true}
                    buttonColor={'red'}
                    
                    animation={true}
                    onPress={(value) => {
                      this.setState({value: value});
                    }}
                  />
                  </CardItem>
                </View>
                <View
                  style={{
                    width: 200,
                    fontWeight: 'bold',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: 0,
                    marginBottom: 40,
                  }}>
                  {/* <Button
																onPress={this.clickPrev}
																title="Prev"
																backgroundColor="#03A9F4"							
															/> */}
                  <Button
                    onPress={this.clickNext}
                    title="Next"
                    backgroundColor="red"
                    buttonColor={'red'}
                  />
                </View>
              </View>
            )}
          </View>
        )}
      </Card>   
      </Content>
      </Container>
    );
                            }
  }
}
