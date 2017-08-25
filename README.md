# ISO 3166-1 and ISO 3166-2 codes
Wikipedia scraper to obtain a list in JSON format with all current codes from ISO 3166-1 and ISO 3166-2

# Working
First, it parse the "current codes" section of ISO 3166-1 from wikipedia URL. (Countries)

https://en.wikipedia.org/wiki/ISO_3166-1

By last, it parse the "current codes" section of ISO 3166-2 from wikipedia URL obtained from each country code. (Subdivisions)

https://en.wikipedia.org/wiki/ISO_3166-2:ES

# Output
The result is an object like this:
```json
{
  "ES": {
    "english_short_name": "Spain",
    "alpha_2_code": "ES",
    "alpha_3_code": "ESP",
    "numeric_3_code": "724",
    "subdivisions": {
      "ES-AN": {
        "english_short_name": "Andalucía",
        "alpha_2_code": null,
        "alpha_3_code": null,
        "numeric_3_code": "ES-AN"
      },
      "ES-AR": {
        "english_short_name": "Aragón",
        "alpha_2_code": null,
        "alpha_3_code": null,
        "numeric_3_code": "ES-AR"
      },
      ...
    }
  }
}
```
* **english_short_name**: country name
* **alpha_2_code**: ISO 3166-1 alpha-2 codes (two-letter country codes defined in ISO 3166-1)
* **alpha_3_code**: ISO 3166-1 alpha-3 codes (three-letter country codes defined in ISO 3166-1)
* **numeric_3_code**: ISO 3166-1 numeric codes (three-digit country codes defined in ISO 3166-1)
* **subdivisions**: object containing country subdivision codes (codes for the names of the principal subdivisions (e.g., provinces or states) of all countries coded in ISO 3166-1). 
