# Delete Account

Used to delete a new account

:warning: This action cannot be reversed

**URL** : `/account`

**Method** : `DELETE`

**Auth required** : `YES`

**Data constraints**

```json
{
    "email": "[valid unique email]",
    "password": "[valid password]",
    "id": "[valid account id]",
}
```

**Data example**

```json
{
    "email": "karen@gmail.com",
    "password": "password987",
    "id": "[valid account id]",
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


**Condition** : If one field isn't valid

**Code** : `BAD REQUEST`

```json
{
    "success": false
}
```

**Condition** : If authentification failed

**Code** : `BAD REQUEST`

```json
{
    "success": false,
    "error": "authentification failed"
}
```

