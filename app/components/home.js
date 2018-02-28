import React, { Component } from 'react';
import {
  AppRegistry,
  View,
  Text,
  StyleSheet,
  TouchableOpacity} from 'react-native';

export default class home extends Component{
  static navigationOptions= ({navigation}) =>({
    title: 'Welcome',
  });

  render(){
    const {navigate} = this.props.navigation;
    return(
      <View style={styles.container}>
        <Text style={styles.pageName}>User</Text>
        <TouchableOpacity
          onPress={() => navigate('Login')}
          style={styles.btn1}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=> navigate('Register')}
          style={styles.btn2}>
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={()=> navigate('Facebook')}
          style={styles.btn3}>
          <Text style={styles.btnText}>Facebook</Text>
        </TouchableOpacity>


      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  btn1:{
    backgroundColor:'orange',
    padding:20,
    margin:10,
    width:'95%'
  },
  btn2:{
    backgroundColor:'blue',
    padding:20,
    margin:10,
    width:'95%'
  },
  btn3:{
    backgroundColor:'blue',
    padding:20,
    margin:10,
    width:'95%'
  },
  pageName:{
    margin:10,
    fontWeight:'bold',
    color:'#000',
    textAlign:'center',
    fontSize: 30
  },
  btnText:{
    color:'#fff',
    fontWeight:'bold'
  },

});

// AppRegistry.registerComponent('home', () => home);
