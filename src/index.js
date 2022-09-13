const app = require('express')();
const axios = require('axios');
const turf = require('@turf/turf')
const polyline = require('polyline');
require('dotenv').config();
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server successfully started and is running on ${port}.`);
  if (!process.env.LIME_TOKEN) {
    console.log('Please add a Lime Token to get started.');
  } else {
    console.log(`Ready. Run your first API call!`);
  };
});

app.get('/vehicles', async (req, res) => {
  const { ne_lat, ne_lng, sw_lat, sw_lng, filters, minimum_battery } = req.query;

  try {
    if (!ne_lat || !ne_lng || !sw_lat || !sw_lng || !filters) {
      return res.status(400).json({
        success: false,
        msg: 'Bad request. Params: [ne_lat, ne_lng, sw_lat, sw_lng, filters] are required.'
      });
    };

    var data = [];

    // const p = turf.point([parseInt(ne_lng), parseInt(ne_lat)]);
    // buffer = turf.buffer(p, 0.1, {units: 'meters'});
    // bbox = turf.bbox(buffer);
    // poly = turf.bboxPolygon(bbox);
    // console.log(bbox);

    if (filters && filters.toLowerCase().includes('lime')) {
      const response = await axios({
        method: 'get',
        url: 'https://web-production.lime.bike/api/rider/v1/views/map',
        params: {
          ne_lat,
          ne_lng,
          sw_lat,
          sw_lng,
          user_latitude: ne_lat,
          user_longitude: ne_lng,
          zoom: 16
        },
        headers: {
          Authorization: `Bearer ${process.env.LIME_TOKEN}`
        }
      });

      const { bikes } = response.data.data.attributes;
      if (!bikes) {
        console.log('Lime: No vehicles found.');
        return res.json({
          success: true,
          count: 0,
          data
        });
      };

      console.log('Available bikes: ' + bikes.length);
      bikes.map((vehicle) => {
        if (minimum_battery && vehicle.attributes.battery_percentage >= minimum_battery) {
          data = [...data, {
            provider: 'Lime',
            id: vehicle.id,
            code: vehicle.attributes.plate_number,
            status: vehicle.attributes.status,
            lat: vehicle.attributes.latitude,
            lng: vehicle.attributes.longitude,
            battery: vehicle.attributes.battery_percentage,
            generation: vehicle.attributes.generation
          }];
        };
        if (!minimum_battery) {
          data = [...data, {
            provider: 'Lime',
            id: vehicle.id,
            code: vehicle.attributes.plate_number,
            status: vehicle.attributes.status,
            lat: vehicle.attributes.latitude,
            lng: vehicle.attributes.longitude,
            battery: vehicle.attributes.battery_percentage,
            generation: vehicle.attributes.generation
          }];
        };
      });
    };

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: `Something went wrong. ${error.message}`
    });
  };
});

app.get('/zones', async (req, res) => {
  const { ne_lat, ne_lng, sw_lat, sw_lng, filters, coordinates_output_type } = req.query;

  try {
    if (!ne_lat || !ne_lng || !sw_lat || !sw_lng || !filters || !coordinates_output_type) {
      return res.status(400).json({
        success: false,
        msg: 'Bad request. Params: [ne_lat, ne_lng, sw_lat, sw_lng, filters, coordinates_output_type] are required.'
      });
    };
    if (coordinates_output_type !== 'geojson' && coordinates_output_type !== 'polyline') {
      return res.status(400).json({
        success: false,
        msg: 'Bad request. Param "coordinates_output_type" must match [geojson, polyline].'
      });
    };

    var data = [];

    if (filters && filters.toLowerCase().includes('lime')) {
      const response = await axios({
        method: 'get',
        url: 'https://web-production.lime.bike/api/rider/v1/views/map',
        params: {
          ne_lat,
          ne_lng,
          sw_lat,
          sw_lng,
          user_latitude: ne_lat,
          user_longitude: ne_lng,
          zoom: 16
        },
        headers: {
          Authorization: `Bearer ${process.env.LIME_TOKEN}`
        }
      });

      const { zones } = response.data.data.attributes;
      if (!zones) {
        console.log('Lime: No zones found.');
        return res.json({
          success: true,
          count: 0,
          data
        })
      };

      if (coordinates_output_type === 'geojson') {
        zones.map((zone) => {
          data = [...data, {
            id: zone.id,
            name: zone.attributes.name,
            type: zone.attributes.category,
            area: {
              type: 'geojson',
              coordinates: polyline.decode(zone.attributes.polyline)
            },
            lat: zone.attributes.icon_latitude,
            lng: zone.attributes.icon_longitude,
            vehicle_types: zone.attributes.associated_vehicle_types,
            provider: 'Lime'
          }];
        });
      } else {
        zones.map((zone) => {
          data = [...data, {
            id: zone.id,
            name: zone.attributes.name,
            type: zone.attributes.category,
            area: {
              type: 'polyline',
              coordinates: zone.attributes.polyline
            },
            lat: zone.attributes.icon_latitude,
            lng: zone.attributes.icon_longitude,
            vehicle_types: zone.attributes.associated_vehicle_types,
            provider: 'Lime'
          }];
        });
      }
    };

    res.json({
      success: true,
      count: data.length,
      data
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: `Something went wrong. ${error.message}`
    });
  };
});