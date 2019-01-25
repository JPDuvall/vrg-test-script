# vrg-test-script
Test scripts for submitting scores to VRG

run node test.js to log into the simulator.
run node submission.js to submit scores/times.

_______________
## test.js
Running this file will prompt you for a username and password. Username can also be the email address you use to login with.

Credentials such as your session token will be stored in a .txt file. Remove the .txt file to clear your session and login again.

Change the URL variable to point this script towards a different server. ie for testing locally.

_______________
## submission.js
Running this file will submit a score and time with an associated bracket id and registration id to the competitions server. Change the registration_id, bracket_id, score and time variables to submit different scores/times to different brackets using a different registration.