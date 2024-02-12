import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';
import {ApiResponse, Flight} from '../Interfaces';
import FlightCard from '../components/FlightCard';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../components/Header';
import CheckBox from '@react-native-community/checkbox';

interface FlightSearchScreenProps {
  route: {
    params: {
      departureCity: string;
      destinationCity: string;
      departureDate: string;
    };
  };
}

const FlightSearchScreen: React.FC<FlightSearchScreenProps> = ({
  route,
  navigation,
}) => {
  const {departureCity, destinationCity, departureDate} = route.params;
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortByPrice, setSortByPrice] = useState<boolean>(false);
  const [uniqueFlightNames, setUniqueFlightNames] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiResponse>(
          'https://api.npoint.io/4829d4ab0e96bfab50e7',
        );
        const allFlights = response.data.data.result;
        console.log(allFlights[0].displayData.airlines[0].airlineName);
        const flightNames = allFlights.map(
          (flight: Flight) => flight.displayData.airlines[0].airlineName,
        );
        const uniqueNames = Array.from(new Set(flightNames));
        setUniqueFlightNames(uniqueNames);
        const filteredFlights = allFlights.filter(
          (flight: Flight) =>
            flight.displayData.source.airport.cityName === departureCity &&
            flight.displayData.destination.airport.cityName ===
              destinationCity &&
            flight.displayData.source.depTime.split('T')[0] === departureDate,
        );
        setFlights(filteredFlights);
        setFilteredFlights(filteredFlights);
        setIsLoading(false);
      } catch (error) {
        setError('Error fetching flight data');
        setIsLoading(false);
      }
    };

    fetchData();
  }, [departureCity, destinationCity, departureDate]);

  const handleSortByPrice = () => {
    const sortedFlights = [...filteredFlights];
    sortedFlights.sort((a, b) => a.fare - b.fare);
    setFilteredFlights(sortedFlights);
    setSortByPrice(true);
  };

  const handleResetFilters = () => {
    setFilteredFlights(flights);
    setSortByPrice(false);
  };

  const toggleFilterModal = () => {
    setShowFilterModal(!showFilterModal);
  };

  const handleFilterSelection = (selectedFlight: string) => {
    const updatedFilters = [...selectedFilters];
    if (selectedFilters.includes(selectedFlight)) {
      const index = updatedFilters.indexOf(selectedFlight);
      updatedFilters.splice(index, 1);
    } else {
      updatedFilters.push(selectedFlight);
    }
    setSelectedFilters(updatedFilters);
  };

  const applyFilters = () => {
    if (selectedFilters.length === 0) {
      setFilteredFlights(flights);
    } else {
      const filtered = flights.filter(flight =>
        selectedFilters.includes(flight.displayData.airlines[0].airlineName),
      );
      setFilteredFlights(filtered);
    }
    setShowFilterModal(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Header onPress={() => navigation.goBack()} />
      <View style={{paddingHorizontal: 20}}>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 10}}>
          Flight Search Screen
        </Text>
        <Text>Total Flights: {filteredFlights.length}</Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            style={[styles.filterButton, sortByPrice && styles.activeFilter]}
            onPress={handleSortByPrice}>
            <Text style={styles.filterButtonText}>Sort by Price</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, styles.filterButton]}
            onPress={toggleFilterModal}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterButton, styles.resetFilterButton]}
            onPress={handleResetFilters}>
            <Text style={styles.resetFilterButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredFlights}
          keyExtractor={item => item.id}
          renderItem={({item}) => <FlightCard flight={item} />}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={showFilterModal}
          onRequestClose={toggleFilterModal}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Airlines to Filter</Text>
              {uniqueFlightNames.map(flightName => (
                <View key={flightName} style={styles.checkboxContainer}>
                  <CheckBox
                    value={selectedFilters.includes(flightName)}
                    onValueChange={() => handleFilterSelection(flightName)}
                  />
                  <Text>{flightName}</Text>
                </View>
              ))}
              <TouchableOpacity
                onPress={applyFilters}
                style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

const styles = {
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  activeFilter: {
    backgroundColor: '#007bff',
  },
  filterButtonText: {
    color: '#007bff',
  },
  resetFilterButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  resetFilterButtonText: {
    color: '#333',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  applyButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
  },
};

export default FlightSearchScreen;
