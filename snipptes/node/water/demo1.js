const TextToSVG = require('text-to-svg');
const sharp = require('sharp');
const textToSVG = TextToSVG.loadSync('./src/PG.TTF');

const svg1 = textToSVG.getSVG('标题', {
  x: 0,
  y: 0,
  fontSize: 50,
  anchor: 'top',
  attributes: { fill: 'white', stroke: 'white' }
});

const svg2 = textToSVG.getSVG('邀请您参加', {
  x: 0,
  y: 0,
  fontSize: 32,
  attributes: { fill: 'white', stroke: 'white' },
  anchor: 'top'
});

(async function run() {
  const sourceImg = sharp('./src/bg.jpg');
  const target1Img = sharp(Buffer.from(svg1));
  const target2Img = sharp(Buffer.from(svg2));
  const target3Img = sharp('./src/code.jpg');

  const [
    { width: sWidth, height: sHeight },
    { width: t1Width, height: t1Height },
    { width: t2Width, height: t2Height },
    { width: t3Width, height: t3Height }
  ] = await Promise.all([
    sourceImg.metadata(),
    target1Img.metadata(),
    target2Img.metadata(),
    target3Img.metadata()
  ]);
  // console.log(await Promise.all([sourceImg.metadata()]));
  const offsetX1 = parseInt((sWidth - t1Width) / 2);
  const offsetY1 = 200;

  const offsetX2 = parseInt((sWidth - t2Width) / 2);
  const offsetY2 = 320;

  const offsetX3 = parseInt((sWidth - t3Width) / 2);
  const offsetY3 = 470;

  const [target1Buffer, target2Buffer, target3Buffer] = await Promise.all([
    target1Img.toBuffer(),
    target2Img.toBuffer(),
    target3Img.toBuffer()
  ]);

  await sourceImg
    .composite([
      { input: target1Buffer, left: offsetX1, top: offsetY1 },
      { input: target2Buffer, left: offsetX2, top: offsetY2 },
      { input: target3Buffer, left: offsetX3, top: offsetY3 }
    ])
    .sharpen()
    .withMetadata()
    .png()
    .toFile('./dist/card.png');
})();

console.log('png ok');
