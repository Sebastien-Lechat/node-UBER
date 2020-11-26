# Change password

Used to change password

**URL** : `/account/change-password`

**Method** : `POST`

**Auth required** : `YES`

**Data constraints**

```json
{
    "email": "[valid email]",
    "oldPassword": "[valid old password]",
    "newPassword": "[valid new password]"
}
```

**Data example**

```json
{
    "email": "karen@gmail.com",
    "oldPassword": "éxynèi27HID",
    "newPassword": "2PH9X2IDUH2I",
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

**Condition** : If one field in missing or Invalid

**Code** : `BAD REQUEST`

```json
{
    "success": false
}
```