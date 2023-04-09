function Matriz  (matriz, filas, columnas)  {
    this.filas = filas;
    this.columnas = columnas;
    this.matriz = matriz;
    
    
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
            //Reservamos espacio en memoria para matriz resultado
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


    this.multiplicacionMatrices = (matrizMultiplicacion) => {
        //Metodo static que chequea validez de operacion
        function multiplicacionDefinida(matriz){
            return (this.columnas === matriz.filas);
        }

        if(!multiplicacionDefinida(matrizMultiplicacion)){
            window.alert("No se pueden multiplicar las matrices");
            return null;
        }


        //Reservamos espacio en memoria, m1(n x m) * m2(k x j) = m3(n x j)
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
        const determinante = (matrizCalc, n) => {
            //Caso Base si es una matriz de 2x2
            if(n == 2){
                return ((matrizCalc[0][0] * matrizCalc[1][1]) - (matrizCalc[0][1] * matrizCalc[1][0]));
            }

            let res = 0; //En res se guarda el resultado de cada llamado recursivo
            let i = 0; //i = 0, ya que nos movemos por fila 0, podriamos haber elegido cualquier fila/columna
    
            //Formula de serie especificada
            for(let j = 0; j < n; j++){
                res += Math.pow(-1, i + j + 2) * matrizCalc[i][j] * determinante(crearSubMatriz(matrizCalc,i,j,n), n - 1);
            }
            //Retorno res de llamado recursivo, donde se va a sumar al for
            return res; 
        }

        //Unicamente llamamos a determinante si la matriz es cuadrada
        let resultado;
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
        //det(A) = 0, significa que no tiene inversa. Con el null hacemos que no se muestre nada en pantalla
        if (det == 0) { 
            return null;
        }

        //Armamos la matriz (A|I), I es la matriz identidad
        const matrizAmpliada = [];
        for (let i = 0; i < filas; i++) {
            matrizAmpliada[i] = [];
            for (let j = 0; j < columnas * 2; j++) {
                //La primera parte de la matriz ampliada queda igual
                if (j < columnas) {
                    matrizAmpliada[i][j] = matriz[i][j];
                } 
                //En la segunda parte construimos la identidad, j - columnas nos permite saber si es diagonal o no
                else {
                    matrizAmpliada[i][j] = i == j - columnas ? 1 : 0;
                }
            }
        }

        // Aplicar la eliminación gaussiana para obtener la matriz inversa
        for (let i = 0; i < filas; i++) { 
            const pivot = matrizAmpliada[i][i]; //Tomamos a los de la diagonal de A como pivotes
            for (let j = 0; j < columnas * 2; j++) {
                matrizAmpliada[i][j] /= pivot; //Dividimos a toda la fila i de (A|I) por el pivot
            }
            for (let k = 0; k < filas; k++) { 
                if (k != i) {
                    const factor = matrizAmpliada[k][i];
                    for (let j = 0; j < columnas * 2; j++) {
                        matrizAmpliada[k][j] -= factor * matrizAmpliada[i][j]; //Realizamos operacion elemental de resta(suma de opuesto) por multiplo de otra fila
                    }
                }
            }
        }

        //Sabemos que en nuestra mat ampliada, (I, A -1)
        const matrizInversa = [];
        for (let i = 0; i < filas; i++) {
            matrizInversa[i] = matrizAmpliada[i].slice(columnas);
        }


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
          if (coeficientes[i][pivote] == 0) { // Si el elemento en la posición del pivote es cero hacemos permutacion
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
          // Al igual que en la matriz inversa hacemos 0 los elementos debajo de la diagonal.
          for (j = i+1; j < filas; j++) {
            let factor = coeficientes[j][pivote];
            for (k = pivote; k < columnas; k++) {
              coeficientes[j][k] -= factor * coeficientes[i][k];
            }
          }
          pivote++;
        }
        
        // Se analiza la última fila no nula de la matriz resultante para determinar la compatibilidad del sistema.
        let ultimaFila = coeficientes[filas-1]; //Nos paramos en ultima fila, index 0
        let hayCeros = true;
        for (i = 0; i < columnas-1; i++) { //Solo nos interesa si todos los coeficientes de la ultima fila son 0, sino hacemos break
          if (ultimaFila[i] != 0) {
            hayCeros = false;
            break;
          }
        }
        if (hayCeros && ultimaFila[columnas-1] != 0) { //Caso donde te queda un absurdo
          return "Incompatible"; 
        }
        else if (hayCeros && ultimaFila[columnas-1] == 0) { //Caso donde coeficientes son 0 pero el termino independiente tambien
          return "Compatible indeterminado"; 
        }
        else {
          return "Compatible determinado"; //Si no hay todos 0 en coeficientes sera comp determinado
        }
      }
      
        
    
    
}



export default Matriz;