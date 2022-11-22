
# TEST



## Run Unit Test

 ```bash
$ npm run test
```

## Run end-to-end Test

 ```bash
$ npm run test:e2e
```

## Installation

```bash
$ npm install
```

## Running locally the app with a local Sqlite DB

```bash
# watch mode
$ npm run start:local
```

## Running the app with Docker compose

```bash
docker compose -f docker-compose.yml up 
```

#### Or running the app locally with a Mysql image in Docker 

```bash
# watch mode
$ npm run start:dev    
```

## Endpoints

### Login 

In the application you can login with only 3 Users:

```bash
{
      userId: 1,
      username: 'admin',
      password: 'admin',
      userType: 'Manager'
    },
    {
      userId: 2,
      username: 'user',
      password: 'user',
      userType: 'Technician'
    },
    {
      userId: 3,
      username: 'user1',
      password: 'user1',
      userType: 'Technician'
    }
```

and you use the next endpoint:

```bash
curl --location --request POST 'http://localhost:8081/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "username": "user",
  "password": "user"
}'
```

the response give us the **Authorization** token:

```bash
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ1c2VyVHlwZSI6Ik1hbmFnZXIiLCJpYXQiOjE2Njg4MDM2MDEsImV4cCI6MTY2ODgwMzY2MX0.2zqnNa7M6FN0iv0vZZXTByQ2S5t2YVgmo7ZV9ViXXtQ"
}
```


### Create Task

using the **Authorization** token we get the list of task:

```bash
curl --location --request POST 'http://localhost:8081/tasks' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ1c2VyVHlwZSI6Ik1hbmFnZXIiLCJpYXQiOjE2Njg4MDM2MDEsImV4cCI6MTY2ODgwMzY2MX0.2zqnNa7M6FN0iv0vZZXTByQ2S5t2YVgmo7ZV9ViXXtQ' \
--header 'Content-Type: application/json' \
--data-raw '{
  "technicianId": 1,
  "summary": "bla bla",
  "date": "01/02/2023",
  "completed": false,
  "Isworking": false
}'
```

response:


```bash
[
  {
    "id": 1,
    "technicianId": 1,
    "summary": "",
    "date": "02/01/2023",
    "completed": false,
    "Isworking": false
  }
]
```

### Get Tasks 

using the **Authorization** token we get the list of task:

```bash
curl --location --request GET 'http://localhost:8081/tasks' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ1c2VyVHlwZSI6Ik1hbmFnZXIiLCJpYXQiOjE2Njg4MDM2MDEsImV4cCI6MTY2ODgwMzY2MX0.2zqnNa7M6FN0iv0vZZXTByQ2S5t2YVgmo7ZV9ViXXtQ'
```

response:


```bash
[
  {
    "id": 1,
    "technicianId": 1,
    "summary": "",
    "date": "02/01/2023",
    "completed": false,
    "Isworking": false
  }
]
```

### Update Task

using the **Authorization** token we get the list of task:

**UPDATE** *http://localhost:8081/tasks/${taskId}*

```bash
curl --location --request PUT 'http://localhost:8081/tasks/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ1c2VyVHlwZSI6Ik1hbmFnZXIiLCJpYXQiOjE2Njg4MDM2MDEsImV4cCI6MTY2ODgwMzY2MX0.2zqnNa7M6FN0iv0vZZXTByQ2S5t2YVgmo7ZV9ViXXtQ' \
--header 'Content-Type: application/json' \
--data-raw '{
  "summary": "bla2 bla2",
  "date": "01/02/2022",
  "status": true,
  "completed": true,
  "Isworking": false
}'
```

response:


```bash
  {
    "id": 1,
    "technicianId": 1,
    "summary": "bla2 bla2",
    "date": "01/02/2022",
    "completed": true,
    "Isworking": false
  }
```


### Delete Task

using the **Authorization** token we get the list of task:

**DELETE** - *http://localhost:8081/tasks/${taskId}*

```bash
curl --location --request DELETE 'http://localhost:8081:8081/tasks/2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoxLCJ1c2VyVHlwZSI6Ik1hbmFnZXIiLCJpYXQiOjE2Njg3OTAwMDEsImV4cCI6MTY2ODc5MDA2MX0.ye2UuWM1LciFCwt-FutzmQ6aWogkOXzRQ9s3vMCoAyo'
```


## License

Nest is [MIT licensed](LICENSE).
