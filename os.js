// Open a window
function openApp(appId) {
  const app = document.getElementById(appId);
  if(app.style.display === "block") return;
  app.style.display = "block";
}

// Draggable windows
const windows = document.querySelectorAll('.window');
windows.forEach(win => {
  const titleBar = win.querySelector('.title-bar');
  titleBar.onmousedown = function(event) {
    let shiftX = event.clientX - win.getBoundingClientRect().left;
    let shiftY = event.clientY - win.getBoundingClientRect().top;

    win.style.position = 'absolute';
    win.style.zIndex = 1000;
    document.body.append(win);

    function moveAt(pageX, pageY) {
      win.style.left = pageX - shiftX + 'px';
      win.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    win.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      win.onmouseup = null;
    };
  };
  titleBar.ondragstart = function() { return false; };
});
