// ==UserScript==
// @name         Discogs Master Release Default Sort By Country
// @namespace    https://www.discogs-enhancer.com
// @version      0.1
// @description  Set MR release link to include custom filters by default
// @author       Matthew Salcido (discogs.enhancer@gmail.com)
// @match        https://www.discogs.com/*
// @grant        none
// ==/UserScript==
(function() {
    'use strict';
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
    const SORT_ORDER = '?sort=country&sort_order=';
    // General /master/ links on any page
    const links = [...document.querySelectorAll('a')];
    
    links.forEach(link => {
        if (link.href.includes('/master/')) {
         link.href += SORT_ORDER;
        }
    });
    
    // Release page specific /master/ links
    waitForElement('#release-other-versions').then(() => {
        const releasePageLinks = [...document.querySelectorAll('a')];
        releasePageLinks.forEach(link => {
            if (link.href.includes('/master/')) {
             link.href += SORT_ORDER;
            }
        });
    })
})();
