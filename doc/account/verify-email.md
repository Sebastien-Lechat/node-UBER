# Verify Email

Used to verify your email adresse after creating an account or after changing your email adress

**URL** : `/account/verify-email`

**Method** : `POST`

**Auth required** : `NO`

**Data constraints**

```json
{
    "email": "[valid email]",
    "code": "[Code received by route /account/request-verify-email]"
}
```

**Data example**

```json
{
    "email": "karen@gmail.com",
    "code": "975261"
}
```

---

## Success Response

**Code** : `200`

```json
{
    "success": true 
}
```

---

## Error Response

**Condition** : If one field is missing or if the code is invalid.

**Code** : `BAD REQUEST`

```json
{
    "success": false
}
```

**Condition** : If code has been send more than 10 minute after it has been requested

**Code** : `BAD REQUEST`

```json
{
    "success": false,
    "message": "Code is no longer valid"
}
```