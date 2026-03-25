function openApp(id) {
  document.getElementById(id).style.display = "flex";
}

function closeApp(id) {
  document.getElementById(id).style.display = "none";
}

/* Drag */
document.querySelectorAll(".window").forEach(win => {
  const bar = win.querySelector(".title-bar");
  bar.onmousedown = e => {
    let x = e.clientX - win.offsetLeft;
    let y = e.clientY - win.offsetTop;

    function move(e) {
      win.style.left = e.clientX - x + "px";
      win.style.top = e.clientY - y + "px";
    }

    document.addEventListener("mousemove", move);
    document.onmouseup = () => {
      document.removeEventListener("mousemove", move);
    };
  };
});

/* Terminal */
const input = document.getElementById("terminal-input");
const output = document.getElementById("terminal-output");

function print(t){ output.innerHTML += t + "<br>"; }

input.addEventListener("keydown", e=>{
  if(e.key==="Enter"){
    run(input.value);
    input.value="";
  }
});

function run(cmd){
  if(cmd.startsWith("scan")) print("Endpoints: /login /api");
  else if(cmd.startsWith("inject")) print("Injected payload...");
  else print("Unknown command");
}

/* Cheat Sheet */
document.getElementById("cheatsheet-content").innerHTML = `
<ul>
<li>scan [domain]</li>
<li>inject [endpoint]</li>
<li>bruteforce [endpoint]</li>
</ul>
`;

/* Clock */
setInterval(()=>{
  document.getElementById("clock").innerText =
    new Date().toLocaleTimeString();
},1000);
