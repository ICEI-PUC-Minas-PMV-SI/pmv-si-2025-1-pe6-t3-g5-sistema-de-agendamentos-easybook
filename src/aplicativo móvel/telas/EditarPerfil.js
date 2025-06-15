import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { getToken, getUserId } from '../scripts/api/auth';
import { apiConfig } from '../scripts/api/config';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarPerfil() {
  const route = useRoute();
  const nomeParam = route.params?.nome || '';
  const [nome, setNome] = useState(nomeParam);
  const [avatar, setAvatar] = useState(null);
  const [token, setTokenState] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    async function fetchAuthData() {
      const t = await getToken();
      const u = await getUserId();
      const fotoUsuarioPerfil = `${apiConfig.baseUrl}/usuarios/${u}/fotoPerfil?${Date.now()}`;
      setTokenState(t);
      setUserId(u);
      setAvatar(fotoUsuarioPerfil);
      console.log('Token:', t, 'UserId:', u, 'fotoPerfil:', fotoUsuarioPerfil);
    }
    fetchAuthData();
  }, []);

  // Função para abrir a galeria e escolher a imagem
  const selecionarImagem = async () => {
    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled && resultado.assets && resultado.assets.length > 0) {
      setAvatar(resultado.assets[0].uri);
    }
  };

  // Função para confirmar edição
  const confirmar = async () => {
    if (!nome) {
      Alert.alert('Por favor, insira seu nome.');
      return;
    }

    if (!userId) {
      Alert.alert('Não foi possível identificar o usuário autenticado.');
      return;
    }

    const formData = new FormData();
    // Parte JSON com nomeExibicao e id
    const dados = {
      nomeExibicao: nome,
      id: userId,
    };
    formData.append('dados', {
      string: JSON.stringify(dados),
      name: 'dados.json',
      type: 'application/json',
    });

    // Parte file (fotoPerfil)
    if (avatar) {
      const fileType = avatar.endsWith('.png') ? 'image/png' : 'image/jpeg';
      formData.append('fotoPerfil', {
        uri: avatar,
        name: 'fotoPerfil.jpg',
        type: fileType,
      });
    }

    try {
      const response = await fetch(`${apiConfig.baseUrl}/usuarios`, {
        method: 'PUT',
        headers: {
          'Authorization': token ? `Bearer ${token}` : undefined,
        },
        body: formData,
      });

      if (response.ok) {
        setAvatar(`${apiConfig.baseUrl}/usuarios/${userId}/fotoPerfil?${Date.now()}`);
        Alert.alert(
          'Perfil atualizado com sucesso!',
          '',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Perfil'),
            },
          ],
          { cancelable: false }
        );
      } else {
        let errorMsg = "Erro ao atualizar perfil.";
        try {
          const error = await response.json();
          if (error && error.message) errorMsg = error.message;
        } catch { }
        Alert.alert(errorMsg);
      }
    } catch (error) {
      console.log('Erro ao atualizar perfil:', error);
      Alert.alert('Ocorreu um erro ao tentar atualizar o perfil. Tente novamente mais tarde.');
    }
  };

  // Função para cancelar edição (apenas limpa os dados)
  const cancelar = () => {
    setNome('');
    setAvatar(`${apiConfig.baseUrl}/usuarios/${userId}/fotoPerfil`);
    navigation.navigate('Perfil');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar perfil</Text>

      {/* Avatar */}
      <TouchableOpacity onPress={selecionarImagem}>
        <Image
          source={avatar ? { uri: avatar } : require('../assets/avatar-placeholder.png')}
          style={styles.avatar}
        />
      </TouchableOpacity>

      {/* Campo Nome */}
      <Text style={styles.label}>Nome de usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={nome}
        onChangeText={setNome}
      />

      {/* Botão Confirmar */}
      <TouchableOpacity style={styles.botao} onPress={confirmar}>
        <Text style={styles.botaoTexto}>Confirmar</Text>
      </TouchableOpacity>

      {/* Botão Cancelar */}
      <TouchableOpacity onPress={cancelar}>
        <Text style={styles.cancelar}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos responsivos e padronizados
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    color: '#b600c4',
    fontSize: 28,
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e7b3ec',
    marginBottom: 20,
  },
  label: {
    color: '#b600c4',
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: 14,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#b600c4',
    padding: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 14,
  },
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
  },
  cancelar: {
    color: 'red',
    textDecorationLine: 'underline',
  },
});
