
### Checkout our Wiki for more info

# leechcode
This project is a clone of leetcode. Users can solve algorithmic problems on this platform. We use monaco as the online editor and firebase auth for authentication.

Our tech stack is 
Go, Angular and postgres.

## Project Demo
[![Watch the video](https://img.youtube.com/vi/P6Sbge1xVU8/default.jpg)](https://youtu.be/P6Sbge1xVU8)

## Backend Unit Tests Demo
[![Watch the video](https://img.youtube.com/vi/KpalPzLB-pk/default.jpg)](https://youtu.be/KpalPzLB-pk)

## Frontend Cypress Tests Demo
[![Watch the video](https://img.youtube.com/vi/4zRmEE-cZdM/default.jpg)](https://www.youtube.com/watch?v=4zRmEE-cZdM&ab_channel=ErikRosa)
(Please ignore the icon, the link is correct but the image is not)

## API Documentation
Checkout the Git Wiki for this project for API documentation.
https://github.com/harlsh/leechcode/wiki

## Project Board
This repository initially belonged to Yash Tibrewal and it had a `Git Projects` for it, but after transferring the ownership to me, we lost the Project.
But, we still have the `Issues` saved. So please checkout our Issues to view our project board. 
https://github.com/harlsh/leechcode/issues?q=is%3Aissue+is%3Aclosed

## Sprint 4 deliverables
- [x] Integrate Monaco with Piston and execute user code from the front-end
- [x] User management with firebase auth
- [x] Generate solutions page for each problem
- [x] Unit Tests
- [x] Scrape data from leetcode(Have over 2000 problems in our database scraped from leetcode) 
link to sprint 4 deliverables: https://github.com/harlsh/leechcode/issues?q=is%3Aissue+is%3Aclosed+label%3A%22sprint+4%22

## Setup
Running the Frontend:
1. CD into leechcode-fe-app.
2. Install nodejs from `https://nodejs.org/en/`
3. Run `npm install` to downloaded necessary packages.
4. If angular cli is not installed, install the client using `npm install -g @angular/cli`
4. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Running the Backend:
1. You need to install docker.
2. From the root directory of the project, do `docker-compose build`
3. `docker-compose up`
4. The server will be up and running on port 8080. 
5. If you wanna check test the rest end points in style, install rest-client plugin for VS code, and open `**.rest` files in server -> documentation.
**Note: If you encounter `ERROR: for <name>  Cannot start service <name>:`
1. use `docker container ls` to view a list of active containers.
2. stop all active containers by running `docker stop <container id>`

Testing the Frontend using Cypress:
1. cd into leechcode-fe-app
2. Run `npm run cypress:open` to open the Cypress test suite
3. Click on Run # integration spec to start the tests

Testing the Frontend using Angular unit testing: 
1. You need to install docker.
2. From the root directory of the project, do `docker-compose build`
3. `docker-compose up`
4. In another terminal cd into leechcode-fe-app
5. Run `ng serve`
6. In another terminal Run `ng test` to start the tests

If you want to add data:
  1. Get your csrf-token and cookie after you login to `leetcode.com` and update in leech1.py
    a. After logging in, right-click on the page and press Inspect.
    b. Refresh the page.
    c. Click on the network tab and look for the leetcode.com request 
    d. Click on the headers tab and find the request header in the cookie.
    e. copy the csrf token and place in leech1.py, the token should match this form `csrftoken=<tokenid>;`
  2. Run `python leech1.py`. This will generate `data.json`
  3. Run `python leech2.py`. This will post all the data in data.json to the server.

Team Members
 - Harish Reddy Bollavaram (harlsh) [Backend]
 - Erik Rosa [Frontend]
 - Vijay Raghav Reddy [Frontend]
