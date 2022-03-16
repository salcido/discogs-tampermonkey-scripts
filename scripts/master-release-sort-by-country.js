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
    let int;

    function modifyLinks() {
      const links = [...document.querySelectorAll('a')];

      links.forEach(link => {
          if (link.href.includes('/master/') && !link.href.includes(SORT_ORDER)) {

            const regex = /(\d+)$/gm;
            // This is to deal with a redirect bug in Discogs where query paramters are not
            // maintained after the redirect occurs
            if ( link.href.match(regex) ) {
                const url = link.href.split('/');
                const artist = url[url.length - 3];
                const master = url[url.length - 2];
                const id = url[url.length - 1];
                // Assemble new URL
                const newURL = `/${master}/${id}-${artist}`
                link.href = newURL + SORT_ORDER
            } else {
                link.href += SORT_ORDER;
            }
          }
      });
    }

    function addSearchListener() {
      int = setInterval(modifyLinks, 250);
    }

    function removeSearchListener() {
      clearInterval(int);
    }

    // General /master/ links on any page
    modifyLinks();

    // Release page specific /master/ links
    waitForElement('#release-other-versions a').then(() => modifyLinks())

    // Search Bar Results
    const target = document.querySelector('#app') ? '[class*="search_"] input' : '#search_q';

    document.querySelector(target).addEventListener('focus', addSearchListener, true);
    document.querySelector(target).addEventListener('blur', removeSearchListener, true);
  })();
