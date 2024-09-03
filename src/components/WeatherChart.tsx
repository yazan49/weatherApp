import React from 'react';
import {View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {
  secondaryColor,
  screenWidth,
  primaryColor,
  screenHeight,
} from '../constants/costants';

const formatDate = dateString => {
  const date = new Date(dateString);
  const options = {day: '2-digit', month: 'short'};
  return date.toLocaleDateString('en-US', options);
};

const WeatherChart = ({uniqueChartData}: any) => {
  const chartData = {
    labels: uniqueChartData.map(item => formatDate(item.dt_txt.split(' ')[0])),
    datasets: [
      {
        data: uniqueChartData.map(item => item.main.temp),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <LineChart
        width={screenWidth - 35}
        height={screenHeight / 3}
        yAxisInterval={1}
        // bezier
        style={styles.chart}
        data={chartData}
        verticalLabelRotation={30}
        chartConfig={{
          backgroundColor: 'red',
          backgroundGradientFrom: 'black',
          backgroundGradientTo: '#333',
          decimalPlaces: 1,
          color: (opacity = 1) => primaryColor,
          style: {
            borderRadius: 10,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
  chart: {
    borderRadius: 16,
    paddingBottom: 5,
  },
});

export default WeatherChart;
