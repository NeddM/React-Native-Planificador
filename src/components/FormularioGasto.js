import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import globalStyles from '../styles';
import {formatearFecha} from '../helpers';

const FormularioGasto = ({
  setModal,
  handleGasto,
  gasto,
  setGasto,
  eliminarGasto,
}) => {
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [categoria, setCategoria] = useState('');
  const [id, setId] = useState('');
  const [fecha, setFecha] = useState('');

  useEffect(() => {
    if (gasto?.nombre) {
      setNombre(gasto.nombre);
      setCantidad(gasto.cantidad);
      setCategoria(gasto.categoria);
      setId(gasto.id);
      setFecha(gasto.fecha);
    }
  }, [gasto]);

  return (
    <SafeAreaView style={styles.contenedor}>
      <View style={styles.contenedorBotones}>
        <Pressable
          style={[styles.btn, styles.btnCancelar]}
          onLongPress={() => {
            setModal(false);
          }}>
          <Text style={styles.btnTexto}>Cancelar</Text>
        </Pressable>

        {gasto?.id && (
          <Pressable
            style={[styles.btn, styles.btnEliminar]}
            onLongPress={() => eliminarGasto(id)}>
            <Text style={styles.btnTexto}>Eliminar</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.formulario}>
        <Text style={styles.titulo}>
          {gasto?.nombre ? 'Editar gasto' : 'Nuevo gasto'}
        </Text>
        <View style={styles.campo}>
          <Text style={styles.label}>Nombre gasto</Text>
          <TextInput
            value={nombre}
            onChangeText={setNombre}
            style={styles.input}
            placeholder="Nombre del gasto. Ej: Comida"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Cantidad gasto</Text>
          <TextInput
            value={cantidad}
            onChangeText={setCantidad}
            style={styles.input}
            keyboardType="numeric"
            placeholder="Cantidad del gasto. Ej: 300"
          />
        </View>

        <View style={styles.campo}>
          <Text style={styles.label}>Categoría gasto</Text>
          <Picker
            selectedValue={categoria}
            onValueChange={itemValue => {
              setCategoria(itemValue);
            }}>
            <Picker.Item label="-- Seleccionar --" value="" />
            <Picker.Item label="Ahorro" value="ahorro" />
            <Picker.Item label="Comida" value="comida" />
            <Picker.Item label="Casa" value="casa" />
            <Picker.Item label="Gastos varios" value="gastos" />
            <Picker.Item label="Ocio" value="ocio" />
            <Picker.Item label="Salud" value="salud" />
            <Picker.Item label="Suscripciones" value="suscripciones" />
          </Picker>
        </View>

        <Pressable
          style={styles.submitBtn}
          onPress={() => {
            handleGasto({nombre, cantidad, categoria, id, fecha});

            setModal(false);
          }}>
          <Text style={styles.submitBtnTexto}>
            {' '}
            {gasto?.nombre ? 'guardar cambios' : 'agregar gasto'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  contenedor: {backgroundColor: '#1e40af', flex: 1},

  contenedorBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  btn: {
    padding: 10,
    marginTop: 30,
    marginHorizontal: 10,
    borderRadius: 10,
    flex: 1,
  },

  btnCancelar: {
    backgroundColor: '#db2777',
  },

  btnEliminar: {
    backgroundColor: 'red',
  },

  btnTexto: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },

  formulario: {...globalStyles.contenedor},
  titulo: {
    textAlign: 'center',
    fontSize: 28,
    marginBottom: 30,
    color: '#64748b',
  },
  campo: {
    marginVertical: 10,
  },
  label: {
    color: '#64748b',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 20,
  },
  submitBtnTexto: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default FormularioGasto;
