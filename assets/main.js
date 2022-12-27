!(function () {
  const msg = document.querySelectorAll(".msg"); console.log([...new Date().toLocaleTimeString().split(":")])
  const txt = document.querySelectorAll(".txt");
  const sms = document.getElementById("sms-marker");
  const now = document.getElementById("now");
  const ttt = [2, 5, 9, 15, 19, 29, 33, 37, 41, 45, 50, 57]; // msg timings (s)
  const www = [1.2, 1.4, 2.5, 1.2, 2.4, 3.6, 2.1, 2, 1, 1.7, 2.3, 1.7];

  for (let i = 0; i < 12; i++) {
    setTimeout(() => newText(i), ttt[i] * 1000); // display 'text' per timings, conv to ms
  }

  function newText(i) {
    switch (i) {
      case 1: br(i); break;
      case 2: br(i, i); break; // send for border-radius mod
      case 4: br(i); break;
      case 5: br(i, i); break;
      case 7:
      case 8:
      case 9: br(i); break;
      default: break;
    }
    msg[i].style.display = "flex";
    sms.style.display = "none";
    if (i < 10) setTimeout(() => { sms.style.display = "flex" }, www[i] * 1000);
    else {
      now.style.display = "flex";
      setTimeout(() => {
        let d = [...new Date().toLocaleTimeString().split(":")];
        now.innerText = d[0] + ":" + d[1] + " " + d[2].split(" ")[1];
      }, 30000);
    }
  }

  function br(i, j) {
    document.querySelector(`.msg:nth-of-type(${i+1}) svg`).style.visibility = "hidden"; // hide avatar but keep for spacing
    txt[i - 1].style.borderBottomLeftRadius = 0;
    txt[i].style.borderTopLeftRadius = 0;
    if (j) txt[i - 1].style.borderTopLeftRadius = 0;
  }

  // INPUT EVENT
  document.getElementById("msg").addEventListener("change", function () {
    this.value = "";

  });

})();