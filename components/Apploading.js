import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

const Apploading = () => {
    return(
      <View style={styles.container}>
      <Text style={styles.text}>PREP50</Text>
      <Text style={styles.title}>Success for Sure...</Text>
      <ActivityIndicator size="large" color="#F93106" />
    </View>
    );
};
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
 }
});
export default Apploading;