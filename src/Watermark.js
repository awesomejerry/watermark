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
const logoRatio = 0.2;

const imageUpload = (e, { setRaw }) => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    setRaw(reader.result);
  };

  reader.readAsDataURL(file);
};

const previewLoad = ({
  canvasRef,
  rawRef,
  setPreview,
  name,
  date,
  logoRef
}) => {
  const hPadding = 80;
  const vPadding = 30;

  const canvas = canvasRef.current;
  const img = rawRef.current;
  const logo = logoRef.current;
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

  ctx.drawImage(
    logo,
    hPadding - 20,
    vPadding + 20,
    size * logoRatio,
    size * logoRatio
  );

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

  ctx.font = "normal 700 50px 'Noto Sans TC', 'Noto Sans', sans-serif";
  ctx.fillStyle = '#fafafa';
  ctx.textAlign = 'end';
  ctx.fillText(name, size - hPadding, size - vPadding - 100);
  ctx.fillText(
    moment(date).format('YYYY/MM/DD'),
    size - hPadding,
    size - vPadding - 40
  );

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
  const [name, setName] = useState(null);
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
          format="yyyy/MM/dd"
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
