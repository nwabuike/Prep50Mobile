/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import React, { Component } from "react";
import { View, StyleSheet, Text, Alert, ActivityIndicator, Dimensions, StatusBar } from "react-native";
import { Body, Content, Container, Header, Left, Right, Title} from "native-base";
import { Card, Button, Overlay  } from "react-native-elements";
import { connect } from "react-redux";
// import PasswordInputText from 'react-native-hide-show-password-input';
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
            axios.post('https://a4c2a1224654.ngrok.io/api/login', { phone: this.state.phone })
            .then(res => {
				console.log(res);
                if(res.data.message == undefined){
					let uData = [];
					let uSubjReg = [];
					let uActivities = [];
					
					uData['firstname'] = res.data.user.firstname;
					uData['lName'] = res.data.user.lastname;
					uData['phone'] = res.data.user.phone;
					uData['gender'] = res.data.user.gender;
					uData['email'] = res.data.user.email;
					
					// uData['dateReg'] = res.data.user.dateReg;
					// uData['img'] = res.data.user.img;
					uData['tca'] = res.data.user.totalCoinsAccrued;
					uData['tcc'] = res.data.user.totalCurrentCoin;
					uData['oName'] = res.data.user.othername;
					uData['id'] = res.data.user.id;
					uData['accessToken'] = res.data.access_token;
					

					uSubjReg = res.data.user.subjects;
					uActivities = res.data.user.activities;
					

					//insert user
				  db.addUser(uData).then((res) => {
						if(res.rowsAffected == 1){
							//insert Activities
							let actLen = uActivities.length;
							for(let j = 0; j < actLen; j++){
								let tmpAct = uActivities[j];

								db.addUserActivities(tmpAct).then((res6) => {
									if(res6.rowsAffected == 1){
										console.log('inserted an activity');										
									}
								}).catch((err) => {
									console.log(err);
								});
							}
							
							
							let subjDone = false;
							let topicDone = false;
							let objDone = false;
							let quesDone = false;
							//insert userSubjects
							for(let i = 0; i < 4; i++){
								
								let tmpSbjreg = uSubjReg[i];

								db.addUserSubj(tmpSbjreg).then((res1) => {
									if(res1.rowsAffected == 1){
										console.log('inserted a subject');										
									}
								}).catch((err) => {
									console.log(err);
								});

								//GET topics and objectives in topic
								let subjId = uSubjReg[i]['subject_id'];
								
								if(i == 3){
									subjDone = true;
								}

								axios.get('https://017cc9ffbcaa.ngrok.io/api/getTopicsInSubjects/'+subjId, {})
								.then(res => {
									
									
									let k, topic = res.data, topicLen = topic.length;
									if(topicLen > 0){
										for(k = 0; k < topicLen; k++){
											if(subjDone == true && k == (topicLen - 1)){
												topicDone = true;
											}
											let topicId = topic[k]['id'];
											let topicName = topic[k]['topic'];
											let subjId = topic[k]['subject_id'];

											db.addUserTopic(topicId, topicName, subjId).then((rest) => {
												if(rest.rowsAffected == 1){
													console.log('inserted a topic');										
												}
												
											}).catch((err) => {
												console.log(err);
											});


											let topicObj = topic[k]['objectives'];
											let topicObjLen  = topicObj.length;
											let l;

											for(l = 0; l < topicObjLen; l++){
												if(subjDone == true && topicDone == true && l == (topicObjLen - 1)){
													objDone = true;
												}
												let obj = topicObj[l];

												db.addUserObj(obj).then((rest) => {
													if(rest.rowsAffected == 1){
														console.log('inserted an Objective');										
													}
												}).catch((err) => {
													console.log(err);
												});

												//TODO: get Question from server where questions.objectives_id = obj.id
												axios.get('https://017cc9ffbcaa.ngrok.io/api/getQuestionsInObjective/'+obj.id, {})
												.then(res => {
													let o, ques = res.data, quesLen = ques.length;
													if(quesLen > 0){
														for(o = 0; o < quesLen; o++){
															let qs = ques[o];
															db.addUserQuestion(qs, topicId).then((rest1) => {
																if(rest1.rowsAffected == 1){
																	console.log('inserted a Question');
																	if(subjDone == true && topicDone == true && objDone == true && o == quesLen){
																		quesDone = true;
																	}
																	
																	if(subjDone && topicDone && objDone && quesDone){
																		this.setState({ isVisible: false });
																		this.props.navigation.navigate('Dash');
																	}																	
																	
																} 
															}).catch((err) => {
																console.log(err);
															});
														}
													}
												})
												.catch((error) => {
													console.log(error)
												});
											}
										}
									}
								})
								.catch((error) => {
									console.log(error)
								});
							}						
							 
						}
					}).catch((err) => {
						console.log(err);
					});
                } else {
					this.setState({ isVisible: false });
					alert(res.data.message);                    
                }
            }).catch((error) => {
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
export default connect(mapStateToProps)(SignIn);

// export default SignIn;