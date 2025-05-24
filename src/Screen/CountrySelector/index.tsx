import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import colors from '../../Color';

export const CountrySelector = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const sorted = response.data
          .map((item: any) => ({
            name: item.name.common,
            flag: item.flags?.png || '',
            cca2: item.cca2 || '',
          }))
          .sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCountries(sorted);
        setFilteredCountries(sorted);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (text: any) => {
    setSearchText(text);
    const filtered = countries.filter((country: any) =>
      country.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCountries(filtered);
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setSelectedCountry(item.name)}
    >
      <Image source={{ uri: item.flag }} style={styles.flag} />
      <Text style={styles.countryName}>{item.name}</Text>
      <View style={styles.radio}>
        {selectedCountry === item.name && <View style={styles.radioSelected} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ID country or region</Text>
      <Text style={styles.subtitle}>Select your ID country or region to verify your location</Text>

      <TextInput
        placeholder="Search country"
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchInput}
      />

      <FlatList
        data={filteredCountries}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.white,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color: colors.black,
    marginTop: 20,
  },
  subtitle: {
    color: colors.gray,
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: colors.gray,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: colors.gray,
  },
  flag: {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 12,
    borderColor: colors.gray,
    borderWidth: 0.5,
  },
  countryName: {
    flex: 1,
    fontSize: 16,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
