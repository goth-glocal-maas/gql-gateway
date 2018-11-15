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
        mode: mode || 'WALK,TRANSIT',
        arriveBy: arriveBy || false,
        wheelchair: false,
        maxWalkDistance: 5000,
        locale: 'en'
      };
      //console.log(params)
      const resp = await axios.get(url, { params });
      // console.log('ok: ', resp.data);
      //console.log('resp: ', resp.data)
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
  async stops(_, { min_lat, min_lon, max_lat, max_lon }) {
    const url = `https://otp.goth.app/otp/routers/default/index/stops`
    try {
      const params = {
        minLat: min_lat,
        minLon: min_lon,
        maxLat: max_lat,
        maxLon: max_lon,
      }
      const resp = await axios.get(url, { params })
      return resp.data
    } catch (error) {
      return []
    }
  },
  async stop_detail(_, { stop_id }) {
    const url = `https://otp.goth.app/otp/routers/default/index/stops/${stop_id}`
    try {
      const resp = await axios.get(url)
      return resp.data
    } catch (error) {
      return []
    }
  },
  async stop_route(_, { stop_id }) {
    const url = `https://otp.goth.app/otp/routers/default/index/stops/${stop_id}/routes`
    try {
      const resp = await axios.get(url)
      return resp.data
    } catch (error) {
      return []
    }
  },
  async stop_stoptimes(_, { stop_id }) {
    const url = `https://otp.goth.app/otp/routers/default/index/stops/${stop_id}/stoptimes`
    try {
      const resp = await axios.get(url)
      return resp.data
    } catch (error) {
      return []
    }
  },
}

module.exports = Query;
