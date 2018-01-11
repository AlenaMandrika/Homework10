import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'

export default class Note extends Component {

  render () {
    return (
      <View key={this.props.keyVal} style={styles.note}>

        <Text style={styles.noteText}>{this.props.val.date}</Text>
        <Text style={styles.noteText}>{this.props.val.note}</Text>

        <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
          <Text style={styles.noteDeleteText}>X</Text>
        </TouchableOpacity>

        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.photoButton}
            onPress={this.props.selectImageMethod}>
            <Text style={styles.photoButtonText}>
              Upload image
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={this.props.addDateMethod}>
            <Text style={styles.dateButtonText}>
              Upload date
            </Text>
          </TouchableOpacity>
          <View>
            <Image source={this.props.avatar} style={styles.uploadAvatar} />
          </View>
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  note: {
    position: 'relative',
    padding: 10,
    paddingRight: 100,
    borderBottomWidth: 2,
    borderBottomColor: '#ededed'
  },
  noteText: {
    paddingLeft: 30,
    borderLeftWidth: 5,
    borderLeftColor: 'red',
  },
  noteDelete: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#2980b9',
    padding: 10,
    top: 10,
    bottom: 10,
    right: 10,
  },
  noteDeleteText: {
    color: 'white'
  },
  photoButton: {
    marginLeft: 10,
    marginRight: 80,
    padding: 20,
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  photoButtonText: {
    color: 'blue',
    textAlign: 'center'
  },
  dateButton: {
    marginLeft: 10,
    marginRight: 80,
    padding: 20,
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  dateButtonText: {
    color: 'blue',
    textAlign: 'center'
  },
  btnContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 20,
    top: 10
  },
  uploadAvatar: {
    width: 50,
    height: 50,
    backgroundColor: 'white'
  },

});
