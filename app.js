// getting elements from the DOM
const downloadBtn = document.getElementById("download-btn");
const uploadFile = document.getElementById("upload-file");
const revertBtn = document.getElementById("revert-btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();
let fileName = "";
let fileExtension = "";

//Upload File
uploadFile.addEventListener(
  "change",
  e => {
    const file = document.getElementById("upload-file").files[0];
    const reader = new FileReader();

    if (file) {
      fileName = file.name;
      reader.readAsDataURL(file);

      // Add image to Canvas
      reader.addEventListener("load", () => {
        img = new Image();
        img.src = reader.result;

        // on Image load add to Canvas
        img.onload = function() {
          canvas.width = img.width;
          canvas.height = img.height;
          // drawImage(the image itself, when to start from x, hen to start from y)
          ctx.drawImage(img, 0, 0);
          canvas.removeAttribute("data-caman-id");
        };
      });
    }
  },
  false
);

// Filters
document.addEventListener("click", e => {
  if (e.target.classList.contains("filter-btn")) {
    if (e.target.classList.contains("brightness-add")) {
      Caman("#canvas", img, function() {
        this.brightness(5).render();
      });
    } else if (e.target.classList.contains("brightness-remove")) {
      Caman("#canvas", img, function() {
        this.brightness(-5).render();
      });
    } else if (e.target.classList.contains("contrast-add")) {
      Caman("#canvas", img, function() {
        this.contrast(5).render();
      });
    } else if (e.target.classList.contains("contrast-remove")) {
      Caman("#canvas", img, function() {
        this.contrast(-5).render();
      });
    } else if (e.target.classList.contains("saturation-add")) {
      Caman("#canvas", img, function() {
        this.saturation(5).render();
      });
    } else if (e.target.classList.contains("saturation-remove")) {
      Caman("#canvas", img, function() {
        this.saturation(-5).render();
      });
    } else if (e.target.classList.contains("vibrance-add")) {
      Caman("#canvas", img, function() {
        this.vibrance(5).render();
      });
    } else if (e.target.classList.contains("vibrance-remove")) {
      Caman("#canvas", img, function() {
        this.vibrance(-5).render();
      });
    } else if (e.target.classList.contains("add-vintage")) {
      Caman("#canvas", img, function() {
        this.vintage().render();
      });
    } else if (e.target.classList.contains("add-lomo")) {
      Caman("#canvas", img, function() {
        this.lomo().render();
      });
    } else if (e.target.classList.contains("add-clarity")) {
      Caman("#canvas", img, function() {
        this.clarity().render();
      });
    } else if (e.target.classList.contains("add-sinCity")) {
      Caman("#canvas", img, function() {
        this.sinCity().render();
      });
    } else if (e.target.classList.contains("add-pinhole")) {
      Caman("#canvas", img, function() {
        this.pinhole().render();
      });
    } else if (e.target.classList.contains("add-crossProcess")) {
      Caman("#canvas", img, function() {
        this.crossProcess().render();
      });
    } else if (e.target.classList.contains("add-nostalgia")) {
      Caman("#canvas", img, function() {
        this.nostalgia().render();
      });
    } else if (e.target.classList.contains("add-herMajesty")) {
      Caman("#canvas", img, function() {
        this.herMajesty().render();
      });
    }
  }
});

// Remove Filters
revertBtn.addEventListener("click", function() {
  Caman("#canvas", img, function() {
    this.revert();
  });
});

downloadBtn.addEventListener("click", e => {
  [fileName, fileExtension] = getExtension(fileName);

  if (isImage(fileExtension)) {
    fileName += "-edited";
    download(fileName, canvas);
  }
});

function isImage(extension) {
  return extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png" ||
    extension === "svg"
    ? true
    : false;
}

function getExtension(filename) {
  return filename.split(".");
}

function download(filename, canvas) {
  let e;
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/jpeg", 0.8);

  e = new MouseEvent("click");
  link.dispatchEvent(e);
}
