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



//Event listeners para transportar input de forms a logica de matrices
const formulario1 = document.getElementById('formulario-1');
formulario1.addEventListener('submit', (e) => {enviarFormulario(1, e)});

const formulario2 = document.getElementById('formulario-2');
formulario2.addEventListener('submit', (e) => {enviarFormulario(2, e)});

let matriz1;
let matriz2;

function enviarFormulario (numForm, e) {
        e.preventDefault();
        const columnas = document.getElementById("columnas" + numForm).value;
        const filas = document.getElementById("filas" + numForm).value;
        const matriz = document.getElementById("matriz" + numForm).value;

        const matrizVerdadera = obtenerMatriz(filas, columnas, matriz);

        if(numForm == 1) matriz1 =  new Matriz(matrizVerdadera, filas, columnas);
        else matriz2 = new Matriz(matrizVerdadera, filas, columnas);
        
        mostrarMatriz(matrizVerdadera, 'output' + numForm)

        return matrizVerdadera;
        
}


function obtenerMatriz(n, m, input) {
  // Convierte el input en un array de números
  const valores = input.split(' ').map(numero => Number(numero));
  
  // Crea una matriz de n filas y m columnas
  const matriz = Array.from({ length: n }, () => new Array(m));
  
  // Llena la matriz con los valores del input
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      matriz[i][j] = valores[i * m + j];
    }
  }
  
  return matriz;
}

//Event listeners para las operaciones
const botonSuma = document.getElementById('suma-btn');
botonSuma.addEventListener('click', () => {mostrarMatriz(matriz1.sumaMatrices(matriz2.getMatriz(), matriz2.getFilas(), matriz2.getColumnas()), 'resultado')});

const botonMul = document.getElementById('mul-btn');
botonMul.addEventListener('click', () => {mostrarMatriz(matriz1.multiplicacionMatrices(matriz2), 'resultado')});


const invMul1 = document.getElementById('inv1-btn');
invMul1.addEventListener('click', () => {mostrarMatriz(matriz1.invertir(), 'resultado')});

const invMul2 = document.getElementById('inv2-btn');
invMul2.addEventListener('click', () => {mostrarMatriz(matriz2.invertir(), 'resultado')});

const botonComp1 = document.getElementById('cmp1-btn');
botonComp1.addEventListener('click', () => {mostrarMensaje(matriz1.compatibilidad())});

const botonComp2 = document.getElementById('cmp2-btn');
botonComp2.addEventListener('click', () => {mostrarMensaje(matriz2.compatibilidad())});


function mostrarMensaje(mensaje) {
    const outputDiv = document.getElementById('resultado');
    outputDiv.textContent = mensaje;
}