import React, { useState, useRef } from 'react';
import './Watermark.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import DateFnsUtils from '@date-io/date-fns';
import { run } from './filters/filter-2';

const size = 1080;

const imageUpload = (e, { setRaw, rawRef }) => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  setRaw('');
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
  logoRef,
  style
}) => {
  const canvas = canvasRef.current;
  const img = rawRef.current;
  const logo = logoRef.current;

  const dataUrl = run({
    canvas,
    img,
    name,
    date,
    logo,
    style
  });

  setPreview(dataUrl);
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
  const [style, setStyle] = useState('white');

  return (
    <div className="Watermark">
      <TextField
        id="standard-name"
        label="Gathering Name"
        fullWidth
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
          fullWidth
          KeyboardButtonProps={{
            'aria-label': 'change date'
          }}
          minDate={Date.now()}
          value={date}
          onChange={date => setDate(date)}
        />
      </MuiPickersUtilsProvider>
      <FormControl component="fieldset" fullWidth margin="normal">
        <FormLabel component="legend">Style</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={style}
          onChange={e => setStyle(e.target.value)}
          row
        >
          <FormControlLabel value="white" control={<Radio />} label="White" />
          <FormControlLabel value="black" control={<Radio />} label="Black" />
        </RadioGroup>
      </FormControl>
      <div className="button-margin">
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            uploadRef.current.value = '';
            uploadRef.current.click();
          }}
        >
          Choose Photo
        </Button>
      </div>
      <input
        id="upload"
        ref={uploadRef}
        type="file"
        onChange={e => imageUpload(e, { setRaw, rawRef })}
      />
      <img
        src={raw}
        ref={rawRef}
        alt="raw"
        onLoad={() =>
          previewLoad({
            canvasRef,
            rawRef,
            setPreview,
            name,
            date,
            logoRef,
            style
          })
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
            href={preview.replace('image/png', 'image/octet-stream')}
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
