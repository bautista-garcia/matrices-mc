function Matriz  (matriz, filas, columnas)  {
    this.filas = filas;
    this.columnas = columnas;
    this.matriz = matriz;

    this.getFilas = () => {
        return this.filas;
    }

    this.getColumnas = () => {
        return this.columnas;
    }


    this.getMatriz = () => {
        return this.matriz;
    }
    this.esCuadrada = () => {
        return (this.filas === this.columnas);
    }
    this.mismaDimension = (matriz) => {
        return ((this.filas === matriz.filas) && (this.columnas === matriz.columnas));
    }
    
    this.sumaMatrices = (matrizSuma, filas, columnas) => {
        if(this.getFilas() !== filas || this.getColumnas() !== columnas){
            window.alert("Las matrices no tienen la misma dimension");
            return null;
        }
        else{
            
            let matrizResultado = new Array(this.getFilas());
            for (let i = 0; i < this.getFilas(); i++) {
                matrizResultado[i] = new Array(this.getColumnas());
            }
            
            for(let i = 0; i < this.filas; i++){ //Recorremos filas
                for(let j = 0; j < this.columnas; j++){ //Recorremos columnas
                    matrizResultado[i][j] = this.matriz[i][j] + matrizSuma[i][j]; 
                }
            }
            return matrizResultado;
        }
    }

    this.multiplicacionDefinida = (matriz) => {
        return (this.columnas === matriz.filas);
    }

    this.multiplicacionMatrices = (matrizMultiplicacion) => {
        //Comprobamos que las matrices se puedan multiplicar
        if(!this.multiplicacionDefinida(matrizMultiplicacion)){
            Window.alert("No se pueden multiplicar las matrices");
            return null;
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
    //Metodo para calcular el determinante de una matriz, metodo static
    
    
    
    this.calcularDeterminante = () => {
        const determinante = (matrizCalc, n) => {
            //Caso Base si es una matriz de 2x2
            if(n == 2){
                return ((matrizCalc[0][0] * matrizCalc[1][1]) - (matrizCalc[0][1] * matrizCalc[1][0]));
            }
    
    
            let res = 0; //En res se guarda el resultado de cada llamado recursivo
            let i = 0; //i = 0 porque nos movemos por la fila 0
    
            //Formula de serie especificada
            for(let j = 0; j < n; j++){
                res += Math.pow(-1, i + j + 2) * matrizCalc[i][j] * determinante(crearSubMatriz(matrizCalc,i,j,n), n - 1);
            }
            //Retorno res de llamado recursivo
            return res; 
    
        }
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

        //Retornamos el resultado para que sea accesible al objeto
        let resultado;
        if(this.esCuadrada()){
            resultado = determinante(this.getMatriz(), this.filas);
        }
        return resultado;
    }


    this.invertir = () => {
        // Obtener la matriz y sus dimensiones
        const matriz = this.getMatriz();
        const filas = this.filas;
        const columnas = this.columnas;

        // Verificar si la matriz tiene inversa utilizando el método de determinante
        const det = this.calcularDeterminante();
        if (det == 0) {
            Window.alert("La matriz no tiene inversa.");
            return null;
        }

        // Construir la matriz ampliada
        const matrizAmpliada = [];
        for (let i = 0; i < filas; i++) {
            matrizAmpliada[i] = [];
            for (let j = 0; j < columnas * 2; j++) {
                if (j < columnas) {
                    matrizAmpliada[i][j] = matriz[i][j];
                } else {
                    matrizAmpliada[i][j] = i == j - columnas ? 1 : 0;
                }
            }
        }

        // Aplicar la eliminación gaussiana para obtener la matriz inversa
        for (let i = 0; i < filas; i++) {
            const pivot = matrizAmpliada[i][i];
            for (let j = 0; j < columnas * 2; j++) {
                matrizAmpliada[i][j] /= pivot;
            }
            for (let k = 0; k < filas; k++) {
                if (k != i) {
                    const factor = matrizAmpliada[k][i];
                    for (let j = 0; j < columnas * 2; j++) {
                        matrizAmpliada[k][j] -= factor * matrizAmpliada[i][j];
                    }
                }
            }
        }

        // Extraer la matriz inversa de la matriz ampliada
        const matrizInversa = [];
        for (let i = 0; i < filas; i++) {
            matrizInversa[i] = matrizAmpliada[i].slice(columnas);
        }

        // Retornar la matriz inversa
        return matrizInversa;
    } 

    this.compatibilidad = () => {
        

        //El metodo matrizCoeficientes() crea una matriz con las dimensiones de la matriz original, pero sin la columna de los terminos independientes
        const matrizCoeficientes = () => {
            let matrizCoeficientes = new Array(this.filas);
            for(let i = 0; i < this.filas; i++){
                matrizCoeficientes[i] = new Array(this.columnas - 1);
            }
            for(let i = 0; i < this.filas; i++){
                for(let j = 0; j < this.columnas - 1; j++){
                    matrizCoeficientes[i][j] = this.matriz[i][j];
                }
            }
            let objMatrizCoeficientes = new Matriz(matrizCoeficientes, this.filas, this.columnas - 1);
            return objMatrizCoeficientes;
        }

        

        if(matrizCoeficientes().calcularDeterminante() == 0){
            return "El sistema de ecuaciones es incompatible";
        }
        else{
            return "El sistema de ecuaciones es compatible";
        }
    }
        
    
    
}



let matrizPrueba1 = new Matriz([[0,2,3,0], [0,4,5,0], [0,1,0,3], [2,0,1,3]], 4, 4);
let matrizPrueba2 = new Matriz([[-2, 1, 3],[4, 1, 6]], 2, 3);





console.log("Determinante de matriz: " + matrizPrueba1.getMatriz() + ": " + matrizPrueba1.calcularDeterminante());

export default Matriz;