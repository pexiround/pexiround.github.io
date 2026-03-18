// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBtEl_SVtmkl6ET9-KdPRQLtkgmkUGUnEE",
  authDomain: "dont-click-game.firebaseapp.com",
  databaseURL: "https://dont-click-game-default-rtdb.firebaseio.com",
  projectId: "dont-click-game",
  storageBucket: "dont-click-game.firebasestorage.app",
  messagingSenderId: "1037342182323",
  appId: "1:1037342182323:web:0e858ab445886ff23ad9c6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Elements
const btn = document.getElementById("btn");
const timerEl = document.getElementById("timer");
const recordEl = document.getElementById("record");
const lastEl = document.getElementById("last");

// Random username
let username = "Player" + Math.floor(Math.random() * 10000);

// Initialize game if empty
db.ref("/game").once("value", snap => {
    if (!snap.exists()) {
        db.ref("/game").set({
            startTime: Date.now(),
            record: 0,
            lastClick: "nobody"
        });
    }
});

// Live updates
db.ref("/game").on("value", snap => {
    const data = snap.val();
    if (!data) return;

    const now = Date.now();
    const seconds = Math.floor((now - data.startTime) / 1000);

    timerEl.innerText = "Time survived: " + seconds + "s";
    recordEl.innerText = "Record: " + data.record + "s";
    lastEl.innerText = "Last click: " + data.lastClick;
});

// Timer refresh every second
setInterval(() => {
    db.ref("/game").once("value", snap => {
        const data = snap.val();
        if (!data) return;
        const now = Date.now();
        const seconds = Math.floor((now - data.startTime) / 1000);
        timerEl.innerText = "Time survived: " + seconds + "s";
    });
}, 1000);

// Click handler
btn.onclick = () => {
    db.ref("/game").once("value", snap => {
        const data = snap.val();
        if (!data) return;

        const now = Date.now();
        const survived = Math.floor((now - data.startTime) / 1000);

        let newRecord = data.record;
        if (survived > data.record) newRecord = survived;

        db.ref("/game").set({
            startTime: now,
            record: newRecord,
            lastClick: username
        });

        alert("💀 YOU RUINED IT");
    });
};
