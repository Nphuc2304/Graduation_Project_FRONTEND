import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import DetailsStyles from '../../Styles/DetailStyles';
import { useNavigation } from '@react-navigation/native';

const DetailData = {
  id: 1,
  name: 'Ensuring medicine for all the children',
  image: require('../../../assets/images/imageD.png'),
  priceCurrent: 300,
  pricegoal: 600,
  donators: 300,
  dayLeft: 14,
};

export const Detail = () => {
  const navigation = useNavigation<any>();
  const percent = parseFloat(
    Math.min(
      100,
      Math.max(0, (DetailData.priceCurrent / DetailData.pricegoal) * 100),
    ).toFixed(0),
  );
  return (
    <SafeAreaView style={DetailsStyles.container}>
      <ScrollView style={DetailsStyles.container}>
        <View style={{width: '100%'}}>
          <Image
            source={require('../../../assets/images/imageD.png')}
            style={DetailsStyles.mainImg}
          />
          <View
            style={[DetailsStyles.rowSpace, DetailsStyles.rowSpaceAbsolute]}>
            <TouchableOpacity style={DetailsStyles.btnRounded} onPress={() => navigation.goBack()}>
              <Image
                source={require('../../../assets/icons/back.png')}
                style={DetailsStyles.iconBack}
              />
            </TouchableOpacity>
            <View style={[DetailsStyles.row, DetailsStyles.fourContainer]}>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/icons/share.png')}
                  style={DetailsStyles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image
                  source={require('../../../assets/icons/mark.png')}
                  style={DetailsStyles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={DetailsStyles.secondContainer}>
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={DetailsStyles.textXL}>
            {DetailData.name}
          </Text>
          <View style={DetailsStyles.row}>
            <Text style={[DetailsStyles.textS, {color: '#1A8FE3'}]}>
              {DetailData.priceCurrent}k MMK{' '}
            </Text>
            <Text style={DetailsStyles.textS}>fund raised from </Text>
            <Text style={[DetailsStyles.textS, {color: '#1A8FE3'}]}>
              {DetailData.pricegoal}M MMK
            </Text>
          </View>
          <View style={DetailsStyles.row}>
            <View style={DetailsStyles.goal}>
              <View
                style={{
                  height: percent == 0 ? 0 : 3,
                  width: `${percent}%`,
                  backgroundColor: '#1A8FE3',
                  borderRadius: 5,
                  position: 'absolute',
                  top: 0,
                }}></View>
            </View>
            <Text style={[DetailsStyles.textXS, {marginLeft: 15}]}>
              {percent}%
            </Text>
          </View>
          <View style={DetailsStyles.rowSpace}>
            <Text style={DetailsStyles.textS}>
              <Text style={{color: '#1A8FE3'}}>{DetailData.donators}</Text>{' '}
              Donators
            </Text>
            <Text style={DetailsStyles.textS}>
              <Text style={{color: '#1A8FE3'}}>{DetailData.dayLeft}</Text> days
              left
            </Text>
          </View>
          <View style={DetailsStyles.rowSpace}>
            <TouchableOpacity style={DetailsStyles.btnSmall}>
              <Text style={[DetailsStyles.textXXS, {color: 'white'}]}>
                Medical
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={DetailsStyles.row}>
              <Text style={[DetailsStyles.textXS, {color: '#1A8FE3'}]}>
                {DetailData.donators} Donators
              </Text>
              <Image
                source={require('../../../assets/icons/rightB.png')}
                style={DetailsStyles.smallIcon}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={DetailsStyles.btnLarge} onPress={() => navigation.navigate('Donation')}>
            <Text style={[DetailsStyles.textL, {color: 'white'}]}>
              Donation Now
            </Text>
          </TouchableOpacity>
        </View>
        <View style={DetailsStyles.thirdContainer}>
          <View style={DetailsStyles.fourContainer}>
            <Text style={DetailsStyles.textL}>Fundraiser</Text>
            <View style={DetailsStyles.rowSpace}>
              <View style={[DetailsStyles.btnRounded, {width: 46, height: 46}]}>
                <Image
                  source={require('../../../assets/icons/homeB.png')}
                  style={DetailsStyles.smallIcon}
                />
              </View>
              <View style={[DetailsStyles.mgL, {flex: 1}]}>
                <Text style={DetailsStyles.textM}>Organization</Text>
                <Text style={DetailsStyles.textXXS}>Verfied ✅</Text>
              </View>
              <TouchableOpacity style={DetailsStyles.btnBorder}>
                <Text style={[DetailsStyles.textXXS, {color: '#1A8FE3'}]}>
                  Follow
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={DetailsStyles.fourContainer}>
            <Text style={DetailsStyles.textL}>Patient</Text>
            <View style={DetailsStyles.row}>
              <View style={[DetailsStyles.btnRounded, {width: 46, height: 46}]}>
                <Image
                  source={require('../../../assets/icons/userB.png')}
                  style={DetailsStyles.smallIcon}
                />
              </View>
              <View style={DetailsStyles.mgL}>
                <Text style={DetailsStyles.textM}>Patient (or) Place</Text>
                <Text style={DetailsStyles.textXXS}>
                  Accompanied by medical documents ✅
                </Text>
              </View>
            </View>
          </View>
          <View style={DetailsStyles.fourContainer}>
            <Text style={DetailsStyles.textL}>Story</Text>
            <Text
              style={[
                DetailsStyles.textM,
                {fontWeight: '400', textAlign: 'justify'},
              ]}>
              Massa eu tincidunt viverra quis scelerisque sit sollicitudin
              condimentum. Interdum risus at praesent dui. Eget convallis vitae
              mauris id feugiat tortor scelerisque.{' '}
              <Text style={[DetailsStyles.textM, {color: '#1A8FE3'}]}>
                Read more ...
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
