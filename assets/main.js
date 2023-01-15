!(function () {

  // CLOCK TIME
  const time = () => {
    let d = new Date().toLocaleTimeString().split(":");
    return `${d[0]}:${d[1]} ${d[2].split(" ")[1]}`;
  }
  // VARIABLES
  let N = 0; // tracks number of sent messages (for Now show/hide)
  const screen = document.getElementById("screen");
  const sms = document.getElementById("sms-marker");
  const texts = [
    `Hi👋 It's Matt<br>How are you 🤔`,
    `Want to play a game? 🕹️👾🎮`,
    `<span><a href="https://wrdl-with-restful-api.netlify.app/" target="_blank">Wordle<sup>TM</sup> Clone </a></span><br>` +
    `<span><a href="https://minesweeper-clone-jquery.netlify.app/" target="_blank">Minesweeper</a></span><br>` +
    `<span><a href="https://snake-vanilla-js-canvas.netlify.app/" target="_blank">Snake</a> 🔗❔</span>`,
    `Make a <span><a href="https://qr-code-styler.netlify.app/" target="_blank">QR code</a> for your WiFi/Event/etc...?`,
    `Or grab a free <span><a href="https://mlorberdev-generative-art.netlify.app/" target="_blank">digital art masterpiece?</a> Maybe for a background ...`,
    `You can check out these &mdash; and my other work &mdash; on <a href="https://github.com/mlorberdev" target="_blank">Github</a>` +
    ` and <a href="https://codepen.io/mlorberdev" target="_blank">Codepen</a> 😎`,
    `...find me on <a href="https://www.linkedin.com/in/matthew-lorber" target="_blank">LinkedIn</a>...`,
    `...and have a quick look at my <a href="./stats.html" target="_blank">stats</a> page while you're here?`,
    `<a href="mailto:mlorber.dev@gmail.com">Email</a> 🫱‍🫲🏾 me if you'd like to chat!`,
    `Glad you stopped by 💯! Let's get together on something soon!`
  ];
  const replies = [
    `*What's xxxxx again ✨❔✨`,
    `*🎉🎉xxxxx🎉🎉`,
    `*xxxxx seriously 🧊! `,
    `*xxxxx ⭐⭐⭐`,
    `*xxxxx! I'm not really here 😁 I have no idea what you're saying 🤪`
  ];

  // TIMING
  const int = setInterval(message, 6000);

  // TEXTS SENT BY MY AVATAR
  function message() {
    sms.style.display = "block";
    let msg = document.createElement("div");
    let txt = texts[0]; // note: replies get spliced into texts array
    msg.innerHTML = `<svg width="3rem" height="3rem" viewBox="0 0 512 512"><use xlink:href="#avatar" /></svg><span class="txt">${txt}</span>`;
    msg.classList.add("msg", "flex", "row", "xmsg");
    msg.id = `msg${N}`;
    if (txt.charAt(0) === "*") msg.innerHTML = msg.innerHTML.replace("*", "");
    let now = document.createElement("div");
    now.classList.add("now");
    now.id = `now${N}`;
    now.innerHTML = `Now`;
    sms.style.display = "flex";
    texts.splice(0, 1);
    setTimeout(() => {
      sms.style.display = "none";
    }, 3000);
    setTimeout(() => {
      removeNowQuestionMark(); // remove prior timestamp
      N++;
      screen.appendChild(msg);
      screen.appendChild(now);
      br(); // border radius
      screen.scrollTop = screen.scrollHeight;
    }, 3300);
    if (texts.length === 0) {
      clearInterval(int);
      setTimeout(() => document.querySelector(".now:last-of-type").innerHTML = time(), 15000);
    }
  }

  // SPLICE A RESPONSE INTO AVATAR TEXTS ARRAY IN RESPONSE to USER MESSAGE input event
  function reply(x) {
    setTimeout(() => {
      replies.length === 0 ? replies[0] = `*Send me that xxxxx via email`.replace("xxxxx", x) : replies[0] = replies[0].toString().replace("xxxxx", x);
      if (texts.length === 0) setTimeout(message, 2500);
      texts.splice(0, 0, replies[0]);
      replies.splice(0, 1);
    }, 2000);
  }

  // USER MESSAGE input event
  document.getElementById("chat").addEventListener("change", function () {
    let mm = this.value;
    let mms = mm.split(" ")[Math.floor(Math.random() * (mm.split(" ").length))]; // random word from user msg recieved
    let um = document.createElement("div"); // user message
    um.classList.add("user_input_wrap", "flex", "row", "right", "xmsg"); // xmsg tracks how many texts of any type
    um.innerHTML = `<div class="user_input">${mm}</div>`;
    this.value = "";
    let now = document.createElement("div");
    now.classList.add("now", "left");
    now.id = `msg${N}`;
    N++;
    now.innerHTML = `Now`;
    removeNowQuestionMark();
    screen.appendChild(um);
    screen.appendChild(now);
    br();
    reply(mms);
    screen.scrollTop = screen.scrollHeight;
  });

  // BORDER RADIUS MODS
  function br() {
    if (N === 1) return;
    let msgs = document.querySelectorAll(".xmsg");
    if (msgs[N - 2].classList.contains("msg") && msgs[N - 1].classList.contains("msg")) {
      document.querySelector(`#${msgs[N - 2].id} .txt`).style.borderBottomLeftRadius = 0;
      document.querySelector(`#${msgs[N - 1].id} .txt`).style.borderTopLeftRadius = 0;
      document.querySelector(`#${msgs[N - 1].id} > svg`).classList.add("inviz");
    } else if (msgs[N - 2].classList.contains("user_input_wrap") && msgs[N - 1].classList.contains("user_input_wrap")) {
      document.querySelectorAll(`.user_input`)[N - 2].style.borderBottomRightRadius = 0;
      document.querySelectorAll(`.user_input`)[N - 1].style.borderTopRightRadius = 0;
    }
  }

  // ADD SPACE AFTER LONGER PAUSES IN ANIM SEQUENCE
  // function space(n) {
  //   let sp = document.createElement("div");
  //   sp.classList.add("space");
  //   // insert it at end
  // }

  // EMOJIS IN TEXT INPUT
  document.getElementById("icons").addEventListener("click", function () {
    let tar = document.getElementById("emojis");
    tar.style.display === "none" || tar.style.display === "" ? tar.style.display = "grid" : tar.style.display = "none";
  });
  document.querySelectorAll("#emojis div").forEach(e => e.addEventListener("click", function () {
    document.getElementById("chat").value += this.innerText;
  }));

  // TIME
  function setTime() {
    document.getElementById("time").innerHTML = time();
  }
  setTime();
  setInterval(setTime, 60000);

  // HIDE && SHOW TIMESTAMPS
  function removeNowQuestionMark() {
    let allNows = document.querySelectorAll(".now");
    let l = allNows.length;
    if (l > 0) allNows[l - 1].style.display = "none";
  }

})();