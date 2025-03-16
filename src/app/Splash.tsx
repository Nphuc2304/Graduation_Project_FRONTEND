import {Image, StyleSheet, Text, View} from 'react-native';
import ButtonActive from '../../components/ButtonActive';
import colors from '../Color';

const Splash = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/icons/logoSplash.png')} />
      <Text style={styles.text}>Get set Funded!</Text>
      <ButtonActive
        bgColor={colors.buttonColor}
        width="90%"
        text="Let's Get Started"
        func={() => navigation.navigate('BottomTabs')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 15,
    color: colors.textButton,
    marginBottom: 200,
  },
});

export default Splash;
