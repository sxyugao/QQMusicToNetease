const fs = require('fs');
const http = require('http');
const option = {
  headers: {
    'cookie': null
  }
};
const NeteaseAPI = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, option, (req) => {
      let s = "";
      req.on('data', (data) => {
        s += data;
      });
      req.on('end', () => {
        resolve(JSON.parse(s));
      })
    })
  })
}
const createPlaylist = (name) => {
  return new Promise((resolve, reject) => {
    NeteaseAPI(`http://localhost:3000/playlist/create?name=${name}`).then((res) => {
      if (res.msg == "需要登录") reject("请将 Cookie 放入文件中！");
      resolve(res.id);
    })
  })
}
const querySong = (name) => {
  return new Promise((resolve, reject) => {
    NeteaseAPI(`http://localhost:3000/search?keywords=${name}&limit=5`).then((res) => {
      resolve(res.result.songs[0]);
    })
  });
}
const addSongToPlaylist = (song, playlist) => {
  NeteaseAPI(`http://localhost:3000/playlist/tracks?op=add&pid=${playlist}&tracks=${song.id}`).then((res) => {
    if (res.message == "未付费歌曲无法收藏") {
      console.log("-  ", song.name);
    }
  });
}
fs.readFile('./cookie.txt', (err, res) => {
  option.headers.cookie = res.toString();
  fs.readFile('./data.json', (err, res) => {
    const json = JSON.parse(res);
    createPlaylist(json.data.dissname).then((playlist) => {
      console.log("歌单id:\t", playlist);
      console.log("未付费歌曲无法收藏:");
      json.data.songlist.forEach((el) => {
        querySong(el.songorig).then((song) => {
          addSongToPlaylist(song, playlist);
        })
      })
    });
  });
});