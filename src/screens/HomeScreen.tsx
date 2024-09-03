import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList, SafeAreaView} from 'react-native';
import {primaryColor, screenHeight, screenWidth} from '../constants/costants';
import {useDispatch, useSelector} from 'react-redux';
import {loadHistory} from '../redux/HistoryReducers';
import HistoryCities from '../components/HistoryCities';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({navigation}: any) {
  const dispatch: any = useDispatch();
  const [numbers, setNumbers] = useState<number>(5);
  const data = useSelector(state => state.history.history);

  useEffect(() => {
    dispatch(loadHistory());
  }, [dispatch]);

  const loadMore = () => {
    setNumbers(prevNumber => prevNumber + 5);
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Previously Searched Cities</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data.slice(0, numbers)}
          renderItem={({item}) => (
            <View key={item.name} style={styles.cardContainer}>
              <HistoryCities data={item} navigation={navigation} />
            </View>
          )}
          ListFooterComponent={
            <>
              {numbers < data.length ? (
                <CustomButton
                  title="Load More"
                  onPress={loadMore}
                  btnStyle={{backgroundColor: null, marginTop: 0}}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: primaryColor,
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
});
