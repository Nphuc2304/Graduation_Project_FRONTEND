import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Color from '../../../Color';
import {FlashList} from '@shopify/flash-list';
import RenderItem from './RenderItem';

const DATA = [
  {
    image:
      'https://media.istockphoto.com/id/108349181/vi/anh/c%C3%B4-g%C3%A1i-ch%C3%A2u-phi-%C4%83n-m%E1%BB%99t-b%E1%BB%AFa-%C4%83n-trong-tr%E1%BA%A1i-tr%E1%BA%BB-m%E1%BB%93-c%C3%B4i.jpg?s=612x612&w=0&k=20&c=lTH_W8PDecHiepjXyKB0afpdwIblYTlONVjGdObzd0w=',
    progress: '70',
    Donators: '300',
    dayLeft: '14',
    Donated: '20',
    fundBefore: '200',
    fundAfter: '10000',
  },
  {
    image:
      'https://media.istockphoto.com/id/108349181/vi/anh/c%C3%B4-g%C3%A1i-ch%C3%A2u-phi-%C4%83n-m%E1%BB%99t-b%E1%BB%AFa-%C4%83n-trong-tr%E1%BA%A1i-tr%E1%BA%BB-m%E1%BB%93-c%C3%B4i.jpg?s=612x612&w=0&k=20&c=lTH_W8PDecHiepjXyKB0afpdwIblYTlONVjGdObzd0w=',
    progress: '50',
    Donators: '300',
    dayLeft: '14',
    Donated: '20',
    fundBefore: '200',
    fundAfter: '10000',
  },
  {
    image:
      'https://media.istockphoto.com/id/108349181/vi/anh/c%C3%B4-g%C3%A1i-ch%C3%A2u-phi-%C4%83n-m%E1%BB%99t-b%E1%BB%AFa-%C4%83n-trong-tr%E1%BA%A1i-tr%E1%BA%BB-m%E1%BB%93-c%C3%B4i.jpg?s=612x612&w=0&k=20&c=lTH_W8PDecHiepjXyKB0afpdwIblYTlONVjGdObzd0w=',
    progress: '10',
    Donators: '300',
    dayLeft: '14',
    Donated: '20',
    fundBefore: '200',
    fundAfter: '10000',
  },
  {
    image:
      'https://media.istockphoto.com/id/108349181/vi/anh/c%C3%B4-g%C3%A1i-ch%C3%A2u-phi-%C4%83n-m%E1%BB%99t-b%E1%BB%AFa-%C4%83n-trong-tr%E1%BA%A1i-tr%E1%BA%BB-m%E1%BB%93-c%C3%B4i.jpg?s=612x612&w=0&k=20&c=lTH_W8PDecHiepjXyKB0afpdwIblYTlONVjGdObzd0w=',
    progress: '80',
    Donators: '300',
    dayLeft: '14',
    Donated: '20',
    fundBefore: '200',
    fundAfter: '10000',
  },
];
const Fundraising = () => (
  <View style={styles.fundraising}>
    <View style={styles.fundraisingHeader}>
      <Text style={styles.fundraisingHeaderTitle}>fundraising(4)</Text>
      <Text style={styles.txtSeeAll}>see all</Text>
    </View>
    <View style={{flex: 1, backgroundColor: 'white', marginTop: 20}}>
      <FlashList
        showsVerticalScrollIndicator={false}
        data={DATA}
        renderItem={({item}) => (
          <RenderItem
            image={item.image}
            fundBefore={item.fundBefore}
            fundAfter={item.fundAfter}
            progress={item.progress}
            Donators={item.Donators}
            dayLeft={item.dayLeft}
            Donated={item.Donated}
          />
        )}
        estimatedItemSize={200}
        ListEmptyComponent={() => (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            No data found
          </Text>
        )}
      />
    </View>
  </View>
);

export default Fundraising;

const styles = StyleSheet.create({
  fundraising: {
    marginTop: 30,
    flex: 1,
  },
  fundraisingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fundraisingHeaderTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.black,
  },
  txtSeeAll: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.primary,
  },
});
