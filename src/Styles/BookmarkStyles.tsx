import {Dimensions, StyleSheet} from 'react-native';
import colors from '../Color';
const { width, height } = Dimensions.get('window');

const BookmarkStyles = StyleSheet.create({
  // Main container
  container: {
    width: width,
    height: height,
    backgroundColor: colors.white,
  },
  
  // Category section
  categorySection: {
    paddingVertical: 10,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray + '30',
  },
  
  // Campaign section
  campaignSection: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateText: {
    fontSize: 16,
    color: colors.lightBlack,
    textAlign: 'center',
    lineHeight: 24,
  },
  
  // Modal styles
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  containerModel: {
    width: '100%',
    position: 'relative',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: colors.white,
    padding: 20,
    maxHeight: '80%',
  },
  
  // Image container
  imgContainer: {
    width: '100%',
    height: 200,
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  img: {
    width: '100%',
    height: '100%',
  },
  
  // Content container
  contentContainer: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  campaignTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 15,
    lineHeight: 24,
  },
  
  // Funding info
  fundingInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  fundingText: {
    fontSize: 14,
    color: colors.lightBlack,
    lineHeight: 20,
  },
  statsText: {
    fontSize: 14,
    color: colors.lightBlack,
    lineHeight: 20,
  },
  
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 25,
    textAlign: 'center',
    color: colors.lightBlack,
    lineHeight: 22,
  },
});

export default BookmarkStyles;
