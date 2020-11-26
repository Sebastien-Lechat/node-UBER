# Request code verify phone

Used to get an sms with a code to verify your phone number. The code is valid for 10 minutes.

**URL** : `/account/request-verify-phone`

**Method** : `POST`

**Auth required** : `NO`

**Data constraints**

```json
{
    "email": "[valid email]"
}
```

**Data example**

```json
{
    "email": "karen@gmail.com"
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

**Condition** : If one field is missing or invalid

**Code** : `BAD REQUEST`

```json
{
    "success": false
}
```