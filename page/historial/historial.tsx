
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

export default function Historial() {
  const [transacciones, setTransacciones] = useState<string[]>([]);

  // cuando se abre la pagina muestra lo que guardamos en localstorage
  useEffect(() => {
    const transaccionesGuardadas = localStorage.getItem('transacciones');
    if (transaccionesGuardadas) {
      setTransacciones(JSON.parse(transaccionesGuardadas));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de sus Transacciones</Text>

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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transactionItem: {
    fontSize: 16,
    paddingVertical: 4,
  },
});
