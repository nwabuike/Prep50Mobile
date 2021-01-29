import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator
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
import axios from 'axios';
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
      user_id:'',
      amount:1500,
      isVisible: false,
      trxref:'',
      status:''
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
            // this.setState({isVisible: false});
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
                    amount={1500}
                    refNumber={Math.floor((Math.random() * 10000000000))}
                    billingEmail={user[0]['email']}
                    billingMobile={user[0]['phone']}
                    billingName={user[0]['lastname']}
                    ActivityIndicatorColor="red"
                    SafeAreaViewContainer={{marginTop: 5}}
                    SafeAreaViewContainerModal={{marginTop: 5}}
                    handleWebViewMessage={(e) => {
                      // handle the message
                      console.log(e);
                     
                      
                    }}
                    onCancel={(e) => {
                      console.log(e, 'something went wrong');
                     
                      
                  }}
                    onSuccess={(e) => {
                      
                      console.log(e, 'successfull paid');
                      if(e.status== "success"){
                        let user_id = user[0]['id'];
                        // const user_id=user.id;
                        console.log(
                          user_id,
                          this.state.amount,
                          e.data.transactionRef.trxref,
                          e.data.transactionRef.status
                        );
                        this.setState({isVisible: true});
                      axios.post('http://prep50mobileapp.com.ngapi/payMe', {
                        // let amount =1500;
                        user_id:user_id,
                        amount:this.state.amount,
                        transaction_reference:e.data.transactionRef.trxref,
                        status:e.data.transactionRef.status,
                      }).then((res)=>{
                        if(res.status ==200){
                          console.log(res.data.pay.id,
                            res.data.pay.amount
                            );
                          
                          db.addPayment(res.data.pay.id, res.data.pay.created_at, res.data.pay.transaction_reference)
                      .then((res6) => {
                        if (res6.rowsAffected == 1) {
                          console.log('inserted an Payment');
                          
                        } 
                        
                      }).then(()=>{
                        this.setState({ isVisible: false });
                        this.props.navigation.navigate('Dash');
                        alert('You have successfully Paid for prep50');
                      })
                      .catch((err) => {
                        this.setState({ isVisible: false });
                        console.log(err, 'payment not inserted');
                      });
                        }

                      }).catch(()=>{

                      });
                      }else{
                           console.log(' not inserted');
                      }
                      
                      
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
          <Overlay isVisible={this.state.isVisible} overlayStyle={styles.loader}>
          <ActivityIndicator size="large" color="#F93106" />
        </Overlay>
        </Container>
      );
    }
  }
}
