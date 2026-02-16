const uploadInput = document.getElementById("upload");
const uploadBtn = document.getElementById("uploadBtn");
const downloadBtn = document.getElementById("downloadBtn");
const changeBtn = document.getElementById("changeBtn");
const actions = document.getElementById("actions");

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const theme = new Image();
theme.src = "tema.png"; // tema fixo do sistema

uploadBtn.addEventListener("click", () => {
  uploadInput.click();
});

changeBtn.addEventListener("click", () => {
  uploadInput.value = "";
  actions.style.display = "none";
  uploadBtn.style.display = "inline-block";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  uploadInput.click();
});

uploadInput.addEventListener("change", function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {

      // Limpar canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Redimensionar e cortar proporcionalmente (cover)
      const size = Math.min(img.width, img.height);
      const sx = (img.width - size) / 2;
      const sy = (img.height - size) / 2;

      ctx.drawImage(img, sx, sy, size, size, 0, 0, 1080, 1080);

      // Aplicar tema por cima
      theme.onload = function() {
        ctx.drawImage(theme, 0, 0, 1080, 1080);
      };

      if (theme.complete) {
        ctx.drawImage(theme, 0, 0, 1080, 1080);
      }

      // Mostrar botões
      uploadBtn.style.display = "none";
      actions.style.display = "block";
    };

    img.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

downloadBtn.addEventListener("click", () => {

  canvas.toBlob(function(blob) {

    if (!blob) {
      alert("Erro ao gerar imagem.");
      return;
    }

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

