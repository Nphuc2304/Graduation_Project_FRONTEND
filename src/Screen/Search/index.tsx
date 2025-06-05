import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import colors from '../../Color';
import {FlashList} from '@shopify/flash-list';
import ListCampain from './Components/fundraising';
import {SearchStyles} from '../../Styles/SearchStyles';

const Cate = [
  {
    id: '1',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '2',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '3',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '4',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '5',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '6',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '7',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '8',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
  {
    id: '9',
    image: require('../../../assets/images/bell.png'),
    name: 'Category',
  },
];

export const Search = () => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const styles = SearchStyles();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backContainer}>
          <Image
            source={require('../../../assets/icons/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.title}>Search</Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10, alignItems: 'center'}}>
        <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
          <TextInput
            ref={inputRef}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search campaigns"
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor={colors.darkGray}
            style={styles.searchContainer}
          />
          <Image source={require('../../../assets/icons/search.png')} style={styles.searchIcon}/>
        </View>
        {isFocused && (
          <TouchableOpacity
            onPress={() => {
              inputRef.current?.blur();
              setSearchText('');
              setIsFocused(false);
            }}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.exploreContainer}>
        {searchText !== ''? (
            // <View style={styles.noResultContainer}>
            //   <Image source={require('../../../assets/images/sorry.png')} style={styles.noResultImage}/>
            //   <Text style={styles.noResultSorry}>We're sorry :(</Text>
            //   <Text style={styles.noResultText}>No result found.</Text>
            // </View>
            <View style={{flex: 1}}>
              <ListCampain />
            </View>
        ) : (
          <View style={styles.exploreContainer}>
            <Text style={styles.exploreTitle}>Explore Hlu Dan</Text>
            <FlashList
              data={Cate}
              numColumns={2}
              estimatedItemSize={200}
              showsVerticalScrollIndicator={false}
              renderItem={({item}: any) => {
                return (
                  <TouchableOpacity style={styles.categoryItem}>
                    <Image source={item.image} style={styles.categoryImage}/>
                    <Text style={styles.categoryText}>{item.name}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
