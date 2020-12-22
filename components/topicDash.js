import React, { Component, useReducer } from 'react';
import {StyleSheet, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Button, ListItem, Text, Icon, Left, Body, Right, Thumbnail, Title, Separator } from 'native-base';
import Database from '../database';
import AnimatedLoader from "react-native-animated-loader";
const db = new Database();
// const { itemId, otherParam } = route.params;
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
   
});

export default class topicDash extends Component {
    constructor(inProps) {

        super(inProps);
        
		this.state = {
            topic: [],
            loader: true,
            // id:'id'
        };	
        StatusBar.setBarStyle('dark-content');
        StatusBar.setBackgroundColor('#F93106');
    } /* End constructor. */

    componentDidMount() {
        // const id = route.params.id;
        let id = this.props.navigation.getParam('id');
        // console.log(id, 'is Here');
        
		db.getTopic(id).then((res) => {
            this.setState({ topic: res });          
        }).catch((err) => {
            console.log(err);
        });
    }
    render() {
        const { topic, loader} = this.state;
        
        if(topic.length < 1){
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
                            <Body>
                            <FlatList data={topic}
          renderItem={({item}) => (
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ObjectiveDash', item)}>
                    <Text style={styles.container}>{item.topic}</Text>
                       </TouchableOpacity>
          )}
                       />
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
