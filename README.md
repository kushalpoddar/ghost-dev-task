This is the Readme file for V1
### The MVP

- Front-end: submit and display comments/upvotes in vanilla JS or jQuery
- Back-end: store a list of comments and upvotes
- Don’t worry about threading comments, just do a single list.
- Tag this work as a GitHub release: "V1"

### V2

- Migrate the display of upvotes to React
- Make the display of new upvotes real-time 
(e.g. if a new upvote is added from another page)
- Update the back and front end to support 1 level of comment nesting.
- Tag this work as a GitHub release: “V2”

To run the application, perform the following steps-
- Clone the code
- Import ghost-dev.sql file in MySQL
- Go to backend folder and update conn.js if any changes are there in your mysql server
- Now install the dependencies in backend folder using "npm install"
- Run "nodemon app.js or node app.js" to run backend server
- Now open http://localhost:6277 in your browser and enjoy

Note - Backend server runs on port 6277 and frontend server runs on 3000 but static build of react is already added to backend due to which we can check the code on 6277