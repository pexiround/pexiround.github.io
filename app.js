// Open / Close
function openApp(id) {
  const el = document.getElementById(id);
  el.style.display = "flex";
}

function closeApp(id) {
  document.getElementById(id).style.display = "none";
}

// Dragging
document.querySelectorAll(".window").forEach(win => {
  const bar = win.querySelector(".title-bar");

  bar.onmousedown = e => {
    let shiftX = e.clientX - win.offsetLeft;
    let shiftY = e.clientY - win.offsetTop;

    function move(e) {
      win.style.left = e.clientX - shiftX + "px";
      win.style.top = e.clientY - shiftY + "px";
    }

    document.addEventListener("mousemove", move);

    document.onmouseup = () => {
      document.removeEventListener("mousemove", move);
      document.onmouseup = null;
    };
  };
});

// Terminal
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

function print(text) {
  output.innerHTML += text + "<br>";
  output.scrollTop = output.scrollHeight;
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value;
    input.value = "";
    runCommand(cmd);
  }
});

function runCommand(cmd) {
  const args = cmd.split(" ");

  switch(args[0]) {
    case "scan":
      print("Found: /login, /api");
      break;
    case "bruteforce":
      print("Attempting login...");
      print("Success!");
      break;
    case "inject":
      print("Payload injected. Server slowing...");
      break;
    default:
      print("Unknown command");
  }
}

// Cheat Sheet
document.getElementById("cheatsheet-content").innerHTML = `
<ul>
<li>scan [domain]</li>
<li>bruteforce [endpoint]</li>
<li>inject [endpoint]</li>
</ul>
`;

// Mission
const missionText = "[MISSION]\nTarget: auth.domain-secure.net\nGoal: Inject malware";
let i = 0;
function type() {
  if(i < missionText.length){
    document.getElementById("mission-content").innerHTML += missionText[i++];
    setTimeout(type, 20);
  }
}
type();

// Clock
function updateClock() {
  document.getElementById("clock").innerText = new Date().toLocaleTimeString();
}
setInterval(updateClock, 1000);
