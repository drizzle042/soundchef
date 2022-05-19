import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const SwipeablePlaylist = ({data}) => {
  const _renderItem = ({item, index}) => {
    return (
      <View key={`${index}`} style={styles.cardStack}>
        <View
          style={{
            ...styles.cardView,
          }}>
          <Text numberOfLines={1} style={styles.title}>
            {item.title}
          </Text>
          <Text style={styles.subtitle}>60 Tracks</Text>
          <Text style={styles.subtitle}>2:54:34</Text>
        </View>
      </View>
    );
  };

  const deviceWidth = Dimensions.get('screen').width - 40;

  return (
    <View>
      <Carousel
        data={data}
        renderItem={_renderItem}
        sliderWidth={deviceWidth}
        itemWidth={deviceWidth}
        sliderHeight={180}
        itemHeight={180}
        loop
        layout={'tinder'}
        layoutCardOffset={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  cardView: {
    width: '100%',
    height: 200,
    backgroundColor: '#6709ca',
    borderRadius: 10,
    padding: 20,
    marginBottom: 60,
  },
  first: {
    backgroundColor: 'red',
  },
  // cardStack: {
  //   width: '100%',
  //   backgroundColor: 'blue',
  // },
  title: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SwipeablePlaylist;
