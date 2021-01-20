/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, { Component } from "react";
import { View, StyleSheet, Text, Alert, ActivityIndicator, Dimensions, StatusBar } from "react-native";
import { Body, Content, Container, Header, Left, Right, Title} from "native-base";
import { Card, Button, Overlay  } from "react-native-elements";
// import { connect } from "react-redux";
import PasswordInputText from 'react-native-hide-show-password-input';
import axios from 'axios';
import Database from '../../database';
import Orientation from "react-native-orientation";
const db = new Database();

let { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	header: {
		backgroundColor: '#F93106',
	},
	container: {
	  flex: 1,
	  flexDirection: "column",
	  justifyContent: 'center',
	  alignItems: 'center',
	},
	
	welcome: {
	  fontSize: 20,
	  textAlign: 'center',
	  margin: 10,
	  color: '#333333',
	},
	instructions: {
	  textAlign: 'center',
	  color: '#333333',
	  height: height / 4,
	},
	imgBack: {   
		width: width - 200,
		height: height / 4,
		alignItems: 'center',
		marginTop: height / 4,
		resizeMode: 'contain'
	},
	title: {
		fontSize: 25,
	  	textAlign: 'center',
		  margin: 40,
		  color: '#F93106'
	},
	subTitle: {
		fontSize: 20,
		textAlign: 'center',
		margin: 20,
		color: '#767576'
	},
	regSect: {
		marginTop: 40,
	},
	regTxt: {
		textAlign: 'center',
		color: '#D5D3D6',
	},
	loader: {
        height: height / 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

class SignIn extends Component {
	static navigationOptions =  {
		title: 'Sign In',
	};

	/**
	 * Constructor.
	 */
	// state = { animating: true }
	// closeActivityIndicator = () => setTimeout(() => this.setState({
	// 	animating: false }), 60000)
	// 	componentDidMount = () => this.closeActivityIndicator()
	constructor(inProps) {

		super(inProps);
		this.state = {
			phone: '',
			isVisible: false,
		};
		StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
	} /* End constructor. */

	onChangeText  = (key, val) => {
		this.setState({ [key]: val })
	}

	// onSubmit = (e) => {
	// 	this.setState({ isVisible: true });
	// 	e.preventDefault();
		onSubmit = (e) => {
			this.setState({ isVisible: true });
			var err = 0;
	
			if (this.state.phone == '') {
				err = 1;
			}
        if(err == 1) {
			this.submitErr('Login Error', 'Your Phone number are required!');
        } else {
			console.log( this.state.phone.trim());
            axios.post('https://c18bcd439245.ngrok.io/api/login', { phone: this.state.phone })
            .then(res => {
				console.log(res);
                if(res.data.message == undefined){
					let uData = [];
					let uSubjReg = [];
					let uActivities = [];
					
					uData['firstname'] = res.data.user.firstname;
					uData['lastname'] = res.data.user.lastname;
					uData['othername'] = res.data.user.othername;
					uData['phone'] = res.data.user.phone;
					uData['gender'] = res.data.user.gender;
					uData['email'] = res.data.user.email;
					
					// uData['dateReg'] = res.data.user.dateReg;
					// uData['img'] = res.data.user.img;
					uData['tca'] = res.data.user.totalCoinsAccrued;
					uData['tcc'] = res.data.user.totalCurrentCoin;
					uData['id'] = res.data.user.id;
					uData['accessToken'] = res.data.access_token;
					

					uSubjReg = res.data.user.subjects;
					uActivities = res.data.user.activities;
					

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
								this.setState({ isVisible: false });
							  console.log(err);
							});
						}
	  
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
								  'https://c18bcd439245.ngrok.io/api/getTopicsInSubjects/' +
									element.pivot.subject_id, +'?limit=3',
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
										this.setState({ isVisible: false });
										console.log(err);
									  });
									// wait(1000);
	  
									// objectives
									axios
									  .get(
										'https://c18bcd439245.ngrok.io/api/objectiveAllinTopic/' +
										  addTopics.id, +'?limit=3',
										{},
									  )
									  .then((res) => {
										let objectives = res.data;
										objectives
										  .forEach((addObjective) => {
											// console.log(addObjective.topic_id);
											// console.log(addObjective.subject_id);
											// console.log(addObjective.title);
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
												this.setState({ isVisible: false });
												console.log(err);
											  });
											// wait(1000);
	  
											axios
											  .get(
												'https://c18bcd439245.ngrok.io/api/getQuestionsInObjective/' +
												  addObjective.id, +'?limit=3',
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
														this.setState({ isVisible: false });
													  }
													  this.setState({ isVisible: false });
													})
													.catch((err) => {
														this.setState({ isVisible: false });
													  console.log(err);
													});
												});
											  }) // Ends Questions
											  .catch((error) => {
												this.setState({ isVisible: false });
												console.log(error);
											  });
										  })
										  .catch((error) => {
											this.setState({ isVisible: false });
											console.log(error);
										  });
									  }); // Objectives Ends
								  }); //topics ends
								}) // Ends Sub Subjects
								.then(()=>{
									
								this.props.navigation.navigate('Dash');
								alert('You have successfully Signed Up with prep50');
								})
								.catch((error) => {
									this.setState({ isVisible: false });
								  console.log(error);
								});
							  // }
							})
							.catch((err) => {
								this.setState({ isVisible: false });
							  console.log(err);
							});
						}); // end subject section
						
					  } // Main subjects Ends
					
				  }).catch((err) => {
					this.setState({ isVisible: false });
						console.log(err);
					});
                } else {
					this.setState({ isVisible: false });
					alert(res.data.message);                    
                }
            }).catch((error) => {
				this.setState({ isVisible: false });
                console.log(error)
            });
        }
	}
	submitErr(title, msg) {
		this.setState({ isVisible: false });
		Alert.alert(
			title,
			msg,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{ cancelable: false }
		)
	}

	loginErr(){
		Alert.alert(
			'Login',
			'Invalid Username/Password!',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				}
			],
			{cancelable: false}
		)
	}
	
	componentDidMount() {
		Orientation.lockToPortrait();
		
  	}; /* End componentDidMount(). */

	render() {
		const { navigate } = this.props.navigation;
			
		return (
			<Container>						
				<Text style={styles.title}>Sign In</Text>
				<Content padder>
					
					<Card>
						<Text style={styles.subTitle}>Login</Text>
						
						<PasswordInputText label="Phone Number" containerStyle={{paddingLeft: 0, paddingRight: 0}} placeholder="Phone Number..." name="phone" onChangeText={val => this.onChangeText('phone', val)} />
						<Button buttonStyle={{ marginTop: 20, backgroundColor: '#F93106'}} title="Login" onPress={(e) => { this.onSubmit(e);}}/>
						
						
						<View style={styles.regSect}>
							<Text style={styles.regTxt}>Don't have an account?</Text>
							<Button  type="clear" title="Sign Up" onPress={() => navigate("SignUp")}/>
						</View>
					</Card>
				</Content>
				<Overlay isVisible={this.state.isVisible} overlayStyle={styles.loader}>
				<ActivityIndicator size="large" color="#F93106" />
				</Overlay>
			</Container>
		)		

	}
}

/**
 * Function to map state to Component props.
 */
const mapStateToProps = (inState) => {
	return {
	  	serverConn : inState.serverState.connection
	};
};
  
  
// Export components.
// export default connect(mapStateToProps)(SignIn);

export default SignIn;