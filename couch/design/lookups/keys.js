module.exports = function (head, req) {
  var sent = [];
  
  send('[');
  
  var row = getRow();
  if (row) { 
    send('"' + row.key + '"'); 
    sent.push(row.key);
  }
  
  while (row = getRow()) {
    if (sent.indexOf(row.key) === -1) {
      send(',"' + row.key + '"');
      sent.push(row.key);
    }
  }
  
  send(']');
}