import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import Button from '../Components/ui/Button';
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
  } from 'expo-location';


export default function MechanicServices() {
    const navigation = useNavigation();
  
    const [pickedLocation, setPickedLocation] = useState(null);
    const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        'Insufficient Permissions!',
        'You need to grant location permissions to use this app.'
      );
      return false;
    }

    return true;
  }
  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    setPickedLocation({
        location: location.coords,
      });
      console.log(pickedLocation);
      navigation.navigate('Mechanics', {location:location.coords});
  }

  return(
    <View style={styles.buttons}>
    <Button style={styles.button} onPress={getLocationHandler}>
      Find Mechanic Details
    </Button>
    </View>
    
  );

}

const styles = StyleSheet.create({
    buttons: {
        //flexDirection: 'row',
       justifyContent: 'center',
        alignItems: 'center',
         marginTop:250
        
      },
      button: {
        minWidth: 120,
        marginHorizontal: 8,
        color: '#FFFFFF',
      },
      

});