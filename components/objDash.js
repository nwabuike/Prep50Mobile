import React, { Component, useReducer } from 'react';
import {StyleSheet, StatusBar} from 'react-native';
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
    }
});

export default class objDash extends Component {
    constructor(inProps) {

        super(inProps);
        
		this.state = {
            obj: [],
			loader: true
        };	
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */

    componentDidMount() {
		db.getobj().then((res) => {
            this.setState({ obj: res });          
        }).catch((err) => {
            console.log(err);
        });
    }

    toSubscription(){
        this.props.navigation.navigate('Subscription');
    }
    
    render() {
        const { obj, loader } = this.state;
        
        if(obj.length < 1){
            // console.log('no record found');
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
                <Container>
                    <Header noLeft style={styles.header}>
                        <Left/>
                        <Body>
                            <Title>PREP50</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <Content>
                        <Separator bordered>
                            <Text>BIO</Text>
                        </Separator>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source = {require('./img/noUser.jpg')} />
                            </Left>
                            <Body>
                            {
                                    this.state.obj.map((y)=>{
                                        return(<Text>{y.title}</Text>);
                                    })
                                }
                            {/* <Text>{obj[0]['obj']}</Text>
                            <Text>{obj[1]['obj']}</Text>
                            <Text>{obj[2]['obj']}</Text>
                            <Text>{obj[3]['obj']}</Text> */}
                                {/* <Text note>{user[0]['univ']}, {user[0]['dept']}</Text> */}
                            </Body>
                            <Right>
                                {/* <Text note>{user[0]['dateReg']}</Text> */}
                            </Right>
                        </ListItem>
                    </Content>
                </Container>
            );
        }
    }
}
