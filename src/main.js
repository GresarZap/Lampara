import { loadFile } from "../utils/load_file.js";
import { Codo } from "./codo.js";
import { Lampara } from "./lampara.js";
import { ortho, identidad, rotacionZ, traslacion } from "./mat4.js";
import { Rectangulo } from "./rectangulo.js";

let gl;
let shaderDeVertice;
let shaderDeFragmento;
let programaID;
let codo1;
let codo2;
let codo3;
let base;
let brazo1;
let brazo2;
let uColor;
let lampara;
let MatrizProyeccion = new Array(16);
let uMatrizProyeccion;

let MatrizModelo = new Array(16);
let uMatrizModelo;

let index = 0;

let stepDeg = 0.9;
let deg = 0;
let deg2 = 0;
let deg3 = 0;

async function main() {
    iniWebgl();
    await creaShader();
    vinculaShader();
    background([0, 0, 0, 1]);
    let l = -170;
    let r = 170;
    let b = -170;
    let t = 170;

    variablesUniform();
    proyeccion(l, r, b, t, -1, 1);

    let referenceX = r / 2;
    let referenceY = 30;

    codo1 = new Codo(gl, 10, 7, 0, 0);
    codo2 = new Codo(gl, 10, 7, 0, 0);
    codo3 = new Codo(gl, 10, 7, 0, 0);

    base = new Rectangulo(gl, 100, 20, 0, 0);

    brazo1 = new Rectangulo(gl, 8, 80, 0, 0);

    brazo2 = new Rectangulo(gl, 8, 80, 0, 0);

    lampara = new Lampara(gl, 50, 50, 0, 0, 8);

    animacion();
}

function iniWebgl() {
    // 2. Inicializacion de webgl
    const canvas = document.getElementById("webglcanvas");
    gl = canvas.getContext("webgl2");

    if (!gl) {
        console.error("WebGL 2.0 no es compatible con este navegador.");
    }

    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
}

async function creaShader() {
    // 3. Creacion de Shaders
    // Shader Vertex
    shaderDeVertice = gl.createShader(gl.VERTEX_SHADER);
    const vertexCode = await loadFile('/shaders/shader.vert');
    gl.shaderSource(shaderDeVertice, vertexCode.trim());
    gl.compileShader(shaderDeVertice);

    if (!gl.getShaderParameter(shaderDeVertice, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeVertice));
    }

    // Shader Fragment
    shaderDeFragmento = gl.createShader(gl.FRAGMENT_SHADER);
    const fragCode = await loadFile('/shaders/shader.frag');
    gl.shaderSource(shaderDeFragmento, fragCode.trim());
    gl.compileShader(shaderDeFragmento);

    if (!gl.getShaderParameter(shaderDeFragmento, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shaderDeFragmento));
    }
}

function vinculaShader() {
    programaID = gl.createProgram();

    gl.attachShader(programaID, shaderDeVertice);
    gl.attachShader(programaID, shaderDeFragmento);
    gl.linkProgram(programaID);

    if (!gl.getProgramParameter(programaID, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(programaID));
    }

    gl.useProgram(programaID);

    return programaID;
}

function background(bg) {
    // 6. Configuración del color de limpieza
    gl.clearColor(...bg);
    gl.clear(gl.COLOR_BUFFER_BIT);
}

function variablesUniform() {
    // 7. Configuración de valores uniform
    uColor = gl.getUniformLocation(programaID, "uColor");
    uMatrizModelo = gl.getUniformLocation(programaID, "uMatrizModelo");
}

function proyeccion(left, right, bottom, top, near, far) {
    // 7.1 Transformacion

    const uMatrizProyeccion = gl.getUniformLocation(programaID, "uMatrizProyeccion");
    ortho(MatrizProyeccion, left, right, bottom, top, near, far);
    gl.uniformMatrix4fv(uMatrizProyeccion, false, MatrizProyeccion);
}

let sw = true;
let esc1 = true;
let esc2 = true;
let esc3 = true;

function animacion() {
    background([0, 0, 0, 1]);
    let posY = -120;

    if (esc1)
        escene1(posY);
    else if (esc2)
        escene2(posY);
    else escene3(posY);

    requestAnimationFrame(animacion);
}

let count = 0;
function escene1(posY) {

    identidad(MatrizModelo);
    traslacion(MatrizModelo, 0, 0 + posY, 0);
    base.dibujaConModelo(gl, uColor, true, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 30, 0);
    rotacionZ(MatrizModelo, deg);
    codo1.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 10, 0);
    brazo1.dibujaConModelo(gl, uColor, false, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 90, 0);
    codo2.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 10, 0);
    brazo2.dibujaConModelo(gl, uColor, false, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 90, 0);
    codo3.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    lampara.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);


    deg += stepDeg;

    if (deg > 22.5 || deg < -18.5) {
        stepDeg *= -1;
        count++;
        if (count == 3)
            esc1 = false;
    }

}

function escene2(posY) {
    identidad(MatrizModelo);
    traslacion(MatrizModelo, 0, 0 + posY, 0);
    base.dibujaConModelo(gl, uColor, true, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 30, 0);
    rotacionZ(MatrizModelo, deg);
    codo1.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 10, 0);
    brazo1.dibujaConModelo(gl, uColor, false, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 90, 0);
    rotacionZ(MatrizModelo, deg2);
    codo2.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 10, 0);
    brazo2.dibujaConModelo(gl, uColor, false, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 90, 0);
    codo3.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    lampara.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    deg2 += stepDeg;
    if (deg2 < -108.5) {
        stepDeg *= -1;
        count++;
    } else if (stepDeg > 0 && deg2 > -40) {
        stepDeg *= -1;
        count++;
    } else if (count == 5 && deg2 < -90.5) {
        stepDeg *= -1;
        count++;
    }


    esc2 = count == 6 ? false : true;
}


function escene3(posY) {
    identidad(MatrizModelo);
    traslacion(MatrizModelo, 0, 0 + posY, 0);
    base.dibujaConModelo(gl, uColor, true, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 30, 0);
    rotacionZ(MatrizModelo, deg);
    codo1.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 10, 0);
    brazo1.dibujaConModelo(gl, uColor, false, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 90, 0);
    rotacionZ(MatrizModelo, deg2);
    codo2.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 10, 0);
    brazo2.dibujaConModelo(gl, uColor, false, uMatrizModelo, MatrizModelo);

    traslacion(MatrizModelo, 0, 90, 0);
    codo3.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    rotacionZ(MatrizModelo, deg3);
    lampara.dibujaConModelo(gl, uColor, uMatrizModelo, MatrizModelo);

    deg3 += stepDeg;

    if (deg3 > 45 || deg3 < 0) {
        stepDeg *= -1;
    }
}

window.onload = main;