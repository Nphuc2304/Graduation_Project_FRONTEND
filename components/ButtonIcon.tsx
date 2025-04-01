import {Image, TouchableOpacity} from 'react-native';
import AppStyles from '../src/Styles/AppStyles';

const ButtonIcon = (props: any) => {
  const {icon, func, borderRa, bgColor, iconColor, styles, h, w, ml, mr} =
    props;
  return (
    <TouchableOpacity
      style={{
        padding: 8,
        borderRadius: borderRa,
        backgroundColor: bgColor,
        height: h,
        width: w,
        marginLeft: ml,
        marginRight: mr,
        ...styles,
      }}
      onPress={func}>
      <Image style={[AppStyles.icon, {tintColor: iconColor}]} source={icon} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;
