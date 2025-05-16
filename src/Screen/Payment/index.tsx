import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import PaymentStyles from '../../Styles/PaymentStyles';
import colors from '../../Color';
import { useNavigation } from '@react-navigation/native';

const paymentMethods = [
  {
    id: 1,
    name: 'KBZ Pay',
    logo: require('../../../assets/images/imgBankO.png'),
  },
  {
    id: 2,
    name: 'Wave Pay',
    logo: require('../../../assets/images/imgBankT.png'),
  },
];

export const Payment = () => {
  const [selectedID, setSelectedID] = useState<number | null>(null);
  const [isModal, setIsModal] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={PaymentStyles.container}>
      <View style={PaymentStyles.rowContainerSpace}>
        <TouchableOpacity style={PaymentStyles.backBox} onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={PaymentStyles.iconback}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={PaymentStyles.textL}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity style={PaymentStyles.moreBox}>
          <Image
            source={require('../../../assets/icons/more_vertical.png')}
            style={PaymentStyles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={[PaymentStyles.container, {paddingHorizontal: 25}]}>
        <Text style={[PaymentStyles.textL, {marginVertical: 30}]}>
          Select payment method
        </Text>
        <View>
          {paymentMethods.map(method => (
            <TouchableOpacity
              key={method.id}
              onPress={() => setSelectedID(method.id)}
              style={[
                PaymentStyles.methodContainer,
                selectedID === method.id && PaymentStyles.selectMethodContainer,
              ]}>
              <View style={PaymentStyles.leftContainer}>
                <Image source={method.logo} style={PaymentStyles.imgBank} />
                <Text
                  style={PaymentStyles.textL}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {method.name}
                </Text>
              </View>
              <View style={PaymentStyles.radioBtn}>
                {selectedID === method.id && (
                  <View style={PaymentStyles.radioInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{backgroundColor: colors.white}}>
        <TouchableOpacity
          style={PaymentStyles.btn}
          onPress={() => setIsModal(true)}>
          <Text style={[PaymentStyles.textL, {color: colors.white}]}>
            Donate Now
          </Text>
        </TouchableOpacity>
      </View>
      <Modal transparent={true} animationType="fade" visible={isModal}>
        <View style={PaymentStyles.modal}>
          <View style={PaymentStyles.modalContainer}>
            <Image
              source={require('../../../assets/images/successfully.png')}
              style={PaymentStyles.imgSuccess}
            />
            <Text style={PaymentStyles.textSuccess}>Successful</Text>
            <Text style={PaymentStyles.textThank}>
              Thank you for making a donation
            </Text>
            <TouchableOpacity
              style={PaymentStyles.btnOK}
              onPress={() => setIsModal(false)}>
              <Text style={[PaymentStyles.textL, {color: colors.white}]}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
