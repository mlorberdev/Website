!(function () {
  const msg = document.querySelectorAll(".msg");
  const txt = document.querySelectorAll(".txt");
  const sms = document.getElementById("sms-marker");
  const ttt = [2, 5, 9, 15, 19, 23, 29, 33, 37, 41]; // msg timings (s)

  for (let i = 0; i < 10; i++) {
    setTimeout(() => newText(i), ttt[i] * 1000); // display 'text' per timings, conv to ms
  }

  function newText(i) {
    switch (i) {
      case 2: br(i); break;
      case 7: br(i, i); break;
      default: break;
    }
    if (i === 2 || i === 7) br(i); // send for border-radius mod
    msg[i].style.display = "flex";
    sms.style.display = "none";
    if (i < 9) setTimeout(() => { sms.style.display = "flex" }, 1000);
  }

  function br(i, j) {
    document.querySelector(`.msg:nth-of-type(${i - 1}) > svg`).style.visibility = "hidden"; // hide avatar but keep for spacing
    txt[i - 1].style.borderBottomLeftRadius = 0;
    txt[i].style.borderTopLeftRadius = 0;
    if (j) txt[i - 1].style.borderTopLeftRadius = 0;
  }

})();