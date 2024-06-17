'use strict';

import { imgSideSet } from './img_sideset.js';

document.addEventListener('DOMContentLoaded', () => arrangeImages(imgSideSet));

export function arrangeImages(imgSideSet) {
    const imgSideL = document.getElementsByTagName('aside')[0];
    const imgSideR = document.querySelector('.RightSection');
    const centerSectionHeight = document.querySelector('.CenterSection').offsetHeight;

    if (!imgSideL || !imgSideR || centerSectionHeight === undefined) {
        console.error('Один из элементов на странице не найден!');
        return;
    }

    imgSideL.insertAdjacentHTML('afterbegin', '<div class="ImgContainer"></div>');

    const imgContainerHeight = imgSideL.querySelector('.ImgContainer').offsetHeight;
    const totalSideImages = Math.floor(centerSectionHeight / imgContainerHeight) * 2;
    const mixedImgSideSet = randomMixImg(imgSideSet);

    console.log('\nПеремешанный сет картинок:');
    mixedImgSideSet.forEach(([key, _]) => console.log(key));
    console.log('\nВысота главного блока: ' + centerSectionHeight);
    console.log('Высота контейнера картинки с отступами: ' + imgContainerHeight);
    console.log('Количество картинок на странице: ' + totalSideImages);
    
    // Очистка боковых сторон перед их заполнением
    imgSideL.innerHTML = imgSideR.innerHTML = '';

    // Циклически возобновляемый перебор свойств со значениями в объекте, если их количество
    // требуется больше, чем есть в объекте
    for (let i = 0; i < totalSideImages; i++) {
        const [imgAlt, imgSrc] = mixedImgSideSet[i % mixedImgSideSet.length];
        const targetSideContainer = i % 2 === 0 ? imgSideL : imgSideR;
        appendImage(targetSideContainer, imgSrc, imgAlt);
    }

    // Изменение отображения картинок по вертикали, если их больше 2-х
    if (totalSideImages > 2) {
        imgSideL.style.justifyContent = imgSideR.style.justifyContent = 'space-between';
    }

    function randomMixImg(obj) {
        return Object.entries(obj)
            .map(([key, value]) => [key, value, Math.random()])
            .sort((a, b) => a[2] - b[2])
            .map(([key, value, _]) => [key, value])
        ;
    }

    function appendImage(sideContainer, imgSrc, imgAlt) {
        const imgContainer = document.createElement('div');
        imgContainer.className = 'ImgContainer';
        imgContainer.innerHTML = `<img class="SideImg" src=${imgSrc} alt=${imgAlt}>`;
        sideContainer.append(imgContainer);
    }
}
