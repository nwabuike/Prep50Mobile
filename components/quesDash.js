import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  Dimensions,
  Alert,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  IconNB,
  DeckSwiper,
  Card,
  CardItem,
  Icon,
  Thumbnail,
  Radio,
  Text,
  Left,
  Right,
  List,
  ListItem,
  Body,
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
      formError: '',
      isVisible: false,
      nameVisible: true,
      loader: true,
      correctCount: 0,
      totalCount: this.props.navigation.getParam('questions', []).length,
      activeQuestionIndex: 0,
      answered: false,
      answerCorrect: false,
      optionA: false,
      optionB: false,
      optionC: false,
      optionD: false,
    };
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  } /* End constructor. */
  toggleOptionA() {
    this.setState({
      optionA: true,
      optionB: false,
      optionC: false,
      optionD: false,
    });
  }
  toggleOptionB() {
    this.setState({
      optionA: false,
      optionB: true,
      optionC: false,
      optionD: false,
    });
  }
  toggleOptionC() {
    this.setState({
      optionA: false,
      optionB: false,
      optionC: true,
      optionD: false,
    });
  }
  toggleOptionD() {
    this.setState({
      optionA: false,
      optionB: false,
      optionC: false,
      optionD: true,
    });
  }
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
  render() {
    const {ques, loader} = this.state;
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
        <Container style={styles.container}>
          <Header style={styles.header}>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back-sharp" />
              </Button>
            </Left>
            <Body>
              <Title>QuestionDash</Title>
            </Body>
          </Header>
          <View style={{flex: 1, padding: 12}}>
            <DeckSwiper
              ref={(mr) => (this._deckSwiper = mr)}
              dataSource={ques}
              looping={false}
              renderEmpty={() => (
                <View style={{alignSelf: 'center'}}>
                  <Text>Over</Text>
                </View>
              )}
              renderItem={(item) => (
                <Card style={{elevation: 3}} key={item.id}>
                  <CardItem style={{marginTop: 20}}>
                    <Body>
                      <Text>{item.question}</Text>
                    </Body>
                  </CardItem>
                  <CardItem
                    style={{marginTop: 40}}
                    selected={this.state.optionA}
                    onPress={() => this.toggleOptionA()}>
                    <Left>
                      <Text>{item.optionA}</Text>
                    </Left>
                    <Right>
                      <Radio
                        selected={this.state.optionA}
                        onPress={() => this.toggleOptionA()}
                      />
                    </Right>
                  </CardItem>
                  <CardItem
                    selected={this.state.optionB}
                    onPress={() => this.toggleOptionB()}>
                    <Left>
                      <Text>{item.optionB}</Text>
                    </Left>
                    <Right>
                      <Radio
                        selected={this.state.optionB}
                        onPress={() => this.toggleOptionB()}
                      />
                    </Right>
                  </CardItem>
                  <CardItem
                    selected={this.state.optionC}
                    onPress={() => this.toggleOptionC()}>
                    <Left>
                      <Text>{item.optionC}</Text>
                    </Left>
                    <Right>
                      <Radio
                        selected={this.state.optionC}
                        onPress={() => this.toggleOptionC()}
                      />
                    </Right>
                  </CardItem>
                  <CardItem
                    selected={this.state.optionD}
                    onPress={() => this.toggleOptionD()}>
                    <Left>
                      <Text>{item.optionD}</Text>
                    </Left>
                    <Right>
                      <Radio
                        selected={this.state.optionD}
                        onPress={() => this.toggleOptionD()}
                      />
                    </Right>
                  </CardItem>
                </Card>
              )}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              position: 'absolute',
              bottom: 50,
              left: 0,
              right: 0,
              justifyContent: 'space-between',
              padding: 15,
            }}>
            <Button
              style={{backgroundColor: 'red'}}
              iconLeft
              onPress={() => this._deckSwiper._root.swipeLeft()}>
              <Icon name="arrow-back-sharp" />
              <Text>Swipe Left</Text>
            </Button>
            <Button
              style={{backgroundColor: 'red'}}
              iconRight
              onPress={() => this._deckSwiper._root.swipeRight()}>
              <Text>Swipe Right</Text>
              <Icon name="arrow-back-circle-sharp" />
            </Button>
          </View>
        </Container>
      );
    }
  }
}
