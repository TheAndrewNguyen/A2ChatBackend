# A2Chat API documentation 
The A2Chat API offers a range of endpoints for authentication, data storage, and developer tools, designed to support both end users and development teams.
### Base url: 
```
https://a2chat.mooo.com
```
---
## Firebase Authentication Endpoints 

### 1. Delete User 
Api call to delete a user from auth directory 

**Endpoint:** `/auth/deleteUser`

**Method:** `DELETE`

**Parameters:**
| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
|  uid            | string          | Yes             | uid of user to be deleted |

**Example request:**
```
Delete /auth/deleteUser/{uid}
Host: https://a2chat.mooo.com
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
    "error": "Failed to remove user NgoCecjETQcNHubnPV73fKX8cv53 from lobby 265947"
}
```
---
## FireStore Endpoints
### 1. Create Lobby  
Creates a lobby in firestore database. Returns lobby code.

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

**Endpoint:** `/firestore/deleteLobby/{lobbyId}`

**Method:** `DELETE`

**Parameters:**

| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
| lobbyId         | string          | yes             | lobbyId / Document ID |

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
| lobbyId         | string          | yes             | lobbyId /document title|
| uid             | string          | yes             | User ID |

**Example request:**
```
PUT /firestore/addUserToLobby 
Host: https://a2chat.mooo.com
```
Json Body:
```json
{
    "lobbyId": "041946", 
    "uid": "TestUser" 
}

```
**Example response (If succesful)**: 
```json
{
    "message": "user TestUser added succesffuly to lobby"
}
 
```
**Example response (If failed)**: 
```json
{
    "message": "Lobby: 43 does not exists"
}
```
---
### 4. Remove User from Lobby 
Removes user fromy Lobby.  If last user end the lobby

**Endpoint:** `/firestore/removeUsersFromLobby/{lobbyId}/uid`

**Method:** `DELETE`

**Parameters:**


| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
| lobbyId         | string          | yes             | lobbyId /document title|
| uid             | string          | yes             | User ID |

**Example request:**
```
DELETE /firestore/removeUsersFromLobby/265947/NgoCecjETQcNHubnPV73fKX8cv53
Host: https://a2chat.mooo.com
```
**Example response (If succesful and not last user)**: 
```json
{
    "message": "User NgoCecjETQcNHubnPV73fKX8cv53 has been removed from Lobby: 265947"
}
```
**Example response (If succesful and last user)**: 
```json
{
    "message": "Lobby 265947 has been ended by last user"
}
```



**Example response (If failed)**: 
```json
{
    "error": "Failed to remove user NgoCecjETQcNHubnPV73fKX8cv53 from lobby 265947"
}
```




































