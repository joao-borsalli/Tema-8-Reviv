const uploadInput = document.getElementById("upload");
const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");
const changeBtn = document.getElementById("changeBtn");
const actions = document.getElementById("actions");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_SIZE = 1080;

// === IMAGENS ===
const theme = new Image();
theme.src = "tema.png";

const defaultAvatar = new Image();
defaultAvatar.src = "avatar.jpg";

// === FUNÇÃO PARA DESENHAR IMAGEM BASE + TEMA ===
function drawImageWithTheme(baseImage) {

  ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

  const size = Math.min(baseImage.width, baseImage.height);
  const sx = (baseImage.width - size) / 2;
  const sy = (baseImage.height - size) / 2;

  ctx.drawImage(baseImage, sx, sy, size, size, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
  ctx.drawImage(theme, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

// === CARREGAR TEMA + AVATAR INICIAL ===
Promise.all([
  new Promise(resolve => theme.onload = resolve),
  new Promise(resolve => defaultAvatar.onload = resolve)
]).then(() => {
  drawImageWithTheme(defaultAvatar);
});

// === UPLOAD ===
uploadBtn.addEventListener("click", () => {
  uploadInput.click();
});

uploadInput.addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();

    img.onload = function() {
      drawImageWithTheme(img);
      uploadBtn.style.display = "none";
      actions.style.display = "block";
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

// === TROCAR FOTO ===
changeBtn.addEventListener("click", () => {
  uploadInput.value = "";
  drawImageWithTheme(defaultAvatar);
  actions.style.display = "none";
  uploadBtn.style.display = "inline-block";
});

// === DOWNLOAD ===
downloadBtn.addEventListener("click", () => {

  canvas.toBlob(function(blob) {

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "foto-personalizada.jpg";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

  }, "image/jpeg", 1.0);

});
