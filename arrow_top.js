'use strict';

document.querySelector('.ArrowTopPage').onclick = function(event) {
    if (event.target.tagName !== 'IMG') return;

    window.scrollTo(0,0);
    document.querySelector('.CenterSection').focus();
};
