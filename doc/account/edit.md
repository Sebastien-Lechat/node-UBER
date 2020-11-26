# Edit Account

Used to edit existing account informations

**URL** : `/account`

**Method** : `PUT`

**Auth required** : `YES`

**Data constraints**

**NOTE**
Not all data are mandatory.

```json
{
    "name": "[Current name or new name]",
    "email": "[Current email or new valid email]",
    "picture": "[Current picture or new valid picture]",
    "phone": "[Current password or new valid password]",
    "password": "[Current password, used to validate identity]"
}
```

**Data example**

```json
{
    "name": "Karen Paul",
    "email": "karen@gmail.com",
    "picture": "[raw picture]",
    "phone": "+33611223344",
    "password": "a987YRF2HYOP8"
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
    "picture": "[raw picture]",
    "phone": "+33611223344"
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
    "success": false,
    "error": "Field [X] is not valid."
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
