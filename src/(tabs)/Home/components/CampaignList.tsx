import {Text, TouchableOpacity, View} from 'react-native';
import {memo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import colors from '../../../Color';
import ListProdStyles from '../../../Styles/ListProdStyles';
import AppStyles from '../../../Styles/AppStyles';
import ImageCarousel from './ImageCarousel';

interface list {
  id: string;
  name: string;
  images: string[];
  priceCurrent: number;
  pricegoal: number;
  donators: number;
  totalGoal: number;
  dayLeft: string;
}

const CampaignList = memo(
  (props: any) => {
    const {data, onSelectItem, onLongPress} = props;

    return (
      <FlashList
        data={data}
        estimatedItemSize={200}
        horizontal={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}: {item: list; index: number}) => {
          let percent = parseFloat(
            Math.min(
              100,
              Math.max(0, (item.priceCurrent / item.totalGoal) * 100),
            ).toFixed(0),
          );
          return (
            <TouchableOpacity
              onPress={() => {
                onSelectItem?.(item.id);
              }}
              onLongPress={() => onLongPress?.(item)}
              style={ListProdStyles.container}>
              <ImageCarousel images={item.images} />
              <View style={ListProdStyles.content}>
                <Text
                  style={ListProdStyles.title}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
                <View style={ListProdStyles.textWrap}>
                  <Text
                    style={[
                      ListProdStyles.textContent,
                      {color: colors.primary},
                    ]}>
                    {item.priceCurrent.toLocaleString()} VNĐ{' '}
                  </Text>
                  <Text style={ListProdStyles.textContent}>
                    Quỹ huy động từ{' '}
                  </Text>
                  <Text
                    style={[
                      ListProdStyles.textContent,
                      {color: colors.primary},
                    ]}>
                    {item.totalGoal.toLocaleString()} VNĐ
                  </Text>
                </View>
                <View style={AppStyles.rowContainerSpace}>
                  <View
                    style={{
                      width: '90%',
                      backgroundColor: colors.lightPrimary,
                      height: 3,
                      overflow: 'hidden',
                      position: 'relative',
                      borderRadius: 10,
                      marginVertical: 20,
                    }}>
                    <View
                      style={{
                        width: `${percent}%` as `${number}%`,
                        height: percent > 0 ? 3 : 0,
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                      }}></View>
                  </View>
                  <Text style={ListProdStyles.textPer}>{percent}%</Text>
                </View>
                <View style={AppStyles.rowContainerSpace}>
                  <Text style={ListProdStyles.textContent}>
                    <Text style={{color: colors.primary}}>
                      {item.donators.toLocaleString()}
                    </Text>{' '}
                    donators
                  </Text>
                  <Text style={ListProdStyles.textContent}>
                    <Text style={{color: colors.primary}}>{item.dayLeft}</Text>{' '}
                    days left
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.data === nextProps.data,
);

export default CampaignList;
