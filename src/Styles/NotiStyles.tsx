import { StyleSheet } from 'react-native'
import colors from '../Color';

export const NotiStyles = () => {
    const color = colors;
  return StyleSheet.create({
    dateHeader: {
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 16,
    color: color.lightBlack,
  },
  card: {
    backgroundColor: color.white,
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    marginBottom: 10,
    borderColor: color.gray,
    borderWidth: 0.7,
  },
  iconContainer: {
    marginRight: 15,
    justifyContent: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 15,
    color: '#000',
    marginBottom: 4,
  },
  content: {
    fontSize: 13,
    color: '#888',
  },
  imageNoti: {
    width: 194, height: 188,
    resizeMode: 'contain'
  },
  textNoti: {
    fontSize: 24,
    fontWeight: 'medium',
    color: color.gray
  },
  notiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 50,
  }
  });
};