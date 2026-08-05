import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, View } from 'react-native';

export default function Login({ usuariosRegistrados, onLoginSuccess, goToRegister }) {
  const [form, setForm] = useState({ correo: '', password: '' });
  const [intentóEnviar, setIntentóEnviar] = useState(false);

  const handleChange = (campo, valor) => setForm({ ...form, [campo]: valor });

  const handleSubmit = () => {
    setIntentóEnviar(true);

    if (!form.correo || !form.password) {
      alert('Por favor completa las casillas correspondientes.');
      return;
    }

    
    const usuarioEncontrado = usuariosRegistrados.find(
      (u) => u.correo.toLowerCase() === form.correo.trim().toLowerCase() && u.password === form.password
    );

    if (!usuarioEncontrado) {
      alert('Correo o contraseña incorrectos, o la cuenta no está registrada.');
      return;
    }

    onLoginSuccess();
  };

  const esCorreoInvalido = intentóEnviar && !form.correo;
  const esPasswordInvalido = intentóEnviar && !form.password;

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      style={{ flex: 1, backgroundColor: '#121212' }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView 
        contentContainerStyle={styles.container} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.ktmBrand}>KTM</Text>
        <Text style={styles.title}>Iniciar Sesión</Text>

        <TextInput
          style={[styles.input, esCorreoInvalido && styles.inputError]}
          placeholder={esCorreoInvalido ? "¡Correo obligatorio!" : "Correo Electrónico"}
          placeholderTextColor={esCorreoInvalido ? "#ff3333" : "#888"}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(v) => handleChange('correo', v)}
          value={form.correo}
        />

        <TextInput
          style={[styles.input, esPasswordInvalido && styles.inputError]}
          placeholder={esPasswordInvalido ? "¡Contraseña obligatoria!" : "Contraseña"}
          placeholderTextColor={esPasswordInvalido ? "#ff3333" : "#888"}
          secureTextEntry={true}
          autoCapitalize="none"
          onChangeText={(v) => handleChange('password', v)}
          value={form.password}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.btnFull} onPress={goToRegister}>
            <Text style={styles.btnText}>¿No tienes cuenta? Regístrate</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20, backgroundColor: '#121212' },
  ktmBrand: { fontSize: 14, color: '#FF6600', fontWeight: '900', letterSpacing: 2, textAlign: 'center', marginBottom: 5 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  input: { width: '100%', backgroundColor: '#1e1e1e', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  inputError: { borderColor: '#ff3333', borderWidth: 2, backgroundColor: '#381212' },
  button: { width: '100%', backgroundColor: '#FF6600', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  bottomNav: { width: '100%', marginTop: 5 },
  btnFull: { width: '100%', backgroundColor: '#222', padding: 12, alignItems: 'center', borderRadius: 8 },
  btnText: { color: '#aaa', fontWeight: 'bold' }
});