'use strict';

const centerSection = document.querySelector('.CenterSection');
const nav = document.querySelector('nav');

centerSection.addEventListener('click', function(event) {
    let timeLabel = event.target;
    if (!timeLabel.classList.contains('TimeNews')) return;

    let y = timeLabel.getBoundingClientRect().top - nav.offsetHeight;
    window.scrollBy(0, y);
});
