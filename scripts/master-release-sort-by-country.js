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
    const links = [...document.querySelectorAll('a')];
    links.forEach(link => {
        if (link.href.includes('/master/')) {
         link.href += '?sort=country&sort_order=';
        }
    });
})();
