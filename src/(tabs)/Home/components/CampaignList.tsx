import {Text, TouchableOpacity, View} from 'react-native';
import {memo, useCallback} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useTheme} from '../../../utils/ThemeContext';
import createListProdStyles from '../../../Styles/ListProdStyles';
import AppStyles from '../../../Styles/AppStyles';
import ImageCarousel from './ImageCarousel';

interface CampaignItem {
  id: string;
  name: string;
  images: string[];
  priceCurrent: number;
  pricegoal: number;
  donators: number;
  totalGoal: number;
  dayLeft: string;
}

interface CampaignItemProps {
  item: CampaignItem;
  onSelectItem: (id: string) => void;
  onLongPress: (item: CampaignItem) => void;
}

// Memoized Campaign Item Component
const CampaignItemComponent = memo<CampaignItemProps>(
  ({item, onSelectItem, onLongPress}) => {
    const {colors} = useTheme();
    const styles = createListProdStyles(colors);

    const percent = parseFloat(
      Math.min(
        100,
        Math.max(0, (item.priceCurrent / item.totalGoal) * 100),
      ).toFixed(0),
    );

    const handlePress = useCallback(() => {
      onSelectItem(item.id);
    }, [onSelectItem, item.id]);

    const handleLongPress = useCallback(() => {
      onLongPress(item);
    }, [onLongPress, item]);

    return (
      <TouchableOpacity
        onPress={handlePress}
        onLongPress={handleLongPress}
        style={styles.container}>
        <ImageCarousel images={item.images} />
        <View style={styles.content}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode="tail">
            {item.name}
          </Text>
          <View style={styles.textWrap}>
            <Text style={[styles.textContent, {color: colors.primary}]}>
              {item.priceCurrent.toLocaleString()} VNĐ{' '}
            </Text>
            <Text style={styles.textContent}>Quỹ huy động từ </Text>
            <Text style={[styles.textContent, {color: colors.primary}]}>
              {item.totalGoal.toLocaleString()} VNĐ
            </Text>
          </View>
          <View style={AppStyles.rowContainerSpace}>
            <View
              style={{
                width: '90%',
                backgroundColor: colors.lightPrimary,
                height: 3,
                overflow: 'hidden',
                position: 'relative',
                borderRadius: 10,
                marginVertical: 20,
              }}>
              <View
                style={{
                  width: `${percent}%` as `${number}%`,
                  height: percent > 0 ? 3 : 0,
                  backgroundColor: colors.primary,
                  borderRadius: 10,
                }}></View>
            </View>
            <Text style={styles.textPer}>{percent}%</Text>
          </View>
          <View style={AppStyles.rowContainerSpace}>
            <Text style={styles.textContent}>
              <Text style={{color: colors.primary}}>
                {item.donators.toLocaleString()}
              </Text>{' '}
              donators
            </Text>
            <Text style={styles.textContent}>
              <Text style={{color: colors.primary}}>{item.dayLeft}</Text>{' '}
              days left
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    // Deep comparison for better performance
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.name === nextProps.item.name &&
      prevProps.item.priceCurrent === nextProps.item.priceCurrent &&
      prevProps.item.totalGoal === nextProps.item.totalGoal &&
      prevProps.item.donators === nextProps.item.donators &&
      prevProps.item.dayLeft === nextProps.item.dayLeft &&
      prevProps.onSelectItem === nextProps.onSelectItem &&
      prevProps.onLongPress === nextProps.onLongPress
    );
  },
);

interface CampaignListProps {
  data: CampaignItem[];
  onSelectItem: (id: string) => void;
  onLongPress: (item: CampaignItem) => void;
}

const CampaignList = memo<CampaignListProps>(
  ({data, onSelectItem, onLongPress}) => {
    const renderItem = useCallback(
      ({item}: {item: CampaignItem}) => (
        <CampaignItemComponent
          item={item}
          onSelectItem={onSelectItem}
          onLongPress={onLongPress}
        />
      ),
      [onSelectItem, onLongPress],
    );

    const keyExtractor = useCallback(
      (item: CampaignItem, index: number) => `campaign-${item.id}-${index}`,
      [],
    );

    return (
      <FlashList
        data={data}
        estimatedItemSize={200}
        horizontal={false}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={true}
      />
    );
  },
  (prevProps, nextProps) => {
    // Shallow comparison for data array
    if (prevProps.data.length !== nextProps.data.length) {
      return false;
    }
    
    // Check if callback functions are the same
    if (
      prevProps.onSelectItem !== nextProps.onSelectItem ||
      prevProps.onLongPress !== nextProps.onLongPress
    ) {
      return false;
    }

    // Deep comparison for data items (only check essential fields)
    return prevProps.data.every((item, index) => {
      const nextItem = nextProps.data[index];
      return (
        item.id === nextItem.id &&
        item.priceCurrent === nextItem.priceCurrent &&
        item.totalGoal === nextItem.totalGoal &&
        item.donators === nextItem.donators &&
        item.dayLeft === nextItem.dayLeft
      );
    });
  },
);

export default CampaignList;
