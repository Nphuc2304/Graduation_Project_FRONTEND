import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Color from '../../../Color';

const About = () => (
  <View style={styles.about}>
    <Text style={styles.aboutTitle}>About</Text>
    <Text numberOfLines={6} style={styles.aboutTxt}>
      Massa eu tincidunt viverra quis scelerisque sit sollicitudin condimentum.
      Interdum risus at praesent dui. Interdum risus at praesent dui. Interdum
      risus at praesent dui. Interdum risus at praesent dui. Eget convallis
      vitae mauris id feugiat tortor scelerisque. Massa eu tincidunt viverra
      quis scelerisque sit sollicitudin condimentum. Interdum risus at praesent
      dui. Interdum risus at praesent dui. Interdum risus at praesent dui.
      Interdum risus at praesent dui. Eget convallis vitae mauris id feugiat
      tortor scelerisque.
    </Text>
  </View>
);

export default About;

const styles = StyleSheet.create({
  aboutTitle: {
    fontSize: 20,
    fontWeight: '500',
    marginTop: 30,
    marginBottom: 15,
    color: Color.black,
  },
  aboutTxt: {
    fontSize: 16,
    color: Color.lightBlack,
  },
  about: {
    marginTop: 30,
  },
  viewBtnBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
  },
  btnAbout: {
    width: 94,
    height: 36,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxtAbout: {
    fontSize: 14,
    fontWeight: '400',
    color: Color.primary,
  },
});
