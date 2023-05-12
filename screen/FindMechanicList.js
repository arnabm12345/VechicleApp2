import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { fetchMechanics } from '../util/http';
import {getDistance, getPreciseDistance} from 'geolib';

const MechanicListItem = ({ name, email, phoneNumber, distance }) => {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      <Text style={styles.distance}>{distance} km away</Text>
    </View>
  );
};

const FindMechanicList = ({ route }) => {
  const [Mechanics, setMechanics] = useState([]);
  const { location } = route.params;

  useEffect(() => {
    async function getMechanics() {
      const mechanics= await fetchMechanics();
      setMechanics(mechanics);
    }

    getMechanics();
    console.log(Mechanics);
  }, []);

  const position1 = {
    latitude: 37.7749,
    longitude: -122.4194,
  };
  
  const position2 = {
    latitude: 40.7128,
    longitude: -74.006,
  };
  
  const distanceInMeters =getPreciseDistance(position1, position2,);
  const distanceInKilometers = distanceInMeters / 1000;

  return (
    <FlatList
      data={Mechanics}
      renderItem={({ item }) => (
        <MechanicListItem
          name={item.name}
          email={item.email}
          phoneNumber={item.number}
          distance={getDistance({latitude:item.lat,longitude:item.lng},{latitude:location.latitude,longitude:location.longitude},)}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 16,
  },
  phoneNumber: {
    fontSize: 16,
  },
  distance: {
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default FindMechanicList;
