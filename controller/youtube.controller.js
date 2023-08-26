const request = require("../utils/request");
const youtubedl = require('youtube-dl-exec');

let debug = true;
exports.upload_channel = async (req, res) => {
    
  try {
    const { url, nextToken } = req.body
    if (url === undefined) {
      res.send({
        status: false,
        error: "miss",
      });
      return;
    }
    var result = await request.get("playlist", {
      params: {
        url: url,
        nextPageToken: nextToken,
      },
    });
    res.send({
      status: true,
      data:result.data
    });
  } catch (error) {
    if (debug) {
      res.send({
        status: false,
        user: null,
        error: error,
      });
    } else {
      res.send({
        status: false,
        user: null,
      });
    }
  }
};
exports.upload_link = async (req, res) => {
  try {
    const { url } = req.body;
    if (url === undefined) {
      res.send({
        status: false,
        error: "miss",
      });
      return;
    }
  var video =await youtubedl(url, {
    dumpJson: true,
    noWarnings: true,
    noCallHome: true,
    playlistEnd:1
  })
    res.send({
      status: true,
      data: video,
    });
  } catch (error) {
    if (debug) {
      res.send({
        status: false,
        user: null,
        error: error,
      });
    } else {
      res.send({
        status: false,
        user: null,
      });
    }
  }
};
exports.upload_link_test = async (req, res) => {
  const { url  } = req.body
  // Ví dụ tải video có url là youtubeUrl
  //khả nawg ứng dụng ok do tải được yt tiktok và facebook
  var video =await youtubedl(url, { dumpSingleJson: true,playlistEnd:1 })
    // Lấy URL tải xuống
  res.send({
    status: true,
    video:video,
  });
};
exports.upload_chanel_test = async (req, res) => {
  // khả năng ap dụng thoaaso di tải nhiều không ổn định
  const { url  } = req.body
  var video =await youtubedl(url, {
    dumpJson: true,
    noWarnings: true,
    noCallHome: true,
    playlistEnd:1
  })
    // Lấy URL tải xuống
  res.send({
    status: true,
    video:video
  });
};