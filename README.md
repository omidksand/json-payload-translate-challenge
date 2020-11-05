* JSON Payload Translate Challenge
Create a method that translates a JSON payload such that its string values are converted to the proper type.

For example:
- `"true"` should be converted to `true`
- `"20"` should be converted to `20`
(see examples below)

-----

**Input:**
Given a user makes a `POST` request to `https://conversion-service/translate_json`
```json
{
  "name": "John Smith",
  "age": "27",
  "lovesApplyBoard": "true",
  "favoriteColors": ["green", "blue", "red", "4"],
  "favoriteNumber": "null",
  "birth": {
    "location": "Kitchener",
    "year": "1990"
  }
}
```
**Result:**
The user expects to receive a response translated as follows
```json
{
  "name": "John Smith",
  "age": 27,
  "lovesApplyBoard": true,
  "favoriteColors": ["green", "blue", "red", 4],
  "favoriteNumber": null,
  "birth": {
    "location": "Kitchener",
    "year": 1990
  }
}
```