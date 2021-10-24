export function getMDHMForTimestamp(timestamp) {
  try {
    let date = new Date(timestamp * 1000);
    let month = ['Jan' , 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let hours = date.getUTCHours();
    let minutes = date.getUTCMinutes();
    let ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? ('0' + minutes) : minutes;

    return month[date.getUTCMonth()] + " " +  date.getUTCDate() + " " + hours + ':' + minutes + ampm + ' UTC';
  } catch(e) {
    return '-';
  }
}

export function getDisplayForTimestamp(timestamp, short = true) {
  try {
    let today = new Date();
    let date = new Date(timestamp * 1000);

    let diff = today - date;

    if (diff >= 24 * 60 * 60e3) {
      let days = Math.floor(diff / (24* 60 * 60e3)).toString();

      if (short === true) {
        return days + 'd';
      } else {
        return days + ' days ago';
      }
    } else if (diff >= 60 * 60e3) {
      let hours = Math.floor(diff / (60 * 60e3)).toString();

      if (short === true) {
        return hours + 'h';
      } else {
        return hours + ' hours ago';
      }
    } else {
      let minutes = Math.floor(diff / 60e3);
      if (minutes < 1) { minutes = 1; } 
      minutes = minutes.toString();

      if (short === true) {
        return minutes + 'm';
      } else {
        return minutes + ' minutes ago';
      }
    }
  } catch(e) {
    return '';
  }
}
