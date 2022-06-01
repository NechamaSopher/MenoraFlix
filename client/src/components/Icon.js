import React from 'react';
import { Image, Text } from "react-native";
import { useSelector} from 'react-redux';
import IconBadge from 'react-native-icon-badge';

const Icon = () => {
  const badge = useSelector(state => state.movies.favoritesBadge);

  return (
    <IconBadge
      MainElement={
        <Image
          source={require('../assets/icons8-star-64.png')}
          style={{ height: 30, width: 30, tintColor: 'white' }}/>
      }
      BadgeElement={
        <Text style={{ color: 'white' }}>{badge}</Text>
      }
      IconBadgeStyle={{
        top: -2,
        right: -7,
        width: 20,
        height: 20,
        backgroundColor: 'red'
      }}
      Hidden={badge === 0} 
    />
  );
  }
  
  export default Icon;