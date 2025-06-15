import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getToken, getUserId } from '../scripts/api/auth';
import { apiConfig } from '../scripts/api/config';
import { cancelarAgendamento } from '../scripts/agenda';
import { Logout } from '../scripts/login';

export default function TelaPerfil() {
    const navigation = useNavigation();

    // Estados para os dados do perfil e loading
    const [nomeCliente, setNomeCliente] = useState('');
    const [fotoPerfil, setFotoPerfil] = useState('');
    const [agendamentos, setAgendamentos] = useState(0);
    const [loading, setLoading] = useState(true);
    const [token, setTokenState] = useState(null);
    const [userId, setUserId] = useState(null);
    const [listaHorarios, setListaHorarios] = useState([]);

    // Carrega token e userId ao montar
    useEffect(() => {
        async function loadAuth() {
            const t = await getToken();
            const u = await getUserId();
            setTokenState(t);
            setUserId(u);
        }
        loadAuth();
    }, []);

    // Busca dados do usuário só quando ambos estiverem definidos
    useEffect(() => {
        async function fetchUserData() {
            try {

                const fotoUsuarioPerfil = `${apiConfig.baseUrl}/usuarios/${userId}/fotoPerfil?${Date.now()}`;
                // TODO: trocar pela URL real da API que retorna os dados do usuário logado
                const url = `${apiConfig.baseUrl}/usuarios/${userId}`;
                const headers = { "Content-Type": "application/json" };

                const response = await fetch(url, { method: "GET", headers });
                const data = await response.json();

                // Supondo que a API retorne algo como:
                // { nome: "Diogo Almeida", foto: "url_da_foto.jpg", agendamentos: 5 }

                async function recuperarDadosPrestador(id) {


                    const url = `${apiConfig.baseUrl}/usuarios/${id}`;
                    const headers = { "Content-Type": "application/json" };

                    const response = await fetch(url, { method: "GET", headers });
                    if (response.error) {
                        console.error("Erro ao recuperar dados do prestador:", response.error);
                        return;
                    }
                    const dadosPrestador = await response.json();

                    return dadosPrestador;

                }

                async function getHorariosFuturos() {
                    const url = `${apiConfig.baseUrl}/horarios/proximos/cliente/${userId}`;
                    const headers = { "Content-Type": "application/json" };
                    if (token) headers["Authorization"] = `Bearer ${token}`;

                    const response = await fetch(url, { method: "GET", headers });
                    if (response.error) {
                        console.error("Erro ao recuperar horários futuros:", response.error);
                        return;
                    }
                    const horariosFuturos = await response.json();
                    console.log("horariosFuturos", horariosFuturos);

                    for (const item of horariosFuturos.content) {
                        const prestador = await recuperarDadosPrestador(item.idPrestador);
                        item.nomePrestador = prestador.nomeExibicao;
                    }

                    return horariosFuturos;
                }

                setNomeCliente(data.nomeExibicao || 'Usuário');
                setFotoPerfil(`${apiConfig.baseUrl}/usuarios/${userId}/fotoPerfil?${Date.now()}`);

                const horariosFuturos = await getHorariosFuturos();
                console.log("horariosFuturos", horariosFuturos.content);
                if (horariosFuturos && horariosFuturos.content) {
                    //setAgendamentos(horariosFuturos.content);
                    setAgendamentos(horariosFuturos.content.length);
                    setListaHorarios(horariosFuturos.content);
                } else {
                    setAgendamentos(0);
                }

            } catch (error) {
                console.error('Erro ao buscar dados do usuário:', error);
                setAgendamentos(0);
            } finally {
                setLoading(false);
            }
        }

        if (token && userId) {
            fetchUserData();
        }
    }, [token, userId]);

    if (loading) {
        return (
            <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                <ActivityIndicator size="large" color="#8800cc" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>EasyBook</Text>
                <TouchableOpacity
                    style={styles.editProfile}
                    onPress={() => {
                        Logout({ navigation });
                    }}
                >
                    <Ionicons name="log-out-outline" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Perfil do Cliente */}
            <Image source={{ uri: fotoPerfil }} style={styles.avatar} />
            <Text style={styles.name}>{nomeCliente}</Text>
            <Text style={styles.bio}>Seja bem-vindo(a) de volta!</Text>

            {/* Agendamentos */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Seus agendamentos</Text>


                {listaHorarios.length > 0 && (
                    <View style={{ marginTop: 20 }}>
                        {listaHorarios.map((item) => {
                            // Formata a data para DD/MM/AAAA
                            const [ano, mes, dia] = item.data.split('-');
                            const dataFormatada = `${dia}/${mes}/${ano}`;
                            return (
                                <View
                                    key={item.id}
                                    style={{
                                        backgroundColor: '#f5f0fa',
                                        borderRadius: 8,
                                        padding: 12,
                                        marginBottom: 10,
                                    }}
                                >
                                    <Text style={{ color: '#8800cc', fontWeight: 'bold' }}>
                                        Data: <Text style={{ color: '#333', fontWeight: 'normal' }}>{dataFormatada}</Text>
                                    </Text>
                                    <Text style={{ color: '#8800cc', fontWeight: 'bold' }}>
                                        Horário: <Text style={{ color: '#333', fontWeight: 'normal' }}>{item.horarioInicial}</Text>
                                    </Text>
                                    <Text style={{ color: '#8800cc', fontWeight: 'bold' }}>
                                        Profissional: <Text style={{ color: '#333', fontWeight: 'normal' }}>{item.nomePrestador}</Text>
                                    </Text>
                                    <TouchableOpacity
                                        style={ styles.cancelarButton}
                                        onPress={() => {
                                            Alert.alert(
                                                'Cancelar agendamento',
                                                'Tem certeza que deseja cancelar este agendamento?',
                                                [
                                                    { text: 'Não', style: 'cancel' },
                                                    {
                                                        text: 'Sim',
                                                        style: 'destructive',
                                                        onPress: () => {
                                                            cancelarAgendamento(item.id, token)
                                                                .then(() => {
                                                                    Alert.alert(
                                                                        'Agendamento Cancelado',
                                                                        'Seu agendamento foi cancelado com sucesso.',
                                                                        [{ text: 'OK' }]
                                                                );
                                                                setListaHorarios((prev) =>
                                                                    prev.filter((horario) => horario.id !== item.id)
                                                                );
                                                            })
                                                            .catch((error) => {
                                                                console.error('Erro ao cancelar agendamento:', error);
                                                            });
                                                        }
                                                    }
                                                ]
                                            );
                                        }}>
                                        <Text style={ styles.cancelarText }>Cancelar Agendamento</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                )}
            </View>

            {/* Botão de agendamento */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Profissionais')}
            >
                <Text style={styles.buttonText}>Agendar novo horário</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.editProfileButton}
                onPress={() => navigation.navigate('EditarPerfil', { nome: nomeCliente })}
            >
                <Ionicons name="create-outline" size={18} color="#fff" />
                <Text style={styles.editProfileText}>Editar perfil</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', padding: 20 },
    header: {
        backgroundColor: '#8800cc',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: -20,
        marginTop: 30,
    },
    headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
    editProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    editText: {
        color: '#fff',
        fontSize: 14,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderColor: '#8800cc',
        borderWidth: 3,
        alignSelf: 'center',
        marginTop: 30,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#8800cc',
        textAlign: 'center',
        marginTop: 10,
    },
    bio: { fontSize: 14, textAlign: 'center', color: '#888' },
    card: {
        backgroundColor: '#f5f0fa',
        padding: 20,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 16,
        color: '#8800cc',
        fontWeight: 'bold',
    },
    count: {
        fontSize: 36,
        color: '#8800cc',
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#8800cc',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    editProfileButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8800cc',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginTop: 30,
    },
    editProfileText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    cancelarButton: {
        backgroundColor: '#cc2255',
        padding: 8,
        borderRadius: 5,
        marginTop: 10,
    },
    cancelarText:{ 
        color: '#fff', 
        textAlign: 'center' 
    }

});

