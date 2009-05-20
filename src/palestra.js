function assert(){
  if(!(arguments.length > 0 && typeof arguments[0] == 'boolean' )){
    document.write('Erro, valores errados');
  }else{
    showResult(arguments[0], arguments[1]);
  }
}

function log(){
  var body = document.getElementsByTagName('body')[0];
  var div = document.createElement('div');
  div.id = 'log';
  var p = buildParagraph('');
  for (var i=0; i < arguments.length; i++) {
    p.innerHTML += arguments[i] + ' ';
  };
  var h1 = document.createElement('h1');
  h1.innerHTML = 'Log'
  div.appendChild(h1);
  div.appendChild(p);
  body.appendChild(div);
}

function showResult(){
  var msg = buildParagraph(arguments[1]);
  msg.id = 'msg';
  var result = buildParagraph(arguments[0])
  result.id = 'result';
  result.innerHTML != 'true' ? result.className = 'error' : result.className = 'success'
    
  var area = document.createElement('div');
  area.id = 'area';
  area.appendChild(buildParagraph('O que deve acontecer?'));
  area.appendChild(msg);
  area.appendChild(buildParagraph('O que aconteceu?'));  
  area.appendChild(result);
  var container = document.getElementById('test_container');
  container.appendChild(area);
  var body = document.getElementsByTagName('body')[0];
  body.appendChild(container);
}

function buildParagraph(){
  var p = document.createElement('p');
  p.innerHTML = arguments[0];
  return p;
}

String.prototype.trim = function () {
  return this.replace(/^\s+|\s+$/g, '');
}
