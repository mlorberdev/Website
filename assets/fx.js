
// SCROLL STATE
// const stars = document.querySelectorAll("screen");

// // ANIMATION RUN/PAUSE USING INTERSECTION OBSERVER
// void function pauseAnim() {
//   const observer = new IntersectionObserver(entries => {
//     entries.forEach(entry => entry.target.style.animationPlayState = entry.isIntersecting ? "running" : "paused");
//   }, { threshold: 1 });
//   stars.forEach(star => { observer.observe(star) });
//   // cows.forEach(cow => observer.observe(cow));
//   observer.observe(star);
// }();

// STATS PAGE SCROLL
document.getElementById("down_wrap").addEventListener("click", function () {
  let t = this.style.transform;
  let sw = document.getElementById("stats_wrap");
  if (t === "") {
    sw.scrollTop = sw.scrollHeight;
    this.style.transform = "rotate(180deg)", 200;
  } else {
    sw.scrollTop = 0;
    this.style.transform = "", 200;
  }
});