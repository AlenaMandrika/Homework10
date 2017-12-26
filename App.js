import React from 'react'

import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import Note from './app/components/Note'
//import Main from './app/components/Main'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      noteArray: [{'date': 'testdate', 'note': 'testnote 1'}],
      noteText: '',

    }

    this.addNote = this.addNote.bind(this)
    this.deleteNote  = this.deleteNote.bind(this)
    this.changeText  = this.changeText.bind(this)

  }

  addNote () {
    if (this.state.noteText) {
      var d = new Date()
      this.state.noteArray.push(
        {'date': d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(), 'note': this.state.noteText}
      )
      this.setState({
        noteArray: this.state.noteArray,
        noteText: ''
      })
    }

  }

  deleteNote (key) {
    this.state.noteArray.splice(key, 1)
    this.setState ({
      noteArray: this.state.noteArray
    })

  }

  changeText (noteText) {
    this.setState ({
      noteText: noteText
    })
  }



  render() {
    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key}
                   keyVal={key}
                   val={val}
                   deleteMethod={()=>this.deleteNote(key)}/>
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>NOTER</Text>
        </View>
        <ScrollView style={styles.scrollContainer}>
          {notes}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity onPress={this.addNote} style={styles.addButton}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
          <TextInput style={styles.textInput}
                     onChangeText={this.changeText}
                     value={this.state.noteText}
                     placeholder='>note'
                     placeholderTextColor='white'
                     underlineColorAndroid='transparent'>
          </TextInput>


        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 60,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 10,
    borderBottomColor: 'red',
  },
  headersText: {
    color: 'white',
    fontSize: 18,
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    right: 0,
    left: 0,
  },
  addButton: {
    backgroundColor: 'red',
    width: 80,
    height: 80,
    borderRadius: 50,
    borderColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    marginBottom: -45,
    zIndex: 10
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    paddingTop: 46,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#ededed'
  }
});
