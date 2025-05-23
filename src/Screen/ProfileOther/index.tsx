import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import Wrapper from '../../../components/Wrapper';
import ButtonIcon from '../../../components/ButtonIcon';
import Color from '../../Color';
import {useState} from 'react';

import About from './compoenets/About';
import Fundraising from './compoenets/Fundraising';
import colors from '../../Color';

export const ProfileOther = () => {
  const [btnSelected, setBtnSelected] = useState('about');
  const [follow, setFollow] = useState(false);
  const toggleFollow = () => {
    setFollow(prev => !prev);
  };
  return (
    <Wrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Image
              style={styles.icon}
              source={require('../../../assets/icons/back.png')}
              resizeMode="contain"
            />
            <Text style={styles.titleHeader}>Profile</Text>

            <ButtonIcon
              icon={require('../../../assets/icons/settings.png')}
              bgColor={'rgba(26, 143, 227, 0.5)'}
              w={34}
              h={34}
              mr={15}
            />
          </View>
          <View style={styles.avatarWrapper}>
            <Image
              style={styles.imgAvatar}
              source={require('../../../assets/icons/Google.png')}
            />
            <Text style={styles.nameUser}>Nhut Viet</Text>
          </View>
          <View style={styles.information}>
            <View style={styles.informationDetail}>
              <Text style={styles.informationNumber}>4,123</Text>
              <Text style={styles.informationTxt}>Fundraising</Text>
            </View>
            <View style={styles.informationDetail}>
              <Text style={styles.informationNumber}>4,123</Text>
              <Text style={styles.informationTxt}>Fundraising</Text>
            </View>
            <View style={styles.informationDetail}>
              <Text style={styles.informationNumber}>4,123</Text>
              <Text style={styles.informationTxt}>Fundraising</Text>
            </View>
          </View>

          <TouchableOpacity
            style={!follow ? styles.btnFollow : styles.btnFollowing}
            onPress={toggleFollow}>
            {!follow ? (
              <Image
                style={styles.icon}
                source={require('../../../assets/icons/user-plus.png')}
              />
            ) : (
              <Image
                style={styles.iconing}
                source={require('../../../assets/icons/user-plus.png')}
              />
            )}
            <Text style={!follow ? styles.txtFollow : styles.txtFollowing}>
              {' '}
              {!follow ? 'Follow' : 'Following'}
            </Text>
          </TouchableOpacity>

          <View style={styles.viewBtn}>
            <TouchableOpacity
              style={[
                styles.btnSelect,
                btnSelected === 'about' && styles.btnSelected,
              ]}
              onPress={() => setBtnSelected('about')}>
              <Text
                style={[
                  styles.txtSelect,
                  btnSelected === 'about' && styles.txtSelected,
                ]}>
                About
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btnSelect,
                btnSelected === 'fundraising' && styles.btnSelected,
              ]}
              onPress={() => setBtnSelected('fundraising')}>
              <Text
                style={[
                  styles.txtSelect,
                  btnSelected === 'fundraising' && styles.txtSelected,
                ]}>
                fundraising
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1}}>
            {btnSelected === 'about' ? <About /> : <Fundraising />}
          </View>
        </View>
      </SafeAreaView>
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 15,
    fontWeight: '500',
    color: Color.black,
  },
  imgHeader: {
    width: 32,
    height: 32,
  },
  icon: {
    flexDirection: 'row',
    tintColor: colors.primary,
  },
  iconing: {
    flexDirection: 'row',
    tintColor: colors.white,
  },
  imgAvatar: {
    width: 105,
    height: 105,
    borderRadius: 50,
  },
  btnFollow: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 25,
  },
  btnFollowing: {
    marginTop: 25,
    borderWidth: 1,
    borderColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 25,
    backgroundColor: colors.primary,
  },
  txtFollow: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginLeft: 8,
  },
  txtFollowing: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
    marginLeft: 8,
  },
  avatarWrapper: {
    marginTop: 30,
    alignItems: 'center',
  },
  nameUser: {
    fontSize: 18,
    color: Color.black,
    fontWeight: '500',
    marginTop: 25,
  },
  information: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  informationDetail: {
    alignItems: 'center',
  },
  informationNumber: {
    fontSize: 16,
    color: Color.primary,
    fontWeight: '400',
  },
  informationTxt: {
    fontSize: 14,
    color: Color.darkGray,
    fontWeight: '400',
    marginTop: 5,
  },
  viewBtn: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  btnSelect: {
    width: 120,
    height: 34,
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSelected: {
    backgroundColor: Color.primary,
  },
  txtSelect: {
    color: Color.primary,
    fontSize: 14,
    fontWeight: '400',
  },
  txtSelected: {
    color: Color.white,
    fontSize: 14,
    fontWeight: '400',
  },
});
