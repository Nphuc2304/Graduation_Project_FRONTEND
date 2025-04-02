import {View} from 'react-native';
import Header from '../../components/Header';

const Bookmark = ({navigation}: any) => {
  return (
    <View>
      <Header
        iconBack={require('../../assets/icons/back.png')}
        title="Bookmark"
        iconDots={require('../../assets/icons/vertical_dots.png')}
        mg={20}
      />
    </View>
  );
};

export default Bookmark;
