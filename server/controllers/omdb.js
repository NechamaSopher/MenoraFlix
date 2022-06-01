const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const url = process.env.OMDB_API;

const getMovies = (req, res) => {
  const { search, year, type } = req.query;
  const y = year ? year : '';
  const t = type ? type : '';
  
  axios.get(`${url}&s=${search}&t=${t}&y=${y}`)
  .then(({ data }) => {
    if (!data.Search) return res.status(404).json({message: "movies not found"});
    
    const list = data.Search.filter(d => d.Poster !== 'N/A');

    res.send(list)
  })
  .catch(error => {
    console.log(error);
  });
}

module.exports = { getMovies };
