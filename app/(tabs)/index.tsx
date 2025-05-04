import Button from '@/components/Button';
import ImageViewer from '@/components/ImageViewer';
import { useTheme } from '@/hooks/useTheme';
import * as ImagePicker from 'expo-image-picker';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
  const { colors, toggleTheme, theme } = useTheme();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
       <View style={styles.imageContainer}>
       <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage} />
       </View>
       <View style={styles.footerContainer}>
        <Button theme='primary' label="Choose a photo" onPress={pickImageAsync}/>
        <Button theme='primary' label="Toggle Light/Dark Mode" onPress={toggleTheme}/>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
