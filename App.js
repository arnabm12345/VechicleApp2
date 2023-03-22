import React from 'react';
import { useState } from 'react';
//import * as React from 'react';
import { StyleSheet, View, Image, Text,Button,StatusBar } from 'react-native';
import Colors from './constants/color';
import PrimaryButton from './Components/ui/PrimaryButton';
import Title from './Components/ui/Title';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FirstScreen from './screen/FirstScreen';
import OpenScreen from './screen/OpenScreen';
import DataContextProvider from './store/data-context';
import ManageData from './screen/MechanicRegistration';

export default function App() {
  const [ClickState,setClickState] =useState(false);
  const[buttonState,setButtonState]=useState(false);
  const[goBack,setgoBack]=useState(false);
  function clickHandeler(){
      setClickState(true);
  }
  function  buttonHandeler(){
    setButtonState(true);
  }
  function goBackHandeler(){
    setButtonState(false);
  }
  if(ClickState==true){
    return(
    <DataContextProvider>  
    <FirstScreen/>
    </DataContextProvider>
  
    );
}
else if(buttonState==true){
  return(
    <DataContextProvider>  
    <ManageData goBackHandeler={goBackHandeler}/>
    </DataContextProvider>
  
    );
}
  return (
    <>
     <StatusBar style="auto" />
     <DataContextProvider> 
      <OpenScreen props={clickHandeler} click={buttonHandeler} />
      </DataContextProvider>
    </>
    
  );
}
