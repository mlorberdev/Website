!(function () {
  const txt = document.querySelectorAll(".txt");
  const sms = document.getElementById("sms-marker");
  const now = document.getElementById("now");
  const sms_delay = 1200;
  let delay = 0;
  let snt;

  const int = setInterval(() => {
    snt = document.querySelectorAll(".sent");
    snt.length === 0 || snt.length < txt.length ? newText(snt.length) : clearInterval(int);
  }, 2500);

  function newText(i) {

    const msg = document.querySelectorAll(".msg");

    switch (i) {
      case 0: message(i); break;
      case 1: message(i); ha(i); br(i); break;
      case 2: message(i); ha(i); br(i, i); break;
      case 3: if (delay < 4) { delay++; return; } else { message(i); space(0); break; }
      case 4: message(i); ha(i); br(i); break;
      case 5: message(i); ha(i); br(i); break;
      case 6: message(i); ha(i); br(i); break;
      case 7: if (delay < 7) { delay++; return; } else { message(i); space(1); break; }
      case 8: message(i); ha(i); br(i); break;
      case 9: message(i); ha(i); br(i); break;
      case 10: message(i); ha(i); br(i); break;
      case 11: if (delay < 15) { delay++; return; } else { message(i); space(2); break; }
      default: break;
    }

    function message(i) { // sends message
      msg[i].style.display = "flex";
      msg[i].classList.add("sent");
      if (now.style.display !== "sent") now.style.display = "flex";
      sms.style.display = "none";
      if (i < 10) setTimeout(() => { sms.style.display = "flex" }, sms_delay);
      else {
        setTimeout(() => {
          let d = [...new Date().toLocaleTimeString().split(":")];
          now.innerText = d[0] + ":" + d[1] + " " + d[2].split(" ")[1];
        }, 30000);
      }
    }

    function ha(i) { // hides avatar (but keeps for spacing)
      document.querySelectorAll(`.msg svg`)[i].style.visibility = "hidden";
    }

    function br(i, j) { // modifies borders on messages
      txt[i - 1].style.borderBottomLeftRadius = 0;
      txt[i].style.borderTopLeftRadius = 0;
      if (j) txt[i - 1].style.borderTopLeftRadius = 0;
    }

    function space(n) { // reveals hidden space between message blocks
      console.log(n);
      document.querySelectorAll(".space")[n].classList.remove("hide");
    }
  }

  // INPUT EVENT

  // let N = 0; // counter for what reply to send to user
  // document.getElementById("msg").addEventListener("change", function () {

  //   let mms = this.value.split(" ")[Math.floor(Math.random() * (this.value.split(" ").length))]; // random word from user msg recieved
  //   this.value = ""; // clear input text

  //   const replies = [
  //     `What's a ${mms}?`,
  //     `A 🎉 ?`,
  //     `Sorry! I'm not really an AI 😁 I have no idea what you're saying 🤪`,
  //     `🤪`,
  //     `⭐`
  //   ];
  //   document.getElementById("reply").innerHTML = replies[N]; // modify reply in DOM
  //   N++; // send replies in sequence

  //   let reply = document.createElement("div"); // new reply  
  //   reply.innerHTML = document.getElementById("response_template").innerHTML; // this is an iteration of the modified template
  //   let sent = document.querySelectorAll(".sent");
  //   sent[N].appendChild(reply);
  //   console.log(sent.length);
  //   console.log(reply);
  //   console.log(snt);
    
  // });

})();