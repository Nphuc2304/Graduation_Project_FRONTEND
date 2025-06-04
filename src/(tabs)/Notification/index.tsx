import {
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import colors from '../../Color';
import {FlashList} from '@shopify/flash-list';
import Header from '../../../components/Header';
import { NotiStyles } from '../../Styles/NotiStyles';

const Data = [
  {
    id: '1',
    type: 'success',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '07/04/2025',
  },
  {
    id: '2',
    type: 'warn',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '07/04/2025',
  },
  {
    id: '3',
    type: 'warn',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '07/04/2025',
  },
  {
    id: '4',
    type: 'fail',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '06/04/2025',
  },
  {
    id: '5',
    type: 'warn',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '03/04/2025',
  },
  {
    id: '6',
    type: 'success',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '03/04/2025',
  },
  {
    id: '7',
    type: 'success',
    title: 'Donate Successful',
    content: 'Quis odio magna aliquet hac est ultrices. Sed ut tincidunt fames nibih.',
    createAt: '03/04/2025',
  },

];

//nhóm dữ liệu theo ngày
const groupByDate = (data: any []) => {
  const result: any[] = [];
  let currentDate = '';

  data.forEach(item => {
    if(item.createAt !== currentDate){
      currentDate = item.createAt;
      result.push({type: 'header', date: currentDate});
    }
    result.push({type: 'item', ...item});
  });

  return result;
};

const Notification = ({navigation}: any) => {
  const groupData = groupByDate(Data);
  const styles = NotiStyles();

  const renderItem = ({ item }: any) => {
    if (item.type === 'header') {
      return (
        <Text style={styles.dateHeader}>
          {item.date}
        </Text>
      );
    }

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <View style={[
            styles.iconCircle,
            item.type === 'success' && { backgroundColor: '#E1EEFF' },
            item.type === 'warn' && { backgroundColor: '#FFF9E1' },
            item.type === 'fail' && { backgroundColor: '#FFE1E1' },
          ]}>
            <Image
              source={
                item.type === 'success'
                  ? require('../../../assets/images/img_Success.png')
                  : item.type === 'warn'
                    ? require('../../../assets/images/warn.png')
                    : require('../../../assets/images/denied.png')
              }
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        iconBack={require('../../../assets/icons/back.png')}
        title="Notification"
        icon={require('../../../assets/icons/vertical_dots.png')}
        mg={20}
        navigation={navigation}
      />
      {Data.length > 0 ? (
        <FlashList
        data={groupData}
        keyExtractor={(item, index) => item.id ? item.id : 'header-' + index}
        renderItem={renderItem}
        estimatedItemSize={100}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />
      ): (
        <View style={styles.notiContainer}>
          <Image source={require('../../../assets/images/notifiation.png')} style={styles.imageNoti}/>
          <Text style={styles.textNoti}>You have no notification.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Notification;
