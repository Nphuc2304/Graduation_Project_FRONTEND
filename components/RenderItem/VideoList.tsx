// VideoList.tsx
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import RenderVideo from './RenderVideo';

// Định nghĩa interface cho dữ liệu video
interface VideoItem {
  id: string;
  uri: string;
  title: string;
}

// Định nghĩa props cho VideoList
interface VideoListProps {
  videoData: VideoItem[];
}

// Component VideoList
const VideoList: React.FC<VideoListProps> = ({videoData}) => {
  return (
    <View style={styles.viewVideo}>
      <FlatList<VideoItem>
        data={videoData}
        renderItem={({item}) => <RenderVideo item={item} />}
        keyExtractor={item => item.id}
        horizontal={true}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No videos available
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  viewVideo: {
    flex: 1,
    width: '100%',
  },
});

export default VideoList;
