function Matriz  (matriz, filas, columnas)  {
    this.filas = filas;
    this.columnas = columnas;
    this.matriz = matriz;

    this.esCuadrada = () => {
        return (this.filas === this.columnas);
    }
    this.mismaDimension = (matriz) => {
        return ((this.filas === matriz.filas) && (this.columnas === matriz.columnas));
    }
    
    this.sumaMatrices = (matrizSuma) => {
        let matrizResultado = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]; //Inicializamos la matriz
        for(let i = 0; i < this.filas; i++){ //Recorremos filas
            for(let j = 0; j < this.columnas; j++){ //Recorremos columnas
                matrizResultado[i][j] = this.matriz[i][j] + matrizSuma[i][j]; 
            }
        }
        return matrizResultado;
    }

    this.multiplicacionDefinida = (matriz) => {
        return (this.columnas === matriz.filas);
    }

    this.multiplicacionMatrices = (matrizMultiplicacion) => {
        //Comprobamos que las matrices se puedan multiplicar
        if(!this.multiplicacionDefinida(matrizMultiplicacion)){
            return "No se pueden multiplicar las matrices";
        }
        //Inicializamos la matriz con las filas de this.matriz y columnas de matrizMultiplicacion
        let matrizResultado = new Array(this.filas);
        for(let i = 0; i < this.filas; i++){
            matrizResultado[i] = new Array(matrizMultiplicacion.columnas);
        }
        //Inicializamos la matriz a 0
        for(let i = 0; i < this.filas; i++){
            for(let j = 0; j < matrizMultiplicacion.columnas; j++){
                matrizResultado[i][j] = 0;
            }
        }
        //Multiplicamos matrices y almacenamos en matrizResultado
        for(let i = 0; i < this.filas; i++){
            for(let j = 0; j < matrizMultiplicacion.columnas; j++){
                for(let k = 0; k < this.columnas; k++){
                    matrizResultado[i][j] += this.matriz[i][k] * matrizMultiplicacion.matriz[k][j]; //Producto escalar, suma de los productos;
                }
            }
        }

        return matrizResultado;
    }
    
    this.calcularDeterminante = () => {
        if(this.esCuadrada()){
            return determinante(this.matriz, this.filas)
        }
        const crearSubMatriz = (matriz, notFila, notColumna, n) => {
            for(let i = 0; i < n; i++){
                matriz[notFila].pop();
            }
            for(let i = 0; i < n - 1; i ++){
                matriz[i].shift();
            }
        }
        const determinante = (matriz, n) => {
            if(n == 2){
                return ((matriz[0][0] * matriz[1][1]) - (matriz[0][1] * matriz[1][0]));
            }

        }
    }
    
}

    

let matrizPrueba1 = new Matriz([[3, -2],[2, 4], [1, 3]], 3, 2);
let matrizPrueba2 = new Matriz([[-2, 1, 3],[4, 1, 6]], 2, 3);
console.log("Resultado: " + matrizPrueba1.multiplicacionMatrices(matrizPrueba2));

let matrizPrueba3 = new Matriz([[0, 2, 3, 0], [0, 4, 5, 0], [0, 1, 0, 3], [2, 0 , 1, 3]], 4, 4);
//console.log("Determinante: " + matrizPrueba3.calcularDeterminante());



const crearSubMatriz = (matriz, notFila, notColumna, n) => {


    for(let i = 0; i < n; i++){
        matriz[notFila].pop();
    }
    for(let i = 0; i < n ; i ++){
        matriz[i].splice(notColumna, 1);
    }
    matriz.shift();
    return matriz;

    
}

console.log(crearSubMatriz([[0,2,3,0], [0,4,5,0], [0,1,0,3], [2,0,1,3]], 0, 1, 4));