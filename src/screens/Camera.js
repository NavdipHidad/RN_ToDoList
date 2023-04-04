import React, {useState, useEffect} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {RNCamera} from 'react-native-camera';
import {useCamera} from 'react-native-camera-hooks';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import ImagePicker from 'react-native-image-crop-picker';
// import RNFS from 'react-native-fs';

const CameraScreen = () => {
  const [{cameraRef}, {takePicture}] = useCamera(null);

  const captureHandle = async () => {
    try {
      const data = await takePicture();
      console.log('File URI is: ', data.uri);
      const filePath = data.uri;
      //   CameraRoll.
      CameraRoll.save(filePath);

      //   const newFilePath = RNFS + 'MyPic.jpg';
      //   RNFS.moveFile(filePath, newFilePath);
      //   .then(() => {
      //     console.log(filePath, '-', newFilePath);
      //   });
    } catch (error) {
      console.log(error);
    }
  };

  const selectImg = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  return (
    <View style={styles.screen}>
      {/* <RNCamera
        ref={cameraRef}
        type={RNCamera.Constants.Type.front}
        style={styles.preview}>
        <Button title="Capture it" onPress={captureHandle} />
      </RNCamera> */}

      <Button title="Capture it" onPress={selectImg} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  preview: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default CameraScreen;
