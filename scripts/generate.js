const ADDRESS = '5Wwbtyd1Ky3ZhDdpJQGE3m5s2VTueJWsay6VNW93s6cd';

// const fetchImages = async () => {
//   const url =
//     'https://api.nasa.gov/planetary/apod?api_key=process.env.NASA_API&start_date=2021-01-01&end_date=2021-12-09';
//   const response = await fetch(url);
//   const data = await response.json();
//   return data;
// };
const fs = require('fs');
const https = require('https');
const data = require('./nasa.json');

const getImages = () => {
  data.map((image, index) => {
    const url = image.url;
    if (url.slice(-3) === 'jpg' || url.slice(-3) === 'png') {
      const file = fs.createWriteStream(`../nft_assets/${index}.json`);
      file.write(
        JSON.stringify({
          name: `${image.title}. @tapabratadey website`,
          symbol: '',
          description: image.explanation,
          image: `${index}.png`,
          properties: {
            files: [
              {
                uri: `${index}.png`,
                type: 'image/png',
              },
            ],
            creators: [
              {
                address: ADDRESS,
                share: 100,
              },
            ],
          },
        })
      );
      file.end();
    }
  });
};

const downloadImages = () => {
  data.map((image, index) => {
    const url = image.url;
    if (url.slice(-3) === 'jpg' || url.slice(-3) === 'png') {
      const file = fs.createWriteStream(`../nft_assets/${index}.png`);
      https.get(url, (res) => {
        res.pipe(file);
      });
    }
  });
};

downloadImages();
getImages();
