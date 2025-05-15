import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ProgressBar = ({progress}: {progress: number}) => {
  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <View style={[styles.barFill, {width: `${progress}%`}]} />
      </View>
      <Text style={styles.percentText}>{progress}%</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  barContainer: {
    flex: 1,
    height: 4,
    backgroundColor: '#D6E9FB',
    borderRadius: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  barFill: {
    height: 8,
    backgroundColor: '#1A8FE3',
  },
  percentText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
    width: 40,
  },
});

export default ProgressBar;
