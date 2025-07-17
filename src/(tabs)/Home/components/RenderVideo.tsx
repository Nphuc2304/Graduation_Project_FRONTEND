// RenderVideo.tsx
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';

// Định nghĩa interface cho dữ liệu video
interface VideoItem {
  id: string;
  uri: string;
  title: string;
}

// Định nghĩa props cho RenderVideo
interface RenderVideoProps {
  item: VideoItem;
}

// Component RenderVideo
const RenderVideo: React.FC<RenderVideoProps> = ({item}) => {
  console.log('Rendering item:', item); // Kiểm tra item
  return (
    <TouchableOpacity style={styles.videoContainer}>
      <View style={styles.videoWrapper}>
        <Video
          source={{uri: item.uri}}
          style={styles.video}
          controls={true}
          resizeMode="cover"
          paused={true}
        />
      </View>
      <Text style={styles.text}>{item.title || 'RenderVideo'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    marginVertical: 10,
    alignItems: 'center',
    marginRight: 30,
    borderRadius: 8,
  },
  videoWrapper: {
    borderRadius: 8, // Bo góc cho View cha
    overflow: 'hidden', // Cắt nội dung con (video) theo borderRadius
  },
  video: {
    width: 155,
    height: 210,
    backgroundColor: '#000',
    borderRadius: 8,
    borderBlockColor: '#000',
  },
  text: {
    marginTop: 5,
    fontSize: 16,
    color: '#333',
  },
});

export default RenderVideo;
