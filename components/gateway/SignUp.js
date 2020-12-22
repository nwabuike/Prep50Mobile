/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
// import AnimatedLoader from "react-native-animated-loader";
// import {Picker} from '@react-native-community/picker';
import {
  Body,
  Content,
  Container,
  Item,
  Picker,
  ListItem,
  Radio,
  Right,
  Left,
} from 'native-base';
import {Card, Button, Input, Overlay, CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import axios from 'axios';
import Database from '../../database';
import Orientation from 'react-native-orientation';
const db = new Database();

let {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    width: '48%',
    marginTop: 20,
  },
  loader: {
    height: height / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#F93106',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    margin: 40,
    color: '#F93106',
  },
  subTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    color: '#767576',
  },
  loginSect: {
    marginTop: 40,
  },
  loginTxt: {
    textAlign: 'center',
    color: '#D5D3D6',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    height: height / 4,
  },
  imgBack: {
    width: width - 200,
    height: height / 4,
    marginTop: height / 4,
    alignItems: 'center',
    resizeMode: 'contain',
  },
  lottie: {
    width: 100,
    height: 100,
  },
  pass: {
    width: '70%',
  },
});

class SignUp extends Component {
  static navigationOptions = {
    title: 'Sign Up',
  };

  /**
   * Constructor.
   */
  constructor(inProps) {
    super(inProps);

    this.state = {
      language: 'java',
      firstname: '',
      lastname: '',
      othername: '',
      // stateId: undefined,
      // deptId: undefined,
      gender: '',
      phone: '',
      email: '',
      tcc: 0,
      tca: 0,
      // polyId: undefined,
      // uniId: undefined,
      formError: '',
      isVisible: false,
      nameVisible: true,
      phoneAddVisible: false,
      // stateVisible: false,
      subjVisible: false,
      subj1: 1,
      subj2: undefined,
      subj3: undefined,
      subj4: undefined,
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

  onSubmit = (e) => {
    this.setState({isVisible: true});
    var err = 0;

    if (
      this.state.firstname == '' ||
      this.state.lastname == '' ||
      this.state.email == '' ||
      this.state.phone == '' ||
      this.state.gender == '' ||
      this.state.subj1 == undefined ||
      this.state.subj2 == undefined ||
      this.state.subj3 == undefined ||
      this.state.subj4 == undefined
    ) {
      err = 1;
    }

    if (err == 1) {
      this.submitErr(
        'Registration Error',
        'All fields except "othername" are required!',
      );
    } else {
      console.log(
        this.state.firstname.trim(),
        this.state.lastname.trim(),
        this.state.othername.trim(),
        this.state.phone.trim(),
        this.state.email.trim(),
        this.state.tca,
        this.state.tcc,
        this.state.gender.trim(),
        this.state.subj1,
        parseInt(this.state.subj2),
        parseInt(this.state.subj3),
        parseInt(this.state.subj4),
      );
      // const uniqueId = DeviceInfo.getUniqueID();
      axios
        .post('https://f4e7570aa9fa.ngrok.io/api/register', {
          firstname: this.state.firstname.trim(),
          othername: this.state.othername.trim(),
          lastname: this.state.lastname.trim(),
          phone: this.state.phone.trim(),
          email: this.state.email.trim(),
          tcc: this.state.tcc,
          tca: this.state.tca,
          gender: this.state.gender.trim(),
          subj1: this.state.subj1,
          subj2: this.state.subj2,
          subj3: this.state.subj3,
          subj4: this.state.subj4,
        })
        .then((res) => {
          console.log(res);
          if (res.status == 200) {
            // axios.post('')
            let uData = [];
            let uSubjReg = [];
            let uActivities = [];

            uData['firstname'] = res.data.user.firstname;
            uData['othername'] = res.data.user.othername;
            uData['lastname'] = res.data.user.lastname;
            uData['phone'] = res.data.user.phone;
            uData['gender'] = res.data.user.gender;
            uData['email'] = res.data.user.email;
            uData['dateReg'] = res.data.user.dateReg;
            // uData['img'] = res.data.user.img;
            uData['tca'] = res.data.user.totalCoinsAccrued;
            uData['tcc'] = res.data.user.totalCurrentCoin;
            uData['oName'] = res.data.user.othername;
            uData['id'] = res.data.user.id;
            uData['accessToken'] = res.data.access_token;

            uSubjReg = res.data.user.subjects;
            uActivities = res.data.user.activities;

            // console.log(res.data.user.subjects, 'All registered subj');

            //insert user
            db.addUser(uData)
              .then((res) => {
                if (res.rowsAffected == 1) {
                  //insert Activities
                  // console.log(uSubjReg, 'not seen de subject registered');
                  let uActivities = 0;
                  let actLen = uActivities.length;
                  for (let j = 0; j < actLen; j++) {
                    let tmpAct = uActivities[j];

                    db.addUserActivities(tmpAct)
                      .then((res6) => {
                        if (res6.rowsAffected == 1) {
                          console.log('inserted an activity');
                          
                        }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                  // let subjDone = false;
                  // let topicDone = false;
                  // let objDone = false;
                  // let quesDone = false;

                  //   console.log('About to enter subject section');
                  //   console.log(uSubjReg, 'All subject');

                  uSubjReg.forEach((element) => {
                    // let tmpSbjreg= [];
                    // console.log(element.pivot.subject_id);
                    // console.log(element.subj);

                    db.addUserSubj(element.pivot.subject_id, element.subj)
                      .then((res1) => {
                        if (res1.rowsAffected == 1) {
                          console.log('inserted a subject');
                        }
                        // for (let i = 0; i < 4; i++) {

                        // if (i == 3) {
                        //   subjDone = true;
                        // }

                        // console.log(subjId);
                        axios
                          .get(
                            'https://f4e7570aa9fa.ngrok.io/api/getTopicsInSubjects/' +
                              element.pivot.subject_id,
                            {},
                          )

                          .then((res) => {
                            let topic = res.data;

                            topic.forEach((addTopics) => {
                              // console.log(addTopics.topic);
                              // console.log(addTopics.subj_id);
                              //
                              db.addUserTopic(
                                addTopics.id,
                                addTopics.topic,
                                addTopics.subj_id,
                              )
                                .then((rest) => {
                                  if (rest.rowsAffected == 1) {
                                    console.log('inserted a topic');
                                  }
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                              // wait(1000);

                              // objectives
                              axios
                                .get(
                                  'https://f4e7570aa9fa.ngrok.io/api/objectiveAllinTopic/' +
                                    addTopics.id,
                                  {},
                                )
                                .then((res) => {
                                  let objectives = res.data;
                                  objectives
                                    .forEach((addObjective) => {
                                      console.log(addObjective.topic_id);
                                      console.log(addObjective.subject_id);
                                      console.log(addObjective.title);
                                      //
                                      db.addUserObj(
                                        addObjective.id,
                                        addObjective.title,
                                        addObjective.topic_id,
                                        addObjective.subject_id,
                                      )
                                        .then((rest) => {
                                          if (rest.rowsAffected == 1) {
                                            console.log(
                                              'inserted a Objectives',
                                            );
                                          }
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        });
                                      // wait(1000);

                                      axios
                                        .get(
                                          'https://f4e7570aa9fa.ngrok.io/api/getQuestionsInObjective/' +
                                            addObjective.id,
                                          {},
                                        )
                                        .then((res) => {
                                          // var interval = 1000;
                                          let questions = res.data;
                                          questions.forEach((addQuestions) => {
                                            // console.log(addQuestions.question);
                                            // console.log(addQuestions.optionA);
                                            //
                                            db.addUserQuestion(
                                              addQuestions.id,
                                              addQuestions.topic_id,
                                              addQuestions.objective_id,
                                              addQuestions.question,
                                              addQuestions.optionA,
                                              addQuestions.optionB,
                                              addQuestions.optionC,
                                              addQuestions.optionD,
                                              addQuestions.answer,
                                              addQuestions.passage,
                                              addQuestions.quesYear,
                                              addQuestions.quesYearNum,
                                            )
                                              .then((rest) => {
                                                if (rest.rowsAffected == 1) {
                                                  console.log(
                                                    'inserted a question',
                                                  );
                                                }
                                              })
                                              .catch((err) => {
                                                console.log(err);
                                              });
                                          });
                                        }) // Ends Questions
                                        .catch((error) => {
                                          console.log(error);
                                        });
                                    })
                                    .catch((error) => {
                                      console.log(error);
                                    });
                                }); // Objectives Ends
                            }); //topics ends
                          }) // Ends Sub Subjects
                          .catch((error) => {
                            console.log(error);
                          });
                        // }
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }); // end subject section
                 
                } // Main subjects Ends
              })
              .then(() => {
                console.log('All inserted');
                this.setState({isVisible: false});
                this.props.navigation.navigate('Dash');
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          alert(error,'Something Went wrong, Opps try Again later');
          console.log(error);
        });
    }
  };

  login() {
    this.setState({isVisible: false});
    //this.props.navigation.navigate('liveVOD');
  }

  submitErr(title, msg) {
    this.setState({isVisible: false});
    Alert.alert(
      title,
      msg,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }

  toPhoneAdd = () => {
    this.setState({
      nameVisible: false,
      phoneAddVisible: true,
      subjVisible: false,
    });
  };

  toName = () => {
    this.setState({
      nameVisible: true,
      phoneAddVisible: false,
      subjVisible: false,
    });
  };

  toSubj = () => {
    this.setState({
      nameVisible: false,
      phoneAddVisible: false,
      subjVisible: true,
    });
  };

  componentDidMount() {
    Orientation.lockToPortrait();
  }

  render() {
    let viewFormSection;
    const {navigate} = this.props.navigation;
    const {pass} = this.state;

    if (
      this.state.nameVisible == true &&
      this.state.phoneAddVisible == false &&
      this.state.subjVisible == false
    ) {
      viewFormSection = (
        <View>
          <Input
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
            placeholder="Firstname"
            name="firstname"
            value={this.state.firstname}
            onChangeText={(val) => this.onChangeText('firstname', val)}
          />
          <Input
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
            placeholder="Othername"
            name="othername"
            value={this.state.othername}
            onChangeText={(val) => this.onChangeText('othername', val)}
          />
          <Input
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
            placeholder="Lastname"
            name="lastname"
            value={this.state.lastname}
            onChangeText={(val) => this.onChangeText('lastname', val)}
          />

          <Button
            buttonStyle={{marginTop: 10, backgroundColor: '#F93106'}}
            title="Next"
            onPress={() => {
              this.toPhoneAdd();
            }}
          />
        </View>
      );
    } else if (
      this.state.nameVisible == false &&
      this.state.phoneAddVisible == true &&
      this.state.subjVisible == false
    ) {
      viewFormSection = (
        <View>
          <Input
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
            keyboardType={'numeric'}
            value={this.state.phone}
            placeholder="Phone Number"
            name="phone"
            onChangeText={(val) => this.onChangeText('phone', val)}
          />
          <Input
            containerStyle={{paddingLeft: 0, paddingRight: 0}}
            placeholder="Email"
            value={this.state.email}
            name="Email"
            onChangeText={(val) => this.onChangeText('email', val)}
          />

          <Item>
            <Left>
              <Text>Gender</Text>
            </Left>
            <Body>
              <CheckBox
                center
                title="M"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.gender == 'M' ? true : false}
                onPress={(val) => this.onChangeText('gender', 'M')}
              />
            </Body>
            <Right>
              <CheckBox
                center
                title="F"
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={this.state.gender == 'F' ? true : false}
                onPress={(val) => this.onChangeText('gender', 'F')}
              />
            </Right>
          </Item>

          <View style={styles.row}>
            <View style={styles.button}>
              <Button
                buttonStyle={{backgroundColor: '#000000'}}
                title="Back"
                onPress={() => {
                  this.toName();
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                buttonStyle={{backgroundColor: '#F93106'}}
                title="Next"
                onPress={() => {
                  this.toSubj();
                }}
              />
            </View>
          </View>
        </View>
      );
    } else if (
      this.state.nameVisible == false &&
      this.state.phoneAddVisible == false &&
      this.state.subjVisible == true
    ) {
      viewFormSection = (
        <View>
          <Item picker>
            <Picker
              mode="dropdown"
              placeholder="First Subject"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              style={{width: undefined}}
              selectedValue={this.state.subj1}
              onValueChange={(val) => this.onChangeText('subj1', val)}>
              <Picker.Item label="Use Of English" value="1" />
            </Picker>
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              placeholder="Select your Second Subject"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              style={{width: undefined}}
              selectedValue={this.state.subj2}
              onValueChange={(val) => this.onChangeText('subj2', val)}>
              <Picker.Item label="Select your Second Subject" value="-" />
              <Picker.Item label="Biology" value="3" />
              <Picker.Item label="Chemistry" value="4" />
              <Picker.Item label="C.R.K" value="6" />
              <Picker.Item label="Economics" value="7" />
              <Picker.Item label="Government" value="8" />
              <Picker.Item label="Literature-in-English" value="9" />
              <Picker.Item label="Mathematics" value="10" />
              <Picker.Item label="Physics" value="11" />
            </Picker>
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              placeholder="Select your Third Subject"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              style={{width: undefined}}
              selectedValue={this.state.subj3}
              onValueChange={(val) => this.onChangeText('subj3', val)}>
              <Picker.Item label="Select your Third Subject" value="-" />
              <Picker.Item label="Biology" value="3" />
              <Picker.Item label="Chemistry" value="4" />
              <Picker.Item label="C.R.K" value="6" />
              <Picker.Item label="Economics" value="7" />
              <Picker.Item label="Government" value="8" />
              <Picker.Item label="Literature-in-English" value="9" />
              <Picker.Item label="Mathematics" value="10" />
              <Picker.Item label="Physics" value="11" />
            </Picker>
          </Item>
          <Item picker>
            <Picker
              mode="dropdown"
              placeholder="Select your Fourth Subject"
              placeholderStyle={{color: '#bfc6ea'}}
              placeholderIconColor="#007aff"
              style={{width: undefined}}
              selectedValue={this.state.subj4}
              onValueChange={(val) => this.onChangeText('subj4', val)}>
              <Picker.Item label="Select your Fourth Subject" value="-" />
              <Picker.Item label="Biology" value="3" />
              <Picker.Item label="Chemistry" value="4" />
              <Picker.Item label="C.R.K" value="6" />
              <Picker.Item label="Economics" value="7" />
              <Picker.Item label="Government" value="8" />
              <Picker.Item label="Literature-in-English" value="9" />
              <Picker.Item label="Mathematics" value="10" />
              <Picker.Item label="Physics" value="11" />
            </Picker>
          </Item>

          <View style={styles.row}>
            <View style={styles.button}>
              <Button
                buttonStyle={{backgroundColor: '#000000'}}
                title="Back"
                onPress={() => {
                  this.toPhoneAdd();
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                buttonStyle={{backgroundColor: '#F93106'}}
                title="Sign Up"
                //onPress={() => { onSignIn().then(() => navigate("SignedIn"));}}
                onPress={() => {
                  this.onSubmit();
                }}
              />
            </View>
          </View>
        </View>
      );
    }

    return (
      <Container>
        <Content padder>
          <ScrollView>
            <Text style={styles.title}>Sign Up</Text>

            <Card style={styles.card}>
              <Text style={styles.subTitle}>Create Account</Text>

              {viewFormSection}

              <View style={styles.loginSect}>
                <Text style={styles.loginTxt}>Already have an account?</Text>
                <Button
                  type="clear"
                  title="Sign In"
                  onPress={() => navigate('SignIn')}
                />
              </View>
            </Card>
          </ScrollView>
        </Content>
        <Overlay isVisible={this.state.isVisible} overlayStyle={styles.loader}>
          <ActivityIndicator size="large" color="#F93106" />
        </Overlay>
      </Container>
    );
  }
}

/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
  return {
    serverConn: inState.serverState.connection,
  };
};

// Export components.
// export default connect(mapStateToProps)(SignUp);
export default SignUp;
