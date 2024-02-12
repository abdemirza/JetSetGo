import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Flight} from '../utils/Interfaces';

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({flight}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flight Details</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Flight ID:</Text>
          <Text style={styles.detailValue}>{flight.id}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Price:</Text>
          <Text style={styles.detailValue}>{flight.fare}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Departure:</Text>
          <Text style={styles.detailValue}>
            {flight.displayData.source.airport.airportName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Source:</Text>
          <Text style={styles.detailValue}>
            {flight.displayData.source.airport.cityName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Destination:</Text>
          <Text style={styles.detailValue}>
            {flight.displayData.destination.airport.airportName}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Flight Name:</Text>
          <Text>{flight.displayData.airlines[0].airlineName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: Dimensions.get('window').width * 0.9,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detailsContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 5,
    marginBottom: 10,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: '#666',
  },
  detailValue: {
    color: '#333',
  },
});

export default FlightCard;
