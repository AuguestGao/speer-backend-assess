# API design

## users

| method | path              | Purpose         | require auth |
| ------ | ----------------- | --------------- | ------------ |
| POST   | /api/auth/signup  | sign up a user  | no           |
| POST   | /api/auth/signin  | sign in a user  | no           |
| POST   | /api/auth/signout | sign out a user | no           |

## tweets

| method | path            | Purpose        | require auth |
| ------ | --------------- | -------------- | ------------ |
| POST   | /api/tweets     | create a tweet | yes          |
| GET    | /api/tweets     | get all tweets | no           |
| PATCH  | /api/tweets/:id | update a tweet | yes          |
| DELETE | /api/tweets/:id | delete a tweet | yes          |
