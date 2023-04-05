function Matriz  (matriz, filas, columnas)  {
    this.filas = filas;
    this.columnas = columnas;
    this.matriz = matriz;

    


    this.getMatriz = () => {
        return this.matriz;
    }
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
        let res = 0;

        //Metodo para copiar matriz original a copia, por referencia
        const copiarMatriz = (copia, original, dim) =>{
            for(let i = 0; i < dim; i++){
                for(let j = 0; j < dim; j++){
                    copia[i][j] = original[i][j];
                }
            }
            return;
        }

        //Metodo para crear submatriz con dimensiones reducidas
        const crearSubMatriz = (matriz, notFila, notColumna, n) => {  

            //Reservamos espacio de memoria
            let modifMatriz = new Array(n);
            for (let i = 0; i < n; i++) {
                modifMatriz[i] = new Array(n);
            }
            //Creamos matriz nueva para no modificar la original
            copiarMatriz(modifMatriz, matriz, n);

            //Creamos subMatriz y guardamos en modifMatriz
            for(let i = 0; i < n; i++){
                modifMatriz[notFila].pop();
            }
            for(let i = 0; i < n ; i ++){
                modifMatriz[i].splice(notColumna, 1);
            }
            modifMatriz.shift();
            return modifMatriz;    
        }
        
        // const crearSubMatriz = (matriz, notFila, notColumna, n) => {  
        //     //Reservamos espacio de memoria
        //     let modifMatriz = new Array(n-1);
        //     for (let i = 0; i < n-1; i++) {
        //         modifMatriz[i] = new Array(n-1);
        //     }
        //     //Copiamos matriz original a la matriz modificada
        //     for(let i = 0; i < n-1; i++){
        //         for(let j = 0; j < n-1 ; j ++){
        //             modifMatriz[i][j] = matriz[i + (i >= notFila)][j + (j >= notColumna)];
        //         }
        //     }
        //     return modifMatriz;    
        // }

        const determinante = (matrizCalc, n) => {
            if(n == 2){
                return ((matrizCalc[0][0] * matrizCalc[1][1]) - (matrizCalc[0][1] * matrizCalc[1][0]));
            }
            let res = 0;
            let i = 0;
            for(let j = 0; j < n; j++){
                res += Math.pow(-1, i + j + 2) * matrizCalc[i][j] * determinante(crearSubMatriz(matrizCalc,i,j,n), n - 1);
            }
            return res;

        }

        
        let resultado;
        if(this.esCuadrada()){
            resultado = determinante(this.getMatriz(), this.filas, 0);
        }
        return resultado;
    }
    
}



let matrizPrueba1 = new Matriz([[0,2,3,0], [0,4,5,0], [0,1,0,3], [2,0,1,3]], 4, 4);
let matrizPrueba2 = new Matriz([[-2, 1, 3],[4, 1, 6]], 2, 3);





console.log("Determinante de matriz: " + matrizPrueba1.getMatriz() + ": " + matrizPrueba1.calcularDeterminante());

export default Matriz;