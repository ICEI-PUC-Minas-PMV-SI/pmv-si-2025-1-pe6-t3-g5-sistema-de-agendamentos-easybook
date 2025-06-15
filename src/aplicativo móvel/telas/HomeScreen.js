import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = ['Cabelereiro', 'Manicure', 'Barbeiro', 'Estética', 'Massagem'];

const professionals = [
    {
        id: 1,
        name: 'Diogo Almeida',
        service: 'Cabelereiro',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
        id: 2,
        name: 'Larissa Souza',
        service: 'Manicure',
        avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
    {
        id: 3,
        name: 'Carlos Lima',
        service: 'Barbeiro',
        avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
];
const appointments = [
    {
        id: 1,
        professionalName: 'Diogo Almeida',
        service: 'Cabelereiro',
        date: '10/06/2025',
        time: '14:00',
        avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    },
    {
        id: 2,
        professionalName: 'Larissa Souza',
        service: 'Manicure',
        date: '12/06/2025',
        time: '09:30',
        avatar: 'https://randomuser.me/api/portraits/women/75.jpg',
    },
];

export default function HomeScreen() {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');

    const filteredProfessionals = professionals.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            {/* Barra de busca */}
            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color="#8800cc" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar profissional"
                    value={search}
                    onChangeText={setSearch}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Ionicons name="person-outline" size={24} color="#8800cc" style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>


            <Text style={styles.welcomeMessage}>
                Olá, seja bem vindo ao EasyBook sua plataforma de agendamentos.
            </Text>

            {/* Agendados */}
            <Text style={styles.sectionTitle}>Agendados</Text>
            <FlatList
                data={appointments}
                horizontal
                keyExtractor={(item) => item.id.toString()}
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.appointmentCard}>
                        <Image source={{ uri: item.avatar }} style={styles.avatarSmall} />
                        <View style={{ marginLeft: 10 }}>
                            <Text style={styles.name}>{item.professionalName}</Text>
                            <Text style={styles.service}>{item.service}</Text>
                            <Text style={styles.date}>{item.date} - {item.time}</Text>
                        </View>
                    </View>
                )}
            />


            {/* Categorias */}
            <Text style={styles.sectionTitle}>Categorias</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                {categories.map((cat, idx) => (
                    <TouchableOpacity key={idx} style={styles.categoryButton}>
                        <Text style={styles.categoryText}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Lista de prestadores */}
            <Text style={styles.sectionTitle}>Profissionais disponíveis</Text>
            <FlatList
                data={filteredProfessionals}
                keyExtractor={(item) => item.id.toString()}

                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => navigation.navigate('ScheduleScreen', { providerId: item.id })}
                    >
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />
                        <View>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.service}>{item.service}</Text>
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 20,
    },
    searchInput: {
        marginLeft: 10,
        flex: 1,
        fontSize: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#8800cc',
        marginVertical: 10,
    },
    categoriesContainer: {
        marginBottom: -5,
    },
    categoryButton: {
        backgroundColor: '#8800cc',
        borderRadius: 8,
        paddingVertical: 4,    // diminuir mais ainda
        paddingHorizontal: 12,
        marginRight: 8,
        minWidth: 50,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,            // fixa altura exata, ajuda a controlar
    },
    categoryText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 13,          // fonte um pouco menor pra caber melhor
        lineHeight: 16,        // controlar linha do texto pra não inflar altura
        textAlign: 'center',
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
    avatar: {
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
    service: {
        fontSize: 14,
        color: '#666',
    },

    welcomeMessage: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6a4baf',        // um roxo suave e elegante
        marginBottom: 20,
        letterSpacing: 0.5,
        lineHeight: 26,
        textAlign: 'center',
        // sombra leve para dar profundidade
        textShadowColor: 'rgba(106, 75, 175, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },

    welcomeText: {
        fontSize: 16,
        marginBottom: 15,
        color: '#333',
    },

    appointmentCard: {
        flexDirection: 'row',
        backgroundColor: '#f0e8ff',
        padding: 12,
        borderRadius: 8,
        marginRight: 12,
        alignItems: 'center',
        minWidth: 250,
    },

    avatarSmall: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },

    date: {
        fontSize: 13,
        color: '#555',
        marginTop: 4,
    },
});
