import React from 'react'

import {
  View,
  TextInput,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  DatePickerAndroid
} from 'react-native'

import Note from './app/components/Note'
import ImagePicker from 'react-native-image-picker'
//import RNFS from 'react-native-fs'
//import Main from './app/components/Main'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      noteArray: [{'note': 'testnote 1'}],
      noteText: '',
      avatarSource: {},
      date: null

    }

    this.addNote = this.addNote.bind(this)
    this.deleteNote = this.deleteNote.bind(this)
    this.changeText = this.changeText.bind(this)
    this.selectImage = this.selectImage.bind(this)
    //this.storageFunc = this.storageFunc.bind(this)
    //this.addDate = this.addDate.bind(this)

  }

  // componentWillMount () {
  //   const filePath = RNFS.DocumentDirectoryPath + '/noteArray.json';
  //   if (RNFS.exists(filePath)) {
  //     RNFS.readFile(filePath)
  //       .then((data) => {
  //         this.setState({
  //           noteArray: data ? JSON.parse(data) : []
  //         })
  //       })
  //   } else {
  //     this.storageFunc([]);
  //   }
  // }
  //
  // storageFunc(data) {
  //   const filePath = RNFS.DocumentDirectoryPath + '/noteArray.json';
  //   RNFS.writeFile(filePath, JSON.stringify(data));
  //   this.setState({
  //     noteArray: data
  //   })
  // }
  //
  // async addDate () {
  //   try {
  //     const {action, year, month, day} = await DatePickerAndroid.open({
  //       date: new Date()
  //     });
  //
  //     this.setState({
  //       date: year + '/' + month + '/' + day
  //     })
  //   } catch ({code, message}) {
  //     console.warn('Cannot open date picker', message);
  //   }
  // }

  selectImage () {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response)

      if (response.didCancel) {
        console.log('User cancelled image picker')
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton)
      }
      else {
        let filePath = RNFS.DocumentDirectoryPath + '/test-image.jpeg'
        console.log('response', response)
        RNFS.writeFile(filePath, response.data, 'base64')
          .then(() => {
            console.log('saved file', filePath)
          })
          .catch(err => {
            console.log('error save file', err)
          })
        this.setState({
          avatarSource: { uri: response.uri }
          // avatarSource: { uri: 'file://' + filePath }
        }, () => { console.log('avatar', this.state.avatarSource) })
      }
    })
  }

  addNote () {
    if (this.state.noteText) {
      const d = new Date()
      this.state.noteArray.push(
        {'date': this.state.date || d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate(), 'note': this.state.noteText}
      )
      //this.storageFunc(this.state.noteArray)
      this.setState({
        noteArray: this.state.noteArray,
        noteText: '',
        avatarSource: {},
        date: null
      })
    }

  }

  deleteNote (key) {
    this.state.noteArray.splice(key, 1)
    this.setState({
      noteArray: this.state.noteArray
    })
    //this.storageFunc(this.state.noteArray)
  }

  changeText (noteText) {
    this.setState({
      noteText: noteText
    })
    //this.storageFunc(this.state.noteArray)
  }

  render () {
    let notes = this.state.noteArray.map((val, key) => {
      return <Note key={key}
                   keyVal={key}
                   val={val}
                   deleteMethod={() => this.deleteNote(key)}
                   selectImageMethod={() => this.selectImage()}
                   addDateMethod={() => this.addDate()}
                   avatar={this.state.avatarSource}/>
    })
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>NOTER</Text>
        </View>
        {/*<View style={styles.btnContainer}>*/}
          {/*<TouchableOpacity*/}
            {/*style={styles.photoButton}*/}
            {/*onPress={this.selectImage}>*/}
            {/*<Text style={styles.photoButtonText}>*/}
              {/*Upload image*/}
            {/*</Text>*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity*/}
            {/*style={styles.dateButton}*/}
            {/*onPress={this.addDate}>*/}
            {/*<Text style={styles.dateButtonText}>*/}
              {/*Upload date*/}
            {/*</Text>*/}
          {/*</TouchableOpacity>*/}
        {/*</View>*/}
        {/*<View>*/}
          {/*<Image source={this.state.avatarSource} style={styles.uploadAvatar} />*/}
        {/*</View>*/}
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
  },
  // btnContainer:{
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   marginLeft: 20,
  // },
  // photoButton: {
  //   marginLeft: 10,
  //   marginRight: 80,
  //   padding: 20,
  //   backgroundColor: 'grey',
  //   justifyContent: 'center'
  // },
  // photoButtonText: {
  //   color: 'blue',
  //   textAlign: 'center'
  // },
  // uploadAvatar: {
  //   width: 50,
  //   height: 50,
  //   backgroundColor: 'white'
  // },
  // dateButton: {
  //   marginLeft: 10,
  //   marginRight: 80,
  //   padding: 20,
  //   backgroundColor: 'grey',
  //   justifyContent: 'center'
  // },
  // dateButtonText: {
  //   color: 'blue',
  //   textAlign: 'center'
  // },
})
