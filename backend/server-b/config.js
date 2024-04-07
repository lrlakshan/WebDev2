module.exports = {
    rabbitHost: 'rapid-runner-rabbit',
    queue1: 'received-orders', // This is the queue that will pass message from server A to server B
    queue2: 'completed-orders' // This is the queue that will pass message from server B to server A
  };