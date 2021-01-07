import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Content,
  Container,
  Item,
  Picker,
  Icon,
  Toast,
  Header,
  Title,
  Tabs,
  Tab,
  TabHeading,
  Right,
  Body,
  CardItem,
  Left,
} from 'native-base';
import {Card, Button, Input, Overlay} from 'react-native-elements';
import PaystackWebView from 'react-native-paystack-webview';
import AnimatedLoader from 'react-native-animated-loader';
import Database from '../database';
import Orientation from 'react-native-orientation';
const db = new Database();
let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F93106',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    backgroundColor: 'red',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
// function Pay(){
//   const childRef = useRef();

export default class PaymentGateWay extends Component {
  constructor(inProps) {
    super(inProps);

    this.state = {
      user: [],
      loader: true,
    };
    StatusBar.setBarStyle('dark-content');
    StatusBar.setBackgroundColor('#F93106');
  } /* End constructor. */
  componentDidMount() {
    db.getUser()
      .then((res) => {
        this.setState({user: res});
      })
      .catch((err) => {
        console.log(err);
      });
    Orientation.lockToPortrait();
  }
  onPinSubscribe = (e) => {
    this.setState({isVisible: true});
    e.preventDefault();

    let sPin = this.state.sPin;

    if (sPin != '') {
      axios
        .post('https://20503a5c.ngrok.io/api/pinSubscription', {sPin: sPin})
        .then((res) => {
          if (res.data.message == undefined) {
            //TODO: if success update all activities.active to Y in server DB
            //update all activities.active to Y in app DB
            //send User to dash
          } else {
            this.setState({isVisible: false});
            alert(res.data.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({isVisible: false});
      Toast.show({
        text:
          'Please ensure you enter a correct/unused PREP50 Subscription PIN.',
        buttonText: 'Okay',
        type: 'warning',
        duration: 6000,
      });
    }
  };

  render() {
    // function Pay(){
    //   const childRef = useRef();
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
          <Header hasTabs style={styles.header}>
            <Left></Left>
            <Body>
              <Title>PREP50 Subscription</Title>
            </Body>
          </Header>
          <Tabs>
            <Tab heading="Card">
              <Card style={{backgroundColor: 'red'}}>
                <CardItem>
                  <Text>
                    Pay with your ATM card the sum of N1,500 to have access to
                    PREP50's full features. The security of your card details is
                    assured by our partnership with PAYSTACK.
                  </Text>
                </CardItem>
                <CardItem>
                  <PaystackWebView
                    buttonText="Pay Now"
                    textStyles={{
                      backgroundColor: 'red',
                      fontSize: 20,
                      color: 'white',
                    }}
                    btnStyles={{
                      marginTop: 20,
                      backgroundColor: 'red',
                      color: 'white',
                      padding: 15,
                      justifyContent: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                    }}
                    showPayButton={true}
                    paystackKey="pk_test_758495a9d79b4f78855cca77be03287bd635b3e6"
                    amount={15000}
                    billingEmail={user[0]['email']}
                    billingMobile={user[0]['phone']}
                    billingName={user[0]['lastname']}
                    ActivityIndicatorColor="green"
                    SafeAreaViewContainer={{marginTop: 5}}
                    SafeAreaViewContainerModal={{marginTop: 5}}
                    handleWebViewMessage={(e) => {
                      // handle the message
                    }}
                    onCancel={(e) => {
                      console.log(e, 'something went wrong');
                    }}
                    onSuccess={(e) => {
                      console.log(e, 'Successful');
                    }}
                    autoStart={false}
                  />
                </CardItem>
              </Card>
            </Tab>
            <Tab heading="PIN">
              <Card>
                <Text>
                  Pay with PREP50 Subscription PIN worth the sum of N1,500 to
                  have access to PREP50's full features. Contact PREP50
                  staff/Agent for this PIN.
                </Text>
                <Input
                  containerStyle={{paddingLeft: 0, paddingRight: 0}}
                  keyboardType={'numeric'}
                  placeholder="Subscription PIN"
                  name="sPin"
                  value={this.state.sPin}
                  onChangeText={(val) => this.onChangeText('sPin', val)}
                />

                <Button
                  buttonStyle={{marginTop: 20, backgroundColor: '#F93106'}}
                  title="Subscribe"
                  onPress={(e) => {
                    this.onPinSubscribe(e);
                  }}
                />
              </Card>
            </Tab>
          </Tabs>
        </Container>
      );
    }
  }
}
