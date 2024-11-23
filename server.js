
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Ruta básica
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// WebSockets: Manejo de eventos
io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    // Recibir mensajes desde el cliente
    socket.on('mensaje', (data) => {
        console.log('Mensaje recibido:', data);
        // Responder al cliente
        socket.emit('respuesta', { mensaje: 'Hola desde el servidor' });
    });

    // Cuando el cliente se desconecta
    socket.on('disconnect', () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

