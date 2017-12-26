import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import RNFS from 'react-native-fs'

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      avatarSource: {}
    }
    this.selectImage = this.selectImage.bind(this)
  }
  selectImage () {
    let options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
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
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Hello World</Text>
        <TouchableOpacity
          style={styles.photoButton}
          onPress={this.selectImage}>
          <Text style={styles.photoButtonText}>
            Upload image
          </Text>
        </TouchableOpacity>
        <View>
          <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
        </View>
      </View>
    )
  }
}

let styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  photoButton: {
    flex: 0,
    padding: 20,
    marginBottom: 10,
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  photoButtonText: {
    color: 'blue',
    textAlign: 'center'
  },
  uploadAvatar: {
    width: 400,
    height: 400,
    backgroundColor: 'grey'
  }
})
