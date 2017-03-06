// ==UserScript==
// @name         SO Auto Upvoter
// @namespace    http://stackoverflow.com/
// @version      0.1
// @description  Intelligent Auto Upvoter for Stack Overflow
// @author       SGS Venkatesh
// @match        *://stackoverflow.com/*
// @match        *://stackexchange.com/users/[SO_PROFILE_ID]/[SO_PROFILE_USERNAME]?tab=inbox
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

(function() {
    'use strict';

    const waitTime = 10; // in seconds

    var $js = document.querySelectorAll.bind(document);

    var autoUpvote = () => {
        // if there is atleast one answer
        if ($js("#answers") && $js("#answers .answer").length === 0) { return; }

        // If the user stays more than 20 sec upvote question and answer
        setTimeout(() => {
            if ($js(".question .votecell") && $js(".question .votecell").length > 0) {
                $js(".question .votecell")[0].querySelector("a.vote-up-off").click();
            }

            if ($js("#answers .answer") && $js("#answers .answer").length > 0) {
                $js("#answers .answer")[0].querySelector(".votecell a.vote-up-off").click();
            }
        }, waitTime*1000);
    };

    var getParameterByName = (name, url) => {
        if (!url) { url = window.location.href; } // for falsy values of url

        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    if (location.host === "stackoverflow.com") {
        console.log("[SO Auto Upvoter] Stack Overflow Identified");
        document.querySelector('.js-inbox-button').addEventListener("click", () => {
            var commentSectionWaitingInterval = setInterval(() => {
                var commentLinks = $js('.inbox-dialog .modal-content .js-gps-track');
                if (commentLinks.length > 0) {
                    clearInterval(commentSectionWaitingInterval);
                    commentLinks.forEach(thisComment => {
                        thisComment.addEventListener('click', event => {
                            event.preventDefault();
                            GM_setValue("isCommentClicked", "true");
                            window.location.href = thisComment.href;
                        });
                    });
                }
            }, 100);
        });
    }

    if (location.host + location.pathname + location.search === "stackexchange.com/users/[SO_PROFILE_ID]/[SO_PROFILE_USERNAME]?tab=inbox") {
        console.log("[SO Auto Upvoter] Stack Exchange Profile page identified");
        $js(".topbar-icon.icon-inbox")[0].click();
        let commentSectionWaitingInterval = setInterval(() => {
            var commentLinks = $js('.inbox-dialog .modal-content .js-gps-track');
            if (commentLinks.length > 0) {
                clearInterval(commentSectionWaitingInterval);
                GM_setValue("isCommentClicked", "true");
                window.location.href = commentLinks[0].href;
            }
        }, 100);
    }

    else if (/stackoverflow.com\/questions\/[0-9]+\/.*/.test(location.host + location.pathname)) {
        console.log("[SO Auto Upvoter] Stack Overflow Question page identified");
        if (GM_getValue('isCommentClicked') === "true") {
            GM_deleteValue('isCommentClicked');
            console.log('[SO Auto Upvoter] Exiting because user landed from notifications');
            return;
        }

        if (getParameterByName('isUserAnsweringQuestions') !== "true") {
            console.log(`[SO Auto Upvoter] Auto Upvoting in ${waitTime} seconds`);
            autoUpvote();
        } else {
            console.log("[SO Auto Upvoter] Exiting because user is answering questions");
        }
    }

    else if (location.host + location.pathname === "stackoverflow.com/" || (
        /stackoverflow.com\/(questions|unanswered).*/.test(location.host + location.pathname) && !(location.host + location.pathname).contains("/ask")
    )) {
        console.log("[SO Auto Upvoter] Stack Overflow Questions List Identified");

        var questionsList = document.getElementById("question-mini-list") || document.getElementById("questions");
        questionsList.querySelectorAll(".question-summary .cp").forEach(
            thisQuestionDetail =>
            thisQuestionDetail.setAttribute('onclick', `window.location.href='${thisQuestionDetail.getAttribute("onclick").slice(22, -1)}?isUserAnsweringQuestions=true`
            )
        );

        questionsList.querySelectorAll(".summary a").forEach(
            thisQuestionLink => thisQuestionLink.href = `${thisQuestionLink.pathname}${thisQuestionLink.search ? "&" : "?"}isUserAnsweringQuestions=true${thisQuestionLink.hash}`
        );
    }

    else if (location.host + location.pathname === "stackoverflow.com/users/[SO_PROFILE_ID]/[SO_PROFILE_USERNAME]") {
        console.log("[SO Auto Upvoter] Stack Overflow Profile page identified");
        $js("a.answer-hyperlink, a.question-hyperlink").forEach(
            thisLinkEl => thisLinkEl.href = `${thisLinkEl.pathname}${thisLinkEl.search ? "&" : "?"}isUserAnsweringQuestions=true${thisLinkEl.hash}`
        );
    }
})();
