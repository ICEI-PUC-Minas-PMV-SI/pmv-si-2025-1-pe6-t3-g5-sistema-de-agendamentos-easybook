import axios from 'axios';
import { apiConfig } from './api/config'; 


export async function listarHorarios(idPrestador, date, token) {
  const formattedDate = date.toISOString().slice(0, 10);
  
  console.log(`${apiConfig.baseUrl}/horarios/prestador/disponivel/${idPrestador}/${formattedDate}`);
  const response = await axios.get(
    `${apiConfig.baseUrl}/horarios/prestador/disponivel/${idPrestador}/${formattedDate}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.content;
}

export async function agendarHorario(idHorario, idCliente, token) {
  const payload = { idHorario: idHorario, idCliente: idCliente };
  const response = await axios.put(
    `${apiConfig.baseUrl}/horarios/agendar`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}

export async function cancelarAgendamento(id, token) {
  const payload = { id: id };
  const response = await axios.put(
    `${apiConfig.baseUrl}/horarios/cancelar`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
}