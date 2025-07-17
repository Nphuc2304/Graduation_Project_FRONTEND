// VideoList.tsx
import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {useTheme} from '../../../utils/ThemeContext';
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
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    viewVideo: {
      flex: 1,
      width: '100%',
    },
    emptyText: {
      textAlign: 'center',
      marginTop: 20,
      color: colors.text,
    },
  });

  return (
    <View style={styles.viewVideo}>
      <FlatList<VideoItem>
        data={videoData}
        renderItem={({item}) => <RenderVideo item={item} />}
        keyExtractor={item => item.id}
        horizontal={true}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No videos available</Text>
        )}
      />
    </View>
  );
};

export default VideoList;
