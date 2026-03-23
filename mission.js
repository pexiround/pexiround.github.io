const missionContent = document.getElementById('mission-content');

const missionText = `
[OPERATION: BLACKOUT]
Target Domain: auth.domain-secure.net
Objective: Inject malware and slow server
`;

function typeMission(text, element) {
  let i = 0;
  function type() {
    if(i < text.length) {
      element.innerHTML += text[i++];
      setTimeout(type, 30);
    }
  }
  type();
}

typeMission(missionText, missionContent);
