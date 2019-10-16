import React, { useState, useRef } from 'react';
import './Watermark.css';

const size = 1080;

const imageUpload = (e, { setRaw }) => {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    setRaw(reader.result);
  };

  reader.readAsDataURL(file);
};

const previewLoad = ({ canvasRef, rawRef, setPreview }) => {
  const canvas = canvasRef.current;
  const img = rawRef.current;
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
  ctx.lineWidth = 8;
  ctx.strokeStyle = '#fafafa';

  const hPadding = 80;
  const vPadding = 30;

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

  ctx.font = "normal 800 50px 'Open Sans, sans-serif'";
  ctx.fillStyle = '#fafafa';
  ctx.fillText('NODE', hPadding + 20, vPadding + 60);
  ctx.fillText('GATHERING', hPadding + 20, vPadding + 100);

  const dataURL = canvas.toDataURL();
  setPreview(dataURL);
};

const Watermark = () => {
  const canvasRef = useRef(null);
  const rawRef = useRef(null);
  const previewRef = useRef(null);
  const [raw, setRaw] = useState(null);
  const [preview, setPreview] = useState(null);

  return (
    <div className="Watermark">
      {raw && (
        <img
          src={raw}
          ref={rawRef}
          alt="raw"
          onLoad={() => previewLoad({ canvasRef, rawRef, setPreview })}
        />
      )}
      <input type="file" onChange={e => imageUpload(e, { setRaw })} />
      <canvas ref={canvasRef} width={size} height={size} />
      {preview && (
        <a href={preview} download={'cover.jpg'}>
          <img src={preview} ref={previewRef} alt="download" />
        </a>
      )}
    </div>
  );
};

export default Watermark;
