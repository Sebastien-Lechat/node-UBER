# Create History

Used to create a new history

**URL** : `/history`

**Method** : `POST`

**Auth required** : `YES`

**Data constraints**

```json
{
  "departure_location": "[valid departure location]",
  "arrival_location": "[valid arrival location]",
  "map": "[valid map link]"
}
```

---

**Data example**

```json
{
  "departure_location": "Paris",
  "arrival_location": "Boulogne",
  "map": "https://www.google.fr/maps/place/Ch%C3%A2telet+-+Les+Halles/@48.8620508,2.3449645,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e18c54f2257:0xb0fc90f7e38cba9f!8m2!3d48.8620508!4d2.3471532"
}
```

---

## Success Response

**Code** : `201`

```json
{
  "success": true
}
```

---

## Error Response

**Condition** : If we don't send all data

**Code** : `400`

```json
{
  "success": false,
  "message": "[MongoDB Error]"
}
```
