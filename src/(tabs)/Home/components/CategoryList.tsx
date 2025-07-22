import {Image, Text, TouchableOpacity, View} from 'react-native';
import {memo, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import colors from '../../../Color';

interface list {
  id: string;
  name: string;
}

const CategoryList = memo(
  (props: any) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const {color, colorActive, padV, width, data, onChangeIndex} = props;

    return (
      <FlashList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        estimatedItemSize={200}
        keyExtractor={(item, index) => index.toString()}
        extraData={currentIndex}
        renderItem={({item, index}: {item: list; index: number}) => {
          const isActive = currentIndex === index;
          return (
            <TouchableOpacity
              onPress={() => {
                setCurrentIndex(index);
                onChangeIndex?.(item.id);
              }}
              style={{
                paddingVertical: padV ?? 5,
                width: width ?? 94,
                backgroundColor: isActive ? colorActive : color,
                borderWidth: 1,
                borderColor: colorActive,
                borderRadius: 20,
                marginRight: 18,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'semibold',
                  color: isActive ? color : colorActive,
                  textAlign: 'center',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    );
  },
  (prevProps, nextProps) => prevProps.data === nextProps.data,
);

export default CategoryList;
