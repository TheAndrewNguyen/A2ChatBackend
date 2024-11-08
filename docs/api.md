# A2Chat API documentation 
The A2Chat API offers a range of endpoints for authentication, data storage, and developer tools, designed to support both end users and development teams.
### Base url: 
```
https://a2chat.mooo.com
```
---
## Firebase Authentication Endpoints 
### 1. Get current users 
Api call that gets current users in  auth database 

**Endpoint:** `/auth/checkConnection`  

**Method:** `GET`  

**Example request:**
```
GET /auth/checkConnnection
Host: https://a2chat.mooo.com
```
**Example response**: 
```json
{
    "message": "Firebase Authentication is connected!",
    "userCount": 10,
    "users": [
        {
            "uid": "9CHgYuqYX9SpfTxEIRCvXzNp9m12"
        },
        {
            "uid": "9y2HD7dGCefNo323OduwdXVxuOs1"
        }
    ]
}
```

### 2. Delete User 
Api call to delete a user 

**Endpoint:** `/auth/deleteUser`

**Method:** `DELETE`

**Parameters:**
| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
|  UID            | string          | Yes             | UID of user to be deleted |

**Example request:**
```
Delete /auth/deleteUser
Host: https://a2chat.mooo.com
```
Json Body: 
```json
{
    "uid": "9y2HD7dGCefNo323OduwdXVxuOs1"
}
```

**Example response (If successful)**: 
```json
{
    "message": "Sucessfully deleted user: 9y2HD7dGCefNo323OduwdXVxuOs1"
}
```
**Example response (If failed)**: 
```json
{
    "message": "Error deleting user",
    "error": "There is no user record corresponding to the provided identifier."
}
```
---
## FireStore Endpoints
### 1. Create Lobby  
Generates Lobby code and creates firestore document with the lobby code as the document Id.

**Endpoint:** `/firestore/createLobby`

**Method:** `POST`

**Parameters:** None 

**Example request:**
```
POST /firestore/createLobby 
Host: https://a2chat.mooo.com 
```

**Example response (if successful)**: 
```json
{
    "code": "259156"
} 
```
**Example firestore document created:**
```
{
    title: "259156", 
    isActive : true (boolean),    
    lobbyCode: "259156" (string),
    users: [] 
}
```

**Example reponse (if failed)**
```json
{
  "error": "Failed to create lobby error: <error message>"
}
```
### 2. Delete Lobby 
Deletes a lobby / deletes the firestore document 

**Endpoint:** `/firestore/deleteLobby`

**Method:** `DELETE`

**Parameters:**

| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
| LobbyId         | string          | yes             | LobbyId / Document ID |

**Example request:**
```
DELETE /firestore/deleteLobby 
Host: https://a2chat.mooo.com
```
Json Body:
```json
{
    "lobbyId": "259156"
}
```

**Example response (If succesful)**: 
```json
{
    "message": "Lobby 259156 deleted successfully"
}
```
**Example response (If failed)**: 
```
TBD fixing bug  
```
### 3.  Add User to lobby
Adds user to the corresponding lobby document `User` field 

**Endpoint:** `/firestore/addUserToLobby`

**Method:** `PUT`

**Parameters:**

| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
| LobbyID         | string          | yes             | LobbyId /document title|
| UID             | string          | yes             | User ID |

**Example request:**
```
PUT /firestore/addUserToLobby 
Host: https://a2chat.mooo.com
```
Json Body:
```json
{
    "lobbyID": "041946", 
    "UID": "TestUser" 
}

```
**Example response (If succesful)**: 
```json
{
    "message": "user TestUser added succesffuly to lobby"
}
 
```
**Example response (If failed)**: 
```
{
    "message": "Lobby: 43 does not exists"
}
```

### 4. Send Message
Sends a message

**Endpoint:** `/messages/:lobbyid`

**Method:** `POST`

**Parameters:**

| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
| LobbyId         | string          | yes             | LobbyId |

**Example request:**
```
POST /messages/:lobbyid
Host: https://a2chat.mooo.com
```
Json Body:
```json
{
    "lobbyId": "259156"
}
```

**Example response (If succesful)**: 
```json
{
    "success": true,
    "message": "Message sent!"
}
```
**Example response (If failed)**: 
```
TBD fixing bug  
```


### 5. Send Message
Sends a message

**Endpoint:** `/messages/:lobbyid`

**Method:** `GET`


**Example request:**
```
GET /messages/:lobbyid
Host: https://a2chat.mooo.com
```

**Example response (If succesful)**: 
```json
{
    "success": true,
    "message": "Messages retrieved!",
    "data": []
}
```
**Example response (If failed)**: 
```
TBD fixing bug  
```



































