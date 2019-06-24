# Express Coding Challenge

# How to run
1. first, install dependencies with ``$ npm install``
# with docker compose
1. run ``$ docker-compose up``
this will set up databases, run migrations seeds and start the server

# without docker compose
1. run ``$ mysql -u {user} -p < init_db.sql`` to create databases
2. ``$ sequelize db:migrate`` to create tables
3. ``$ sequelize db:seed:all`` to seed the inital data
4. ``$ npm start`` to start the api server

# available routes
GET /user/create
POST /user/signin
POST /logout
POST /books



