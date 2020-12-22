
import React, { Component, useReducer, useState } from 'react';
import {StyleSheet, StatusBar, TouchableOpacity, FlatList, SafeAreaView} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Thumbnail, Title, Separator } from 'native-base';
import Database from '../database';
import AnimatedLoader from "react-native-animated-loader";
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
        height: 100
    },
    ButtonNav:{
        padding:20,
        flex:1,
        alignContent: 'center',
        justifyContent: 'center'
   }
});

export default class subjDash extends Component {
    
    constructor(inProps) {

        super(inProps);
        
		this.state = {
            subj: [],
            id:"",
            subjName:'',
			loader: true
        };	
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */

    componentDidMount() {
		db.getSubj().then((res) => {
            this.setState({ subj: res });          
        }).catch((err) => {
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
        const { subj, loader } = this.state;
        
        if(subj.length < 1){
            return (
                <AnimatedLoader
                    visible={loader}
                    overlayColor="#FFFFFF"
                    animationStyle={styles.lottie}
                    speed={1}
                    source={require("../data.json")}
                />
            )
        } else {
            return (
                <SafeAreaView style={{flex: 1}}>
                <Container>
                    <Header span noLeft style={styles.header}>
                        <Left/>
                        <Body>
                            <Title>Subject</Title>
                        </Body>
                        <Right/>
                    </Header>
                    
                    <Content>
                        
                    <FlatList data={subj}
          renderItem={({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('TopicDash', item)}>
                    <Text style={styles.container}>{item.subjName}</Text>
                       </TouchableOpacity>
          )}
                       />
                       
                    </Content>
                    
                </Container>
                </SafeAreaView>
            );
        }
    }
}
