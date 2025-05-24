import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react';
import VerifyingStartStyles from '../../Styles/VerifyingStartStyles';
import { useNavigation } from '@react-navigation/native';

export const VerifyingStart = () => {
    const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={VerifyingStartStyles.container}>
        <ScrollView style={{flex: 1, paddingHorizontal: 40}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image source={require('../../../assets/icons/verified.png')} style={VerifyingStartStyles.mainImg}/>
            </View>
            <View style={VerifyingStartStyles.textContainer}>
                <Text style={VerifyingStartStyles.textXL}>Verifying your identity</Text>
            <Text style={[VerifyingStartStyles.textS, {textAlign: 'center'}]}>Please submit the following documents to process your application.</Text>
            </View>
            <View style={VerifyingStartStyles.optionContainer}>
                <Image source={require('../../../assets/icons/id_card.png')} style={VerifyingStartStyles.iconMedium}/>
                <View style={{flex: 1}}>
                    <Text style={VerifyingStartStyles.textM}>Take a picture of a valid ID</Text>
                    <Text style={VerifyingStartStyles.textS}>To check your personal informations are correct</Text>
                </View>
            </View>
            <View style={VerifyingStartStyles.optionContainer}>
                <Image source={require('../../../assets/icons/camera.png')} style={VerifyingStartStyles.iconMedium}/>
                <View style={{flex: 1}}>
                    <Text style={VerifyingStartStyles.textM}>Take a selfie of yourself</Text>
                    <Text style={VerifyingStartStyles.textS}>To macth your face to your Passport or ID photo</Text>
                </View>
            </View>
        </ScrollView>
        <View style={VerifyingStartStyles.bottomContainer}>
            <View style={VerifyingStartStyles.row}>
                <Image source={require('../../../assets/icons/lock.png')} style={VerifyingStartStyles.iconSmall}/>
                <Text style={VerifyingStartStyles.textXS}>Your infos will be encrypted and stored securely</Text>
            </View>
            <TouchableOpacity style={VerifyingStartStyles.btn} onPress={() => navigation.navigate('CountrySelector')}>
                <Text style={VerifyingStartStyles.textL}>Get Started</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({})