# Login double authentification

Used to request to send a code by phone for double authentification.

**URL** : `/account/request-double-authentification`

**Method** : `POST`

**Auth required** : `NO`

**Data constraints**

```json
{
    "email": "[valid unique email]",
    "password": "[valid password]"
}
```

**Data example**

```json
{
    "email": "karen@gmail.com",
    "password": "S2PH28TG6+D8ee"
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

**Condition** : If one field is missing

**Code** : `BAD REQUEST`

```json
{
    "success": false,
    "error": "Field [X] is missing."
}
```