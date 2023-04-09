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
        return (matriz.length === matriz[0].length);
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
            window.alert("No se pueden multiplicar las matrices");
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
        console.log(this.getMatriz());
        if(this.esCuadrada()){
            resultado = determinante(this.getMatriz(), this.filas);
        }
        else {
            window.alert("No se puede calcular el determinante de una matriz no cuadrada, por lo tanto no tiene inversa.");
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
            window.alert("La matriz no tiene inversa.");
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

    this.determinarCompatibilidad = (coeficientes) => {
        // coeficientes es una matriz que contiene los coeficientes de las variables y los términos constantes de las ecuaciones.
        let filas = coeficientes.length; // número de filas
        let columnas = coeficientes[0].length; // número de columnas
        let i, j, k;
        let pivote = 0; // posición del pivote
        
        // Se aplica el método de eliminación Gaussiana para llevar la matriz ampliada a su forma escalonada reducida.
        for (i = 0; i < filas; i++) {
          if (coeficientes[i][pivote] == 0) { // Si el elemento en la posición del pivote es cero, se busca un elemento no nulo en la misma columna.
            for (j = i+1; j < filas; j++) {
              if (coeficientes[j][pivote] != 0) { // Si se encuentra un elemento no nulo, se intercambian las filas.
                let temp = coeficientes[i];
                coeficientes[i] = coeficientes[j];
                coeficientes[j] = temp;
                break;
              }
            }
            if (coeficientes[i][pivote] == 0) { // Si no se encontró un elemento no nulo, se pasa a la siguiente columna.
              pivote++;
              continue;
            }
          }
          // Se divide la fila i por el elemento en la posición del pivote para convertirlo en un 1.
          let divisor = coeficientes[i][pivote];
          for (j = pivote; j < columnas; j++) {
            coeficientes[i][j] /= divisor;
          }
          // Se eliminan los elementos debajo del pivote en la misma columna.
          for (j = i+1; j < filas; j++) {
            let factor = coeficientes[j][pivote];
            for (k = pivote; k < columnas; k++) {
              coeficientes[j][k] -= factor * coeficientes[i][k];
            }
          }
          pivote++;
        }
        
        // Se analiza la última fila no nula de la matriz resultante para determinar la compatibilidad del sistema.
        let ultimaFila = coeficientes[filas-1];
        let hayCeros = true;
        for (i = 0; i < columnas-1; i++) {
          if (ultimaFila[i] != 0) {
            hayCeros = false;
            break;
          }
        }
        if (hayCeros && ultimaFila[columnas-1] != 0) {
          return "Incompatible"; // El sistema es incompatible.
        }
        else if (hayCeros && ultimaFila[columnas-1] == 0) {
          return "Compatible indeterminado"; // El sistema es compatible indeterminado.
        }
        else {
          return "Compatible determinado"; // El sistema es compatible determinado.
        }
      }
      
        
    
    
}



let matrizPrueba1 = new Matriz([[0,2,3,0], [0,4,5,0], [0,1,0,3], [2,0,1,3]], 4, 4);
let matrizPrueba2 = new Matriz([[-2, 1, 3],[4, 1, 6]], 2, 3);





console.log("Determinante de matriz: " + matrizPrueba1.getMatriz() + ": " + matrizPrueba1.calcularDeterminante());

export default Matriz;