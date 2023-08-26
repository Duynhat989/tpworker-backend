const { Headers } = require('node-fetch');
const fetch = require("node-fetch");

const headers = new Headers();
headers.append('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:70.0) Gecko/20100101 Firefox/70.0');

const getIdVideo = (url) => {
    const matching = url.includes("/video/")
    if (!matching) {
        return url
    }
    const idVideo = url.substring(url.indexOf("/video/") + 7, url.length);
    return (idVideo.length > 19) ? idVideo.substring(0, idVideo.indexOf("?")) : idVideo;
}
const getVideoNoWM = async (url) => {
    const idVideo = await getIdVideo(url)
    const API_URL = `https://api16-normal-c-useast1a.tiktokv.com/aweme/v1/feed/?aweme_id=${idVideo}`;
    const request = await fetch(API_URL, {
        method: "GET",
        headers: headers
    });
    const body = await request.text();
    // console.log(body);

    try {
        var res = JSON.parse(body);

        const urlMedia = res.aweme_list[0].video.play_addr.url_list[0]
        const data = {
            url: urlMedia,
            id: idVideo,

            // full data
            data: res.aweme_list[0]
        }

        return data
    } catch (err) {
        console.error("Error:", err);
        console.error("Response body:", body);
    }

}

module.exports = {
    getVideoNoWM,
}