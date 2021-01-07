import React, { Component, useReducer } from 'react';
import {StyleSheet, StatusBar, FlatList, TouchableOpacity} from 'react-native';
import { Container, Header, Content, Button, ListItem,FooterTab,Footer, Text, Icon, Left, Body, Right, Thumbnail, Title, Separator } from 'native-base';
import Database from '../database';
import AnimatedLoader from "react-native-animated-loader";
const db = new Database();
// const { itemId, otherParam } = route.params;
const styles = StyleSheet.create({
	header: {
		backgroundColor: '#F93106',
    },
    footer: {
        backgroundColor: 'red',
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
    toSubjDash(){
        this.props.navigation.navigate('SubjDash');
    }
    toUserProfile(){
      this.props.navigation.navigate('UserDash');
    }
    toHome(){
    this.props.navigation.navigate('Dash');
    }

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
                    <Header style={styles.header}>
                    <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}>
                <Icon name="arrow-back-sharp" />
              </Button>
            </Left>
                        <Body>
                            <Title>Topic</Title>
                        </Body>
                    </Header>
                    <Content>
                            <FlatList data={topic}
          renderItem={({item}) => (
            <ListItem>
            <Left>
              <Text><TouchableOpacity onPress={() => this.props.navigation.navigate('ObjectiveDash', item)}>
                    <Text style={styles.container}>{item.topic}</Text>
                       </TouchableOpacity></Text>
            </Left>
            <Right>
            <Icon style={{color:"red"}} name="arrow-forward-circle-outline" />
            </Right>
          </ListItem>
                        
          )}
                       />
                    </Content>
                    <Footer style={styles.container}>
          <FooterTab style={styles.footer}>
            <Button vertical onPress={() => this.toHome()}>
              <Icon style={{color:"white"}}  name="home-sharp" />
              <Text style={{color:"white"}}>Home</Text>
            </Button>
            <Button vertical onPress={() => this.toUserProfile()}>
              <Icon style={{color:"white"}} name="people-sharp" />
              <Text style={{color:"white"}}>Profile</Text>
            </Button>
            <Button vertical onPress={() => this.toSubjDash()}>
              <Icon style={{color:"white"}}  name="book-sharp" />
              <Text style={{color:"white"}}>Subject</Text>
            </Button>
          </FooterTab>
        </Footer>
                </Container>
            );
        }
    }
}
