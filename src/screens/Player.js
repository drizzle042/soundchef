import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import {pause, forward, backward, arrowBack, play} from '../assets/images';
import {formatDuration, formatTime} from '../utils';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const Player = ({navigation, route: {params}}) => {
  const [playing, setPlaying] = React.useState(true);
  const [track, setTrack] = React.useState({});
  const {position, duration} = useTrackPlayerProgress();

  React.useEffect(() => {
    async function getTrack() {
      let trackId = await TrackPlayer.getCurrentTrack();
      let trackObject = await TrackPlayer.getTrack(trackId);

      setTrack(trackObject);
    }
    getTrack();
  }, [track]);

  const playMusic = async () => {
    let state = await TrackPlayer.getState();

    if (state === 3) {
      TrackPlayer.pause();
      setPlaying(false);
    } else {
      TrackPlayer.add(track).then(() => {
        TrackPlayer.play();
        setPlaying(true);
      });
      setPlaying(true);
    }
  };

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          translucent
          backgroundColor="#8f5332"
          barStyle="light-content"
        />
      </View>
      <Image style={styles.background} source={{uri: params.blur}} />

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
        activeOpacity={0.9}>
        <Image style={styles.arrowBack} source={arrowBack} />
      </TouchableOpacity>

      <View style={styles.container}>
        <View style={styles.imageHolder}>
          <Image style={styles.art} source={{uri: track && track.artwork}} />
        </View>
        <View style={styles.titleContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {track && track.title}
          </Text>
          <Text numberOfLines={1} style={styles.author}>
            {track && track.artist}
          </Text>
        </View>
        <View style={styles.playerContainer}>
          <View style={styles.seekerContainer}>
            <View
              style={{
                ...styles.seeker,
                width: `${((position / duration) * 100).toFixed(0)}%`,
              }}
            />
          </View>
          <View style={styles.seekerDutarionContainer}>
            <Text style={styles.duration}>{formatDuration(position)}</Text>
            <Text style={styles.duration}>{formatDuration(duration)}</Text>
          </View>
        </View>
        <View style={styles.controlsContainer}>
          <TouchableOpacity
            onPress={() => TrackPlayer.skipToPrevious()}
            style={styles.controls}
            activeOpacity={0.99}>
            <Image source={backward} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => playMusic()}
            style={styles.controls}
            activeOpacity={0.99}>
            {playing ? (
              <Image style={{width: 60, height: 60}} source={pause} />
            ) : (
              <Image style={{width: 60, height: 60}} source={play} />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => TrackPlayer.skipToNext()}
            style={styles.controls}
            activeOpacity={0.99}>
            <Image source={forward} />
          </TouchableOpacity>
        </View>
        <View style={styles.spacer} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  background: {
    width: '110%',
    height: '110%',
    position: 'absolute',
    left: -10,
    top: -10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageHolder: {
    width: 200,
    height: 200,
    elevation: 10,
    zIndex: 999,
  },
  art: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  titleContainer: {
    marginVertical: 30,
    alignItems: 'center',
    width: '90%',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  author: {
    color: '#fff',
    fontSize: 14,
    marginTop: 10,
  },
  playerContainer: {
    width: '80%',
  },
  seekerContainer: {
    width: '100%',
    height: 5,
    backgroundColor: '#fff',
    elevation: 3,
  },
  seeker: {
    height: '100%',
    backgroundColor: '#353535',
  },
  seekerDutarionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  duration: {
    color: '#fff',
  },
  controlsContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spacer: {
    marginVertical: 40,
  },
  controls: {
    marginHorizontal: 30,
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    top: 40,
    left: 10,
  },
  arrowBack: {
    width: 20,
    height: 20,
  },
});

export default Player;
