Note

**This API has been deployed to Heroku at domain https://rocky-beyond-59259.herokuapp.com/ **

To make a request, use the format of domain/endpoint. Example, create a user: POST @ https://rocky-beyond-59259.herokuapp.com/api/auth/signup

A postman collection "Speers-backend.postman_collection.json" is included in this repo to use as an example. In case of any endpoint doesn't work, add above domain in the postman collection env with key 'url'.

# API design

## users

| method | path              | Purpose         | require auth | request body key:value type                                 |
| ------ | ----------------- | --------------- | ------------ | ----------------------------------------------------------- |
| POST   | /api/auth/signup  | sign up a user  | no           | username: string, password: string, confirmPassword: string |
| POST   | /api/auth/signin  | sign in a user  | no           | username: string, password: string                          |
| POST   | /api/auth/signout | sign out a user | no           | -                                                           |

## tweets

| method | path            | Purpose        | require auth | request body key:type |
| ------ | --------------- | -------------- | ------------ | --------------------- |
| POST   | /api/tweets     | create a tweet | yes          | body: string          |
| GET    | /api/tweets     | get all tweets | no           | -                     |
| PATCH  | /api/tweets/:id | update a tweet | yes          | body:string           |
| DELETE | /api/tweets/:id | delete a tweet | yes          | -                     |

## investor

| method | path                    | Purpose               | require auth | request body key:type                                       |
| ------ | ----------------------- | --------------------- | ------------ | ----------------------------------------------------------- |
| POST   | /api/investors/register | sign up a user        | no           | username: string, password: string, confirmPassword: string |
| POST   | /api/investors/login    | sign in a user        | no           | username: string, password: string                          |
| POST   | /api/investors/logout   | sign out a user       | no           | -                                                           |
| PATCH  | /api/wallet             | add balance in wallet | no           | amount: number                                              |

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

## investor

| field     | data type | required | other constrains |
| --------- | --------- | -------- | ---------------- |
| username  | string    | yes      | min = 3          |
| password  | string    | yes      | hased            |
| id        | string    | yes      | auto generated   |
| createdAt | Date      | yes      | auto generated   |
| updatedAt | Date      | yes      | auto generated   |
| balance   | number    | yes      | init = 0         |
