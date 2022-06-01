import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { setNewMovies, setRecomendedMovies, addFavorite, incrementFavoritesBadge } from '../actions'
import MovieInfo from '../components/MovieInfo';
import MovieCarousel from '../components/MovieCarousel';

const API_URL = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://10.0.2.2:3000';

const MyHomeScreen = () => {
  const dispatch = useDispatch();
  const { favoritesMovies, recomendedMovies, newMovies } = useSelector(state => state.movies);

  const [selectedMovie, setSelectedMovie] = useState({});
  
  useEffect(() => {
    getRecomendedMovies();
    getNewMovies();
  },[]);

  const getRecomendedMovies = async() => {
    fetch(`${API_URL}/omdb/movies?search=med&type=movie`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async res => { 
      try {
        if (res.status === 200) {
          const jsonRes = await res.json();

          dispatch(setRecomendedMovies(jsonRes));
          setSelectedMovie(jsonRes[0])
        }
      } catch (err) {
        console.log(err);
      };
    })
    .catch(err => {
      console.log(err);
    });
  }

  const getNewMovies = async() => {
    fetch(`${API_URL}/omdb/movies?search=you&type=movie&year=2022`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async res => { 
      try {
        if (res.status === 200) {
          const jsonRes = await res.json();

          dispatch(setNewMovies(jsonRes));
        }
      } catch (err) {
        console.log(err);
      };
    })
    .catch(err => {
      console.log(err);
    });
  }

  const searchMovies = async(search) => {
    fetch(`${API_URL}/omdb/movies?search=${search}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async res => { 
      try {
        if (res.status === 200) {
          const jsonRes = await res.json();

          jsonRes.length > 5 && dispatch(setRecomendedMovies(jsonRes));
        }
      } catch (err) {
        console.log(err);
      };
    })
    .catch(err => {
      console.log(err);
    });
  }

  const addToFavorites = (movie) => {
    const res = favoritesMovies.find(m => m.imdbID === movie.imdbID);
    !res && dispatch(addFavorite(movie)) && dispatch(incrementFavoritesBadge());
  }

  const getIcon = (movie) => {
    const res = favoritesMovies.find(m => m.imdbID === movie.imdbID);

    return !res ? require('../assets/icons8-star-64.png') : require('../assets/favorite.png');
  }

  return (
    <ScrollView style={styles.container}>
      <TextInput style={styles.search} placeholder="Search" onChangeText={(s)=> searchMovies(s)}></TextInput>

      <View>
        <Text style={styles.title}>{'Recomended Movies'}</Text>
        <MovieCarousel data={recomendedMovies} 
          title={'Recomended Movies'} 
          setSelectedMovie={(m) => setSelectedMovie(m)}
          addToFavorites={addToFavorites}
          getIcon={getIcon}/>

        <Text style={styles.title}>{'Movie Discription'}</Text>
        <MovieInfo movie = {selectedMovie}></MovieInfo>

        <Text style={styles.title}>{'New Movies'}</Text>
        <MovieCarousel data={newMovies} 
          title={'New Movies'} 
          setSelectedMovie={(m) => setSelectedMovie(m)}
          addToFavorites={addToFavorites}
          getIcon={getIcon}/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  search: {
    padding: 5,
    backgroundColor: 'white'
  },
  title: {
    fontSize: 17,
    marginTop: '5%',
    marginBottom: 10,
    marginLeft: 10,
    color: 'white',
  }
});

export default MyHomeScreen;