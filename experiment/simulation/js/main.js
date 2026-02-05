function openProcedure() {
  document.getElementById("procedure").style.display = "flex";
}

function closeProcedure() {
  document.getElementById("procedure").style.display = "none";
}

function resetExperiment() {
  window.location.reload();
}

// ---------------------------------------------
// VARIABLES (CLEANED â€” graph removed)
// ---------------------------------------------
const CONTACT_Y = 60; 
const POINTER_DOWN_MS = 1800;
const POINTER_UP_MS = 1200;
let pointerState = "up"; 
let animPhase = "idle";
let holdTime = 0;
let appliedForce = 0;

let marker = 0;
let dis2dbtn = document.querySelector('#dis2d');
let indentbtn = document.querySelector('#indent');
let dis3btn = document.querySelector("#display3d");
let formulabtn = document.querySelector('#formula');
let tableobs = document.querySelector('.parameter-block');
let crackdiv= document.querySelector('.crack');
let topviewbtn = document.querySelector('#topviewbtn');
let topindentbtn = document.querySelector('#topindentbtn');
tableobs.style.display ='none';

let btnarray = [dis2dbtn, indentbtn, topviewbtn ,topindentbtn,dis3btn,formulabtn ,];
btnarray.forEach(el => el.style.display = 'none');

let heading = document.getElementById('heading');
let svgContainer = document.querySelector('.svg-container');
let pointer = document.querySelector('.pointer');

// ---------------------------------------------
// 2D VIEW
// ---------------------------------------------
function display2d() {
  heading.innerText = '2D view';

  // Show next button after delay
  setTimeout(() => {
      btnarray[marker].style.display='block';
      marker++;
  }, 2000);

  svgContainer.innerHTML = `
    <div class="svg-base">
      <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080">
        <image id='baseimage' width="1606" height="823"
          transform="translate(166.5 147)" 
          data-text="Material : metals, ceramics, polymers, composites, and biological tissues"
          xlink:href="base1-1.png"/>
      </svg>
    </div>

    <div class="pointer">
      <svg viewBox="0 0 1920 1080">
        <g>
          <image width="513" height="413" transform="translate(764.4 149)" 
            data-text="Berkovich tip" xlink:href="pointer-1.png"/>
          <image width="512" height="123" transform="translate(764.9 27.9)"
            data-text="Berkovich tip" xlink:href="pointer-2.png"/>
        </g>
      </svg>
    </div>
    <div class=crack>
    <h1>This is Top-view</h1>
    <div class="img">
       <img id="frameImg" src="./frame/F9.png" alt="image">
    </div>
  `;

  // Tooltip logic stays
  setTimeout(() => {
    const imgs = svgContainer.querySelectorAll("svg image");
    const infoBox = document.getElementById("infoBox");

    imgs.forEach(img => {
      img.addEventListener("mouseenter", () => {
        infoBox.style.display = "block";
        infoBox.textContent = img.getAttribute("data-text");
      });
      img.addEventListener("mouseleave", () => infoBox.style.display = "none");
    });
  }, 50);
  setTimeout(() => {
  document.querySelector('.crack').style.display = 'none';
}, 0);

}

// ---------------------------------------------
// 3D VIEW
// ---------------------------------------------
function display3d() {
  heading.innerText = "3-Dimensional view";

  svgContainer.style.transition = "1s ease all";

  setTimeout(() => {
    svgContainer.innerHTML = `
      <div class="display3dview">
        <svg viewBox="0 0 612 792" class="responsive-svg">
          <g>
            <image width="1591" height="1555"
              transform="translate(115.1 276.7) scale(.2)"
              xlink:href="nano indentation-1.png"/>
            <image width="629" height="984"
              transform="translate(201.4 172.9) scale(.2)"
              data-text ="Material:metals, ceramics, polymers, composites, and biological tissues"
              xlink:href="nano indentation-2.png"/>
            <image width="469" height="1184"
              transform="translate(196.5 181.9) scale(.2)"
              data-text ="Material:metals, ceramics, polymers, composites, and biological tissues"
              xlink:href="nano indentation-3.png"/>
          </g>
        </svg>
      </div>
          <div class=crack>
    <h1>This is Top-view</h1>
    <div class="img">
       <img id="frameImg" src="./frame/F1.png" alt="image">
    </div>
    `;
  }, 1500);

  // Display next button
  btnarray[marker].style.display='block';
  marker++;
}

// ---------------------------------------------
// FORMULA POPUP
// ---------------------------------------------
function showformula() {
  document.getElementById("formulaModal").style.display = "flex";
}

function closeFormula() {
  document.getElementById("formulaModal").style.display = "none";
}

// ---------------------------------------------
// INPUT PANEL
// ---------------------------------------------
function textar() {
  document.getElementById("indentPanel").style.display = "block";
}

const forceInput = document.getElementById("forceInput");
const timeInput = document.getElementById("timeInput");
const submitBtn = document.getElementById("submitIndent");

