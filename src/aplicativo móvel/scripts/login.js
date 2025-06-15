//import { Alert } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { setToken } from "./api/auth";
import { apiConfig } from "./api/config";

export async function Registrar({ nome, usuario, senha, confirmacaoSenha, navigation }) {
    console.log('Register attempt with:', { nome, usuario, senha });
    if (!nome || !usuario || !senha || !confirmacaoSenha) {
        Alert.alert('Atenção', 'Por favor, preencha todos os campos.');
        return;
    }
    if (senha !== confirmacaoSenha) {
        Alert.alert('Atenção', 'As senhas não coincidem. Por favor, tente novamente.');
        return;
    }


    try {
        const response = await fetch(`${apiConfig.baseUrl}/usuarios/cadastro`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nomeExibicao: nome, tipo: "cliente", usuario: usuario, senha: senha })
        });

        if (!response.ok) {
            Alert.alert('Erro', 'Erro ao cadastrar. Tente novamente.');
            return;
        }

        const data = await response.json();
        if (data && data.token) {
            setToken(data.token);
            if (navigation) {
                navigation.replace('Perfil'); // ou navigation.navigate('Perfil')
            }
        } else {
            Alert.alert('Erro', 'Cadastro realizado, mas não foi possível autenticar.');
        }
    } catch (err) {
        Alert.alert('Erro', 'Erro inesperado ao cadastrar.');
    }


    alert(`Conta criada para: ${nome}`);
}

export async function Logar({ usuario, senha, navigation }) {
    fetch(`${apiConfig.baseUrl}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, senha })
    })
    .then(response => {
        if (!response.ok) {
            console.log('Erro no login', 'Usuário ou senha inválidos. Por favor, tente novamente.');
            throw new Error('Login inválido');
        }
        return response.json();
    })
    .then(data => {
        if (data && data.token) {
            setToken(data.token); // Função definida em auth.js
            console.log('Token registrado:', data.token);
            console.log('Login efetuado com sucesso!', `Bem-vindo, ${usuario}!`);
            //console.log('Token registrado:', token);
            if(navigation) {
                navigation.navigate('Perfil');
            }
            //window.location.href = "home-profissional.html";
        } else {
            console.log('Erro no login', 'Usuário ou senha inválidos. Por favor, tente novamente.');
        }
    })
    .catch(err => {
        //Alert.alert('Erro ao tentar logar', 'Por favor, verifique suas credenciais e tente novamente.');
        console.log('Erro no login:', err);
    });
}

export function Logout({ navigation }) {
    setToken(null);
    if (navigation) {
        navigation.navigate('Login');
    }
    console.log('Usuário deslogado com sucesso.');
}