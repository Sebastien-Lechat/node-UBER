# Create Account

Used to login to an account

**URL** : `/account/login`

**Method** : `POST`

**Auth required** : `NO`

**Data constraints**

```json
{
    "email": "[valid unique email]",
    "password": "[valid password]",
    "code": "[Valid code, required only if double authentification is activated]"
}
```

**Data example**

```json
{
    "email": "karen@gmail.com",
    "password": "password987",
    "code": "468074"
}
```

---

## Success Response

**Code** : `200`

```json
{
    "success": true,
    "name": "Karen Paul",
    "email": "karen@gmail.com",
    "picture": "[raw picture]", // Will be added later
    "phone": "+33611223344",
    "id": "[id]",
    "token": "[token]",
    "refresh_token": "[token]",
    "phone_verified": "[boolean]"
}
```

---

## Error Response

**Condition** : If one field is missing

**Code** : `BAD REQUEST`

```json
{
    "success": false,
    "error": "Field [X] is missing."
}
```


**Condition** : If one field doesn't match the database result

**Code** : `BAD REQUEST`

```json
{
    "success": false,
    "error": "Invalid username or password."
}
```
