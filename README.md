# Scooter Aggregator

Providers (with more coming in the future):
- Lime

## How to use:
- Clone
- Rename .env.example to .env and add your Lime token [Instructions](https://github.com/ubahnverleih/WoBike/blob/master/Lime.md)
- Run `npm install` to install dependencies then `npm start` to start it.
- Send GET request to http://localhost:3500/vehicles with params: swLat, swLng, neLat, neLng to get vehicles.

Response:
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "id": "ET-7KYAGBIWC5V3UZDNYU5RAQRO2KHPRI4IJUODZXI",
            "code": "XXX-410",
            "status": "locked",
            "lat": -43.53248,
            "lng": 172.633915,
            "battery": 81,
            "provider": "Lime"
        },
        {
            "id": "ET-J6SCPERGHEGLSPT7OLTLWNXNYO7OMYZ7A7TQTJY",
            "code": "XXX-878",
            "status": "locked",
            "lat": -43.532474,
            "lng": 172.633909,
            "battery": 55,
            "provider": "Lime"
        }
    ]
}
```