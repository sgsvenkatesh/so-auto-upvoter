// ==UserScript==
// @name         SO isUserAnsweringQuestions
// @namespace    http://stackoverflow.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://stackoverflow.com
// @grant        none
// ==/UserScript==

(function() {
    if (!localStorage.getItem("isUserAnsweringQuestions") || new Date().getTime() > localStorage.getItem("isUserAnsweringQuestionsExpiryTimestamp")) {
        localStorage.setItem("isUserAnsweringQuestions", true);
        localStorage.setItem("isUserAnsweringQuestionsExpiryTimestamp", (new Date().getTime()) + (1*60*60*1000));
        console.log('isUserAnsweringQuestions is set');
    }
})();
