import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaLogin from './telas/Login';
import EditarPerfil from './telas/EditarPerfil';
import TelaAgenda from './telas/TelaAgenda';
import TelaPerfil from './telas/TelaPerfil';
import Profissionais from './telas/Profissionais';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={TelaLogin} options={{ headerShown: false }} />
        <Stack.Screen name="EditarPerfil" component={EditarPerfil} options={{ headerShown: false }} />
        <Stack.Screen name="Agenda" component={TelaAgenda}  options={{ headerShown: false }} />
        <Stack.Screen name="Perfil" component={TelaPerfil}  options={{ headerShown: false }} />
        <Stack.Screen name="Profissionais" component={Profissionais}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}