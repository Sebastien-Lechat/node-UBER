# Toggle double authentification

Used to able or disable double authentification

**URL** : `/account/double-authentification`

**Method** : `POST`

**Auth required** : `YES`

**Data constraints**

```json
{
    "allow": "[Boolean]"
}
```

**Data example**

```json
{
    "allow": "true"
}
```

---

## Success Response

**Code** : `200`

```json
{
    "success": true,
    "allow": true
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

**Condition** : If the user has not set any phone number

**Code** : `BAD REQUEST`

```json
{
    "success": false,
    "error": "No phone number to send double authentification"
}
```
