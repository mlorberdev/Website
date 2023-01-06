!(function () {
console.log(new Date().getMinutes())
  const minutes = () => { return new Date().getMinutes() < 10 ? "0" + new Date().getMinutes() : new Date().getMinutes(); }
  const mer = () => { return new Date().toLocaleTimeString().split(" ")[1]; };
  const txt = document.querySelectorAll(".txt");
  const sms = document.getElementById("sms-marker");
  const sms_delay = 1200;
  let delay = 0;
  let N = 0;
  const texts = [
    `Hi! 👋 It's Matt`,
    `How are you 🤔❔`,
    `Want to play a game? 👾`,
    ` <span><a href="https://wrdl-with-restful-api.netlify.app/" target="_blank">Wordle<sup>TM</sup> Clone</a>` +
    `🔗</span><span><a href="https://minesweeper-clone-jquery.netlify.app/" target="_blank">Minesweeper</a> 🔗</span>` +
    `<span><a href="https://snake-vanilla-js-canvas.netlify.app/" target="_blank">Snake</a> 🔗❔</span>`,
    `Make a <span><a href="https://qr-code-styler.netlify.app/" target="_blank">QR code</a> 🔗 for your WiFi/Event/etc...?`,
    `Or grab a free <span><a href="https://mlorberdev-generative-art.netlify.app/" target="_blank">digital art masterpiece?</a> 🔗 Maybe for a background ...`,
    `You can check out these and my other work on <a href="https://github.com/mlorberdev" target="_blank">Github</a> 😎`,
    `and <a href="https://codepen.io/mlorberdev" target="_blank">Codepen</a> 🕶️`,
    `Or find me on <a href="https://www.linkedin.com/in/matthew-lorber" target="_blank">LinkedIn</a>`,
    `You can also <a href="mailto:mlorber.dev@gmail.com">email</a> me 🫱‍🫲🏾`,
    `I'm glad you stopped by👍!! Take care!💯`
  ];
  let text;
  
  // TIMING FUNCTION
  const int = setInterval(() => { newText(N); }, 2000);

  function newText(i) {
    // IF I == SOME NUMVER OF TEXTS, ADD A DIV WITH CLASS .space
    N++;
    message(i);
    // switch (i) {
    //   case 0: message(i); break;
    //   case 1: message(i); ha(i); br(i); break;
    //   case 2: message(i); ha(i); br(i, i); break;
    //   case 3: if (delay < 4) { delay++; return; } else { message(i); space(0); break; }
    //   case 4: message(i); ha(i); br(i); break;
    //   case 5: message(i); ha(i); br(i); break;
    //   case 6: message(i); ha(i); br(i); break;
    //   case 7: if (delay < 7) { delay++; return; } else { message(i); space(1); break; }
    //   case 8: message(i); ha(i); br(i); break;
    //   case 9: message(i); ha(i); br(i); break;
    //   case 10: message(i); ha(i); br(i); break;
    //   case 11: if (delay < 15) { delay++; return; } else { message(i); space(2); break; }
    //   default: break;
    // }
  }

  // newText(0);

  // MY TEMPLATED MESSAGES sends message from me
  function message(i) {
    let screen = document.getElementById("screen");
    let template = `<svg width="3rem" height="3rem" viewBox="0 0 512 512"><use xlink:href="#avatar" /></svg>` +
      `<span class="txt">${texts[i]}</span></div>`;
    let mmm = document.createElement("div");
    mmm.classList.add("msg", "flex", "row");
    mmm.innerHTML = template;
    sms.style.display = "flex";
    if (i < 11) {
      setTimeout(() => {
        screen.appendChild(mmm);
        screen.scrollTop = screen.scrollHeight;
        sms.style.display = "none";
      }, sms_delay);
    }
    else {
      clearInterval(int);
      let now = document.createElement("div");
      now.id = "now";
      now.innerHTML = `Now`;
      screen.appendChild(now);
      screen.scrollTop = screen.scrollHeight;
      sms.style.display = "none";
      setTimeout(() => { document.getElementById("now").innerHTML = `${new Date().getHours()%12}:${minutes()} ${mer()}`}, 10000);
    }
  }

  // INPUT EVENT send message back from "me"
  let R = -1; // counter for what reply to send to user
  document.getElementById("chat").addEventListener("change", function () {

    let mm = this.value;
    let thisMsg = document.createElement("div");
    thisMsg.classList.add("user_input");
    thisMsg.innerHTML = `<span>${mm}</span>`;
    let msgs = document.querySelectorAll(".msg.sent").length;

    setTimeout(() => {
      let mms = mm.split(" ")[Math.floor(Math.random() * (mm.split(" ").length))]; // random word from user msg recieved

      const replies = [
        `What's a ${mms}? Is that like a 🧌?`,
        `A ${mms} 🎉`,
        `🤪 ${mms} seriously?`,
        `${mms}'s ⭐⭐⭐`,
        `Sorry! I'm not really an AI 😁 I have no idea what you're saying 🤪`
      ];

      R < replies.length ? R++ : R = 0; // cycle back to initial reply
      let reply = document.createElement("div"); // new reply  
      reply.classList.add("repl");
      reply.innerHTML = `<svg width="3rem" height="3rem" viewBox="0 0 512 512"><use xlink:href="#avatar" />` +
        `</svg><span class="reply">${replies[R]}</span>`;
      // QUERY SENT LENGTH HERE
      // MAKE SURE EACH SENT FROM EITHER STREAM HAS A .sent CLASS
      // ATTACH MESSAGE TO DIV LENGTH FROM QUERY

      msg[snt.length].after(reply);
    }, 1000);

    this.value = ""; // clear input text

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
    document.querySelectorAll(`.msg svg`)[i-1].style.visibility = "hidden";
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
    document.getElementById("time").innerHTML = `${new Date().getHours()%12}:${minutes()}`;
  }
  setTime();
  setInterval(setTime, 60000);

})();