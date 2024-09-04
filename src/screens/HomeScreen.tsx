import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {
  backgroundColor,
  screenHeight,
  screenWidth,
} from '../constants/costants';
import {useDispatch, useSelector} from 'react-redux';
import {loadHistory} from '../redux/HistoryReducers';
import HistoryCities from '../components/HistoryCities';
import CustomButton from '../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import LoadingIndicator from '../components/LoadingIndicatior';

export default function HomeScreen() {
  const navigation: any = useNavigation();
  const dispatch: any = useDispatch();
  const [numbers, setNumbers] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const data: any = useSelector<any>(state => state.history.history);

  useEffect(() => {
    dispatch(loadHistory());
    setIsLoading(false);
  }, [dispatch]);

  const loadMore = () => {
    setNumbers(prevNumber => prevNumber + 5);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {data.length === 0
            ? 'Welcome to Weather App'
            : 'Previously Searched Cities'}
        </Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.slice(0, numbers)}
          renderItem={({item}) => (
            <View key={item.name} style={styles.cardContainer}>
              <HistoryCities data={item} />
            </View>
          )}
          ListFooterComponent={
            <>
              {numbers < data.length ? (
                <CustomButton
                  title="Load More"
                  onPress={loadMore}
                  btnStyle={{backgroundColor: 'transparent', marginTop: 2}}
                />
              ) : null}
            </>
          }
          style={styles.list}
        />
        <CustomButton
          title="Search"
          onPress={() => navigation.navigate('Search')}
        />
      </View>
      {isLoading && <LoadingIndicator />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: backgroundColor,
  },
  container: {
    flex: 1,
    paddingHorizontal: screenWidth * 0.04,
    paddingBottom: screenHeight * 0.02,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: screenHeight * 0.02,
    color: 'white',
    marginTop: screenHeight * 0.01,
  },
  list: {
    flex: 1,
  },
  searchButton: {
    marginBottom: screenHeight * 0.02,
  },
  loadMore: {
    backgroundColor: 'red',
  },
  cardContainer: {
    paddingVertical: screenHeight * 0.007,
  },
  loading: {
    justifyContent: 'center',
    width: '100%',
  },
});
