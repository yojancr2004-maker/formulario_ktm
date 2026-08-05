import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function RegistroExitoso({ goToLogin }) {
  return (
    <View style={styles.container}>
      <Text style={styles.ktmBrand}>KTM READY TO RACE</Text>
      <Text style={styles.title}>¡Registro Exitoso!</Text>
      <Text style={styles.subtitle}>Tu cuenta ha sido creada correctamente en el sistema.</Text>
      
      <TouchableOpacity style={styles.button} onPress={goToLogin}>
        <Text style={styles.buttonText}>Volver al Inicio</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#121212' },
  ktmBrand: { fontSize: 14, color: '#FF6600', fontWeight: '900', letterSpacing: 2, marginBottom: 10 },
  title: { fontSize: 26, color: '#fff', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  button: { width: '100%', backgroundColor: '#FF6600', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});