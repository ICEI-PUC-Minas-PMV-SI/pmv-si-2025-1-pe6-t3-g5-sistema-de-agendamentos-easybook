import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'dotenv/config';
import { v4 as uuidv4 } from 'uuid';
import connection from './db.js'; // Importa a conexão com o MySQL
import cron from 'node-cron';

const app = express();
const port = 5000;

// Middleware para permitir CORS e processar JSON
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

/**
 * GET /appointments
 * Retorna os agendamentos filtrados opcionalmente por professionalId e date.
 */
app.get('/appointments', async (req, res) => {
  const { professionalId, date } = req.query;
  console.log(`GET /appointments chamado com filtros: professionalId=${professionalId || 'N/A'}, date=${date || 'N/A'}`);
  
  let query = 'SELECT * FROM appointments WHERE 1=1';
  const params = [];

  if (professionalId) {
    query += ' AND professionalId = ?';
    params.push(professionalId);
  }
  if (date) {
    query += ' AND date = ?';
    params.push(date);
  }

  try {
    const [rows] = await connection.execute(query, params);
    console.log(`GET /appointments: retornando ${rows.length} registros`);
    res.status(200).json({
      message: 'Success',
      data: rows,
    });
  } catch (error) {
    console.error('GET /appointments: Erro ao buscar agendamentos:', error.message);
    res.status(500).json({
      message: 'Error',
      error: error.message,
    });
  }
});

/**
 * POST /appointments 
 * Cria um novo agendamento e o insere no banco.
 */
app.post('/appointments', async (req, res) => {
  console.log('POST /appointments chamado com dados:', req.body);
  const { clientId, professionalId, serviceId, date, time } = req.body;

  if (!clientId || !professionalId || !serviceId || !date || !time) {
    console.log('POST /appointments: Campos obrigatórios faltando.');
    return res.status(400).json({
      message: 'Error',
      error: { details: 'Missing required fields' },
    });
  }

  const id = uuidv4();
  const query = `
    INSERT INTO appointments (id, clientId, professionalId, serviceId, date, time)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const params = [id, clientId, professionalId, serviceId, date, time];

  try {
    await connection.execute(query, params);
    console.log(`POST /appointments: Agendamento criado com ID ${id}`);
    res.status(201).json({
      message: 'Appointment created successfully',
      data: { id, clientId, professionalId, serviceId, date, time },
    });
  } catch (error) {
    console.error('POST /appointments: Erro ao criar agendamento:', error.message);
    res.status(500).json({
      message: 'Error',
      error: error.message,
    });
  }
});

/**
 * PUT /appointments/:id
 * Atualiza os dados de um agendamento existente.
 */
app.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`PUT /appointments/${id} chamado com dados:`, req.body);
  const { clientId, professionalId, serviceId, date, time } = req.body;

  try {
    // Verifica se o agendamento existe
    const [existing] = await connection.execute(
      'SELECT * FROM appointments WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      console.log(`PUT /appointments/${id}: Agendamento não encontrado`);
      return res.status(404).json({
        message: 'Error',
        error: { details: 'Appointment not found' },
      });
    }

    // Monta os campos para atualização
    const updateFields = [];
    const params = [];
    if (clientId) {
      updateFields.push('clientId = ?');
      params.push(clientId);
    }
    if (professionalId) {
      updateFields.push('professionalId = ?');
      params.push(professionalId);
    }
    if (serviceId) {
      updateFields.push('serviceId = ?');
      params.push(serviceId);
    }
    if (date) {
      updateFields.push('date = ?');
      params.push(date);
    }
    if (time) {
      updateFields.push('time = ?');
      params.push(time);
    }
    
    if (updateFields.length === 0) {
      console.log(`PUT /appointments/${id}: Nenhum campo fornecido para atualização`);
      return res.status(400).json({
        message: 'Error',
        error: { details: 'No fields provided for update' },
      });
    }

    const updateQuery = `
      UPDATE appointments SET ${updateFields.join(', ')} WHERE id = ?
    `;
    params.push(id);

    await connection.execute(updateQuery, params);
    console.log(`PUT /appointments/${id}: Agendamento atualizado com sucesso`);

    // Retorna o registro atualizado
    const [updatedRows] = await connection.execute(
      'SELECT * FROM appointments WHERE id = ?',
      [id]
    );

    res.status(200).json({
      message: 'Appointment updated successfully',
      data: updatedRows[0],
    });
  } catch (error) {
    console.error(`PUT /appointments/${id}: Erro ao atualizar agendamento:`, error.message);
    res.status(500).json({
      message: 'Error',
      error: error.message,
    });
  }
});

// Set para armazenar os IDs dos agendamentos já notificados
const notifiedAppointments = new Set();

/**
 * Função que verifica os agendamentos e notifica (via console.log)
 * aqueles que ocorrerão em até 1 hora.
 */
async function checkAppointments() {
  console.log('Verificação de agendamentos iniciada');
  const query = `
    SELECT *, CONCAT(date, ' ', time) as datetimeCombined
    FROM appointments
    WHERE CONCAT(date, ' ', time) BETWEEN NOW() AND DATE_ADD(NOW(), INTERVAL 1 HOUR)
  `;
  try {
    const [appointments] = await connection.execute(query);
    console.log(`Cron: Encontrados ${appointments.length} agendamentos para notificação`);
    appointments.forEach((appointment) => {
      if (!notifiedAppointments.has(appointment.id)) {
        console.log(`Notificação: Falta 1 hora para o agendamento com ID ${appointment.id}`);
        notifiedAppointments.add(appointment.id); // Evita notificações duplicadas
      }
    });
  } catch (error) {
    console.error("Erro ao verificar agendamentos:", error.message);
  }
}

// Agenda a execução da função a cada minuto
cron.schedule('* * * * *', checkAppointments);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
