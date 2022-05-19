import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  pauseBlack,
  playBlack,
  forwardBlack,
  backwardBlack,
} from '../assets/images';
import TrackPlayer from 'react-native-track-player';

const StackPlayer = ({
  title,
  subtitle,
  art,
  position,
  duration,
  onPlayPause,
  onNext,
  onPrev,
  isPlaying,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          ...styles.seek,
          width: `${((position / duration) * 100).toFixed(0)}%`,
        }}
      />
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
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={onPrev} activeOpacity={0.9}>
          <Image style={styles.controls} source={backwardBlack} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPlayPause} activeOpacity={0.9}>
          <Image
            style={styles.controls}
            source={isPlaying ? pauseBlack : playBlack}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onNext} activeOpacity={0.9}>
          <Image style={styles.controls} source={forwardBlack} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 80,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    width: 50,
    height: 50,
    alignSelf: 'center',
  },
  art: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  controlsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  subTitle: {
    fontSize: 12,
    lineHeight: 18,
  },
  controls: {
    width: 20,
    height: 20,
    marginLeft: 25,
  },
  seek: {
    height: 5,
    backgroundColor: '#353535',
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default StackPlayer;
