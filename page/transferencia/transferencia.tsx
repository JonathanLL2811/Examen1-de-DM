
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Tipos de navegación
type RootDrawerParamList = {
  Home: undefined;
  Transferencia: { realizarTransferencia: (monto: number, destinatario: string) => void };
  Configuraciones: undefined;
};

type TransferenciaScreenRouteProp = RouteProp<RootDrawerParamList, 'Transferencia'>;

export default function Transferencia({ route }: { route: TransferenciaScreenRouteProp }) {
  const { realizarTransferencia } = route.params;
  const [numeroCuenta, setNumeroCuenta] = useState('');
  const [nombreDestinatario, setNombreDestinatario] = useState('');
  const [monto, setMonto] = useState('');
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Transferencia'>>();

  const handleTransferir = () => {
    const montoNumerico = parseFloat(monto);

    if (isNaN(montoNumerico) || montoNumerico <= 0) {
      Alert.alert('Error', 'Monto inválido');
      return;
    }

    if (montoNumerico > 10000) {
      Alert.alert('Error', 'Saldo insuficiente para realizar la transferencia');
    } else {
      realizarTransferencia(montoNumerico, nombreDestinatario);
      Alert.alert('Transferencia Exitosa', `Se transfirieron L.${montoNumerico} a ${nombreDestinatario}`);
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>haga sus Transferencias</Text>

      <TextInput
        style={styles.input}
        placeholder="Número de Cuenta"
        value={numeroCuenta}
        onChangeText={setNumeroCuenta}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombre del Destinatario"
        value={nombreDestinatario}
        onChangeText={setNombreDestinatario}
      />

      <TextInput
        style={styles.input}
        placeholder="cuanto va a Transferir"
        value={monto}
        keyboardType="numeric"
        onChangeText={setMonto}
      />

      <Button title="Transferir" onPress={handleTransferir} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 18,
    padding: 10,
  },
});
