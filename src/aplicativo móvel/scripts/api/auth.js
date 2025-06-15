import AsyncStorage from '@react-native-async-storage/async-storage';

// Funções para gerenciar o token JWT
export async function setToken(token) {
  await AsyncStorage.setItem('jwtToken', token);
}

export async function getToken() {
  return await AsyncStorage.getItem('jwtToken');
}

export async function removeToken() {
  await AsyncStorage.removeItem('jwtToken');
}

export async function getUserId() {
  const token = await AsyncStorage.getItem('jwtToken');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload && payload.id ? payload.id : null;
  } catch (e) {
    return null;
  }
}