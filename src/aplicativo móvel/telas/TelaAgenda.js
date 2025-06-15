import React, { useState, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { listarHorarios, agendarHorario } from '../scripts/agenda';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

import { getToken, getUserId } from '../scripts/api/auth';
import { apiConfig } from '../scripts/api/config';

export default function TelaAgenda() {
  const route = useRoute();
  const navigation = useNavigation();
  const { idPrestador, nomePrestador } = route.params || {};

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedHour, setSelectedHour] = useState(null);
  const [availableHours, setAvailableHours] = useState([]);
  const [token, setTokenState] = useState(null);
  const [userId, setUserId] = useState(null);

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


  useEffect(() => {
    fetchHours();
  }, [selectedDate, token]);

  async function fetchHours() {
    if (!token) {
      return;
    }
    try {
      const hours = await listarHorarios(idPrestador, selectedDate, token);
      console.log('Horas disponíveis:', hours);
      setAvailableHours(hours);
    } catch (Err) {
      console.error('Erro ao buscar horários disponíveis:', Err);
      Alert.alert('Erro', 'Não foi possível carregar os horários disponíveis.');
      setAvailableHours(['00:00']);
    }
  }

  async function handleSchedule() {
    if (!selectedHour) {
      Alert.alert('Aviso', 'Por favor, selecione um horário para agendar.');
      return;
    }
    try {
      console.log('Agendando horário:', selectedHour.id, 'para o usuário:', userId);
      const response = await agendarHorario(selectedHour.id, userId, token);
      if (response.status === 200 || response.status === 201) {
        console.log('Horário agendado com sucesso:', response.data);
        // Formata a data para dd/mm/aaaa
        const [ano, mes, dia] = response.data.data.split('-');
        const dataFormatada = `${dia}/${mes}/${ano}`;
        Alert.alert(
          'Sucesso',
          `Agendamento realizado para as ${response.data.horarioInicial} do dia ${dataFormatada}`,
          [
            { text: 'OK', onPress: () => navigation.navigate('Perfil') },
          ]
        );
      } else {
        Alert.alert('Erro', 'Não foi possível agendar o horário.');
      }
    } catch {
      Alert.alert('Erro', 'Falha ao agendar o horário.');
    }
  }

  const getDaysInMonth = (monthDate) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: totalDays }, (_, i) => new Date(year, month, i + 1));
  };

  const daysOfMonth = getDaysInMonth(currentMonth);

  const handlePreviousMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
    setSelectedDate(new Date(prev));
  };

  const handleNextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
    setSelectedDate(new Date(next));
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>EasyBook</Text>
        <TouchableOpacity
          style={styles.editProfile}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Ionicons name="person-outline" size={18} color="#fff" />
          <Text style={styles.editText}>Perfil</Text>
        </TouchableOpacity>

      </View>

      {/* Foto e nome */}
      <Image
        source={{
          uri: `${apiConfig.baseUrl}/usuarios/${idPrestador}/fotoPerfil?${Date.now()}`, // Troque pela imagem real se quiser
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{nomePrestador}</Text>

      {/* Calendário */}
      <View style={styles.calendarContainer}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={handlePreviousMonth}>
            <Ionicons name="chevron-back" size={18} color="#8800cc" />
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {currentMonth.toLocaleDateString('pt-BR', {
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <TouchableOpacity onPress={handleNextMonth}>
            <Ionicons name="chevron-forward" size={18} color="#8800cc" />
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {daysOfMonth.map((date, idx) => {
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const weekDay = date
              .toLocaleDateString('pt-BR', { weekday: 'short' })
              .replace('.', '');
            return (
              <TouchableOpacity
                key={idx}
                style={[
                  styles.dayButton,
                  isSelected && styles.dayButtonSelected,
                ]}
                onPress={() => setSelectedDate(date)}
              >
                <Text
                  style={[
                    styles.dayText,
                    isSelected && styles.dayTextSelected,
                  ]}
                >
                  {weekDay}
                </Text>
                <Text
                  style={[
                    styles.dayNumber,
                    isSelected && styles.dayTextSelected,
                  ]}
                >
                  {date.getDate()}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Horários */}
      <Text style={styles.sectionTitle}>Horários disponíveis:</Text>
      <View style={styles.hoursContainer}>
        {availableHours.map((hour, idx) => (
          <TouchableOpacity
            key={hour.id || idx}
            style={[
              styles.hourButton,
              selectedHour && selectedHour.id === hour.id && styles.hourButtonSelected,
            ]}
            onPress={() => { setSelectedHour(hour); console.log('Hora selecionada:', hour); }}
          >
            <Text
              style={[
                styles.hourText,
                selectedHour && selectedHour.id === hour.id && styles.hourTextSelected,
              ]}
            >
              {hour.horarioInicial}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleSchedule}
      >
        <Text style={styles.continueButtonText}>Agendar</Text>
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
  profileCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: '#fff',
    borderWidth: 1,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#8800cc',
    borderWidth: 3,
    alignSelf: 'center',
    marginTop: 20,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8800cc',
    textAlign: 'center',
    marginTop: 10,
  },
  bio: { fontSize: 14, textAlign: 'center', color: '#888' },
  calendarContainer: {
    marginTop: 20,
    borderTopColor: '#8800cc',
    borderTopWidth: 1,
    paddingTop: 10,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  monthText: { color: '#8800cc', fontWeight: 'bold', fontSize: 16 },
  dayButton: {
    alignItems: 'center',
    marginHorizontal: 6,
    padding: 8,
    borderRadius: 10,
  },
  dayButtonSelected: {
    backgroundColor: '#8800cc',
  },
  dayText: { fontSize: 12, color: '#8800cc' },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8800cc',
  },
  dayTextSelected: {
    color: '#fff',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#8800cc',
    textAlign: 'center',
    marginVertical: 20,
  },
  hoursContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  hourButton: {
    borderColor: '#8800cc',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  hourButtonSelected: {
    backgroundColor: '#8800cc',
  },
  hourText: { color: '#8800cc', fontWeight: 'bold' },
  hourTextSelected: {
    color: '#fff',
  },
  continueButton: {
    backgroundColor: '#8800cc',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  editProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  editText: {
    color: '#fff',
    fontSize: 14,
  },

});
