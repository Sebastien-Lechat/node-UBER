# Create History

Used to create a new history

**URL** : `/direction`

**Method** : `POST`

**Auth required** : `YES`

**Data constraints**

**NOTE**
Not all data are mandatory.

```json
{
  "origin": "[valid origin address]",
  "destination": "[valid destination address]",
  "waypoints?": ["Array of valid waypoints address"]
}
```

---

**Data example**

```json
{
  "origin": "Paris",
  "destination": "Bordeaux",
  "waypoints?": ["Juvisy", "Marseille", "Lille"]
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

**Condition** : If we don't send origin or destination

**Code** : `400`

```json
{
  "success": false,
  "message": "Invalid body"
}
```
