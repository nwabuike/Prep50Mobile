import React, { Component } from "react";
import { StyleSheet } from 'react-native'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Footer,
  FooterTab,
  Text,
  Body,
  Left,
  Right,
  Icon
} from "native-base";

class FooterSect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  

  render() {
    return (
        <Footer style={styles.container}>
         <FooterTab style={styles.footer}>
            <Button vertical onPress={() => this.toHome()}>
              <Icon  name="home" />
              <Text>Home</Text>
            </Button>
            <Button vertical onPress={() => this.toUserProfile()}>
              <Icon  name="apps" />
              <Text>Profile</Text>
            </Button>
            <Button vertical onPress={() => this.toSubjDash()}>
              <Icon  name="book" />
              <Text>Subject</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
    color:'white'

  },
  footer:{
      backgroundColor:'red'
  }
});

export default FooterSect;