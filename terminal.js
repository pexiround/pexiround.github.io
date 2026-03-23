const terminalInput = document.getElementById('terminal-input');
const terminalOutput = document.getElementById('terminal-output');

const commands = ["scan", "probe", "bruteforce", "inject", "view_logs", "firewall", "patch"];

function addOutput(text) {
  terminalOutput.innerHTML += text + "\n";
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalInput.addEventListener('keydown', function(e) {
  if(e.key === "Enter") {
    const input = terminalInput.value.trim();
    terminalInput.value = "";
    parseCommand(input);
  }
});

function parseCommand(input) {
  const args = input.split(" ");
  const cmd = args[0];

  switch(cmd) {
    case "scan":
      addOutput("Found endpoints: /login, /api, /admin");
      break;
    case "probe":
      addOutput(`${args[1] || ''} seems vulnerable to SQL injection`);
      break;
    case "bruteforce":
      addOutput(`Bruteforce on ${args[1] || ''} in progress...`);
      addOutput("Success! Access granted");
      break;
    case "inject":
      addOutput(`${args[1] || ''} injected with malware!`);
      break;
    case "view_logs":
      addOutput("[INFO] POST /login returned 500 error");
      break;
    case "firewall":
      addOutput(`Firewall ${args[1] || 'status unknown'}`);
      break;
    case "patch":
      addOutput(`${args[1] || 'endpoint'} patched`);
      break;
    default:
      addOutput("Command not found");
  }
}
