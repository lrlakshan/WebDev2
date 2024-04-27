#!/usr/bin/env node
// Process tasks from the work queue

'use strict';

var amqp = require('amqplib');
var orderController = require('../controllers/orderController');

module.exports.getTask = function(rabbitHost, queueName){
  amqp.connect('amqp://' + rabbitHost).then(function(conn) {
    process.once('SIGINT', function() { conn.close(); });
    return conn.createChannel().then(function(ch) {
      var ok = ch.assertQueue(queueName, {durable: true});
      ok = ok.then(function() { ch.prefetch(1); });
      ok = ok.then(function() {
        ch.consume(queueName, doWork, {noAck: false});
        console.log(" [*] Waiting for messages. To exit press CTRL+C");
      });
      return ok;

      function doWork(msg) {
        var body = msg.content.toString();
        console.log(" [x] Received '%s'", body);

        var orderData = JSON.parse(body);

        // Update the order status in the database
        orderController
          .updateOrderStatus(orderData._id, orderData.status)
          .then(() => {
            console.log("Order status updated successfully");
          })
          .catch((err) => {
            console.error("Error updating order:", err);
          });

        var secs = body.split(".").length - 1;
        //console.log(" [x] Task takes %d seconds", secs);
        setTimeout(function () {
          console.log(" [x] Done");
          ch.ack(msg);
        }, secs * 1000);
      }
    });
  }).catch(console.warn);
}
