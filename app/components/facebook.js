import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';

export default class login extends Component {
  static navigationOptions= ({navigation}) =>({
    title: 'Facebook',
    headerRight:
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        style={{margin:10,backgroundColor:'#F5FCFF',padding:10}}>
        <Text style={{color:'black'}}>Home</Text>
      </TouchableOpacity>
  });
  constructor(props){
    super(props)
    this.state = {
      userEmail:'',
      userPassword:''
    }
  }

  login = () => {
    const {userEmail,userPassword} = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if(userEmail === "") {
      //alert("Please enter Email address");
      this.setState({email:'Please enter Email address'})

    } else if(reg.test(userEmail) === false) {
      //alert("Email is Not Correct");
      this.setState({email:'Email is Not Correct'})
      return false;
    } else if(userPassword === "") {
      this.setState({email:'Please enter password'})
    }
    //server
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Facebook</Text>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// AppRegistry.registerComponent('login', () => login);
