// ==UserScript==
// @name         Show For Sale Items in Inventory
// @namespace    https://www.discogs-enhancer.com
// @version      0.1
// @description  Sets the initial inventory page to show only For Sale items with 1000 results
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

    waitForElement('a[href*="/sell/manage"]').then(() => {
        document.querySelectorAll('a[href*="/sell/manage"]').forEach(a => { a.href = '/sell/manage?page=1&status=For+Sale&limit=1000'; })
    });
})();
