# Create History

Used to create a new history

**URL** : `/history`

**Method** : `POST`

**Auth required** : `YES`

**Data constraints**

```json
{
    "user_id": "[valid unique ID]",
    "departure_location": "[valid departure location]",
    "arrival_location": "[valid arrival location]", 
}
```

---

**Data example**

```json
{
    "user_id": "2kJ3jqcO5g",
    "departure_location": "Paris",
    "arrival_location": "Boulogne", 
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

**Condition** : If we send an invalid user_id

**Code** : `400`

```json
{
  "success": false,
  "error": "Invalid user ID"
}
```



