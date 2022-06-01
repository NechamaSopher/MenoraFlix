import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useIsFocused } from "@react-navigation/core";

import { resetFavoriteBadge } from '../actions';
import MovieInfo from '../components/MovieInfo';

const FavoritesScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.movies.favoritesMovies);

  useEffect(() => { isFocused && dispatch(resetFavoriteBadge()) },[isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.view}>
      { favorites.length ? favorites.map((movie, index) => { 
       return(
        <View key={index} style={styles.movie}>
          <Text style={styles.title}>{movie.Title}</Text>
          <MovieInfo movie={movie}></MovieInfo>
        </View>
       )})
        : <Text style={styles.noFavorites}>{'No Favorites Movies Yet...'}</Text>
      }
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  view: {
    marginTop: 20
  },
  title: {
    fontSize: 17,
    marginLeft: 10,
    marginBottom: 10,
    color: 'white',
  },
  movie: {
    marginBottom: 15,
    marginTop: 15
  },
  noFavorites: {
    marginTop: '70%',
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white'
  }
})

export default FavoritesScreen;