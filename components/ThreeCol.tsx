import {Image, Text, TouchableOpacity, View} from 'react-native';
import colors from '../src/Color';
import {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';

const ThreeCol = (props: any) => {
  const [selectItems, setSelectedItems] = useState<string[]>([]);
  const {color, colorActive, pad, data, isMultipleSelect, onChangeSelected, isNumber=false, mgV, isMatch=true} =
    props;

  const Press = (item: string) => {
    let newSelected: string[];

    if (isMultipleSelect) {
      newSelected = selectItems.includes(item)
        ? selectItems.filter(i => i !== item)
        : [...selectItems, item];
    } else {
      newSelected = selectItems.includes(item) ? [] : [item];
    }

    setSelectedItems(newSelected);
    onChangeSelected && onChangeSelected(newSelected);
  };

  useEffect(() => {
    if (!isMatch) {
      setSelectedItems([]);
    }
  }, [isMatch]);

  return (
    <FlashList
      data={data}
      numColumns={3}
      estimatedItemSize={200}
      keyExtractor={(item, index) => index.toString()}
      extraData={selectItems}
      renderItem={({item}: {item: string}) => {
        const isSelected = selectItems.includes(item);
        return (
          <TouchableOpacity
            onPress={() => Press(item)}
            style={{
              flex: 1,
              marginHorizontal: 7,
              marginVertical: mgV ? mgV : 20,
              paddingVertical: pad,
              paddingHorizontal: 8,
              backgroundColor: isSelected && isMatch ? colors.primary : colors.white,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: colors.primary,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: isSelected && isMatch ? colors.white : colors.primary,
              }}>
              {isNumber ? item.toString() : item}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default ThreeCol;
