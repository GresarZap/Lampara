export class Codo {
    constructor(gl, radius1, radius2, h = 0, k = 0) {

        /**
         *             3      2
         *             
         *       4                  1
         *        	
         *    5                         0
         *    
         *       6                  9
         *        
         *             7      8		
         */

        /* Las coordenadas cartesianas (x, y) */
        var vertices = [];
        this._color1 = [1.0, 1.0, 1.0, 1.0];
        this._color2 = [1.0, 0.0, 0.0, 1.0];
        this._h = h;
        this._k = k;
        this._radius1 = radius1;
        this._radius2 = radius2;

        for (var i = 0; i < 360; i++) {
            vertices.push(this._h + this._radius1 * Math.cos(i * Math.PI / 180));
            vertices.push(this._k + this._radius1 * Math.sin(i * Math.PI / 180));
        }

        for (var i = 0; i < 360; i++) {
            vertices.push(this._h + this._radius2 * Math.cos(i * Math.PI / 180));
            vertices.push(this._k + this._radius2 * Math.sin(i * Math.PI / 180));
        }

        /* Se crea el objeto del arreglo de vértices (VAO) */
        this.circuloVAO = gl.createVertexArray();

        /* Se activa el objeto */
        gl.bindVertexArray(this.circuloVAO);


        /* Se genera un nombre (código) para el buffer */
        var codigoVertices = gl.createBuffer();

        /* Se asigna un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, codigoVertices);

        /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

        /* Se habilita el arreglo de los vértices (indice = 0) */
        gl.enableVertexAttribArray(0);

        /* Se especifica los atributos del arreglo de vértices */
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);


        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);

        /* Se deja de asignar un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, null);

    }

    dibuja(gl, uColor) {

        /* Se activa el objeto del arreglo de vértices */
        gl.bindVertexArray(this.circuloVAO);
        /* Se renderiza las primitivas desde los datos del arreglo */
        gl.uniform4f(uColor, this._color1[0], this._color1[1], this._color1[2], this._color1[3]);
        gl.drawArrays(gl.LINE_LOOP, 0, 360);
        gl.uniform4f(uColor, this._color2[0], this._color2[1], this._color2[2], this._color2[3]);
        gl.drawArrays(gl.TRIANGLE_FAN, 360, 360);

        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);

    }

    dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo) {

        gl.bindVertexArray(this.circuloVAO);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);

        gl.uniform4f(uColor, this._color1[0], this._color1[1], this._color1[2], this._color1[3]);
        gl.drawArrays(gl.LINE_LOOP, 0, 360);
        gl.uniform4f(uColor, this._color2[0], this._color2[1], this._color2[2], this._color2[3]);
        gl.drawArrays(gl.TRIANGLE_FAN, 360, 360);

        gl.bindVertexArray(null);
    }

    set color(value) {
        this._color1 = value;
    }

    get radio() {
        return this._radius1;
    }

    get h() {
        return this._h;
    }

    get k() {
        return this._k;
    }

    static distancia(x0, y0, x1, y1) {
        return (x1 - x0) ** 2 + (y1 - y0) ** 2;
    }

    static pointInCircle(x0, y0, x1, y1, radius) {
        console.log(x0, y0, x1, y1, radius);
        return this.distancia(x0, y0, x1, y1) < radius ** 2;
    }
}