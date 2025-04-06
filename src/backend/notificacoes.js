import express from 'express'
import { PrismaClient } from '@prisma/client'
import cron from 'node-cron';

const prisma = new PrismaClient()
const app = express()
app.use(express.json())

const notifiedAppointments = new Set();

//Criação de Agendamentos
app.post('/appointments', async (req, res) => {
     const appointment = await prisma.appointment.create({
        data: {
            id_client: req.body.id_client,
            Datetime: req.body.Datetime,
            status: req.body.status
        }
     })
     console.log(`Agendamento criado: ID ${appointment.id}, Cliente ID: ${appointment.id_client}, Data e Hora: ${appointment.Datetime}`);
  res.status(201).json(appointment);
})
//Fim da Criação de Agendamentos

//Listagem de Agendamentos
app.get('/appointments', async (req, res) => {
    const appointments = await prisma.appointment.findMany()
    res.status(200).json(appointments) 
})
//Fim da Listagem de Agendamentos

//Função para verificar os agendamentos
async function checkAppointments() {
  const now = new Date();
  const anHourLater = new Date(now.getTime() + 60 * 60 * 1000);
  
      // Buscar agendamentos dentro do intervalo próximo de 1 hora
      const appointments = await prisma.appointment.findMany({
        where: {
          status: 'Confirmado',
          Datetime: {
            gte: now,
            lt: anHourLater,
          },
        },
      });
  
      appointments.forEach((appointment) => {
        if (!notifiedAppointments.has(appointment.id)) {
          console.log(`Falta 1 hora para o seu serviço, ID: ${appointment.id}!`);
          notifiedAppointments.add(appointment.id); // Adiciona o ID ao conjunto de notificados
        }
      });
    }
  
  // Verifique agendamentos a cada minuto
  cron.schedule('* * * * *', checkAppointments);
  
  app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
  });