// Validate
function validateInputs() {
  const f = parseFloat(forceInput.value);
  const t = parseFloat(timeInput.value);

  submitBtn.disabled = !(f >= 0.1 && f <= 10 && t >= 0);
}

// Submit â€” NO GRAPH TRIGGER
function submitIndent() {
  holdTime = parseFloat(timeInput.value);
  appliedForce = parseFloat(forceInput.value);

  submitBtn.disabled = true;

  tableobs.style.display = 'block';
  btnarray[marker].style.display = 'block';
  marker++;

  console.log("Force:", appliedForce, "mN");
  console.log("Hold Time:", holdTime, "s");
}

forceInput.addEventListener("input", validateInputs);
timeInput.addEventListener("input", validateInputs);

// STARTUP POPUP LOGIC
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("startupOverlay");
  const form = document.getElementById("startupForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const choice = document.querySelector('input[name="choice"]:checked').value;
    if (choice === "youtube") {
      window.open("https://virtual-labs.github.io/exp-micro-scratching-iitk/", "_blank");
    }
    overlay.style.display = "none";
  });
});

















function movedown() {
  const pointer = document.querySelector(".pointer");
  if (!pointer) return;

  pointerState = "touching";

  // Move pointer down to contact point
  pointer.style.transition = `transform ${POINTER_DOWN_MS / 1000}s linear`;
  pointer.style.transform = `translateY(${CONTACT_Y}px)`;

  // After reaching bottom
  setTimeout(() => {

    console.log("Pointer reached the surface. Starting hold...");

    // Change material image AFTER pointer fully goes down
    const img = document.getElementById("baseimage");
    if (img) {
      const newSrc = "./base2-1.png";
      img.setAttribute("href", newSrc);
      img.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", newSrc);
    }

    // Start crack frames when the indenter touches the sample
    const crackDuration = holdTime > 0 ? holdTime * 1000 : undefined;
    startFrameAnimationOnce({ durationMs: crackDuration, showNextButton: false });

    // HOLD FOR GIVEN holdTime
    setTimeout(() => {

      console.log("Holding finished. Pointer going up...");

      // Now pointer goes up automatically
      autoMovePointerUp();

    }, holdTime * 1000); // â³ HOLD HERE

  }, POINTER_DOWN_MS);
}






function autoMovePointerUp() {
  const pointer = document.querySelector('.pointer');
  if (!pointer) return;

  // Show next button
  btnarray[marker].style.display='block';
  marker++;

  // Move pointer UP
  pointer.style.transition = `transform ${POINTER_UP_MS / 1000}s linear`;
  pointer.style.transform = "translateY(0px)";

  // Keep crack image at the final frame AFTER pointer fully goes up
  setTimeout(() => {
    const crackImg = document.getElementById("frameImg");
    if (crackImg && frames.length > 0) {
      crackImg.src = frames[frames.length - 1];
    }

    console.log("Pointer returned to start.");
  }, POINTER_UP_MS);
}
function crack() {
  const crackdiv = document.querySelector('.crack');
  if (!crackdiv) {
    console.error("Run 2D view first");
    return;
  }
  setTimeout(() => {
      btnarray[marker].style.display='block';
      marker++;
  }, 2000);
  crackdiv.style.display = 'block';
   // âœ… image exists now
}


// ðŸ” Frame images (same folder)
// Frames in order (one-time play)
const frames = [
  "./frame/f1.png",
  "./frame/f2.png",
  "./frame/f3.png",
  "./frame/f4.png",
  "./frame/f5.png",
  "./frame/f6.png",
  "./frame/f7.png",
  "./frame/f8.png",
  "./frame/f9.png"
];

// Speed control (fallback when no duration is provided)
const frameSpeed = 400; // ms per frame
let frameTimer = null;

function startFrameAnimationOnce(options = {}) {
  const img = document.getElementById("frameImg");
  if (!img) return;

  const { durationMs, showNextButton = true } = options;

  const crackdiv = document.querySelector(".crack");
  if (crackdiv) {
    crackdiv.style.display = "block";
  }

  const totalDuration =
    typeof durationMs === "number" && durationMs > 0
      ? durationMs
      : frames.length * frameSpeed;

  const steps = Math.max(frames.length - 1, 1);
  const intervalMs = Math.max(50, Math.floor(totalDuration / steps));

  if (frameTimer) {
    clearInterval(frameTimer);
    frameTimer = null;
  }

  // Preload images (NO flicker)
  frames.forEach(src => {
    const i = new Image();
    i.src = src;
  });

  let index = 0;
  img.src = frames[index];
  index++;

  frameTimer = setInterval(() => {
    img.src = frames[index];
    index++;

    // STOP at last frame
    if (index >= frames.length) {
      clearInterval(frameTimer);
      frameTimer = null;
    }
  }, intervalMs);

  if (showNextButton) {
    setTimeout(() => {
      btnarray[marker].style.display = 'block';
      marker++;
    }, Math.max(totalDuration, 2000));
  }
}

