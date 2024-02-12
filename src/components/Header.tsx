import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons'; // Import the Icon component

const Header = ({onPress}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        {/* <Icon name="arrow-back" size={24} color="#007bff" />{' '} */}
        {/* Use an arrow icon */}
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>JetSetGo</Text>
      {/* Add more header content here if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 4,
    width: '100%',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Header;
