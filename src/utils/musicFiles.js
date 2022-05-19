import {NativeModules, Platform} from 'react-native';

const {RNReactNativeGetMusicFiles} = NativeModules;

// const options = {
//   blured: true, // works only when 'cover' is set to true
//   artist: true,
//   duration: true, //default : true
//   cover: false, //default : true,
//   genre: true,
//   title: true,
//   minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
//   fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'], // for iOs Version
// };

const MusicFiles = {
  getAll(options) {
    return new Promise((resolve, reject) => {
      if (Platform.OS === 'android') {
        RNReactNativeGetMusicFiles.getAll(
          options,
          (tracks) => {
            resolve(tracks);
          },
          (error) => {
            resolve(error);
          },
        );
      } else {
        RNReactNativeGetMusicFiles.getAll(options, (tracks) => {
          if (tracks.length > 0) {
            resolve(tracks);
          } else {
            resolve("Error, you don't have any tracks");
          }
        });
      }
    });
  },
};

export {MusicFiles};
