!(function () {

  // CLOCK TIME
  const time = () => {
    let d = new Date().toLocaleTimeString().split(":");
    return `${d[0]}:${d[1]} ${d[2].split(" ")[1]}`;
  }
  // VARIABLES
  let N = 0; // tracks number of sent messages (for Now show/hide)
  const screen = document.getElementById("screen"); // scrolling element
  const mms = document.getElementById("mms-marker"); // dots showing "texting"
  // texts send on a setInterval,
  // on each interval, index 0 is sent then spliced out of array
  // replies to input (from replies array) get spliced into index 0 in texts array to send on next int
  const texts = [
    `Hi👋 It's Matt<br>How are you 🤔`,
    `Want to play a game? 🕹️👾🎮`,
    `<span><a href="https://wrdl-with-restful-api.netlify.app/" target="_blank">Wordle<sup>TM</sup> Clone </a></span><br>` +
    `<span><a href="https://minesweeper-clone-jquery.netlify.app/" target="_blank">Minesweeper</a></span><br>` +
    `<span><a href="https://snake-vanilla-js-canvas.netlify.app/" target="_blank">Snake</a> 🔗❔</span>`,
    `Make a <span><a href="https://qr-code-styler.netlify.app/" target="_blank">QR code</a> for your WiFi/Event/etc...?`,
    `Or grab a free <span><a href="https://mlorberdev-generative-art.netlify.app/" target="_blank">digital art masterpiece?</a> Maybe for a background ...`,
    `You can check out these - and my other work - on <a href="https://github.com/mlorberdev" target="_blank">Github</a>` +
    ` and <a href="https://codepen.io/mlorberdev" target="_blank">Codepen</a> 😎`,
    `...find me on <a href="https://www.linkedin.com/in/matthew-lorber" target="_blank">LinkedIn</a>...`,
    `...and have a quick look at my <a href="./stats.html" target="_blank">stats</a> page while you're here?`,
    `Need a simple static site or a dynamic web app,`,
    `built on React Native, count on me!`,
    `<a href="mailto:mlorber.dev@gmail.com">Email</a> 🫱‍🫲🏾 me if you'd like to chat!`,
    `Glad you stopped by 💯! Let's get together on something soon!`
  ];
  // replies to user input
  // each is spliced into texts array for send on next int, then is spliced out of replies
  // if replies.length is 0, sends the same reply to all subsequent user inputs (below)
  const replies = [
    `*xxxxx! 😁 I have no idea what you're saying 🤪`,
    `*✨xxxxx✨`,
    `*🎉🎉xxxxx🎉🎉`,
    `*xxxxx seriously 🧊 `,
    `*xxxxx ⭐⭐⭐`,
  ];

  // TIMING (sends all avatar messages; this is the timer between message sends)
  const int = setInterval(message, 5000);

  // TEXTS SENT BY MY AVATAR
  function message() {
    mms.style.display = "flex"; // shows the texting now dots
    let msg = document.createElement("div"); // create new message from texts arr
    let txt = texts[0]; // note: replies get spliced into texts array
    msg.innerHTML = `<svg width="3rem" height="3rem" viewBox="0 0 512 512"><use xlink:href="#avatar" /></svg><span class="txt">${txt}</span>`;
    msg.classList.add("msg", "flex", "row", "xmsg"); // xmsg tracks how many total msgs sent of any type; is applied to all msgs in window at any time
    msg.id = `msg${N}`; // available for targeting
    if (txt.charAt(0) === "*") msg.innerHTML = msg.innerHTML.replace("*", ""); // asterisk marks this as a reply to user input, replacing xxxxx with word from their input
    let now = document.createElement("div"); // timestamp for messages
    now.classList.add("now");
    now.id = `now${N}`;
    now.innerHTML = `Now`;
    texts.splice(0, 1); // remove this msg from texts arr
    setTimeout(() => {
      mms.style.display = "none"; // hides mms indicator
    }, 3000); // timer for mms hide (const int - this value = down time between last sent text and start typing next indicator )
    setTimeout(() => {
      removeNowQuestionMark(); // remove prior timestamp
      N++; // used for ids and tracking without using querySelectorAll (note: this should be reevaluated for redundancy)
      screen.appendChild(msg);
      screen.appendChild(now);
      br(); // border radius adjustment and hide avatar image
      screen.scrollTop = screen.scrollHeight; // scroll screen element to new message
    }, 3230); // difference between this timeout and its parent creates a pause between mms indicator and message appearance in screen
    if (texts.length === 0) {
      clearInterval(int); // stop setInterval from trying to send messages
      setTimeout(() => document.querySelector(".now:last-of-type").innerHTML = time(), 15000); // only last timestamp gets updated with time
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
    let mm = this.value; // user input
    let mms = mm.split(" ")[Math.floor(Math.random() * (mm.split(" ").length))]; // random word from user msg recieved
    let um = document.createElement("div"); // user message
    um.classList.add("user_input_wrap", "flex", "row", "right", "xmsg"); // xmsg tracks how many texts of any type
    um.innerHTML = `<div class="user_input">${mm}</div>`;
    this.value = ""; // reset user input element value
    let now = document.createElement("div");
    now.classList.add("now", "left"); // positioning
    now.id = `msg${N}`; // id
    N++; // sets id numbers and is also used for tracking without using querySelectorAll
    now.innerHTML = `Now`;
    removeNowQuestionMark(); // will remove the timestamp from the prior message
    screen.appendChild(um);
    screen.appendChild(now);
    br(); // border radiusing
    reply(mms); // passed user input value to user in reply
    screen.scrollTop = screen.scrollHeight; // scroll new message into view on screen
  });

  // BORDER RADIUS MODS
  function br() {
    if (N === 1) return; // do not modify border on first message sent
    let msgs = document.querySelectorAll(".xmsg"); // all messages of any type get this class
    // following is for an avatar message following another avatar msg (versus following a user input)
    if (msgs[N - 2].classList.contains("msg") && msgs[N - 1].classList.contains("msg")) {
      document.querySelector(`#${msgs[N - 2].id} .txt`).style.borderBottomLeftRadius = 0;
      document.querySelector(`#${msgs[N - 1].id} .txt`).style.borderTopLeftRadius = 0;
      document.querySelector(`#${msgs[N - 1].id} > svg`).classList.add("inviz");
      // following is for a user input message following another of same type
    } else if (msgs[N - 2].classList.contains("user_input_wrap") && msgs[N - 1].classList.contains("user_input_wrap")) {
      document.querySelectorAll(`.user_input`)[N - 2].style.borderBottomRightRadius = 0;
      document.querySelectorAll(`.user_input`)[N - 1].style.borderTopRightRadius = 0;
    }
  }

  // ADD SPACE AFTER LONGER PAUSES IN ANIM SEQUENCE
  // note: not used in current timing scheme; may revisit later
  // function space(n) {
  //   let sp = document.createElement("div");
  //   sp.classList.add("space");
  //   // insert it at end
  // }

  // EMOJIS IN TEXT INPUT ELEMENT opens and closes modal for adding emojis to user input field
  // In future update, consider extending this to reactions to messages
  document.getElementById("icons").addEventListener("click", function () {
    let tar = document.getElementById("emojis"); // container element
    tar.style.display === "none" || tar.style.display === "" ? tar.style.display = "grid" : tar.style.display = "none"; // hide and show
  });
  document.querySelectorAll("#emojis div").forEach(e => e.addEventListener("click", function () {
    document.getElementById("chat").value += this.innerText; // adds to text input on click
  }));

  // TIME in top-right corner of display, emulates a clock
  function setTime() {
    document.getElementById("time").innerHTML = time();
  }
  setTime();
  setInterval(setTime, 60000); // update once per minute from load time forward

  // HIDE TIMESTAMPS with each new message, hide the prior timestamp
  function removeNowQuestionMark() {
    let allNows = document.querySelectorAll(".now");
    let l = allNows.length;
    if (l > 0) allNows[l - 1].style.display = "none";
  }

})();