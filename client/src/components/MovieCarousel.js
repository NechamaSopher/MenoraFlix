import { StyleSheet, Dimensions, TouchableOpacity, ImageBackground, View, Image } from "react-native";
import Carousel from 'react-native-snap-carousel';

const MovieCarousel = (props) => {
  const { data, getIcon, addToFavorites, setSelectedMovie } = props;
  
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={()=> setSelectedMovie(item)}>
        <ImageBackground source={{uri: item.Poster}} style={styles.image}>
          <View style={styles.bottemBanner}>
            <TouchableOpacity onPress={()=> addToFavorites(item)}>
              <Image style={styles.star} source={getIcon(item)}></Image>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    )
  }

  return (
    <Carousel
      data={data}
      renderItem={renderItem}
      itemWidth={Dimensions.get('window').width * 0.33}
      sliderWidth={Dimensions.get('window').width}
      removeClippedSubviews={false}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
      activeSlideAlignment="start"
      slideStyle={{ flex: 1, marginRight: 10}}/>
  );
};

const styles = StyleSheet.create({
  image: {
    height: 150,
    alignItems: 'center',
    backgroundColor:'red',
    justifyContent: 'flex-end',
  },
  star: {
    marginTop:5,
    height: 20,
    width: 20,
    tintColor: 'white'
  },
  bottemBanner: {
    height: '20%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    alignItems: 'center'
  }
});
  
export default MovieCarousel;