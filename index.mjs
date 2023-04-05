import Matriz from './logicaMatrices.mjs';

function mostrarMatriz(matriz, id) {
    var outputDiv = document.getElementById(id);
    var table = document.createElement('table');
    table.className = 'chess-board';

    for (var i = 0; i < matriz.length; i++) {
      var row = document.createElement('tr');
      for (var j = 0; j < matriz[i].length; j++) {
        var cell = document.createElement('td');
        cell.className = 'chess-cell';
        cell.textContent = matriz[i][j];
        row.appendChild(cell);
      }
      table.appendChild(row);
    }

    outputDiv.appendChild(table);
  }

let prueba = new Matriz([[1,2], [1, 2]], 2, 2);
mostrarMatriz(prueba.getMatriz(), 'output');
mostrarMatriz(prueba.getMatriz(), 'resultado');