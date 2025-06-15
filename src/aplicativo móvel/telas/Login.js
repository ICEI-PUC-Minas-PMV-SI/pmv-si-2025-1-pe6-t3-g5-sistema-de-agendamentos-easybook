import React, { useState } from 'react';
import { Registrar, Logar } from '../scripts/login';
import {
  Alert,
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  KeyboardAvoidingView, 
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

const LoginForm = ({ onSwitchToRegister, navigation }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    Logar({ usuario, senha, navigation });
  };

  return (
    <>
      <Text style={styles.cardTitle}>Entrar</Text>

      <Text style={styles.label}>Usuário</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome de usuário"
          placeholderTextColor="#A0AEC0"
          autoCapitalize="none"
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      <Text style={styles.label}>Sua senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>
      
      <TouchableOpacity style={styles.actionButton} onPress={handleLogin}>
        <Text style={styles.actionButtonText}>Fazer Login</Text>
      </TouchableOpacity>
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Não tem uma conta? </Text>
        <TouchableOpacity onPress={onSwitchToRegister}>
          <Text style={styles.switchLink}>Cadastre-se!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const RegisterForm = ({ onSwitchToLogin, navigation }) => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');

  const handleRegister = () => {
    Registrar({ nome, usuario, senha, confirmacaoSenha, navigation });
  };

  return (
    <>
      <Text style={styles.cardTitle}>Cadastro</Text>

      <Text style={styles.label}>Nome completo</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome completo"
          placeholderTextColor="#A0AEC0"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <Text style={styles.label}>Usuário</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome de usuário"
          placeholderTextColor="#A0AEC0"
          keyboardType="default"
          autoCapitalize="none"
          value={usuario}
          onChangeText={setUsuario}
        />
      </View>

      <Text style={styles.label}>Crie uma senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua nova senha"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
      </View>

      <Text style={styles.label}>Confirme sua senha</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#A0AEC0"
          secureTextEntry
          value={confirmacaoSenha}
          onChangeText={setConfirmacaoSenha}
        />
      </View>
      
      <TouchableOpacity style={styles.actionButton} onPress={handleRegister}>
        <Text style={styles.actionButtonText}>Criar Conta</Text>
      </TouchableOpacity>
      
      <View style={styles.switchContainer}>
        <Text style={styles.switchText}>Já tem uma conta? </Text>
        <TouchableOpacity onPress={onSwitchToLogin}>
          <Text style={styles.switchLink}>Faça Login!</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default function TelaLogin({ navigation }) {
  const [activeTab, setActiveTab] = useState('Login');
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContent}>

            <Text style={styles.brandTitle}>EasyBook</Text>
            
            <View style={styles.tabSelectorContainer}>
              <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('Login')}>
                <Text style={[styles.tabText, activeTab === 'Login' && styles.activeTabText]}>Login</Text>
                {activeTab === 'Login' && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
              <TouchableOpacity style={styles.tabButton} onPress={() => setActiveTab('Cadastro')}>
                <Text style={[styles.tabText, activeTab === 'Cadastro' && styles.activeTabText]}>Cadastro</Text>
                {activeTab === 'Cadastro' && <View style={styles.activeTabIndicator} />}
              </TouchableOpacity>
            </View>
            
            <View style={styles.card}>
              {activeTab === 'Login' ? 
                <LoginForm onSwitchToRegister={() => setActiveTab('Cadastro')} navigation={navigation} /> : 
                <RegisterForm onSwitchToLogin={() => setActiveTab('Login')} navigation={navigation} />
              }
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  brandTitle: {
    fontSize: 48,
    color: '#8A22AC', // Cor principal
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif',
    marginBottom: 20,
  },
  tabSelectorContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tabButton: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 18,
    color: '#A0AEC0',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
  activeTabText: {
    color: '#8A22AC',
  },
  activeTabIndicator: {
    height: 3,
    width: '100%',
    backgroundColor: '#8A22AC',
    borderRadius: 2,
    marginTop: 5,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 28,
    color: '#8A22AC',
    fontFamily: Platform.OS === 'ios' ? 'Cochin' : 'serif',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  label: {
    width: '100%',
    fontSize: 14,
    color: '#4A5568',
    marginBottom: 8,
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#F7F8FA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    color: '#2D3748',
    paddingVertical: 15,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
  actionButton: {
    backgroundColor: '#8A22AC',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
  switchContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  switchText: {
    color: '#4A5568',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
  switchLink: {
    color: '#DD6B20',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'sans-serif',
  },
});
