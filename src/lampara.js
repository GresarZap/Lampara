export class Lampara {
    constructor(gl, width, heigh, h, k, subdivisions) {
        this._widht = width;
        this._height = heigh;
        this._subdivisions = subdivisions;
        this._h = h;
        this._k = k;

        this._color = [1.0, 0.0, 0.0, 1.0];
        this._vertices = [];
        this.subdivisions();


        /* Se crea el objeto del arreglo de vértices (VAO) */
        this.lampVAO = gl.createVertexArray();

        /* Se activa el objeto */
        gl.bindVertexArray(this.lampVAO);


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

    subdivisions() {
        let distanceY = this._height / this._subdivisions;
        let iniY = - this._height / 2;
        let positionX = this._widht + this._h;

        for (let index = 0; index < this._subdivisions; index++) {
            this._vertices.push(0 + this._h);
            this._vertices.push(0 + this._k);
            this._vertices.push(positionX);
            this._vertices.push(iniY + (index * distanceY) + this._k);
            this._vertices.push(positionX);
            this._vertices.push(iniY + ((index + 1) * distanceY) + this._k);
        }

        this._vertices.push(0 + this._h);
        this._vertices.push(0 + this._k);
    }

    dibuja(gl, uColor) {
        console.log('dibujando lampara')
        /* Se activa el objeto del arreglo de vértices */
        gl.bindVertexArray(this.lampVAO);
        /* Se renderiza las primitivas desde los datos del arreglo */
        gl.uniform4f(uColor, this._color[0], this._color[1], this._color[2], this._color[3]);
        gl.drawArrays(gl.LINE_LOOP, 0, this._subdivisions * 3 + 1);

        /* Se desactiva el objeto del arreglo de vértices */
        gl.bindVertexArray(null);

    }

    dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo) {

        gl.bindVertexArray(this.lampVAO);
        gl.uniformMatrix4fv(uMatrizModelo, false, MatrizModelo);

        gl.uniform4f(uColor, this._color[0], this._color[1], this._color[2], this._color[3]);
        gl.drawArrays(gl.LINE_LOOP, 0, this._subdivisions * 3 + 1);

        gl.bindVertexArray(null);
    }
}