import React, { useState, useRef } from 'react';
import './Watermark.css';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

const size = 1080;
// const logoRatio = 0.2;
const hPadding = 80;
const vPadding = 30;
const fontSize = 50;

const imageUpload = (e, { setRaw }) => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    setRaw(reader.result);
  };

  reader.readAsDataURL(file);
};

const drawFrame = ({ ctx, size }) => {
  ctx.lineWidth = 5;
  ctx.strokeStyle = '#fafafa';

  ctx.beginPath();
  ctx.moveTo(hPadding, vPadding);
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
  ctx.lineTo(vPadding, hPadding);
  ctx.stroke();
  ctx.closePath();
};

const drawUpperText = ({ ctx }) => {
  ctx.font = `normal 700 ${fontSize}px 'Noto Sans TC', 'Noto Sans', sans-serif`;
  const textWidth1 = ctx.measureText('GATHERING').width;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  const text1X = hPadding;
  const text1Y = vPadding + 70;
  const text2X = text1X;
  const text2Y = text1Y + 50;
  ctx.fillRect(
    text1X - 10,
    text1Y - fontSize,
    textWidth1 + 20,
    (fontSize + 10) * 2
  );

  ctx.textAlign = 'left';
  ctx.fillStyle = '#fafafa';
  ctx.fillText('NODE', text1X, text1Y);
  ctx.fillText('GATHERING', text2X, text2Y);
};

const drawLowerText = ({ ctx, name, date }) => {
  ctx.font = `normal 700 ${fontSize -
    10}px 'Noto Sans TC', 'Noto Sans', sans-serif`;
  const textWidth2 = ctx.measureText(name).width;
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
  const text3X = size - hPadding;
  const text3Y = size - vPadding - 100;
  const text4X = text3X;
  const text4Y = text3Y + 60;
  ctx.fillRect(
    text3X - textWidth2 - 20,
    text3Y - (fontSize - 0),
    textWidth2 + 40,
    (fontSize + 10) * 2 + 10
  );

  ctx.textAlign = 'right';
  ctx.fillStyle = '#fafafa';
  ctx.fillText(name, text3X, text3Y);
  ctx.fillText(moment(date).format('MM/DD'), text4X, text4Y);
};

const previewLoad = ({
  canvasRef,
  rawRef,
  setPreview,
  name,
  date,
  logoRef
}) => {
  const canvas = canvasRef.current;
  const img = rawRef.current;
  // const logo = logoRef.current;
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

  drawFrame({ ctx, size });

  drawUpperText({ ctx });

  drawLowerText({ ctx, name, date });

  const dataURL = canvas.toDataURL();
  setPreview(dataURL);
};

const Watermark = () => {
  const canvasRef = useRef(null);
  const rawRef = useRef(null);
  const previewRef = useRef(null);
  const uploadRef = useRef(null);
  const logoRef = useRef(null);
  const [raw, setRaw] = useState(null);
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState('');
  const [date, setDate] = useState(null);

  return (
    <div className="Watermark">
      <TextField
        id="standard-name"
        label="Gathering Name"
        className="input-width"
        margin="normal"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd"
          margin="normal"
          label="Gathering Date"
          className="input-width"
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          minDate={Date.now()}
          value={date}
          onChange={date => setDate(date)}
        />
      </MuiPickersUtilsProvider>
      <div className="button-margin">
        <Button
          variant="contained"
          color="primary"
          onClick={() => uploadRef.current.click()}
        >
          Choose Photo
        </Button>
      </div>
      <input
        id="upload"
        ref={uploadRef}
        type="file"
        onChange={e => imageUpload(e, { setRaw })}
      />
      <img
        src={raw}
        ref={rawRef}
        alt="raw"
        onLoad={() =>
          previewLoad({ canvasRef, rawRef, setPreview, name, date, logoRef })
        }
      />
      <img src={require('./logo.png')} ref={logoRef} alt="logo" />
      <canvas ref={canvasRef} width={size} height={size} />
      {preview && <img src={preview} ref={previewRef} alt="download" />}
      {preview && (
        <div className="button-margin">
          <Button
            variant="contained"
            color="primary"
            href={preview}
            download={'cover.jpg'}
          >
            Download
          </Button>
        </div>
      )}
    </div>
  );
};

export default Watermark;
