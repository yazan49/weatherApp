import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {screenHeight, secondaryColor} from '../constants/costants';
import {useDispatch} from 'react-redux';
import {removeFromHistoryAndSave} from '../redux/HistoryReducers';
import Remove from '../assets/svg/Remove';
import {useNavigation} from '@react-navigation/native';

export default function HistoryCities({data}: any) {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();

  const handlePress = () => {
    if (data.name) {
      navigation.navigate('Details', {city: data.name});
    }
  };

  const handleRemove = () => {
    console.log('remove', data.name);
    dispatch(removeFromHistoryAndSave(data));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.card}>
        <Image
          style={styles.icon}
          source={require('../assets/images/shop3.png')}
        />
        <Text style={styles.cityName}>{data.name}</Text>
        <TouchableOpacity onPress={handleRemove}>
          <Remove />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    borderRadius: 8,
    padding: screenHeight * 0.015,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3,
    justifyContent: 'space-between',
  },
  icon: {
    width: 50,
    height: 50,
  },
  cityName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  xButton: {
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 5,
    paddingVertical: 2,
    justifyContent: 'center',
  },
  xButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
  },
});
