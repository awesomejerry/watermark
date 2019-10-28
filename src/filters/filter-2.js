import moment from 'moment';

const size = 1080;
// const logoRatio = 0.2;
const hPadding = 40;
const vPadding = 40;
const TEXT_SPARE_SPACE = 120;

const COLOR_MAPPING = {
  white: '#fafafa',
  black: 'rgb(59, 74, 96)'
};

const drawFrame = ({ ctx, size, style }) => {
  const color = COLOR_MAPPING[style];
  ctx.lineWidth = 3;
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(hPadding + TEXT_SPARE_SPACE, vPadding);
  ctx.lineTo(size - hPadding, vPadding);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(size - vPadding, hPadding);
  ctx.lineTo(size - vPadding, size - hPadding);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(size - hPadding, size - vPadding);
  ctx.lineTo(hPadding, size - vPadding);
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.moveTo(vPadding, size - hPadding);
  ctx.lineTo(vPadding, hPadding + TEXT_SPARE_SPACE / 2);
  ctx.stroke();
  ctx.closePath();
};

const drawUpperText = ({ ctx, style }) => {
  const color = COLOR_MAPPING[style];

  const fontSize1 = 21;
  const fontSize2 = 16;
  const font1 = `normal 700 ${fontSize1}pt 'Montserrat', 'Noto Sans TC', 'Noto Sans', sans-serif`;
  const font2 = `normal 700 ${fontSize2}pt 'Montserrat', 'Noto Sans TC', 'Noto Sans', sans-serif`;
  const text1X = hPadding - 2;
  const text1Y = vPadding + fontSize1 * 0.75 + 1;
  const text2X = text1X;
  const text2Y = text1Y + fontSize1 + 5;

  ctx.textAlign = 'left';
  ctx.fillStyle = color;

  ctx.font = font1;
  ctx.fillText('NODE', text1X, text1Y);

  ctx.font = font2;
  ctx.fillText('GATHERING', text2X, text2Y);
};

const drawLowerText = ({ ctx, name, date }) => {
  const fontSize1 = 21;
  const fontSize2 = 37;
  const font1 = `normal 400 ${fontSize1}pt Montserrat, 'Noto Sans TC', 'Noto Sans', sans-serif`;
  const font2 = `normal 400 ${fontSize2}pt Montserrat, 'Noto Sans TC', 'Noto Sans', sans-serif`;

  const nameString = `- ${name} -`;
  const dateString = moment(date).format('MM/DD');
  ctx.font = font1;
  const textWidth1 = ctx.measureText(nameString).width;
  ctx.font = font2;
  const textWidth2 = ctx.measureText(dateString).width;

  const text2X = size - hPadding - 10;
  const text1X = text2X;
  const text2Y = size - vPadding - 20;
  const text1Y = text2Y - fontSize2 - 20;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  const rectWidth = Math.max(textWidth1, textWidth2);
  ctx.fillRect(
    text1X - rectWidth - 12,
    text1Y - fontSize1 - 18,
    rectWidth + 20,
    fontSize2 * 2 + 40
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = '#fafafa';

  ctx.font = font1;
  ctx.fillText(nameString, text1X, text1Y);

  ctx.font = font2;
  ctx.fillText(dateString, text2X, text2Y);
};

export const run = ({ canvas, img, name, date, logo, style }) => {
  const ctx = canvas.getContext('2d');
  const hRatio = canvas.width / img.width;
  const vRatio = canvas.height / img.height;
  const ratio = Math.max(hRatio, vRatio);
  const centerShift_x = (canvas.width - img.width * ratio) / 2;
  const centerShift_y = (canvas.height - img.height * ratio) / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );

  // ctx.drawImage(
  //   logo,
  //   hPadding - 20,
  //   vPadding + 20,
  //   size * logoRatio,
  //   size * logoRatio
  // );

  drawFrame({ ctx, size, style });

  drawUpperText({ ctx, style });

  drawLowerText({ ctx, name, date, style });

  return new Promise((resolve, reject) => {
    canvas.toBlob(function(blob) {
      resolve(URL.createObjectURL(blob));
    });
  });
};
