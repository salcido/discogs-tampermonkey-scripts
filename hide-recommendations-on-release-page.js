// ==UserScript==
// @name         Hide Release Recommendations
// @namespace    https://www.discogs-enhancer.com
// @version      0.1
// @description  Hides the recommendations section on Release pages
// @author       Matthew Salcido (discogs.enhancer@gmail.com)
// @match        https://www.discogs.com/*
// @grant        none
// ==/UserScript==
(function() {
    function waitForElement(selector) {
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }

            let observer = new MutationObserver(() => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    waitForElement('ul[class*="cards_"]').then(() => {
        document.querySelector('section#release-recommendations').style.display = 'none';
    });
})();
