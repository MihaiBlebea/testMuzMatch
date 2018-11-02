### Install

#### Requirements

- Must have docker installed
- Must have node installed


#### Steps

- Unzip folder
- Run "docker-compose up -d --build"
- Run "npm run build"
- Run "npm run populate"


### Usage

- Navigate to "http://localhost:3000"
- You can write comments and post them to the video comment box
- When a new comment is added, the comment box will scroll to the latest by default.
- If you want to check a previous comment, the autoscroll will be turned off when you scroll the box up
- You can manual switch autoscroll on/off
- You can switch the audio on/off. If audio is on, you will get a short notify sound when a new comment is posted


### How does it work?

- The placeholder comments are stored in MongoDB. You can add more placeholder comments or remove some of them form '/database/comments.json'. Don't forget to run "npm run populate" after you alter the json file
- After the comments are fetched from the database, a random one is picked and send to the "client" with the help of Socket.io at a random interval to simulate a live comment box feel
- The time of the message is generated on the client side, so it appears that is was just posted a couple of seconds ago on every comment
- If the user adds a new comment, it will be sent to the server and saved in the MongoDB. If the message was successfully saved to the DB, the response will send back the message to the client and the client will add it to the comment feed
- Every user generated comment is validated to make sure it is not null (More validation could be added here or on the server side)


### What would I do differently?

- No tests are included because I don't feel the need for them on this demo app. If it would go into production, I would use "Mocha" to build a unit test suit around the server side methods and routes. Some more complex browser tests could be implemented using "Selenium" on the Vue components
- I would use SASS and modify the bootstrap framework instead of adding another layer of css on top of bootstrap. Also a good practice would be to use scoped styles on the Vue components.
- The "npm run populate" can be abstracted into a function that checks if the database is empty, and if so, then run this command before the comments should be sent to the client, but it seems outside of the scope of this app at this point.
