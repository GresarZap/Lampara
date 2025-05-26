export class Rectangulo {
    constructor(gl, width, height, h, k) {
        this._width = width;
        this._height = height;
        this._h = h;
        this._k = k;
        this._color = [1.0, 1.0, 1.0, 1.0];
        this._vertices = [
            h, k,
            -(width / 2) + h, 0 + k,
            -(width / 2) + h, height + k,
            -(width / 2) + h + width, height + k,
            -(width / 2) + h + width, 0 + k,
        ];

        /* Se crea el objeto del arreglo de vértices (VAO) */
        this.rectanguloVAO = gl.createVertexArray();

        /* Se activa el objeto */
        gl.bindVertexArray(this.rectanguloVAO);


        /* Se genera un nombre (código) para el buffer */
        var codigoVertices = gl.createBuffer();

        /* Se asigna un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, codigoVertices);

        /* Se transfiere los datos desde la memoria nativa al buffer de la GPU */
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._vertices), gl.STATIC_DRAW);

        /* Se habilita el arreglo de los vértices (indice = 0) */
        gl.enableVertexAttribArray(0);

        /* Se especifica los atributos del arreglo de vértices */
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);


        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);

        /* Se deja de asignar un nombre (código) al buffer */
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
    }

    dibuja(gl, uColor, llenado) {

        /* Se activa el objeto del arreglo de vértices */
        gl.bindVertexArray(this.rectanguloVAO);
        /* Se renderiza las primitivas desde los datos del arreglo */
        gl.uniform4f(uColor, this._color[0], this._color[1], this._color[2], this._color[3]);
        gl.drawArrays(llenado ? gl.TRIANGLE_FAN : gl.LINE_LOOP, 0, 5);

        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);

    }

    dibujaConModelo(gl, uColor, llenado, uMatrizModelo, MatrizModelo) {

        gl.bindVertexArray(this.rectanguloVAO);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);

        gl.uniform4f(uColor, this._color[0], this._color[1], this._color[2], this._color[3]);
        gl.drawArrays(llenado ? gl.TRIANGLE_FAN : gl.LINE_LOOP, 0, 5);

        gl.bindVertexArray(null);
    }
}