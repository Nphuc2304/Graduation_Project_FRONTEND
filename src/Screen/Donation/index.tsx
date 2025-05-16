import {Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ThreeCol from '../../../components/ThreeCol';
import CheckBox from '@react-native-community/checkbox';
import DonationStyles from '../../Styles/DonationStyles';
import colors from '../../Color';
import { useNavigation } from '@react-navigation/native';

const Prices = [20000, 50000, 100000, 200000, 500000, 1000000];

export const Dontation = () => {
  const [selectedItems, setSelectedItems] = useState<number>(0);
  const [isCheck, setIsCheck] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isMatchAmount, setIsMatchAmount] = useState(false);
  const navigation = useNavigation<any>();

  const handleSelectionChange = (items: string[]) => {
    if (items[0] == null) {
      setSelectedItems(0);
      setIsMatchAmount(false);
    } else {
      const value = parseInt(items[0]);
      setSelectedItems(value);
      setIsMatchAmount(Prices.includes(value));
    }
  };

  useEffect(() => {
    if (Prices.includes(selectedItems)) {
      setIsMatchAmount(true);
    } else {
      setIsMatchAmount(false);
    }
  }, [selectedItems]);

  return (
    <View style={DonationStyles.container}>
      <View style={DonationStyles.rowContainerSpace}>
        <TouchableOpacity style={DonationStyles.backBox} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={DonationStyles.iconback}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={DonationStyles.textL}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={DonationStyles.moreBox}>
          <Image
            source={require('../../../assets/icons/more_vertical.png')}
            style={DonationStyles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={DonationStyles.container}>
        <Text style={DonationStyles.textM}>Enter your amount</Text>
        <View
          style={[
            DonationStyles.amountBox,
            {
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <TextInput
            style={DonationStyles.textXL}
            value={
              selectedItems === 0 && !isFocused ? '0' : selectedItems.toString()
            }
            onChangeText={text => {
              const number = parseInt(text.replace(/[^0-9]/g, '')) || 0;
              setSelectedItems(number);
            }}
            keyboardType="numeric"
          />
          <Text style={DonationStyles.textXL}>VND</Text>
        </View>
        <View style={DonationStyles.amountContainer}>
          <ThreeCol
            data={Prices}
            isMultipleSelect={false}
            pad={10}
            onChangeSelected={handleSelectionChange}
            isNumber={true}
            mgV={8}
            isMatch={isMatchAmount}
          />
        </View>
        <View
          style={[
            DonationStyles.rowContainer,
            {marginVertical: 32, marginHorizontal: 24},
          ]}>
          <CheckBox
            value={isCheck}
            onValueChange={setIsCheck}
            tintColors={{true: colors.primary, false: colors.primary}}
          />
          <Text style={DonationStyles.textS}>Donate as anonymous</Text>
        </View>
      </View>
      <View style={{backgroundColor: colors.white}}>
        <TouchableOpacity style={DonationStyles.btn} onPress={() => {navigation.navigate("Payment");
          setSelectedItems(0);
        }}>
        <Text style={[DonationStyles.textL, {color: colors.white}]}>
          Donate Now
        </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};
