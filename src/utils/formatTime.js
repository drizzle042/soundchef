export const formatTime = (time) => {
  var minutes = Math.floor(time / 60000);
  var seconds = ((time % 60000) / 1000).toFixed(0);

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};

export const formatDuration = (duration) => {
  var minutes = Math.floor(duration / 60);

  let d = new Date(duration * 1000);
  let seconds = d.getUTCSeconds();

  return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
