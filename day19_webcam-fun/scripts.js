const video = document.querySelector(".player");
const canvas1 = document.querySelector(".photo1");
const canvas2 = document.querySelector(".photo2");
const canvas3 = document.querySelector(".photo3");
const canvas4 = document.querySelector(".photo4");
const canvas5 = document.querySelector(".photo5");
const canvas6 = document.querySelector(".photo6");

const strip = document.querySelector(".strip");
const snap = new Audio("./snap.mp3");

getVideo();

video.addEventListener("canplay", () => {
  paintToCanvas(canvas1, 16, redEffect);
  paintToCanvas(canvas2, 800, rgbSplit);
  paintToCanvas(canvas3, 1600, chromaKey);
  paintToCanvas(canvas4, 80, invert);
  paintToCanvas(canvas5, 2000, grayscale);
  paintToCanvas(canvas6, 400, original);
});

function getVideo() {
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false })
    .then((mediaStream) => {
      video.srcObject = mediaStream;
      video.play();
    })
    .catch((err) => {
      console.error("Error!!", err);
    });
}

function paintToCanvas(canvas, sec, filter) {
  const ctx = canvas.getContext("2d");

  const width = video.videoWidth / 1.5;
  const height = video.videoHeight / 1.5;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);

    pixels = filter(pixels);

    ctx.putImageData(pixels, 0, 0);
  }, sec);
}

function takePhoto() {
  audioPlay(snap);
  const canvas = randomCanvas();
  const data = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = data;
  link.setAttribute("download", "photo");
  link.innerHTML = `<img src="${data}" alt="your photo" />`;
  strip.insertBefore(link, strip.firstChild);
}

function randomCanvas() {
  const number = Math.floor(Math.random() * 5) + 1;
  const canvas = document.querySelector(`.photo${number}`);
  return canvas;
}

function audioPlay(sound) {
  sound.currentTime = 0;
  sound.play();
}

function redEffect(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = pixels.data[i + 0]; //red
    pixels.data[i + 1] = pixels.data[i + 1] * 0.25; //green
    pixels.data[i + 2] = pixels.data[i + 2] * 0.25; //blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 200] = pixels.data[i + 0]; //red
    pixels.data[i + 500] = pixels.data[i + 1]; //green
    pixels.data[i - 100] = pixels.data[i + 2]; //blue
  }
  return pixels;
}

function chromaKey(pixels) {
  const levels = {};

  document.querySelectorAll(".rgb-controls input").forEach((input) => {
    levels[input.name] = input.value;
  });

  for (i = 0; i < pixels.data.length; i = i + 4) {
    let red = pixels.data[i + 0];
    let green = pixels.data[i + 1];
    let blue = pixels.data[i + 2];
    let alpha = pixels.data[i + 3];

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      // take it out!
      pixels.data[i + 3] = 0;
    }
  }

  return pixels;
}

function invert(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] = 255 - pixels.data[i + 0]; //red
    pixels.data[i + 1] = 255 - pixels.data[i + 1]; //green
    pixels.data[i + 2] = 255 - pixels.data[i + 2]; //blue
  }
  return pixels;
}

function grayscale(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    const average =
      (pixels.data[i + 0] + pixels.data[i + 1] + pixels.data[i + 2]) / 3;
    pixels.data[i + 0] = average; //red
    pixels.data[i + 1] = average; //green
    pixels.data[i + 2] = average; //blue
  }
  return pixels;
}

function original(pixels) {
  return pixels;
}
