// components/SearchDropdown.js
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
} from 'react-native';

const SearchDropdown = ({ options, onSelect }) => {
  const [visible, setVisible] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');

  const handleSelect = (option) => {
    setSelectedOption(option);
    setVisible(false);
    setSearchText('');
    if (onSelect) {
      onSelect(option);
    }
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setVisible(true)}
      >
        <Text style={styles.buttonText}>
          {selectedOption ? selectedOption.label : 'Select an option'}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                value={searchText}
                onChangeText={setSearchText}
              />
              {searchText ? (
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setSearchText('')}
                >
                  <Text style={styles.clearButtonText}>×</Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item.value.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: 330,
        backgroundColor: colors.dark,
        marginLeft: 40,
        marginRight: 60,
        borderRadius: 19,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 9, // for Android
        marginTop: 15
    },
  
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    padding: 18,
    marginLeft:75
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '80%',
    maxHeight: '50%',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 30, // Adjust padding to make space for the clear button
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#151414',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
  },
});

export default SearchDropdown;
