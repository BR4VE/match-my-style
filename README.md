# Match My Style API Documentation

This doc tells you how to test/enhance/fix the Match My Style API.

## Setup

1. Clone the repository.
2. Create a `.env` file in the root folder similar to `.env.sample` and fill credentials (You can ask for credentials if you don't have them).
3. Open a terminal window and execute the following commands.
   1. cd `Desktop/match-my-style`
   2. `npm i`
4. Type `npm run dev` to run the server locally. It will run on port you specify in your `.env` file.

## API:

### Auth:

#### Signup:

##### Endpoint:

- This endpoint creates a new user, returns the created user and authToken.

```http
POST /api/auth/signup
```

##### Parameters:

| Parameter  | Type     | Required | Description   |
| :--------- | :------- | :------- | :------------ |
| `email`    | `string` | true     | User email    |
| `name`     | `string` | true     | User name     |
| `password` | `string` | true     | User password |

##### Responses:

| Status Code | Response Data                                       | Description                                                                                                                                  |
| :---------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`       | `{ authenticationToken: 'someToken', user: {...} }` | Returns authentication token and user info, this auth token needs to be added to requests as Authorization header for the following requests |
| `409`       | `{ error: '...' }`                                  | If the user is created before, returns conflict error                                                                                        |

#### Login:

##### Endpoint:

- This endpoint returns the user and new authToken.

```http
POST /api/auth/login
```

##### Parameters:

| Parameter  | Type     | Required | Description   |
| :--------- | :------- | :------- | :------------ |
| `email`    | `string` | true     | User email    |
| `password` | `string` | true     | User password |

##### Responses:

| Status Code | Response Data                                       | Description                                                                                                                                  |
| :---------- | :-------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `200`       | `{ authenticationToken: 'someToken', user: {...} }` | Returns authentication token and user info, this auth token needs to be added to requests as Authorization header for the following requests |
| `401`       | `{ error: '...' }`                                  | Invalid email or password                                                                                                                    |

#### Send Reset Password Email:

##### Endpoint:

- This endpoint creates a verification code and sends it to the user's mail if the user exists in the database.

```http
POST /api/auth/send-reset-password-email
```

##### Parameters:

| Parameter | Type     | Required | Description |
| :-------- | :------- | :------- | :---------- |
| `email`   | `string` | true     | User email  |

##### Responses:

| Status Code | Response Data      | Description                          |
| :---------- | :----------------- | :----------------------------------- |
| `200`       | `{}`               | No return data                       |
| `400`       | `{ error: '...' }` | If user is not found in the database |

#### Reset Password:

##### Endpoint:

- This endpoint resets user's password if verification code is valid.

```http
POST /api/auth/reset-password
```

##### Parameters:

| Parameter          | Type     | Required | Description                                                          |
| :----------------- | :------- | :------- | :------------------------------------------------------------------- |
| `email`            | `string` | true     | User email                                                           |
| `password`         | `string` | true     | New password                                                         |
| `verificationCode` | `string` | true     | Verification code which is sent earlier by SendResetPasswordEndpoint |

##### Responses:

| Status Code | Response Data      | Description                                       |
| :---------- | :----------------- | :------------------------------------------------ |
| `200`       | `{}`               | No return data                                    |
| `401`       | `{ error: '...' }` | If user is not found in the database              |
| `404`       | `{ error: '...' }` | If verification code is not found in the database |
| `422`       | `{ error: '...' }` | If verification is invalid                        |

### Combines:

#### Create:

##### Endpoint:

- This endpoint creates a new combine for the authenticated user based on filters like `categories, mood and weatherType` which are provided by user

```http
POST /api/combines/create
```

##### Parameters:

| Parameter     | Type               | Required | Description                                                                                   |
| :------------ | :----------------- | :------- | :-------------------------------------------------------------------------------------------- |
| `categories`  | `array of strings` | true     | One or many should be provided: `["accessory", "bag", "bottom", "shoes", "top"]`              |
| `mood`        | `string`           | false    | `mood` can be one of these: `["chic", "daily", "feeling-lucky", "office", "party", "sports"]` |
| `weatherType` | `string`           | false    | Can be one of these: `["cold", "hot"]`                                                        |

##### Responses:

| Status Code | Response Data          | Description                                        |
| :---------- | :--------------------- | :------------------------------------------------- |
| `200`       | `{ combine: { ... } }` | Returns a unique combine for the user              |
| `404`       | `{ error: '...' }`     | Could not find a new combine with existing filters |

#### Get User Combines

##### Endpoint:

- This endpoint returns the combines created earlier for authenticated user.

```http
GET /api/combines/get-user-combines
```

##### Parameters:

| Parameter | Type      | Required | Description                        |
| :-------- | :-------- | :------- | :--------------------------------- |
| `page`    | `integer` | false    | Returns 10 results for every page. |

##### Responses:

| Status Code | Response Data           | Description                         |
| :---------- | :---------------------- | :---------------------------------- |
| `200`       | `{ combines: { ... } }` | Returns 10 combines created earlier |
