# Scooter Aggregator

Providers:
- Lime
- More coming in the future!

## Usage:
### Installation
- Clone
- Rename .env.example to .env and add your Lime token. ([instructions](https://github.com/ubahnverleih/WoBike/blob/master/Lime.md))
- Run `npm install` to install dependencies and then `npm start` to start it.

**Get Vehicles**:

GET http://localhost:3500/vehicles
| Parameters | Description                   | Mandatory |
| ---------- | ----------------------------- | :-------: |
| ne_lat     | north-east latitude           | X         |
| ne_lng     | north-east longitude          | X         |
| sw_lat     | south-west latitude           | X         |
| sw_lng     | south-west longitude          | X         |
| filters    | array with companies ["lime"] | X         |

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

**Get Zones**:

GET http://localhost:3500/zones
| Parameters              | Description                   | Mandatory |
| ----------------------- | ----------------------------- | :-------: |
| ne_lat                  | north-east latitude           | X         |
| ne_lng                  | north-east longitude          | X         |
| sw_lat                  | south-west latitude           | X         |
| sw_lng                  | south-west longitude          | X         |
| filters                 | array with companies ["lime"] | X         |
| coordinates_output_type | ["geojson" **OR** "polyline"] | X         |

Response (Polyline):
```json
{
    "success": true,
    "count": 2,
    "data": [
        {
            "id": "LPAIXU6PU2GMR",
            "name": "[Christchurch][SZ][CHCH_SERVICED_AREA]",
            "type": "service_zone",
            "coordinates": {
                "type": "polyline",
                "area": "nnvhG}b_|_@rV|iBdd@pOf_@gr@r}A}bC~F|L|GqIhB_BZaC~CyDRgEdCc@lQs\\xKjMht@euAxJqQ``@ku@VcD{@yi@tR_ADwaAq^ik@_JsyBsj@owA{WjClG}X|_@s|@aQkc@kXzJlUgo@eGkm@k}@kARyc@id@ubAxq@yfAtA_t@a@mU~FmQ|JcLjLuJnNwGvWoBwD}OuHqJeTgA`PoTn@sNgfApZlj@_fAfBw[_q@c]kE{VdJ}X~ZoBnDwe@hQef@xm@rSgEo^eh@{{@xEuZuFse@mg@`DwLbLoVuAgnQbyHcVdaDh\\j{A}QdRiGbo@aSroI{Gf}Elo@nbDdfBlsAxtH`sBBB"
            },
            "lat": "-43.53026",
            "lng": "172.64023",
            "vehicle_types": [
                "electric",
                "scooter"
            ],
            "provider": "Lime"
        },
        {
            "id": "SCKYPBHZ245Q6",
            "name": "[Christchurch][LSZ][[Christchurch][Central Low Speed]]",
            "type": "low_speed_zone",
            "coordinates": {
                "type": "polyline",
                "area": "dwuhGmot|_@Cmc@}@B{H~MDfTpARjBz@n@f@hCuB"
            },
            "lat": "-43.533155",
            "lng": "172.63629",
            "vehicle_types": [
                "electric",
                "scooter"
            ],
            "provider": "Lime"
        }
    ]
}
```

Response (GeoJSON):
```json
{
    "success": true,
    "count": 3,
    "data": [
        {
            "id": "LPAIXU6PU2GMR",
            "name": "[Christchurch][SZ][CHCH_SERVICED_AREA]",
            "type": "service_zone",
            "coordinates": {
                "type": "geojson",
                "area": [
                    [
                        -43.53784,
                        172.52415
                    ],
                    [
                        -43.54162,
                        172.50704
                    ],
                    [
                        -43.54757,
                        172.50439
                    ],
                    ...
                ]
            },
            "lat": "-43.53026",
            "lng": "172.64023",
            "vehicle_types": [
                "electric",
                "scooter"
            ],
            "provider": "Lime"
        },
        {
            "id": "SCKYPBHZ245Q6",
            "name": "[Christchurch][LSZ][[Christchurch][Central Low Speed]]",
            "type": "low_speed_zone",
            "coordinates": {
                "type": "geojson",
                "area": [
                    [
                        -43.53411,
                        172.63367
                    ],
                    [
                        -43.53409,
                        172.6395
                    ],
                    [
                        -43.53378,
                        172.63948
                    ],
                    [
                        -43.5322,
                        172.63708
                    ],
                    [
                        -43.53223,
                        172.63368
                    ],
                    [
                        -43.53264,
                        172.63358
                    ],
                    [
                        -43.53318,
                        172.63328
                    ],
                    [
                        -43.53342,
                        172.63308
                    ],
                    [
                        -43.53411,
                        172.63367
                    ]
                ]
            },
            "lat": "-43.533155",
            "lng": "172.63629",
            "vehicle_types": [
                "electric",
                "scooter"
            ],
            "provider": "Lime"
        }
    ]
}
```
