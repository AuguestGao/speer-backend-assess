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

# Database structure

## user

| field     | data type | required | other constrains |
| --------- | --------- | -------- | ---------------- |
| username  | string    | yes      | min = 3          |
| password  | string    | yes      | hased            |
| id        | string    | yes      | auto generated   |
| createdAt | Date      | yes      | auto generated   |
| updatedAt | Date      | yes      | auto generated   |

## tweet

| field     | data type | required | other constrains |
| --------- | --------- | -------- | ---------------- |
| userId    | string    | yes      |                  |
| body      | string    | yes      |                  |
| id        | string    | yes      | auto generated   |
| createdAt | Date      | yes      | auto generated   |
| updatedAt | Date      | yes      | auto generated   |
