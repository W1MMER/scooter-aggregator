const app = require('express')();
const axios = require('axios');
require('dotenv').config();
const port = process.env.PORT || 3500;

app.listen(port, () => {
  console.log(`Server successfully started and is running on ${port}.`);
});

app.get('/vehicles', async (req, res) => {
  const { swLat, swLng, neLat, neLng, fetchLime } = req.query;

  try {
    if ( !req.query.swLat || !req.query.swLng || !req.query.neLat || !req.query.neLng ) {
      return res.status(400).json({
        success: false,
        msg: 'Params: [swLat, swLng, neLat, neLng] are all required. Please include these in your next request.'
      })
    };

    var data = [];

    if (fetchLime) {
      const response = await axios({
        method: 'get',
        url: 'https://web-production.lime.bike/api/rider/v1/views/map',
        params: {
          ne_lat: neLat,
          ne_lng: neLng,
          sw_lat: swLat,
          sw_lng: swLng,
          user_latitude: neLat,
          user_longitude: neLng,
          zoom: 16
        },
        headers: {
          Authorization: `Bearer ${process.env.LIME_TOKEN}`
        }
      });

      if (!response.data.data.attributes.bikes) {
        console.log('Lime: No vehicles found.');
        return res.json({
          success: true,
          count: 0,
          data
        })
      };
      console.log('Available bikes: ' + response.data.data.attributes.bikes.length);

      response.data.data.attributes.bikes.map((vehicle) => {
        data = [...data, {
          id: vehicle.id,
          code: vehicle.attributes.plate_number,
          status: vehicle.attributes.status,
          lat: vehicle.attributes.latitude,
          lng: vehicle.attributes.longitude,
          battery: vehicle.attributes.battery_percentage,
          provider: 'Lime'
        }];
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