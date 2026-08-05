import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Login from './components/Login';
import FormularioRegistro from './components/FormularioRegistro';

export default function App() {
  const [pantalla, setPantalla] = useState('login'); // 'login', 'registro', 'exito'

  // Lista inicial de usuarios (incluye a Yojan con 0000 por defecto y aceptará nuevos registros)
  const [usuariosRegistrados, setUsuariosRegistrados] = useState([
    { correo: 'yojan@gmail.com', password: '0000' }
  ]);

  // Cuando se registra con éxito, guardamos el usuario y lo mandamos al login o éxito
  const handleRegisterSuccess = (nuevoUsuario) => {
    setUsuariosRegistrados([...usuariosRegistrados, nuevoUsuario]);
    setPantalla('registroExitoso');
  };

  return (
    <View style={styles.container}>
      {pantalla === 'login' && (
        <Login 
          usuariosRegistrados={usuariosRegistrados}
          onLoginSuccess={() => alert('¡Inicio de sesión exitoso!')} 
          goToRegister={() => setPantalla('registro')} 
        />
      )}

      {pantalla === 'registro' && (
        <FormularioRegistro 
          onRegisterSuccess={handleRegisterSuccess} 
          goToLogin={() => setPantalla('login')} 
        />
      )}

      {pantalla === 'registroExitoso' && (
        <View style={styles.exitoContainer}>
          <Text style={styles.ktmBrand}>KTM READY TO RACE</Text>
          <Text style={styles.title}>¡Registro Exitoso!</Text>
          <Text style={styles.subtitle}>Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión.</Text>
          
          <TouchableOpacity style={styles.button} onPress={() => setPantalla('login')}>
            <Text style={styles.buttonText}>Ir a Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  exitoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: '#121212' },
  ktmBrand: { fontSize: 14, color: '#FF6600', fontWeight: '900', letterSpacing: 2, marginBottom: 10 },
  title: { fontSize: 26, color: '#fff', fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  subtitle: { color: '#888', fontSize: 14, textAlign: 'center', marginBottom: 30 },
  button: { width: '100%', backgroundColor: '#FF6600', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});