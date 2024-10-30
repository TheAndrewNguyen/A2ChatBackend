# A2Chat API documentation 
The A2Chat API offers a range of endpoints for authentication, data storage, and developer tools, designed to support both end users and development teams.
## Base url 
```
https://a2chat.mooo.com
```
---
## Firebase Authentication Endpoints 
### 1. Get current users 
Api call that gets current users in  auth database <br>

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

Json body: 
{
    "uid": "9y2HD7dGCefNo323OduwdXVxuOs1"
}
```

**Example response (If successful)**: 
```
{
    "message": "Sucessfully deleted user: 9y2HD7dGCefNo323OduwdXVxuOs1"
}
```
**Example response (If not successful)**: 
```
{
    "message": "Error deleting user",
    "error": "There is no user record corresponding to the provided identifier."
}
```
---






















---
### 1. template 
Description
**Endpoint:** `/template/template`
**Method:** `template`
**Parameters:**
| Parameter       | Type            | Required        | Description  |
|-----------------|-----------------|-----------------|--------------|
| Row 1, Cell 1   | Row 1, Cell 2   | Row 1, Cell 3   |              |
| Row 2, Cell 1   | Row 2, Cell 2   | Row 2, Cell 3   |              |
**Example request:**
```
template
template 
```
**Example response**: 
```
{
template 
template 
```
---



