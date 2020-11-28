# Get History

Used to get history of a user

**URL** : `/history`

**Method** : `GET`

**Auth required** : `YES`

**Data constraints**

```json
{}
```

---

**Data example**

```json
{}
```

---

## Success Response

**Code** : `200`

```json
{
  "date" : 
  "departure_location" : "Paris"
  "arrival_location": "Boulogne"
  "map" : "https://www.google.fr/maps/place/Ch%C3%A2telet+-+Les+Halles/@48.8620508,2.3449645,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e18c54f2257:0xb0fc90f7e38cba9f!8m2!3d48.8620508!4d2.3471532"
  "history_id" : "2jga19hfaoK"
}
```

---

## Error Response

**Condition** : If we have and error returned by the database

**Code** : `400`

```json
{
  "success" : false
  "error" : mongoDB error
}
```
**Condition** : If the user_id is invalid

**Code** : `400`

```json
{
  "success" : false
  "error" : "Invalid user ID"
}
```


