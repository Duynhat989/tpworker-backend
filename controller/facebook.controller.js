const youtubedl = require('youtube-dl-exec');

exports.get_video_link = async (req, res) => {
    const { url  } = req.body
    if (url === undefined) {
        res.send({
          status: false,
          error: "miss",
        });
        return;
    }
    // Ví dụ tải video có url là youtubeUrl
    var data =await youtubedl(url, { dumpSingleJson: true })
      // Lấy URL tải xuống
    res.send({
      status: true,
      data:data,
    });
  };