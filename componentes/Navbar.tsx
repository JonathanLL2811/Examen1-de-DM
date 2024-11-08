import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../page/Home/Home';
import historial from '../page/historial/historial';
import Transferencia from '../page/transferencia/transferencia';

import { NavigationContainer } from '@react-navigation/native';


const Drawer = createDrawerNavigator();

export default function Navbar() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Transferencia" component={Transferencia} />

        <Drawer.Screen name="histoial" component={historial} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}