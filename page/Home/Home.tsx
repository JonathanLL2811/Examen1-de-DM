
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

// Tipos de navegación
type RootDrawerParamList = {
  Home: undefined;
  Transferencia: { realizarTransferencia: (monto: number, destinatario: string) => void };
  Historial: undefined;
};

export default function Home() {
  const [saldo, setSaldo] = useState(10000); // Saldo inicial
  const [transacciones, setTransacciones] = useState<string[]>([]);

  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList, 'Home'>>();

  // Cargar las transacciones desde localStorage al inicio
  useEffect(() => {
    const transaccionesGuardadas = localStorage.getItem('transacciones');
    if (transaccionesGuardadas) {
      setTransacciones(JSON.parse(transaccionesGuardadas));
    }
  }, []);

  // Función para actualizar localStorage
  const actualizarTransacciones = (nuevaTransaccion: string) => {
    const nuevasTransacciones = [nuevaTransaccion, ...transacciones].slice(0, 5);
    setTransacciones(nuevasTransacciones);
    localStorage.setItem('transacciones', JSON.stringify(nuevasTransacciones));
  };

  // hacer transferencia
  const realizarTransferencia = (monto: number, destinatario: string) => {
    setSaldo(saldo - monto);
    actualizarTransacciones(`Transferencia de L.${monto} a ${destinatario}`);
  };

  // hacer un deposito un depósito
  const realizarDeposito = () => {
    const montoDeposito = 500;
    setSaldo(saldo + montoDeposito);
    actualizarTransacciones(`Depósito de L.${montoDeposito}`);
  };

  // hacer un retiro
  const realizarRetiro = () => {
    const montoRetiro = 200;
    if (saldo >= montoRetiro) {
      setSaldo(saldo - montoRetiro);
      actualizarTransacciones(`Retiro de L.${montoRetiro}`);
    } else {
      alert('Saldo insuficiente para realizar el retiro');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Bienvenido! a banco la trampa</Text>
      <Text style={styles.balance}>Su saldo es: L.{saldo}</Text>

      <Button
        title="Realizar Transferencia"
        onPress={() => navigation.navigate('Transferencia', { realizarTransferencia })}
      />
      
      <Button title="Depositar L.500" onPress={realizarDeposito} />
      <Button title="Retirar L.200" onPress={realizarRetiro} />

      

      <Text style={styles.historyTitle}>Sus Transacciones:</Text>
      <FlatList
        data={transacciones}
        renderItem={({ item }) => <Text style={styles.transactionItem}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  balance: {
    fontSize: 20,
    marginBottom: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  transactionItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
