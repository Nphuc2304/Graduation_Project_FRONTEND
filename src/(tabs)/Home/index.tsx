import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../Color';
import ButtonIcon from '../../../components/ButtonIcon';
import AppStyles from '../../Styles/AppStyles';
import TextLink from '../../../components/TextLink';
import VideoList from '../../../components/RenderItem/VideoList';

// Định nghĩa interface cho dữ liệu video
interface VideoItem {
  id: string;
  uri: string;
  title: string;
}

const Home = ({navigation}: any) => {
  const [videoData, setVideoData] = useState<VideoItem[]>([]);

  useEffect(() => {
    setVideoData([
      {
        id: '1',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 1',
      },
      {
        id: '2',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 2',
      },
      {
        id: '3',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 3',
      },
      {
        id: '4',
        uri: 'https://www.w3schools.com/html/mov_bbb.mp4',
        title: 'Video 4',
      },
    ]);
  }, []);

  console.log('videoData:', videoData);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={AppStyles.rowContainerSpace}>
          <Image
            style={styles.imgHeader}
            source={require('../../../assets/images/Logo.png')}
          />
          <View style={AppStyles.rowContainerSpace}>
            <ButtonIcon
              icon={require('../../../assets/icons/search.png')}
              bgColor={'rgba(26, 143, 227, 0.5)'}
              w={34}
              h={34}
              mr={15}
            />
            <ButtonIcon
              icon={require('../../../assets/icons/save.png')}
              bgColor={'rgba(26, 143, 227, 0.5)'}
              w={34}
              h={34}
            />
          </View>
        </View>

        <View style={styles.viewSeeAll}>
          <Text style={styles.txtWatch}>Watch the impact</Text>
          <TextLink
            text="See all"
            size={18}
            color={colors.primary}
            fontw="600"
            line="underline"
          />
        </View>

        <View style={styles.viewVideo}>
          <VideoList videoData={videoData} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  content: {
    marginRight: 30,
    marginLeft: 30,
    flex: 1, // Thêm flex: 1 để content chiếm toàn bộ không gian
  },
  imgHeader: {
    width: 43,
    height: 33,
  },
  viewSeeAll: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  txtWatch: {
    fontSize: 18,
    color: colors.black,
    fontWeight: '500',
  },
  viewVideo: {
    flex: 1,
    width: '100%',
  },
});
