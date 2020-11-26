# Verify phone

Used to verify your phone number after creating an account or after changing your phone number

**URL** : `/account/verify-phone`

**Method** : `POST`

**Auth required** : `NO`

**Data constraints**

```json
{
    "phone": "[valid phone]",
    "code": "[Code received by route /account/request-verify-phone]"
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