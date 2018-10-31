const axios = require('axios');


const Query = {
  hello: (_, { name }) => ({
    message: `Hello ${name || 'World'}`,
    name,
  }),
  async route_plan(_, {from, to, date, time, arriveBy, mode}) {
    const url = `https://otp.goth.app/otp/routers/default/plan`;
    try {
      const params = {
        fromPlace: from,
        toPlace: to,
        date,
        time,
        mode: mode || 'TRANSIT,WALK',
        arriveBy: arriveBy || false,
        wheelchair: false,
        maxWalkDistance: 3000,
        locale: 'en'
      };
      // console.log(params)
      const resp = await axios.get(url, { params });
      // console.log('ok: ', resp.data);
      // console.log(resp.data.plan.itineraries)
      return resp.data.plan;
    } catch (error) {
      // console.log(error);
      return []
    }
  },
  async poi_search(_, { text }) {
    const url = `https://poi.everyday.in.th/v1/search`
    try {
      const params = { text: text }
      const resp = await axios.get(url, { params });
      console.log(resp.data.features)
      return resp.data.features;
    } catch (error) {
      return []
    }
  },
  async reverse_geo(_, {lon, lat}) {
    const url = `https://poi.everyday.in.th/v1/reverse`
    try {
      const params = { 'point.lon': lon, 'point.lat': lat }
      const resp = await axios.get(url, { params });
      console.log(resp.data)
      return resp.data.features;
    } catch (error) {
      return []
    }
  },
}

module.exports = Query;
