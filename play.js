'use strict';

(function showPlayArrow() {
    const n = document.querySelectorAll('.MusicAlbum').length; /* Количество альбомов */
    let hTimer = null,
        fTimer = null;

    for (let i = 1; i <= n; i++) {
        const linkToAnchorMA = document.querySelector('.LinkToAnchorMA' + i);
        const playMA = document.querySelector('.PlayMA' + i);

        linkToAnchorMA.addEventListener('click', () => {
            clearTimeout(fTimer);
            clearTimeout(hTimer);

            playMA.classList.remove('FadeOut');
            playMA.style.visibility = "visible";
            playMA.classList.add('FadeIn');

            console.log('Выбран альбом №' + i);

            for (let k = 1; k <= n; k++) {
                if (k == i) continue;

                let playMAHidden = document.querySelector('.PlayMA' + k);
                playMAHidden.style.visibility = "hidden";
            };

            fTimer = setTimeout(function() {
                playMA.classList.remove('FadeIn');
                playMA.classList.add('FadeOut');

                const  animationTime = parseFloat(getComputedStyle(playMA).animationDuration) * 1000;

                hTimer = setTimeout(function() {
                    playMA.style.visibility = "hidden";
                }, animationTime);
            }, 1000);
        });
    };
})();

(function moveOnPlayerCount() {
    const centerSection = document.querySelector('.CenterSection');
    let counter = 0;

    centerSection.addEventListener('mouseout', function(event) {
        const player = event.relatedTarget;

        if (player && player.matches('iframe[id^="PlayerAlbum"]')) {
            counter++;
            console.log('Указатель мыши перешёл на плеер, раз: ' + counter);
        }
    });
})();
