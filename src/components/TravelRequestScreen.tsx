import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

const TravelRequestScreen: React.FC = () => {
  const [departureCity, setDepartureCity] = useState('');
  const [destinationCity, setDestinationCity] = useState('');
  const [departureDate, setDepartureDate] = useState('31-03-2023');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();

  const handleSearchFlights = () => {
    // Navigate to FlightSearchScreen with search parameters
    navigation.navigate('FlightSearch', {
      departureCity,
      destinationCity,
      departureDate: '2023-03-31',
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Travel Request</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Departure City"
          value={departureCity}
          onChangeText={setDepartureCity}
          style={styles.input}
        />
        <TextInput
          placeholder="Destination City"
          value={destinationCity}
          onChangeText={setDestinationCity}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={() => setOpen(true)}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{departureDate}</Text>
        </View>
      </TouchableOpacity>
      {open && (
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={pickedDate => {
            setOpen(false);
            setDate(pickedDate);
            setDepartureDate(
              `${
                pickedDate.getMonth() + 1
              }-${pickedDate.getDate()}-${pickedDate.getFullYear()}`,
            );
          }}
          mode="date"
          onCancel={() => setOpen(false)}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSearchFlights}>
        <Text style={styles.buttonText}>Search Flights</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9,
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
    width: Dimensions.get('window').width * 0.9,
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: Dimensions.get('window').width * 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TravelRequestScreen;
