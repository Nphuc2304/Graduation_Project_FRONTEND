import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import AppStyles from '../../Styles/AppStyles';
import colors from '../../Color';
import {FlashList} from '@shopify/flash-list';
import Header from '../../../components/Header';

const Notification = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Header
            iconBack={require('../../../assets/icons/back.png')}
            title="Notification"
            icon={require('../../../assets/icons/vertical_dots.png')}
            mg={20}
            navigation={navigation}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;
