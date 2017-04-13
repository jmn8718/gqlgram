import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ImagePicker } from 'expo';

export default class CameraScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  };

  state = {
    image: null,
  };

  componentDidMount() {

  }

  _pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    const { image } = this.state;
    return (
      <View style={styles.container}>
        <Button
          title="Take a Picture"
          onPress={this._pickImage}
        />
        {image &&
          <Image source={{ uri: image }} style={styles.image} />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  }
});
