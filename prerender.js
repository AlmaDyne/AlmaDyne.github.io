const targetPage = 'music.html';

if (
    HTMLScriptElement.supports &&
    HTMLScriptElement.supports('speculationrules')
) {
    console.log('The browser supports the Speculation Rules API.');

    const specScript = document.createElement('script');
    specScript.type = 'speculationrules';
    const specRules = {
        prerender: [{
            where: {
                and: [
                    { href_matches: targetPage },
                    { not: { selector_matches: '[rel~=nofollow]' } }
                ]
            }
        }]
    };
    specScript.textContent = JSON.stringify(specRules);
    document.head.append(specScript);
} else {
    console.log('The browser not supports the Speculation Rules API.');

    const linkElem = document.createElement('link');
    linkElem.rel = 'prefetch';
    linkElem.href = '/music.html';
    document.head.append(linkElem);
}
