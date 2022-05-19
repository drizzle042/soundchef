import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {formatTime} from '../utils';

const MusicList = ({onClick, title, subtitle, art, time}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onClick}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.art} source={art} />
      </View>
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.title}>
          {title}
        </Text>
        <Text numberOfLines={1} style={styles.subTitle}>
          {subtitle}
        </Text>
      </View>
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(time)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262c41',
    height: 70,
    borderRadius: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  art: {
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  timeContainer: {
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 16,
  },
  subTitle: {
    color: '#fff',
    fontSize: 14,
  },
  time: {
    color: '#fff',
    fontSize: 12,
  },
});

export default MusicList;
