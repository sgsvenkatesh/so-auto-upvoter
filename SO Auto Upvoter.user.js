// ==UserScript==
// @name         SO Auto Upvoter
// @namespace    http://stackoverflow.com/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://stackoverflow.com/questions/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function autoUpvote() {
        // if there is atleast one answer
        if ($("#answers") && $("#answers .answer").length === 0) { return; }

        // If the user stays more than 20 sec upvote question and answer
        setTimeout(function() {
            if ($(".question .votecell") && $(".question .votecell").length > 0) {
                $(".question .votecell").eq(0).find("a.vote-up-off").click();
            }

            if ($("#answers .answer") && $("#answers .answer").length > 0) {
                $("#answers .answer").eq(0).find(".votecell a.vote-up-off").click();
            }
        }, 20*1000);
    }

    if (new Date().getTime() > localStorage.getItem('isUserAnsweringQuestionsExpiryTimestamp')) {
        localStorage.removeItem('isUserAnsweringQuestions');
        localStorage.removeItem('isUserAnsweringQuestionsExpiryTimestamp');
    }

    if (localStorage.getItem('isUserAnsweringQuestions') !== "true") {
        console.log('Auto Upvoting in 20 seconds');
        autoUpvote();
    }
})();