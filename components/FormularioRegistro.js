import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, View, Modal, FlatList } from 'react-native';

export default function FormularioRegistro({ onRegisterSuccess, goToLogin }) {
  const [form, setForm] = useState({
    nombre: '', apellido: '', tipoDoc: '', documento: '',
    correo: '', telefono: '', direccion: '', ciudad: '',
    departamento: '', password: ''
  });

  const [intentóEnviar, setIntentóEnviar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [opcionesActuales, setOpcionesActuales] = useState([]);
  const [campoActivo, setCampoActivo] = useState('');

  const tiposDoc = ['C.C.', 'C.E.', 'T.I.', 'Pasaporte'];
  const ciudades = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Bucaramanga'];
  const departamentos = ['Cundinamarca', 'Antioquia', 'Valle del Cauca', 'Atlántico', 'Santander'];

  const abrirSelector = (campo, opciones) => {
    setCampoActivo(campo);
    setOpcionesActuales(opciones);
    setModalVisible(true);
  };

  const seleccionarOpcion = (item) => {
    setForm({ ...form, [campoActivo]: item });
    setModalVisible(false);
  };

  const handleChange = (campo, valor) => setForm({ ...form, [campo]: valor });

  const handleSubmit = () => {
    setIntentóEnviar(true);
    const { nombre, apellido, tipoDoc, documento, correo, ciudad, departamento, password } = form;
    
    if (!nombre || !apellido || !tipoDoc || !documento || !correo || !ciudad || !departamento || !password) {
      alert('Completa los campos obligatorios.');
      return;
    }

    // Enviamos el correo y contraseña registrados al componente principal
    onRegisterSuccess({ correo: correo.trim(), password: password });
  };

  const esError = (campo) => intentóEnviar && !form[campo];

  const renderInput = (campo, placeholder, keyboardType = 'default', secure = false) => {
    const error = esError(campo);
    return (
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={error ? `¡Campo obligatorio (${placeholder})!` : placeholder}
        placeholderTextColor={error ? "#ff3333" : "#888"}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        autoCapitalize={campo === 'correo' ? 'none' : 'sentences'}
        onChangeText={(v) => handleChange(campo, v)}
        value={form[campo]}
      />
    );
  };

  const renderSelect = (campo, placeholder, opciones) => {
    const error = esError(campo);
    const seleccionado = form[campo];
    return (
      <TouchableOpacity style={[styles.selectBox, error && styles.inputError]} onPress={() => abrirSelector(campo, opciones)}>
        <Text style={seleccionado ? styles.selectTextSelected : (error ? styles.selectTextError : styles.selectTextPlaceholder)}>
          {seleccionado ? `${placeholder}: ${seleccionado}` : (error ? `¡Selecciona ${placeholder}!` : placeholder)}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, backgroundColor: '#121212' }} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <Text style={styles.ktmBrand}>BIENVENIDOS</Text>
        <Text style={styles.title}>Registro de Usuario</Text>

        {renderInput('nombre', 'Nombre')}
        {renderInput('apellido', 'Apellido')}
        {renderSelect('tipoDoc', 'Tipo de Documento', tiposDoc)}
        {renderInput('documento', 'Número de Documento', 'numeric')}
        {renderInput('correo', 'Correo')}
        
        <TextInput style={styles.input} placeholder="Teléfono (Opcional)" placeholderTextColor="#888" keyboardType="phone-pad" onChangeText={(v) => handleChange('telefono', v)} value={form.telefono} />
        <TextInput style={styles.input} placeholder="Dirección (Opcional)" placeholderTextColor="#888" onChangeText={(v) => handleChange('direccion', v)} value={form.direccion} />
        
        {renderSelect('ciudad', 'Ciudad', ciudades)}
        {renderSelect('departamento', 'Departamento', departamentos)}
        {renderInput('password', 'Contraseña', 'default', true)}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>

        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.btnFull} onPress={goToLogin}>
            <Text style={styles.btnText}>Inicio</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecciona una opción</Text>
              <FlatList
                data={opcionesActuales}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.modalItem} onPress={() => seleccionarOpcion(item)}>
                    <Text style={styles.modalItemText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalCloseText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 50, paddingBottom: 80, backgroundColor: '#121212' },
  ktmBrand: { fontSize: 14, color: '#fa2b24', fontWeight: '900', letterSpacing: 2, textAlign: 'center', marginBottom: 5 },
  title: { fontSize: 24, color: '#fff', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { width: '100%', backgroundColor: '#1e1e1e', color: '#fff', padding: 12, borderRadius: 8, marginBottom: 12, borderWidth: 1, borderColor: '#333' },
  inputError: { borderColor: '#ff3333', borderWidth: 2, backgroundColor: '#381212' },
  selectBox: { width: '100%', backgroundColor: '#1e1e1e', padding: 12, borderRadius: 8, marginBottom: 12, justifyContent: 'center', borderWidth: 1, borderColor: '#333' },
  selectTextPlaceholder: { color: '#888', fontSize: 14 },
  selectTextError: { color: '#ff3333', fontSize: 14, fontWeight: 'bold' },
  selectTextSelected: { color: '#fff', fontSize: 14 },
  button: { width: '100%', backgroundColor: '#f53a3a', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  bottomNav: { width: '100%', marginTop: 5 },
  btnFull: { width: '100%', backgroundColor: '#222', padding: 12, alignItems: 'center', borderRadius: 8 },
  btnText: { color: '#aaa', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  modalContent: { width: '85%', backgroundColor: '#1e1e1e', borderRadius: 12, padding: 20, maxHeight: '50%', borderWidth: 1, borderColor: '#FF6600' },
  modalTitle: { color: '#f12d2d', fontSize: 16, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#333' },
  modalItemText: { color: '#fff', fontSize: 15, textAlign: 'center' },
  modalCloseButton: { marginTop: 15, backgroundColor: '#333', padding: 10, borderRadius: 8, alignItems: 'center' },
  modalCloseText: { color: '#aaa', fontWeight: 'bold' }
});