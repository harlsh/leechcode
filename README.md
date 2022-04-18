
### Checkout our Wiki for more info

# leechcode

Free leetcode

Every company requires to hire new candidates, and based on the recent trend, it is very clear the that the maximum hiring and firing takes place in the development field. The initial rounds for the hiring is always a coding round, and hence we try to create a leetcode which can be used by companies as thier own product. A platform where students can give coding tests owned by the companies.

The initial plan is to create the following.
An UI where
  - user reads a question on the left half of the page.
  - user has space to write code on the right half of the page
  - has a submit button to turn in his solution
  - test case result page
  - profile/score page

As the project develops
we plan to make the following
  - An admin panel to CRUD coding questions.
  - CRUD the test cases for a question
  - Create sharable test link to students with an expiry
  - user management (login)
  - user creation (creating user for students who have applied to companies)

The stack which is decided is
Angular for frontend
CockroachDB for database
Go for backend

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
  2. Run `python leech1.py`. This will generate `data.json`
  3. Run `python leech2.py`. This will post all the data in data.json to the server.

Team Members
 - Harish Reddy Bollavaram (harlsh) [Backend]
 - Erik Rosa [Frontend]
 - Vijay Raghav Reddy [Frontend]
