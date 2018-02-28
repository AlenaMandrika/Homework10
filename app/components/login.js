import React, { Component } from 'react';
import axios from 'axios'
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
    title: 'Login',
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
      user: '',
      userEmail:'',
      userPassword:''
    }
  }
  componentWillMount() {
    axios.get('http://192.168.1.101:3005/api/v1/user')
      .then(response => this.setState({user: response.data.user}))
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

    axios.post(`http://192.168.1.101:3005/api/v1/user`, {
      user: {
        userEmail: userEmail,
        userPassword: userPassword
      }
    })
      .then(response => this.setState({user: this.state.user.push(response.data.user)}))
  }

  render() {
    // alert(JSON.stringify(this.state.userEmail))
    return (
      <View style={styles.container}>
        <Text style={{padding:10,margin:10,color:'red'}}>{this.state.email}</Text>

        <TextInput
          value={this.state.userEmail}
          placeholder="Enter Email"
          style={{width:200, margin:10,borderColor:"#333",borderWidth:1}}
          underlineColorAndroid="transparent"
          onChangeText={userEmail => this.setState({userEmail})}
        />

        <TextInput
          value={this.state.userPassword}
          placeholder="Enter Password"
          style={{width:200, margin:10,borderColor:"#333",borderWidth:1}}
          underlineColorAndroid="transparent"
          onChangeText={userPassword => this.setState({userPassword})}

        />

        <TouchableOpacity
          onPress={this.login}
          style={{width:200,padding:10,backgroundColor:'orange',alignItems:'center'}}>
          <Text style={{color:'white'}}>Login</Text>
        </TouchableOpacity>

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
