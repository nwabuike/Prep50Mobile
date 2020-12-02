import React, {useEffect} from 'react'
import {StyleSheet, StatusBar, View, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AnimatedLoader from "react-native-animated-loader";
// import Core from "../Core";
import Database from '../database';
const db = new Database();

export default class Loading extends React.Component {
	constructor(inProps) {
        super(inProps);
		this.state = {
			loader: true
        };	
        // Core.startup();
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */
    
	componentDidMount() {
        //Core.io.on("connected", function(){
            setTimeout(() => {
                db.getUser().then((data) => {
                    let len = data.length;
                    
                    if (len < 1) {		
                        this.loggedOut();
                    } else {
                        this.loggedIn();					
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }, 1500);
        //});    
        
        // Core.io.on("disconnected", function(){
		// 	alert('Disconnected from server');
		// });
        
    	// do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }

    loggedOut = () => {
        this.props.navigation.navigate('Auth');        
    }

    loggedIn = () => {
        this.props.navigation.navigate('App');      	
    }

	render() {
        const { loader} = this.state;
		return(
            <View style={styles.container}>
            <Text style={styles.text}>PREP50</Text>
            <Text style={styles.title}>Success for Sure...</Text>
            {/* <ActivityIndicator size="large" color="#F93106" /> */}
          
            <AnimatedLoader
                visible={loader}
                overlayColor="#FFFFFF"
                animationStyle={styles.lottie}
                speed={1}
                source={require("../data.json")}
            />
            </View>
        );
	}
}

const styles = StyleSheet.create({
    
    container:{
        padding:15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:30,
       //  fontFamily: 'Gill Sans Extrabold, sans-serif',
        flex:1
    },
    text:{
     color: '#F93106',
     fontSize: 55,
     fontFamily: 'Gill Sans Extrabold, sans-serif',
     // fontFamily: 'Comic Sans, Comic Sans MS, cursive',
    },
    title:{
      color: '#F93106',
      padding:5,
      fontSize: 15,
      fontFamily:'Lucida Handwriting'
    },
    lottie: {
        width: 100,
        height: 100
    }
})
