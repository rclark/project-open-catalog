module.exports = function (head, req) {
  var sent = [],
      row = getRow();
  
  send('[');
  
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
};