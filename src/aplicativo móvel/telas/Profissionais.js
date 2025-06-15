import { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { getToken, getUserId } from '../scripts/api/auth';
import { apiConfig } from '../scripts/api/config';

export default function Home() {
    const navigation = useNavigation();

    const [token, setTokenState] = useState(null);
    const [userId, setUserId] = useState(null);
    const [profissionais, setProfissionais] = useState(null);

    useEffect(() => {
        async function loadAuth() {
            const t = await getToken();
            const u = await getUserId();
            setTokenState(t);
            setUserId(u);
        }
        loadAuth();
    }, []);

    useEffect(() => {
        if (!token) return;
        async function fetchProfissionais() {
            try {
                const response = await fetch(`${apiConfig.baseUrl}/usuarios/prestadores`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setProfissionais(data.content);
                    console.log('Profissionais carregados:', data.content);
                } else {
                    console.error('Erro ao buscar profissionais:', response.status);
                }
            } catch (error) {
                console.error('Erro ao buscar profissionais:', error);
            }
        }
        fetchProfissionais();
    }, [token]);    

    return (
        <View style={styles.container}>
            {/* Lista de prestadores */}
            <Text style={styles.sectionTitle}>Profissionais disponíveis</Text>
            <FlatList
                data={profissionais}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('Agenda', { idPrestador: item.id, nomePrestador: item.nomeExibicao })}
                    >
                        <Image source={{ uri: `${apiConfig.baseUrl}/usuarios/${item.id}/fotoPerfil?${Date.now()}` }} style={styles.fotoPerfil} />
                        <View>
                            <Text style={styles.name}>{item.nomeExibicao}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8800cc',
        marginVertical: 10,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 12,
        marginBottom: 12,
        borderRadius: 8,
        elevation: 2,
    },
    fotoPerfil: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
