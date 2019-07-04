import { timeline } from 'anime';

document.querySelectorAll('.title-header .letters').each((el) => {
  el.html(el.text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
});

console.log('hello')

timeline({ loop: true })
  .add({
    targets: '.title-header .line',
    scaleY: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700
  })
  .add({
    targets: '.title-header .line',
    translateX: [0, $(".title-header .letters").width()],
    easing: "easeOutExpo",
    duration: 700,
    delay: 100
  }).add({
    targets: '.title-header .letter',
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=775',
    delay: function (el, i) {
      return 34 * (i + 1)
    }
  }).add({
    targets: '.title-header',
    opacity: 0,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });