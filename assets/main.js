!(function () {

  // setTimeout(() => {
  //   document.getElementById("loader").style.display = "none";
  // },1000);

  // CLOCK TIME
  const time = () => {
    let d = new Date().toLocaleTimeString().split(":");
    return `${d[0]}:${d[1]} ${d[2].split(" ")[1]}`;
  }
  // VARIABLES
  let N = 0; // tracks number of sent messages (for Now show/hide)
  const screen = document.getElementById("screen");
  const txt = document.querySelectorAll(".txt");
  const sms = document.getElementById("sms-marker");
  const texts = [
    `Hi! 👋 It's Matt`,
    `How are you 🤔❔`,
    `Want to play a game? 👾`,
    ` <span><a href="https://wrdl-with-restful-api.netlify.app/">Wordle<sup>TM</sup> Clone</a>` +
    `🔗</span><span><a href="https://minesweeper-clone-jquery.netlify.app/">Minesweeper</a> 🔗</span>` +
    `<span><a href="https://snake-vanilla-js-canvas.netlify.app/">Snake</a> 🔗❔</span>`,
    `Make a <span><a href="https://qr-code-styler.netlify.app/">QR code</a> 🔗 for your WiFi/Event/etc...?`,
    `Or grab a free <span><a href="https://mlorberdev-generative-art.netlify.app/">digital art masterpiece?</a> 🔗 Maybe for a background ...`,
    `actually, try <a href="https://particles-background.netlify.app/">this experiment</a> for bgs...🕶️`,
    `You can check out these and my other work on <a href="https://github.com/mlorberdev">Github</a> 😎` +
    ` and <a href="https://codepen.io/mlorberdev">Codepen</a> 🕶️`,
    `...find me on <a href="https://www.linkedin.com/in/matthew-lorber">LinkedIn</a>`,
    `Have a quick look at my <a href="./stats.html">stats</a> page while you're here?`,
    `<a href="mailto:mlorber.dev@gmail.com">Email</a> 🫱‍🫲🏾 me if you'd like to chat!`,
    `Glad you stopped by👍!! Let's get together soon! 💯`
  ];
  const replies = [
    `*What's a xxxxx? Is that like a 🧌❔`,
    `*xxxxx 🎉`,
    `*xxxxx seriously❔`,
    `*xxxxx's ⭐⭐⭐`,
    `*xxxxx! I'm not really an AI 😁 I have no idea what you're saying 🤪`,
    `*<a href="https://loveyouineke.netlify.app/">Game of Life</a>`
  ];

  // TIMING FUNCTION
  const int = setInterval(() => {
    message();
    if (texts.length === 0) {
      sms.style.display = "none";
      clearInterval(int);
      setTimeout(() => document.querySelectorAll(".now:last-of-type").innerHTML = time(), 5000);
    }
  }, 3000);

  // TEXTS SENT BY MY AVATAR
  function message() {
    let msg = document.createElement("div");
    let txt = texts[0]; // note: replies get spliced into texts array
    msg.innerHTML = `<svg width="3rem" height="3rem" viewBox="0 0 512 512"><use xlink:href="#avatar" /></svg><span class="txt">${txt}</span>`;
    msg.classList.add("msg", "flex", "row");
    msg.id = `msg${N}`;
    msg.addEventListener("click", toggleNow);
    if (txt.charAt(0) === "*") msg.innerHTML = msg.innerHTML.replace("*", "");
    let now = document.createElement("div");
    now.classList.add("now");
    now.id = `now${N}`;
    N++;
    now.innerHTML = `Now`;
    sms.style.display = "flex";
    texts.splice(0, 1);
    screen.appendChild(msg);
    screen.appendChild(now);
    removeNowQuestionMark();
    // screen.scrollTop = screen.scrollHeight;
    // setTimeout(() => {
    //   sms.style.display = "none";
    //   setTimeout(() => {
    //     screen.append(msg);
    //     screen.append(now);
    //     screen.scrollTop = screen.scrollHeight;
    //     if (texts.length > 0) {
    //       document.querySelectorAll(".now:last-of-type")[0].style.display = "none";
    //     }
    //     screen.scrollTop = screen.scrollHeight;
    //     setTimeout(() => now.style.visibility = "visible", 1000);
    //   }, 500);
    //   setTimeout(() => { now.innerHTML = time() }, 10000);
    // }, 2200);
  }

  // SPLICE A RESPONSE INTO AVATAR TEXTS ARRAY IN RESPONSE to USER MESSAGE input event
  function reply(x) {
    setTimeout(() => {
      replies[0] = replies[0].toString().replace("xxxxx", x)
      texts.splice(0, 0, replies[0]);
      replies.splice(0, 1);
    }, 2000);
  }

  // USER MESSAGE input event
  let numUserMessages = 0;
  // let sendPrompt;
  document.getElementById("chat").addEventListener("change", function () {
    numUserMessages++; // if user doesn't respond after a number of messages, send a prompt
    console.log(numUserMessages);


    // prompt logic here (ie if numusermessages is still zero, then...)

    // splice new message in
    // possibly type it into field
    // this could get crazy...

    let mm = this.value;
    let mms = mm.split(" ")[Math.floor(Math.random() * (mm.split(" ").length))]; // random word from user msg recieved
    let um = document.createElement("div"); // user message
    um.classList.add("user_input_wrap", "flex", "row", "right");
    um.innerHTML = `<div class="user_input">${mm}</div>`;
    this.value = "";

    let now = document.createElement("div");
    now.classList.add("now", "left");
    now.id = `now${N}`;
    N++;
    now.innerHTML = `Now`;
    screen.appendChild(um);
    screen.appendChild(now);
    removeNowQuestionMark();
    // screen.scrollIntoView(um);
    reply(mms);
    // screen.scrollTop = screen.scrollHeight;
  });

  // BORDER RADIUS MODS
  function br(i, j) {
    console.log(i, j);
    txt[i - 2].style.borderBottomLeftRadius = 0;
    txt[i - 1].style.borderTopLeftRadius = 0;
    if (j) txt[i - 1].style.borderTopLeftRadius = 0;
  }

  // HIDING AVATAR but KEEP FOR SPACING
  function ha(i) {
    document.querySelector(`.msg:nth-of-type(${i}) svg`).style.visibility = "hidden";
  }

  // ADD SPACE AFTER LONGER PAUSES IN ANIM SEQUENCE
  function space(n) {
    let sp = document.createElement("div");
    sp.classList.add("space");
    // insert it at end
  }

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

  // SCROLL STATE
  const down = document.getElementById("screen");
  void function upDown() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log("int");
        }
      });
    }, { threshold: 1 });
    observer.observe(down);
  }();


  // // ANIMATION RUN/PAUSE USING INTERSECTION OBSERVER
  // void function pauseAnim() {
  //   const observer = new IntersectionObserver(entries => {
  //     entries.forEach(entry => entry.target.style.animationPlayState = entry.isIntersecting ? "running" : "paused");
  //   }, { threshold: 1 });
  //   observer.observe(down)
  // cows.forEach(cow => observer.observe(cow));
  // }();

  // HIDE && SHOW TIMESTAMPS
  function removeNowQuestionMark() {
    let allNows = document.querySelectorAll(".now");
    let l = allNows.length - 1;
    if (l > 0) allNows[l - 1].style.display = "none";
  }
  function toggleNow() {
    document.getElementById(`now${this.id.toString().split("g")[1]}`).classList.toggle("hide");
  }

})();