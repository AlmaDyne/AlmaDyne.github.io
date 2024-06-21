window.onload =  function() {
	document.body.classList.add('PreloadHiding');

    const preloader = document.querySelector('.Preloader');
    const animationTime = parseFloat(getComputedStyle(preloader).transitionDuration) * 1000;

	window.setTimeout(function() {
        document.body.classList.remove('PreloadHiding');
		document.body.classList.add('ready');
    }, animationTime + 200);
};
