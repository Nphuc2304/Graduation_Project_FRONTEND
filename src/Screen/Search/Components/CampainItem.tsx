import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ProgressBar from '../../../../components/ProgressBar';
import Color from '../../../Color';

const CampainItem = ({
  image,
  progress,
  Donators,
  dayLeft,
  Donated,
  fundBefore,
  fundAfter,
}: any) => (
  <View style={styles.RenderItem}>
    <View style={styles.viewDetail}>
      <Image
        style={{
          height: 100,
          width: 100,
          borderTopLeftRadius: 15,
          borderBottomLeftRadius: 15,
        }}
        source={{uri: image}}
      />
      <View style={styles.viewDetailRight}>
        <Text>
          {fundBefore} fund raised from {fundAfter}
        </Text>
        <ProgressBar progress={parseInt(progress.replace('%', ''))} />
        <View style={styles.viewDetailBottom}>
          <Text>{Donators} Donators</Text>
          <Text>{dayLeft} days left</Text>
        </View>
      </View>
    </View>
  </View>
);

export default CampainItem;
const styles = StyleSheet.create({
  RenderItem: {
    flex: 1,
    marginVertical: 10,
    justifyContent: 'center',
  },
  viewDetail: {
    flexDirection: 'row',
    height: 100,
    borderColor: Color.darkGray,
    borderWidth: 1,
    borderRadius: 15,
  },
  viewDetailRight: {
    flex: 1,

    justifyContent: 'space-between',
    padding: 15,
  },
  viewDetailBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewBottom: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  Donated: {
    fontSize: 16,
    fontWeight: '500',
    color: Color.black,
  },
  DonateNumber: {
    color: Color.primary,
  },
  btn: {
    width: 120,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Color.primary,
    borderRadius: 50,
  },
  txtBtn: {
    fontSize: 14,
    fontWeight: '500',
    color: Color.primary,
  },
});
