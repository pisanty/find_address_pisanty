import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
  const [address, setAddress] =useState('');
  const [region, setRegion] =useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0222,
    longitudeDelta: 0.0121
  });

  const showAddress = () => {
    if (address) {
      const url = 'http://www.mapquestapi.com/geocoding/v1/address?key=RPsQeQk9af1Y9eTFISpPJF2lJKAdP4iD&location=' + address
      fetch(url)
      .then(response => response.json())
      .then(responseData => {
        setRegion({
          ...region,
          latitude: responseData.results[0].locations[0].latLng.lat,
          longitude: responseData.results[0].locations[0].latLng.lng});
      });
    }
  }

  return (
    <View style={styles.container}>
    <MapView
      style={{flex: 5}}
      region={region}>
    
      <Marker
        coordinate={{
          latitude: region.latitude,
          longitude: region.longitude
        }}
       />
      
    </MapView>
    <TextInput
      placeholder='Type address'
      style={{height: 40, fontSize: 18}}
      onChangeText={address => setAddress(address)} />
    <Button title='Find' onPress={showAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
