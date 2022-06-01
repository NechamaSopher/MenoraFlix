import { Image, StyleSheet, Text, View } from "react-native";

const MovieInfo = (props) => {
  const { movie } = props;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.discriptionImage}
          source={{uri: movie.Poster}}></Image>
      </View>

      <View style={styles.card}>
        <Text style={styles.infoTitle}>{movie.Title}</Text>
        <Text style={styles.infoText}>{'Year: ' + movie.Year}</Text>
        <Text style={styles.infoText}>{'imdbID: ' + movie.imdbID}</Text>
        <Text style={styles.infoText}>{'Type: ' + movie.Type}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  card: {
    width: '45%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  infoTitle: {
    color: 'white',
    fontSize: 15,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginBottom: 35,
    marginTop: 10
  },
  infoText: {
    color: 'white',
    marginLeft: 10,
    marginBottom: 5
  },
  discriptionImage: {
   height: '100%',
   width: '100%'
  }
});
  
export default MovieInfo;