const tiktok = require('../model/tiktok') 

let debug = true;
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
    var result = await tiktok.getVideoNoWM(url)
    res.send({
      status: true,
      data: result,
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
