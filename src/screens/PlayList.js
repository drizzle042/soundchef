import React from 'react';
import {
  View,
  Text,
  Platform,
  StatusBar,
  StyleSheet,
  PermissionsAndroid,
  ToastAndroid,
  Dimensions,
  FlatList,
} from 'react-native';
import MusicList from '../components/MusicList';
import StackPlayer from '../components/StackPlayer';
// import SwipeablePlaylist from '../components/SwipeablePlaylist';
import MusicFiles from 'react-native-get-music-files';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player';
import SplashScreen from 'react-native-splash-screen';

const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const PlayList = ({navigation}) => {
  const [musics, setMusics] = React.useState([]);
  const [playing, setPlaying] = React.useState({});
  const [isPlaying, setIsPlaying] = React.useState(false);
  const {position, duration} = useTrackPlayerProgress();
  const {loading, setLoading} = React.useState(true);

  async function getPlaying() {
    let trackId = await TrackPlayer.getCurrentTrack();
    let trackObject = await TrackPlayer.getTrack(trackId);

    setPlaying(trackObject);
  }

  React.useEffect(() => {
    getPlaying();
  }, [playing]);

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 5000);

    TrackPlayer.updateOptions({
      stopWithApp: true,
    });
  }, []);

  React.useEffect(() => {
    const requestStoragePermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message:
              'SoundChef needs to access your storage ' +
              'so you can play your musics.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          MusicFiles.getAll({
            blured: true, // works only when 'cover' is set to true
            artist: true,
            duration: true, //default : true
            cover: true, //default : true,
            genre: true,
            title: true,
            minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
            fields: [
              'title',
              'albumTitle',
              'genre',
              'lyrics',
              'artwork',
              'duration',
            ], // for iOs Version
          })
            .then((tracks) => {
              tracks = tracks.map((t, i) => {
                return {
                  id: `${i}`,
                  url: `file://${t.path}`,
                  title: t.title,
                  artist: t.author,
                  album: t.album,
                  genre: t.genre,
                  artwork: t.cover,
                  duration: t.duration,
                  blur: t.blur,
                };
              });
              setMusics(tracks);
              TrackPlayer.add(tracks).then(() => {});
              setLoading(false);
            })
            .catch((error) => {
              // catch the error
            });
        } else {
          ToastAndroid.show(
            'Sorry! You cannot use this app unless you accept the permission!',
            ToastAndroid.SHORT,
          );
        }
      } catch (err) {
        ToastAndroid.show(err.message, ToastAndroid.SHORT);
      }
    };

    requestStoragePermission();
  }, [loading, setLoading]);

  return (
    <>
      <View style={styles.statusBar}>
        <StatusBar
          translucent
          backgroundColor="#13243d"
          barStyle="light-content"
        />
      </View>
      <View style={styles.container}>
        {/* <Text style={styles.title}>Playlists</Text>

        <SwipeablePlaylist data={musics} /> */}

        {/* <Text style={styles.queue}>Queue</Text> */}
        <Text style={styles.title}>Songs</Text>

        {!musics.length > 0 && (
          <View style={styles.empty}>
            {loading ? (
              <Text style={styles.noMusic}>No Music Found!</Text>
            ) : (
              <Text style={styles.noMusic}>Loading...</Text>
            )}
          </View>
        )}

        <FlatList
          data={musics}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={<View style={styles.bottomSpace} />}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <MusicList
                art={{uri: item.artwork}}
                title={item.title}
                subtitle={item.artist}
                time={item.duration}
                onClick={async () => {
                  TrackPlayer.skip(item.id);
                  TrackPlayer.play();
                  getPlaying();
                  navigation.navigate('Player', {
                    blur: item.blur,
                    duration: item.duration,
                  });
                }}
              />
            );
          }}
        />
      </View>

      {playing ? (
        <StackPlayer
          title={playing.title}
          subtitle={playing.artist}
          art={{uri: playing.artwork}}
          position={position}
          duration={duration}
          isPlaying={isPlaying}
          onPlayPause={async () => {
            const current = await TrackPlayer.getState();
            if (current === 3) {
              TrackPlayer.pause();
              setIsPlaying(false);
            } else {
              TrackPlayer.play();
              setIsPlaying(true);
            }
          }}
          onNext={() => TrackPlayer.skipToNext()}
          onPrev={() => TrackPlayer.skipToPrevious()}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  container: {
    backgroundColor: '#13243d',
    flex: 1,
    paddingHorizontal: 20,
  },
  queue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 20,
  },
  bottomSpace: {
    marginVertical: 100,
  },
  empty: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: Dimensions.get('screen').height - 200,
  },
  noMusic: {
    color: '#fff',
    fontSize: 28,
  },
});

export default PlayList;
