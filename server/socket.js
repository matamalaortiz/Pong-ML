"use strict";

let clients = new Set();

module.exports = socket => {

  let qtyOfClients = Array.from(clients).length;

  (() => {
    clients.add(socket.id);
    // console.log(`New client: ${socket.id}, Qty of clients: ${ Array.from(clients).length}`);
    socket.emit('clients_from_server', qtyOfClients);
    socket.broadcast.emit('clients_from_server', qtyOfClients);

  })();

  socket.on('disconnect', () => {
  console.log(`Client ${socket.id} has disconnected`);

    try {
      delete
      clients.delete(socket.id);
      // console.log(`Qty of clients: ${ Array.from(clients).length}`);
      // console.log(Array.from(clients).length);
      socket.emit('clients_from_disconnected', qtyOfClients);
      socket.broadcast.emit('clients_from_server_disconnected', qtyOfClients);

    } catch (error) {
      console.log('Users could not be deleted.');
    }

  });

};
