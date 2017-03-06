# so-auto-upvoter

This script is to used with [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) to auto upvote question and the first answer if the user stays more than 10 seconds on the page. 

The script also checks if you have landed on the page from http(s)://stackoverflow.com or from other internet sites to understand if you are answering questions on SO or browsing for answers. 

It is assumed that the user wouldn't want to upvote questions if he is answering questions. If he is browsing for answers, he would most likely want to upvote the question and the best answer. 

In any case, the user can revert his action within 60 seconds.

This can be used along with [Desktop Notifications for Stack Exchange](https://chrome.google.com/webstore/detail/desktop-notifications-for/ijglncoabcgieiokjmgdogpefdblmnle) to view your inbox notifications easily. 

**How to install:**

1. Install [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en)
2. Open Tampermonkey options -> Select Utilities
3. Import so-auto-upvoter.js
4. Replace [SO_PROFILE_ID] and [SO_PROFILE_USERNAME] with your profile ID and USERNAME (refer your profile page for URL structure)
