
/* =====================================
   ELEMENTOS PRINCIPALES
===================================== */

const pantallaInicio = document.getElementById("pantalla-inicio");
const pantallaPersonajes = document.getElementById("pantalla-personajes");
const menuPrincipal = document.getElementById("menu-principal");
const pantallaJuego = document.getElementById("pantalla-juego");

const botonIniciar = document.getElementById("boton-iniciar");
const musicaFondo = document.getElementById("musica-fondo");
const botonExplorar = document.getElementById("boton-explorar");
const botonVolverMenu = document.getElementById("boton-volver-menu");
const botonInteractuar = document.getElementById("boton-interactuar");
const botonCambiarPersonaje = document.getElementById("boton-cambiar-personaje");

const nombrePersonaje = document.getElementById("nombre-personaje");
const tarjetasPersonajes = document.querySelectorAll(".tarjeta-personaje");
const botonMochila = document.getElementById("boton-mochila");
/* =====================================
   SELECCION DE PERSONAJE
===================================== */

let personajeSeleccionado = null;
let personajeSprite = new Image();
let spriteCargado = false;

botonIniciar.addEventListener("click", () => {
    musicaFondo.volume = 0.25;

    musicaFondo.play().catch(error => {
        console.log("No se pudo iniciar la música:", error);
    });

    pantallaInicio.classList.add("oculto");
    pantallaPersonajes.classList.remove("oculto");
});

tarjetasPersonajes.forEach(tarjeta => {
    tarjeta.addEventListener("click", () => {
        personajeSeleccionado = tarjeta.dataset.personaje;
                reiniciarExploracion();

        tarjetasPersonajes.forEach(opcion => {
            opcion.classList.remove("seleccionado");
        });

        tarjeta.classList.add("seleccionado");

        cargarSprite();

        pantallaPersonajes.classList.add("oculto");
        menuPrincipal.classList.remove("oculto");

        nombrePersonaje.textContent =
            "Personaje seleccionado: " + personajeSeleccionado;
    });
});

botonCambiarPersonaje.addEventListener("click", () => {
    menuPrincipal.classList.add("oculto");
    pantallaPersonajes.classList.remove("oculto");
});

/* =====================================
   CONFIGURACION DE SPRITES
===================================== */

const configuracionSprites = {
    Zxs_Angel: {
        archivo: "assets/personajes/Sprites-Zxs_Angel.png",

        recorte: {
            x: 300,
            y: [10, 250, 495, 735],
            ancho: 175,
            alto: 235
        },

        direcciones: {
            abajo: 0,
            derecha: 1,
            arriba: 2,
            izquierda: 3
        }
    },

    Yomi: {
        archivo: "assets/personajes/Sprites-Yomi.png",
        columnas: 4,
        filas: 4,
        tipo: "columnas",

        direcciones: {
            abajo: 0,
            arriba: 1,
            izquierda: 3,
            derecha: 2
        },

        cuadro: {
            x: 0,
            y: 0,
            ancho: 768 / 4,
            alto: 250
        }
    }
};
// Sprites de los dos personajes para la celebración
const spriteAngelCelebracion = new Image();
spriteAngelCelebracion.src = configuracionSprites.Zxs_Angel.archivo;

const spriteYomiCelebracion = new Image();
spriteYomiCelebracion.src = configuracionSprites.Yomi.archivo;

function cargarSprite() {
    const configuracion = configuracionSprites[personajeSeleccionado];

    if (!configuracion) return;

    spriteCargado = false;
    personajeSprite = new Image();

    personajeSprite.onload = () => {
        spriteCargado = true;

        console.log("Spritesheet cargado:", personajeSeleccionado);

        console.log(
            "Dimensiones:",
            personajeSprite.naturalWidth,
            "x",
            personajeSprite.naturalHeight
        );
    };

    personajeSprite.onerror = () => {
        spriteCargado = false;

        console.error("No se pudo cargar:", configuracion.archivo);
    };

    personajeSprite.src = configuracion.archivo;
}

/* =====================================
   DIMENSIONES DEL ESCENARIO
===================================== */

const ANCHO_ESCENARIO = 640;
const ALTO_ESCENARIO = 360;

/* =====================================
   CAMBIAR PANTALLAS
===================================== */

botonExplorar.addEventListener("click", () => {
    if (!personajeSeleccionado) {
        pantallaPersonajes.classList.remove("oculto");
        menuPrincipal.classList.add("oculto");
        return;
    }

    menuPrincipal.classList.add("oculto");
    pantallaJuego.classList.remove("oculto");

    jugador.x = 300;
    jugador.y = 170;

    nombrePersonaje.textContent =
        "Explorando como " + personajeSeleccionado;
});

botonVolverMenu.addEventListener("click", () => {
    pantallaJuego.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
});


document.querySelectorAll(".boton-juego").forEach(boton => {
    boton.addEventListener("click", () => {

        if (boton.dataset.juego === "corazones") {
            menuPrincipal.classList.add("oculto");
            document.getElementById("pantalla-minijuego-corazones")
                .classList.remove("oculto");

            iniciarAtrapaCorazones();
            return;
        }

        if (boton.dataset.juego === "memoria") {
            menuPrincipal.classList.add("oculto");
            document.getElementById("pantalla-minijuego-memoria")
                .classList.remove("oculto");

            iniciarMemoria();
            return;
        }
if (boton.dataset.juego === "laberinto") {

    if (!personajeSeleccionado) {
        menuPrincipal.classList.add("oculto");
        pantallaPersonajes.classList.remove("oculto");
        return;
    }

    menuPrincipal.classList.add("oculto");

    document.getElementById("pantalla-minijuego-laberinto")
        .classList.remove("oculto");

    iniciarLaberinto();
    return;
}
if (boton.dataset.juego === "obstaculos") {

    if (!personajeSeleccionado) {
        menuPrincipal.classList.add("oculto");
        pantallaPersonajes.classList.remove("oculto");
        return;
    }

    menuPrincipal.classList.add("oculto");

    document.getElementById("pantalla-minijuego-obstaculos")
        .classList.remove("oculto");

    iniciarEsquivaObstaculos();
    return;
}
                if (boton.dataset.juego === "preguntas") {

            menuPrincipal.classList.add("oculto");

            document.getElementById("pantalla-minijuego-preguntas")
                .classList.remove("oculto");

            iniciarPreguntas();
            return;
        }

        alert("¡Próximamente! Aquí estará: " + boton.dataset.juego);

    });
});

// VOLVER AL MENÚ DESDE ATRAPA CORAZONES
document.getElementById("boton-salir-corazones")
    .addEventListener("click", () => {

        detenerAtrapaCorazones();

        document.getElementById("pantalla-minijuego-corazones")
            .classList.add("oculto");

        menuPrincipal.classList.remove("oculto");
    });


/* =====================================
   CANVAS
===================================== */

const lienzo = document.getElementById("lienzo-juego");
const pincel = lienzo.getContext("2d");

pincel.imageSmoothingEnabled = false;

/* =====================================
   FONDO DEL BOSQUE
===================================== */

const bosque = new Image();

bosque.src = "assets/escenarios/fondos/Bosque.png";

bosque.onerror = () => {
    console.error(
        "No se pudo cargar bosque.png. Revisa su ubicación y nombre."
    );
};

/* =====================================
   JUGADOR
===================================== */

const jugador = {
    x: 300,
    y: 170,
    velocidad: 3,
    ancho: 20,
    alto: 24,
    direccion: "abajo"
};

/* =====================================
   SISTEMA DE COLISIONES
===================================== */



const obstaculos = [

    // LAGO Y CASCADA
    [
        [0, 0], [82, 0], [82, 48], [95, 70],
        [112, 94], [172, 100], [190, 116],
        [201, 145], [202, 185], [190, 205],
        [65, 205], [43, 195], [0, 195],
        [0, 70], [25, 60]
    ],

    // ARBOLES DEL BORDE SUPERIOR
    [[0, 0], [35, 0], [58, 18], [78, 48], [65, 70], [20, 83], [0, 70]],
    [[105, 0], [160, 0], [175, 35], [160, 65], [120, 58]],
    [[165, 0], [225, 0], [235, 40], [215, 65], [175, 55]],
    [[230, 0], [290, 0], [305, 40], [280, 65], [245, 55]],
    [[295, 0], [365, 0], [375, 42], [350, 65], [310, 55]],
    [[365, 0], [430, 0], [445, 42], [420, 65], [380, 55]],
    [[435, 0], [500, 0], [510, 55], [475, 80], [445, 60]],
    [[505, 0], [570, 0], [585, 65], [550, 90], [515, 65]],
    [[570, 0], [640, 0], [640, 100], [600, 90], [575, 60]],

    // ARBOL GRANDE JUNTO AL CAMINO
    [[415, 85], [455, 78], [485, 105], [490, 140], [465, 165], [430, 155], [410, 125]],

    // ARBOLES DEL LADO DERECHO
    [[505, 155], [550, 145], [580, 175], [580, 215], [550, 245], [515, 220]],
    [[565, 220], [610, 205], [640, 235], [640, 305], [600, 300], [570, 270]],

    // TOCON Y MATORRALES DERECHOS
    [[460, 165], [495, 165], [505, 195], [490, 205], [455, 195]],
    [[420, 195], [480, 195], [490, 235], [460, 250], [420, 235]],
    [[490, 190], [530, 185], [545, 235], [520, 255], [490, 240]],

    // ARBOLES DEL LADO IZQUIERDO
    [[0, 165], [35, 160], [70, 185], [80, 225], [55, 255], [15, 245], [0, 220]],
    [[65, 190], [105, 190], [130, 220], [120, 255], [85, 260], [65, 235]],
    [[100, 215], [150, 210], [165, 245], [145, 270], [110, 265]],

    // TRONCO CAIDO
    [[62, 255], [112, 255], [120, 280], [65, 280]],

    // ARBOLES DEL BORDE INFERIOR
    [[0, 270], [45, 265], [85, 290], [110, 330], [90, 360], [0, 360]],
    [[75, 285], [130, 270], [175, 295], [195, 340], [170, 360], [90, 350]],
    [[155, 285], [210, 280], [245, 305], [270, 350], [250, 360], [180, 350]],
    [[255, 300], [310, 295], [350, 320], [370, 360], [270, 360]],
    [[350, 305], [395, 300], [425, 330], [435, 360], [370, 360]],
    [[535, 290], [585, 285], [620, 310], [640, 310], [640, 360], [550, 360]]
];


const cajaColision = {
    offsetX: 4,
    offsetY: 14,
    ancho: 12,
    alto: 8
};


function puntoDentroPoligono(px, py, poligono) {
    let dentro = false;

    for (
        let i = 0, j = poligono.length - 1;
        i < poligono.length;
        j = i++
    ) {
        const xi = poligono[i][0];
        const yi = poligono[i][1];
        const xj = poligono[j][0];
        const yj = poligono[j][1];

        const intersecta =
            ((yi > py) !== (yj > py)) &&
            (px < (xj - xi) * (py - yi) / (yj - yi) + xi);

        if (intersecta) dentro = !dentro;
    }

    return dentro;
}

function hayColision(x, y) {
    const izquierda = x + cajaColision.offsetX;
    const arriba = y + cajaColision.offsetY;
    const derecha = izquierda + cajaColision.ancho;
    const abajo = arriba + cajaColision.alto;

    for (const poligono of obstaculos) {
        // Revisar varios puntos de los pies del personaje
        for (let px = izquierda; px <= derecha; px += 3) {
            for (let py = arriba; py <= abajo; py += 3) {
                if (puntoDentroPoligono(px, py, poligono)) {
                    return true;
                }
            }
        }
    }

    return false;
}

function puedeMoverse(nuevoX, nuevoY) {
    if (
        nuevoX < 0 ||
        nuevoY < 0 ||
        nuevoX + jugador.ancho > ANCHO_ESCENARIO ||
        nuevoY + jugador.alto > ALTO_ESCENARIO
    ) {
        return false;
    }

    return !hayColision(nuevoX, nuevoY);
}

/* =====================================
   CONTROLES DE TECLADO
===================================== */

const teclas = {};

document.addEventListener("keydown", evento => {
    const tecla = evento.key.toLowerCase();

    if ([
        "arrowup",
        "arrowdown",
        "arrowleft",
        "arrowright",
        " "
    ].includes(tecla)) {
        evento.preventDefault();
    }

    teclas[tecla] = true;
});

document.addEventListener("keyup", evento => {
    teclas[evento.key.toLowerCase()] = false;
});

/* =====================================
   SISTEMA DE ROMPECABEZAS
===================================== */

const botonRompecabezas = document.getElementById("boton-rompecabezas");
const textoProgresoRompecabezas = document.getElementById("progreso");
const pantallaRompecabezas = document.getElementById("pantalla-rompecabezas");
const mensajeRompecabezas = document.getElementById("mensaje-rompecabezas");
const contenedorPiezas = document.getElementById("piezas-rompecabezas");
const tableroRompecabezas = document.getElementById("tablero-rompecabezas");
const finalRompecabezas = document.getElementById("final-rompecabezas");
const botonSalirRompecabezas = document.getElementById("boton-salir-rompecabezas");

/* =====================================
   REPRODUCTOR DE AUDIO FINAL
===================================== */

const reproductorFinal = document.getElementById("reproductor-final");
const audioFinal = document.getElementById("audio-final");
const nombrePista = document.getElementById("nombre-pista");

const botonAnterior = document.getElementById("pista-anterior");
const botonReproducir = document.getElementById("reproducir-pausar");
const botonSiguiente = document.getElementById("pista-siguiente");

const barraProgreso = document.getElementById("barra-progreso");
const tiempoActual = document.getElementById("tiempo-actual");
const duracionAudio = document.getElementById("duracion-audio");

const pistas = [
    {
        nombre: "Mi mensaje para ti ♥",
        archivo: "assets/recuerdos/mensaje-voz.mp3"
    },
    {
        nombre: "Amor de siempre ♥",
        archivo: "assets/recuerdos/amor-de-siempre.mp3"
    }
];

let pistaActual = 0;

function formatoTiempo(segundos) {
    if (!Number.isFinite(segundos)) return "0:00";

    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = Math.floor(segundos % 60);

    return `${minutos}:${String(segundosRestantes).padStart(2, "0")}`;
}

function cargarPista(indice, reproducir = false) {
    pistaActual = indice;

    audioFinal.src = pistas[pistaActual].archivo;
    nombrePista.textContent = pistas[pistaActual].nombre;

    barraProgreso.value = 0;
    tiempoActual.textContent = "0:00";
    duracionAudio.textContent = "0:00";
    botonReproducir.textContent = "▶";

    if (reproducir) {
        musicaFondo.pause();
        audioFinal.play();
    }
}

botonReproducir.addEventListener("click", () => {
    if (audioFinal.paused) {
        musicaFondo.pause();
        audioFinal.play();
    } else {
        audioFinal.pause();
    }
});

// Cuando termine el audio final, vuelve la música de fondo
audioFinal.addEventListener("ended", () => {
    musicaFondo.play().catch(error => {
        console.log("No se pudo reanudar la música:", error);
    });
});

audioFinal.addEventListener("play", () => {
    botonReproducir.textContent = "⏸";
});

audioFinal.addEventListener("pause", () => {
    botonReproducir.textContent = "▶";
});

botonSiguiente.addEventListener("click", () => {
    if (pistaActual < pistas.length - 1) {
        cargarPista(pistaActual + 1, true);
    }
});

botonAnterior.addEventListener("click", () => {
    if (pistaActual > 0) {
        cargarPista(pistaActual - 1, true);
    }
});

audioFinal.addEventListener("ended", () => {
    if (pistaActual < pistas.length - 1) {
        cargarPista(pistaActual + 1, true);
    }
});

audioFinal.addEventListener("loadedmetadata", () => {
    duracionAudio.textContent = formatoTiempo(audioFinal.duration);
});

audioFinal.addEventListener("timeupdate", () => {
    tiempoActual.textContent = formatoTiempo(audioFinal.currentTime);

    if (Number.isFinite(audioFinal.duration) && audioFinal.duration > 0) {
        barraProgreso.value =
            (audioFinal.currentTime / audioFinal.duration) * 100;
    }
});

barraProgreso.addEventListener("input", () => {
    if (Number.isFinite(audioFinal.duration) && audioFinal.duration > 0) {
        audioFinal.currentTime =
            (barraProgreso.value / 100) * audioFinal.duration;
    }
});

// Preparar el primer audio sin reproducirlo automáticamente
cargarPista(0);


const listaPiezas = [
    { id: "corazones", nombre: "Atrapa corazones" },
    { id: "memoria", nombre: "Memoria" },
    { id: "laberinto", nombre: "Laberinto" },
    { id: "obstaculos", nombre: "Esquiva obstáculos" },
    { id: "preguntas", nombre: "Trivia" }
];

let piezasDesbloqueadas = [];
let piezasColocadas = [];
function desbloquearPieza(id) {
    if (piezasDesbloqueadas.includes(id)) return;

    piezasDesbloqueadas.push(id);

    actualizarInterfazRompecabezas();
}

function actualizarInterfazRompecabezas() {
    const cantidad = piezasDesbloqueadas.length;

    textoProgresoRompecabezas.textContent =
        `Piezas del rompecabezas: ${cantidad}/5`;

    botonRompecabezas.disabled = cantidad < 5;

    botonRompecabezas.textContent = cantidad === 5
        ? "Armar nuestro rompecabezas ♥"
        : "Armar nuestro rompecabezas 🔒";
}

function abrirRompecabezas() {
    menuPrincipal.classList.add("oculto");
    pantallaRompecabezas.classList.remove("oculto");

    actualizarTableroRompecabezas();
}


function actualizarTableroRompecabezas() {
    contenedorPiezas.innerHTML = "";
    tableroRompecabezas.innerHTML = "";

    contenedorPiezas.classList.remove("oculto");
    tableroRompecabezas.classList.remove("oculto");
    finalRompecabezas.classList.add("oculto");
    reproductorFinal.classList.add("oculto");

    // Si ya completamos el rompecabezas, mostrar el recuerdo final
    if (piezasColocadas.length === 5) {
        contenedorPiezas.classList.add("oculto");
        tableroRompecabezas.classList.add("oculto");
        finalRompecabezas.classList.remove("oculto");
        reproductorFinal.classList.remove("oculto");

        mensajeRompecabezas.textContent =
            "¡Lo conseguimos! Nuestro recuerdo está completo. ♥";

        return;
    }

    // Si todavía faltan aventuras por completar
    if (piezasDesbloqueadas.length < 5) {
        mensajeRompecabezas.textContent =
            "Completa nuestras cinco aventuras para conseguir las piezas.";
        return;
    }

    mensajeRompecabezas.textContent =
        "¡Tenemos todas las piezas! Ahora armemos nuestro recuerdo.";

    // Mostrar las piezas disponibles
    listaPiezas.forEach((pieza, indice) => {
        if (
            !piezasDesbloqueadas.includes(pieza.id) ||
            piezasColocadas.includes(indice)
        ) return;

        const boton = document.createElement("button");

        boton.className = "pieza-rompecabezas";
        boton.textContent = pieza.nombre;
        boton.style.backgroundImage =
            "url('assets/recuerdos/final-juntos.png')";
        boton.style.backgroundSize = "500% 100%";
        boton.style.backgroundPosition = `${indice * 25}% center`;

        boton.addEventListener("click", () => {
            piezaSeleccionada = indice;

            document.querySelectorAll(".pieza-rompecabezas")
                .forEach(elemento => {
                    elemento.classList.remove("seleccionada");
                });

            boton.classList.add("seleccionada");

            mensajeRompecabezas.textContent =
                `Seleccionaste: ${pieza.nombre}. Ahora elige su espacio.`;
        });

        contenedorPiezas.appendChild(boton);
    });

    // Crear los espacios del rompecabezas
    listaPiezas.forEach((pieza, indice) => {
        const espacio = document.createElement("button");

        espacio.className = "espacio-rompecabezas";

        if (piezasColocadas.includes(indice)) {
            espacio.classList.add("colocado");
            espacio.style.backgroundImage =
                "url('assets/recuerdos/final-juntos.png')";
            espacio.style.backgroundSize = "500% 100%";
            espacio.style.backgroundPosition = `${indice * 25}% center`;
        } else {
            espacio.textContent = "?";
        }

        espacio.addEventListener("click", () => {
            if (piezaSeleccionada === null) {
                mensajeRompecabezas.textContent =
                    "Primero selecciona una pieza.";
                return;
            }

            if (piezaSeleccionada !== indice) {
                mensajeRompecabezas.textContent =
                    "Esa pieza no encaja ahí. ¡Inténtalo otra vez!";
                return;
            }

            piezasColocadas.push(indice);
            piezaSeleccionada = null;

            actualizarTableroRompecabezas();
        });

        tableroRompecabezas.appendChild(espacio);
    });
}
botonRompecabezas.addEventListener("click", abrirRompecabezas);

botonSalirRompecabezas.addEventListener("click", () => {
    pantallaRompecabezas.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
});
/* =====================================
   CONTROLES TACTILES
===================================== */

document.querySelectorAll("[data-direccion]").forEach(boton => {
    const direccion = boton.dataset.direccion;

    function activar(evento) {
        evento.preventDefault();
        teclas[direccion] = true;
    }

    function desactivar(evento) {
        evento.preventDefault();
        teclas[direccion] = false;
    }

    boton.addEventListener("pointerdown", activar);
    boton.addEventListener("pointerup", desactivar);
    boton.addEventListener("pointerleave", desactivar);
    boton.addEventListener("pointercancel", desactivar);
});

/* =====================================
   SISTEMA DE INTERACCION
===================================== */

const objetosInteractivos = [
    {
        x: 300,
        y: 100,
        ancho: 24,
        alto: 24,
        distancia: 45,
        mensaje: "Bienvenidos a nuestro pequeño mundo."
    }
];

let objetoCercano = null;
let mensajeInteraccion = "";
let tiempoMensaje = 0;
let cofreCercano = null;

/* =====================================
   IMAGENES DE RECOMPENSAS
===================================== */

const imagenEstrella = new Image();
imagenEstrella.src = "assets/objetos/estrella.png";

const imagenCorazones = new Image();
imagenCorazones.src = "assets/objetos/corazones.png";
/* =====================================
   INVENTARIO
===================================== */

const inventario = {
    estrellas: 0,
    corazones: 0
};
let mochilaAbierta = false;
/* =====================================
   PARTICULAS DORADAS
===================================== */

const particulas = [];

function crearParticulas(x, y) {
    for (let i = 0; i < 12; i++) {
        particulas.push({
            x: x + 12,
            y: y + 8,
            velocidadX: (Math.random() - 0.5) * 4,
            velocidadY: (Math.random() - 1.5) * 3,
            vida: 35,
            tamano: Math.random() * 3 + 2
        });
    }
}

function actualizarParticulas() {
    for (let i = particulas.length - 1; i >= 0; i--) {
        const p = particulas[i];

        p.x += p.velocidadX;
        p.y += p.velocidadY;
        p.velocidadY += 0.08;
        p.vida--;

        if (p.vida <= 0) {
            particulas.splice(i, 1);
        }
    }
}

function dibujarParticulas() {
    particulas.forEach(p => {
        pincel.fillStyle = "#ffe36e";
        pincel.fillRect(p.x, p.y, p.tamano, p.tamano);
    });
}

/* =====================================
   DETECTAR OBJETOS CERCANOS
===================================== */

function detectarObjetoCercano() {
    objetoCercano = null;
    cofreCercano = null;

    const centroJugadorX = jugador.x + jugador.ancho / 2;
    const centroJugadorY = jugador.y + jugador.alto / 2;

    for (const cofre of cofres) {
        if (cofre.abierto || cofre.animacion > 0) continue;

        const distancia = Math.hypot(
            centroJugadorX - (cofre.x + 12),
            centroJugadorY - (cofre.y + 10)
        );

        if (distancia <= 38) {
            cofreCercano = cofre;
            return;
        }
    }

    for (const objeto of objetosInteractivos) {
        const distancia = Math.hypot(
            centroJugadorX - (objeto.x + objeto.ancho / 2),
            centroJugadorY - (objeto.y + objeto.alto / 2)
        );

        if (distancia <= (objeto.distancia || 45)) {
            objetoCercano = objeto;
            break;
        }
    }
}

/* =====================================
   INTERACTUAR
===================================== */

function interactuar() {
    if (mochilaAbierta) return;
    detectarObjetoCercano();

    if (cofreCercano) {
        abrirCofre(cofreCercano);
        return;
    }

    if (objetoCercano) {
        mensajeMensaje(objetoCercano.mensaje);
    }
}

/* =====================================
   ABRIR COFRES
===================================== */

function abrirCofre(cofre) {
    if (cofre.abierto || cofre.animacion > 0) return;

    cofre.animacion = 1;
}

function actualizarCofres() {
    cofres.forEach(cofre => {
        if (cofre.animacion > 0 && cofre.animacion < 20) {
            cofre.animacion++;
        }

        if (cofre.animacion === 20 && !cofre.abierto) {
            cofre.abierto = true;
            cofre.recompensaVisible = true;

            crearParticulas(cofre.x, cofre.y);
            entregarRecompensa(cofre);
        }
    });
}

/* =====================================
   ENTREGAR RECOMPENSAS
===================================== */

function entregarRecompensa(cofre) {
    cofre.tipoRecompensa = null;

    if (cofre.tipo === "comun") {
        const comunesAbiertos = cofres.filter(
            c => c.abierto && c.tipo === "comun"
        ).length;

        if (comunesAbiertos === 1) {
            mensajeMensaje("Cada aventura contigo es un tesoro.");
        } else {
            inventario.estrellas++;
            cofre.tipoRecompensa = "estrella";
            mensajeMensaje("¡Encontraste una estrella!");
        }

    } else {
        inventario.corazones++;
        cofre.tipoRecompensa = "corazones";
        mensajeMensaje("¡Encontraste nuestros dos corazones!");
    }

    console.log("Inventario:", inventario);
}


/* =====================================
   MENSAJES
===================================== */

function mensajeMensaje(mensaje) {
    mensajeInteraccion = mensaje;
    tiempoMensaje = 180;
}

/* =====================================
   DIBUJAR INTERACCIONES
===================================== */

function dibujarInteraccion() {
    if (cofreCercano) {
        pincel.fillStyle = "rgba(0, 0, 0, 0.8)";
        pincel.fillRect(205, 305, 230, 32);

        pincel.fillStyle = "#ffffff";
        pincel.font = "14px Arial";
        pincel.textAlign = "center";

        pincel.fillText("Pulsa E para abrir", 320, 326);

    } else if (objetoCercano) {
        pincel.fillStyle = "rgba(0, 0, 0, 0.8)";
        pincel.fillRect(205, 305, 230, 32);

        pincel.fillStyle = "#ffffff";
        pincel.font = "14px Arial";
        pincel.textAlign = "center";

        pincel.fillText("Pulsa E para leer", 320, 326);
    }

    if (tiempoMensaje > 0) {
        pincel.fillStyle = "rgba(0, 0, 0, 0.85)";
        pincel.fillRect(65, 270, 510, 55);

        pincel.fillStyle = "#ffffff";
        pincel.font = "14px Arial";
        pincel.textAlign = "center";

        pincel.fillText(mensajeInteraccion, 320, 302);

        tiempoMensaje--;
    }
}

function dibujarInventario() {
    // Fondo del inventario
    pincel.fillStyle = "rgba(20, 25, 45, 0.9)";
    pincel.fillRect(465, 10, 165, 48);

    // Borde
    pincel.strokeStyle = "#e5b85c";
    pincel.lineWidth = 2;
    pincel.strokeRect(465, 10, 165, 48);

    // Estrellas
    pincel.fillStyle = "#ffe36e";
    pincel.font = "bold 18px Arial";
    pincel.textAlign = "left";
    pincel.fillText("★", 477, 31);

    pincel.fillStyle = "#ffffff";
    pincel.font = "13px Arial";
    pincel.fillText("x " + inventario.estrellas, 502, 31);

    // Corazones
    pincel.fillStyle = "#ff729d";
    pincel.font = "bold 18px Arial";
    pincel.fillText("♥", 477, 50);

    pincel.fillStyle = "#ffffff";
    pincel.font = "13px Arial";
    pincel.fillText("x " + inventario.corazones, 502, 50);
}



botonInteractuar.addEventListener("click", interactuar);

// Tecla E: interactuar
document.addEventListener("keydown", evento => {
    if (evento.key.toLowerCase() === "e" && !evento.repeat) {
        interactuar();
    }
});

// Tecla I: abrir y cerrar mochila
document.addEventListener("keydown", evento => {
    if (evento.key.toLowerCase() === "i" && !evento.repeat) {
        mochilaAbierta = !mochilaAbierta;

        Object.keys(teclas).forEach(tecla => {
            teclas[tecla] = false;
        });
    }
});
// Botón táctil para abrir y cerrar la mochila
botonMochila.addEventListener("click", () => {
    mochilaAbierta = !mochilaAbierta;

    Object.keys(teclas).forEach(tecla => {
        teclas[tecla] = false;
    });
});


function dibujarMochila() {
    if (!mochilaAbierta) return;

    // Oscurecer el escenario
    pincel.fillStyle = "rgba(0, 0, 0, 0.65)";
    pincel.fillRect(0, 0, ANCHO_ESCENARIO, ALTO_ESCENARIO);

    // Ventana exterior
    pincel.fillStyle = "#493b65";
    pincel.fillRect(145, 75, 350, 215);

    // Borde
    pincel.strokeStyle = "#f5d66d";
    pincel.lineWidth = 4;
    pincel.strokeRect(145, 75, 350, 215);

    // Interior
    pincel.fillStyle = "#eee7d5";
    pincel.fillRect(155, 85, 330, 195);

    // Título
    pincel.fillStyle = "#493b65";
    pincel.font = "bold 23px Arial";
    pincel.textAlign = "center";
    pincel.fillText("MI MOCHILA", 320, 119);

    // Separador
    pincel.fillStyle = "#b9a98a";
    pincel.fillRect(180, 133, 280, 2);

    // Estrella
    pincel.fillStyle = "#d6a52c";
    pincel.font = "bold 25px Arial";
    pincel.textAlign = "left";
    pincel.fillText("★", 195, 177);

    pincel.fillStyle = "#493b65";
    pincel.font = "bold 17px Arial";
    pincel.fillText("Estrellas", 235, 173);
    pincel.fillText("x " + inventario.estrellas, 405, 173);

    // Corazones
    pincel.fillStyle = "#e65b83";
    pincel.font = "bold 25px Arial";
    pincel.fillText("♥", 195, 220);

    pincel.fillStyle = "#493b65";
    pincel.font = "bold 17px Arial";
    pincel.fillText("Corazones", 235, 216);
    pincel.fillText("x " + inventario.corazones, 405, 216);

    // Instrucción
    pincel.fillStyle = "#756b61";
    pincel.font = "12px Arial";
    pincel.textAlign = "center";
    pincel.fillText("Pulsa I o 🎒 para cerrar", 320, 260);
}

/* =====================================
   DIBUJAR ESCENARIO
===================================== */

function dibujarEscenario() {
    pincel.fillStyle = "#101b35";

    pincel.fillRect(
        0,
        0,
        ANCHO_ESCENARIO,
        ALTO_ESCENARIO
    );

    if (bosque.complete && bosque.naturalWidth > 0) {
        pincel.drawImage(
            bosque,
            0,
            0,
            ANCHO_ESCENARIO,
            ALTO_ESCENARIO
        );
    }
}

/* =====================================
   MOVIMIENTO DEL JUGADOR
===================================== */
function actualizarJugador() {
    if (mochilaAbierta) return;
    let movimientoX = 0;
    let movimientoY = 0;

    if (
        teclas["arrowup"] ||
        teclas["w"] ||
        teclas["arriba"]
    ) movimientoY--;

    if (
        teclas["arrowdown"] ||
        teclas["s"] ||
        teclas["abajo"]
    ) movimientoY++;

    if (
        teclas["arrowleft"] ||
        teclas["a"] ||
        teclas["izquierda"]
    ) movimientoX--;

    if (
        teclas["arrowright"] ||
        teclas["d"] ||
        teclas["derecha"]
    ) movimientoX++;

    if (movimientoX !== 0 && movimientoY !== 0) {
        movimientoX *= 0.7071;
        movimientoY *= 0.7071;
    }

    if (movimientoY < 0) {
        jugador.direccion = "arriba";
    } else if (movimientoY > 0) {
        jugador.direccion = "abajo";
    } else if (movimientoX < 0) {
        jugador.direccion = "izquierda";
    } else if (movimientoX > 0) {
        jugador.direccion = "derecha";
    }

    const nuevoX = jugador.x + movimientoX * jugador.velocidad;
    const nuevoY = jugador.y + movimientoY * jugador.velocidad;

    if (movimientoX !== 0 && puedeMoverse(nuevoX, jugador.y)) {
        jugador.x = nuevoX;
    }

    if (movimientoY !== 0 && puedeMoverse(jugador.x, nuevoY)) {
        jugador.y = nuevoY;
    }
}

/* =====================================
   LETRERO DEL BOSQUE
===================================== */

function dibujarLetrero() {
    const x = 276;
    const y = 98;

    // Sombra
    pincel.fillStyle = "#17251b";
    pincel.fillRect(x + 2, y + 30, 58, 5);

    // Poste
    pincel.fillStyle = "#633b24";
    pincel.fillRect(x + 26, y + 18, 8, 19);

    pincel.fillStyle = "#966037";
    pincel.fillRect(x + 28, y + 19, 3, 16);

    // Tabla exterior
    pincel.fillStyle = "#59351f";
    pincel.fillRect(x, y, 60, 24);

    // Interior de madera
    pincel.fillStyle = "#a66b3d";
    pincel.fillRect(x + 3, y + 3, 54, 18);

    // Brillo superior
    pincel.fillStyle = "#c58a50";
    pincel.fillRect(x + 4, y + 4, 52, 3);

    // Borde inferior
    pincel.fillStyle = "#754524";
    pincel.fillRect(x + 3, y + 18, 54, 3);

    // Tornillos
    pincel.fillStyle = "#e1b477";
    pincel.fillRect(x + 5, y + 9, 3, 3);
    pincel.fillRect(x + 52, y + 9, 3, 3);

    // Texto
    pincel.fillStyle = "#352317";
    pincel.font = "bold 8px Arial";
    pincel.textAlign = "center";
    pincel.textBaseline = "middle";

    pincel.fillText(
        "BIENVENIDOS",
        x + 30,
        y + 12,
        45
    );
}

/* =====================================
   SISTEMA DE COFRES
===================================== */

const cofres = [
    {
        x: 235,
        y: 170,
        abierto: false,
        tipo: "comun",
        animacion: 0,
        recompensaVisible: false
    },
    {
        x: 400,
        y: 230,
        abierto: false,
        tipo: "comun",
        animacion: 0,
        recompensaVisible: false
    },
    {
        x: 475,
        y: 275,
        abierto: false,
        tipo: "especial",
        animacion: 0,
        recompensaVisible: false
    }
];

function reiniciarExploracion() {
    // Reiniciar todos los cofres
    cofres.forEach(cofre => {
        cofre.abierto = false;
        cofre.animacion = 0;
        cofre.recompensaVisible = false;
        cofre.tipoRecompensa = null;
    });

    // Reiniciar inventario
    inventario.estrellas = 0;
    inventario.corazones = 0;

    mochilaAbierta = false;

    // Eliminar partículas
    particulas.length = 0;

    // Reiniciar mensajes e interacciones
    mensajeInteraccion = "";
    tiempoMensaje = 0;
    objetoCercano = null;
    cofreCercano = null;

    // Reiniciar posición
    jugador.x = 300;
    jugador.y = 170;
    jugador.direccion = "abajo";

    // Limpiar teclas pulsadas
    Object.keys(teclas).forEach(tecla => {
        teclas[tecla] = false;
    });

    console.log("Exploración reiniciada.");
}

function dibujarCofres() {
    cofres.forEach(cofre => {
        const x = cofre.x;
        const y = cofre.y;

        const progreso = Math.min(cofre.animacion / 20, 1);
        const subida = progreso * 9;

        // Sombra
        pincel.fillStyle = "#17251b";
        pincel.fillRect(x + 2, y + 17, 23, 4);

        // Interior oscuro
        if (progreso > 0) {
            pincel.fillStyle = "#382319";
            pincel.fillRect(x + 3, y + 7, 18, 8);
        }

        // Base
        pincel.fillStyle = "#63391f";
        pincel.fillRect(x, y + 7, 24, 11);

        pincel.fillStyle = "#a66b35";
        pincel.fillRect(x + 2, y + 9, 20, 7);

        // Bordes dorados
        pincel.fillStyle = "#e5b85c";
        pincel.fillRect(x + 1, y + 7, 2, 11);
        pincel.fillRect(x + 21, y + 7, 2, 11);
        pincel.fillRect(x + 10, y + 7, 4, 11);

        // Tapa animada
        pincel.fillStyle = "#754522";
        pincel.fillRect(x + 1, y + 2 - subida, 22, 7);

        pincel.fillStyle = "#b77b3d";
        pincel.fillRect(x + 3, y + 3 - subida, 18, 4);

        // Cerradura
        if (progreso === 0) {
            pincel.fillStyle = "#f5d66d";
            pincel.fillRect(x + 10, y + 9, 4, 5);

            pincel.fillStyle = "#49301d";
            pincel.fillRect(x + 11, y + 10, 2, 2);
        }


               // Recompensa flotante
        if (cofre.recompensaVisible && cofre.tipoRecompensa) {
            const altura = Math.sin(Date.now() / 180) * 3;

            if (
                cofre.tipoRecompensa === "estrella" &&
                imagenEstrella.complete &&
                imagenEstrella.naturalWidth > 0
            ) {
                pincel.drawImage(
                    imagenEstrella,
                    x + 4,
                    y - 17 + altura,
                    16,
                    16
                );
            }

            if (
                cofre.tipoRecompensa === "corazones" &&
                imagenCorazones.complete &&
                imagenCorazones.naturalWidth > 0
            ) {
                pincel.drawImage(
                    imagenCorazones,
                    x - 6,
                    y - 19 + altura,
                    36,
                    36
                );
            }
        }
    });
}

/* =====================================
   DIBUJAR PERSONAJE
===================================== */

function dibujarJugador() {
    if (!spriteCargado || !personajeSeleccionado) return;

    const configuracion = configuracionSprites[personajeSeleccionado];

    const direccion =
        configuracion.direcciones[jugador.direccion];

    let origenX;
    let origenY;
    let anchoCuadro;
    let altoCuadro;

    if (personajeSeleccionado === "Zxs_Angel") {

        origenX = configuracion.recorte.x;

        origenY =
            configuracion.recorte.y[direccion];

        anchoCuadro =
            configuracion.recorte.ancho;

        altoCuadro =
            configuracion.recorte.alto;

    } else {

        anchoCuadro =
            personajeSprite.naturalWidth /
            configuracion.columnas;

        altoCuadro =
            configuracion.cuadro.alto;

        origenX =
            direccion * anchoCuadro;

        origenY =
            configuracion.cuadro.y;
    }

    const escala = 0.25;

    const anchoDibujo = anchoCuadro * escala;
    const altoDibujo = altoCuadro * escala;

    const destinoX =
        jugador.x +
        jugador.ancho / 2 -
        anchoDibujo / 2;

    const destinoY =
        jugador.y +
        jugador.alto -
        altoDibujo;

    pincel.drawImage(
        personajeSprite,
        origenX,
        origenY,
        anchoCuadro,
        altoCuadro,
        destinoX,
        destinoY,
        anchoDibujo,
        altoDibujo
    );
}

/* =====================================
   BUCLE PRINCIPAL
===================================== */

function bucleJuego() {
    if (!pantallaJuego.classList.contains("oculto")) {
        actualizarJugador();
        actualizarCofres();
        actualizarParticulas();
        detectarObjetoCercano();

        dibujarEscenario();
        dibujarLetrero();
        dibujarCofres();
        dibujarParticulas();
        dibujarInventario();
        dibujarJugador();
        dibujarInteraccion();
        dibujarMochila();
    }

    requestAnimationFrame(bucleJuego);
}

bucleJuego();

/* =====================================
   ATRAPA CORAZONES - ESCENARIO
===================================== */

const lienzoCorazones = document.getElementById("lienzo-corazones");
const pincelCorazones = lienzoCorazones.getContext("2d");

pincelCorazones.imageSmoothingEnabled = false;
// IMAGEN DEL ESCENARIO ATRAPA CORAZONES
const fondoCorazones = new Image();
fondoCorazones.src = "assets/escenarios/fondos/atardecer-corazones.png";

let fondoCorazonesCargado = false;

fondoCorazones.onload = () => {
        fondoCorazonesCargado = true;

    // Si el minijuego está abierto, dibuja el fondo
    if (!document.getElementById("pantalla-minijuego-corazones").classList.contains("oculto")) {
        dibujarAtardecer();
    }
};

function dibujarAtardecer() {
    const ctx = pincelCorazones;

    ctx.clearRect(0, 0, 640, 360);

    if (fondoCorazonesCargado) {
        ctx.drawImage(
            fondoCorazones,
            0,
            0,
            640,
            360
        );
    }
}


/* =====================================
   ATRAPA CORAZONES - MECANICA
===================================== */

let animacionCorazones = null;

let jugadorCorazones = {
    x: 296,
    y: 285,
    ancho: 48,
    alto: 64,
    velocidad: 5
};

let corazones = [];
let puntosCorazones = 0;
let tiempoCorazones = 45;
let inicioCorazones = 0;
let ultimoCorazon = 0;
let movimientoCorazones = {
    izquierda: false,
    derecha: false
};

let imagenJugadorCorazones = new Image();
let imagenJugadorCargada = false;

function dibujarJugadorCorazones() {
    const ctx = pincelCorazones;
    const jugador = jugadorCorazones;

    if (!spriteCargado || !personajeSeleccionado) return;

    const configuracion = configuracionSprites[personajeSeleccionado];
    const direccion = configuracion.direcciones.abajo;

    let origenX;
    let origenY;
    let anchoCuadro;
    let altoCuadro;

    if (personajeSeleccionado === "Zxs_Angel") {
        origenX = configuracion.recorte.x;
        origenY = configuracion.recorte.y[direccion];
        anchoCuadro = configuracion.recorte.ancho;
        altoCuadro = configuracion.recorte.alto;
    } else {
        anchoCuadro = personajeSprite.naturalWidth / configuracion.columnas;
        altoCuadro = configuracion.cuadro.alto;

        origenX = direccion * anchoCuadro;
        origenY = configuracion.cuadro.y;
    }

    const escala = 0.25;

    const anchoDibujo = anchoCuadro * escala;
    const altoDibujo = altoCuadro * escala;

    const destinoX = jugador.x + (jugador.ancho - anchoDibujo) / 2;
    const destinoY = jugador.y + jugador.alto - altoDibujo;

    ctx.drawImage(
        personajeSprite,
        origenX,
        origenY,
        anchoCuadro,
        altoCuadro,
        destinoX,
        destinoY,
        anchoDibujo,
        altoDibujo
    );
}

function dibujarJugadorCorazones() {
    if (!spriteCargado || !personajeSeleccionado) return;

    const configuracion = configuracionSprites[personajeSeleccionado];
    const direccion = configuracion.direcciones.abajo;

    let origenX, origenY, anchoCuadro, altoCuadro;

    if (personajeSeleccionado === "Zxs_Angel") {
        origenX = configuracion.recorte.x;
        origenY = configuracion.recorte.y[direccion];
        anchoCuadro = configuracion.recorte.ancho;
        altoCuadro = configuracion.recorte.alto;
    } else {
        anchoCuadro = personajeSprite.naturalWidth / configuracion.columnas;
        altoCuadro = configuracion.cuadro.alto;
        origenX = direccion * anchoCuadro;
        origenY = configuracion.cuadro.y;
    }

    const escala = 0.25;
    const anchoDibujo = anchoCuadro * escala;
    const altoDibujo = altoCuadro * escala;

    pincelCorazones.drawImage(
        personajeSprite,
        origenX, origenY,
        anchoCuadro, altoCuadro,
        jugadorCorazones.x + (jugadorCorazones.ancho - anchoDibujo) / 2,
        jugadorCorazones.y + jugadorCorazones.alto - altoDibujo,
        anchoDibujo, altoDibujo
    );
}

function crearCorazon() {
    corazones.push({
        x: Math.random() * 590 + 10,
        y: -25,
        tamaño: 20,
        velocidad: 2 + Math.random() * 2
    });
}

function dibujarCorazon(corazon) {
    const ctx = pincelCorazones;

    ctx.fillStyle = "#ff477e";

    ctx.fillRect(corazon.x + 5, corazon.y, 5, 5);
    ctx.fillRect(corazon.x + 15, corazon.y, 5, 5);

    ctx.fillRect(corazon.x, corazon.y + 5, 25, 5);
    ctx.fillRect(corazon.x + 5, corazon.y + 10, 15, 5);
    ctx.fillRect(corazon.x + 10, corazon.y + 15, 5, 5);

    ctx.fillStyle = "#ff9bb8";
    ctx.fillRect(corazon.x + 5, corazon.y + 5, 5, 5);
}

function actualizarCorazones() {
    const jugador = jugadorCorazones;

    if (movimientoCorazones.izquierda) {
        jugador.x -= jugador.velocidad;
    }

    if (movimientoCorazones.derecha) {
        jugador.x += jugador.velocidad;
    }

    // Límites del escenario
    jugador.x = Math.max(
        0,
        Math.min(640 - jugador.ancho, jugador.x)
    );

    // Mover y recoger corazones
    for (let i = corazones.length - 1; i >= 0; i--) {
        const corazon = corazones[i];

        corazon.y += corazon.velocidad;

        const recogido =
            corazon.x + 25 > jugador.x &&
            corazon.x < jugador.x + jugador.ancho &&
            corazon.y + 20 > jugador.y &&
            corazon.y < jugador.y + jugador.alto;

        if (recogido) {
            puntosCorazones++;
            corazones.splice(i, 1);

            document.getElementById("contador-corazones")
                .textContent = puntosCorazones;

            if (puntosCorazones >= 20) {
                finalizarCorazones(true);
                return;
            }
        } else if (corazon.y > 360) {
            corazones.splice(i, 1);
        }
    }
}

function dibujarJuegoCorazones() {
    const ctx = pincelCorazones;

    dibujarAtardecer();

    corazones.forEach(corazon => {
        dibujarCorazon(corazon);
    });

    dibujarJugadorCorazones();
}

function bucleCorazones() {
    if (document.getElementById("pantalla-minijuego-corazones")
        .classList.contains("oculto")) {
        detenerAtrapaCorazones();
        return;
    }

    const ahora = Date.now();

    tiempoCorazones = Math.max(
        0,
        45 - Math.floor((ahora - inicioCorazones) / 1000)
    );

    document.getElementById("tiempo-corazones")
        .textContent = tiempoCorazones;

    if (tiempoCorazones <= 0) {
        finalizarCorazones(false);
        return;
    }

    // Crear corazones periódicamente
    if (ahora - ultimoCorazon >= 850) {
        crearCorazon();
        ultimoCorazon = ahora;
    }

    actualizarCorazones();

    if (animacionCorazones === null) return;

    dibujarJuegoCorazones();

    animacionCorazones = requestAnimationFrame(bucleCorazones);
}
function cargarJugadorCorazones() {
    imagenJugadorCargada = false;
}
function iniciarAtrapaCorazones() {
    detenerAtrapaCorazones();

    puntosCorazones = 0;
    tiempoCorazones = 45;
    corazones = [];

    jugadorCorazones.x = 296;

    movimientoCorazones.izquierda = false;
    movimientoCorazones.derecha = false;

    document.getElementById("contador-corazones")
        .textContent = "0";

    document.getElementById("tiempo-corazones")
        .textContent = "45";

    document.getElementById("mensaje-corazones")
        .textContent = "";

    cargarJugadorCorazones();

    inicioCorazones = Date.now();
    ultimoCorazon = inicioCorazones;

    dibujarAtardecer();

    animacionCorazones = requestAnimationFrame(bucleCorazones);
}

function finalizarCorazones(gano) {
    detenerAtrapaCorazones();

    const mensaje = document.getElementById("mensaje-corazones");

    if (gano) {
        desbloquearPieza("corazones");
        mensaje.textContent =
            "¡Lo lograste! ¡Recogiste los 20 corazones!";
    } else {
        mensaje.textContent =
            "¡Se acabó el tiempo! Recogiste " +
            puntosCorazones + " corazones.";
    }

    dibujarJuegoCorazones();
}

function detenerAtrapaCorazones() {
    if (animacionCorazones !== null) {
        cancelAnimationFrame(animacionCorazones);
        animacionCorazones = null;
    }

    movimientoCorazones.izquierda = false;
    movimientoCorazones.derecha = false;
}


/* =====================================
   CONTROLES ATRAPA CORAZONES
===================================== */

// Teclado
document.addEventListener("keydown", evento => {
    const pantalla = document.getElementById(
        "pantalla-minijuego-corazones"
    );

    if (pantalla.classList.contains("oculto")) return;

    const tecla = evento.key.toLowerCase();

    if (tecla === "arrowleft" || tecla === "a") {
        movimientoCorazones.izquierda = true;
        evento.preventDefault();
    }

    if (tecla === "arrowright" || tecla === "d") {
        movimientoCorazones.derecha = true;
        evento.preventDefault();
    }
});

document.addEventListener("keyup", evento => {
    const tecla = evento.key.toLowerCase();

    if (tecla === "arrowleft" || tecla === "a") {
        movimientoCorazones.izquierda = false;
    }

    if (tecla === "arrowright" || tecla === "d") {
        movimientoCorazones.derecha = false;
    }
});

// Botones táctiles
document.querySelectorAll("[data-mover]").forEach(boton => {
    const direccion = boton.dataset.mover;

    boton.addEventListener("pointerdown", evento => {
        evento.preventDefault();
        movimientoCorazones[direccion] = true;
    });

    boton.addEventListener("pointerup", () => {
        movimientoCorazones[direccion] = false;
    });

    boton.addEventListener("pointerleave", () => {
        movimientoCorazones[direccion] = false;
    });

    boton.addEventListener("pointercancel", () => {
        movimientoCorazones[direccion] = false;
    });
});

/* =====================================
   MINIJUEGO: MEMORIA
===================================== */

const pantallaMemoria = document.getElementById("pantalla-minijuego-memoria");
const tableroMemoria = document.getElementById("tablero-memoria");
const contadorParejas = document.getElementById("contador-parejas");
const mensajeMemoria = document.getElementById("mensaje-memoria");
const botonSalirMemoria = document.getElementById("boton-salir-memoria");

const recuerdosMemoria = [
        {
    id: "among-us",
    imagen: "assets/recuerdos/among-us.png",
    titulo: "Nuestro comienzo",
    mensaje: "¿Lo recuerdas? Aquí comenzó nuestra aventura..."
    },
    {
        id: "corazones",
        imagen: "assets/recuerdos/dos-corazones.png",
        titulo: "Dos corazones",
        mensaje: "Dos corazones que encontraron su lugar..."
    },
    {
        id: "zxs-angel",
        imagen: "assets/recuerdos/zxs-angel.png",
        titulo: "Zxs_Angel",
        mensaje: "¡Zxs_Angel tiene algo para alguien especial!"
    },
    {
        id: "yomi",
        imagen: "assets/recuerdos/yomi.png",
        titulo: "Yomi",
        mensaje: "¡Yomi también guarda algo en su corazón!"
    },
    {
        id: "beso",
        imagen: "assets/recuerdos/beso.png",
        titulo: "Un beso",
        mensaje: "¡Un beso que algún día dejará de esperar!"
    },
    {
       
    id: "ojitos-yomi",
    imagen: "assets/recuerdos/ojitos-yomi.png",
    titulo: "Sus ojitos",
    mensaje: "Entre tantas cosas bonitas, mis favoritos siempre serán tus ojitos."
}
]

let cartasMemoria = [];
let primeraCartaMemoria = null;
let segundaCartaMemoria = null;
let bloqueadoMemoria = false;
let parejasEncontradas = 0;
let temporizadorErrorMemoria = null;
let partidaMemoriaTerminada = false;

function mezclarCartasMemoria(cartas) {
    const copia = [...cartas];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

function crearCartasMemoria() {
    const pares = recuerdosMemoria.flatMap(recuerdo => [
        { ...recuerdo, identificador: recuerdo.id + "-1" },
        { ...recuerdo, identificador: recuerdo.id + "-2" }
    ]);

    cartasMemoria = mezclarCartasMemoria(pares);
    tableroMemoria.innerHTML = "";

    cartasMemoria.forEach((carta, indice) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "carta-memoria";
        boton.dataset.indice = indice;
        boton.setAttribute("aria-label", "Carta oculta");

        const interior = document.createElement("span");
        interior.className = "interior-carta-memoria";

        const reverso = document.createElement("span");
        reverso.className = "reverso-carta-memoria";
        reverso.textContent = "♥";

        const frente = document.createElement("span");
        frente.className = "frente-carta-memoria";

        if (carta.imagen) {
            const imagen = document.createElement("img");

            imagen.src = carta.imagen;
            imagen.alt = carta.titulo;
            imagen.className = "imagen-carta-memoria";

            frente.appendChild(imagen);
        } else {
            const simbolo = document.createElement("span");

            simbolo.className = "simbolo-carta-memoria";
            simbolo.textContent = carta.simbolo;

            frente.appendChild(simbolo);
        }

        const titulo = document.createElement("span");
        titulo.className = "titulo-carta-memoria";
        titulo.textContent = carta.titulo;

        frente.appendChild(titulo);

        interior.append(reverso, frente);
        boton.appendChild(interior);

        boton.addEventListener("click", () => {
            voltearCartaMemoria(indice, boton);
        });

        tableroMemoria.appendChild(boton);
    });
}

function iniciarMemoria() {
    if (!pantallaMemoria || !tableroMemoria) return;

    if (temporizadorErrorMemoria !== null) {
        clearTimeout(temporizadorErrorMemoria);
        temporizadorErrorMemoria = null;
    }

    primeraCartaMemoria = null;
    segundaCartaMemoria = null;
    bloqueadoMemoria = false;
    parejasEncontradas = 0;
    partidaMemoriaTerminada = false;

    contadorParejas.textContent = "0";
    mensajeMemoria.textContent = "";
    tableroMemoria.classList.remove("oculto");
    contadorParejas.parentElement.parentElement.classList.remove("oculto");
    crearCartasMemoria();
}

function voltearCartaMemoria(indice, boton) {
    if (bloqueadoMemoria || partidaMemoriaTerminada) return;

    const carta = cartasMemoria[indice];
    if (!carta || boton.classList.contains("volteada") || boton.classList.contains("encontrada")) {
        return;
    }

    boton.classList.add("volteada");
    boton.setAttribute("aria-label", carta.titulo);

    if (primeraCartaMemoria === null) {
        primeraCartaMemoria = { carta, boton };
        return;
    }

    segundaCartaMemoria = { carta, boton };
    comprobarParejaMemoria();
}

function comprobarParejaMemoria() {
    if (!primeraCartaMemoria || !segundaCartaMemoria) return;

    if (primeraCartaMemoria.carta.id === segundaCartaMemoria.carta.id) {
        primeraCartaMemoria.boton.classList.add("encontrada");
        segundaCartaMemoria.boton.classList.add("encontrada");

        parejasEncontradas++;
        contadorParejas.textContent = parejasEncontradas;
        mensajeMemoria.textContent = primeraCartaMemoria.carta.mensaje;

        primeraCartaMemoria = null;
        segundaCartaMemoria = null;

        if (parejasEncontradas === recuerdosMemoria.length) {
            partidaMemoriaTerminada = true;
            setTimeout(mostrarVictoriaMemoria, 1100);
        }

        return;
    }

    bloqueadoMemoria = true;
    mensajeMemoria.textContent = "¡Casi! Prueba con otras dos cartas.";

    temporizadorErrorMemoria = setTimeout(() => {
        primeraCartaMemoria.boton.classList.remove("volteada");
        segundaCartaMemoria.boton.classList.remove("volteada");
        primeraCartaMemoria.boton.setAttribute("aria-label", "Carta oculta");
        segundaCartaMemoria.boton.setAttribute("aria-label", "Carta oculta");

        primeraCartaMemoria = null;
        segundaCartaMemoria = null;
        bloqueadoMemoria = false;
        temporizadorErrorMemoria = null;
        mensajeMemoria.textContent = "";
    }, 1800);
}

function mostrarVictoriaMemoria() {
    desbloquearPieza("memoria");
    tableroMemoria.classList.add("oculto");

    contadorParejas.parentElement.parentElement.classList.add("oculto");

    mensajeMemoria.textContent =
        "¡YEIII, Lo logramos! Cada recuerdo, cada detalle y cada pequeño momento forma parte de nuestra historia. Y todavía quedan muchos por vivir...";

    const celebracion = document.createElement("img");

    celebracion.src = "assets/recuerdos/celebracion.png";
    celebracion.alt = "Zxs_Angel y Yomi celebrando juntos";
    celebracion.className = "imagen-celebracion-memoria";

    mensajeMemoria.appendChild(document.createElement("br"));
    mensajeMemoria.appendChild(celebracion);
}

function salirMemoria() {
    if (temporizadorErrorMemoria !== null) {
        clearTimeout(temporizadorErrorMemoria);
        temporizadorErrorMemoria = null;
    }

    bloqueadoMemoria = true;
    primeraCartaMemoria = null;
    segundaCartaMemoria = null;
    pantallaMemoria.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
}

if (botonSalirMemoria) {
    botonSalirMemoria.addEventListener("click", salirMemoria);
}
/* =====================================
   MINIJUEGO: LABERINTO
===================================== */

const pantallaLaberinto = document.getElementById("pantalla-minijuego-laberinto");
const lienzoLaberinto = document.getElementById("lienzo-laberinto");
const ctxLaberinto = lienzoLaberinto.getContext("2d");
const mensajeLaberinto = document.getElementById("mensaje-laberinto");
const numeroLaberinto = document.getElementById("numero-laberinto");
const botonOtroLaberinto = document.getElementById("boton-otro-laberinto");
const botonSalirLaberinto = document.getElementById("boton-salir-laberinto");

ctxLaberinto.imageSmoothingEnabled = false;

/* =====================================
   LOS CUATRO LABERINTOS
===================================== */

const LABERINTOS = [

    // LABERINTO 1
    [
        "#################",
        "#S#.............#",
        "#.###.###.#######",
        "#...#...#.......#",
        "#.#.#.#########.#",
        "#.#.#.#...#.....#",
        "#.#.###.#.#.###.#",
        "#.#.........#.#.#",
        "#.###########.#.#",
        "#..............G#",
        "#################"
    ],

    // LABERINTO 2
    [
        "#################",
        "#S..#.#.........#",
        "###.#.#.#.#####.#",
        "#...#.....#...#.#",
        "#.#########.#.#.#",
        "#...............#",
        "###############.#",
        "#.......#.....#.#",
        "#.#####.#.###.#.#",
        "#.....#.....#..G#",
        "#################"
    ],

    // LABERINTO 3
    [
        "#################",
        "#S#...#.......#.#",
        "#.#.###.#.###.#.#",
        "#.#.....#.#.....#",
        "#.#.#####.###.#.#",
        "#.#.#...#...#...#",
        "#.###.#.###.###.#",
        "#.....#.#...#.#.#",
        "#.#####.#.###.#.#",
        "#.........#....G#",
        "#################"
    ],

    // LABERINTO 4
    [
        "#################",
        "#S..#.......#...#",
        "###.#.###.#.###.#",
        "#...#.....#.#...#",
        "#.###.###.#.#.###",
        "#...#.....#.#...#",
        "###.#.#####.#.#.#",
        "#...#.#.....#.#.#",
        "#.###.#.#######.#",
        "#.....#........G#",
        "#################"
    ]

];

/* =====================================
   CONFIGURACIÓN
===================================== */

const TAM_CELDA_LABERINTO = 32;
const ORIGEN_X_LABERINTO = 48;
const ORIGEN_Y_LABERINTO = 48;

const ANCHO_JUGADOR_LABERINTO = 18;
const ALTO_JUGADOR_LABERINTO = 20;
const VELOCIDAD_LABERINTO = 2.5;

let mapaLaberintoActual = null;
let indiceLaberintoActual = -1;
let animacionLaberinto = null;
let ganoLaberinto = false;

let acompananteLaberinto = "Yomi";
let imagenAcompananteLaberinto = new Image();

let direccionJugadorLaberinto = "abajo";

const jugadorLaberinto = {
    x: 0,
    y: 0,
    ancho: ANCHO_JUGADOR_LABERINTO,
    alto: ALTO_JUGADOR_LABERINTO
};

const controlesLaberinto = {
    arriba: false,
    abajo: false,
    izquierda: false,
    derecha: false
};

/* =====================================
   CONTROLES Y ANIMACIÓN
===================================== */

function limpiarControlesLaberinto() {
    Object.keys(controlesLaberinto).forEach(direccion => {
        controlesLaberinto[direccion] = false;
    });
}

function detenerLaberinto() {
    if (animacionLaberinto !== null) {
        cancelAnimationFrame(animacionLaberinto);
        animacionLaberinto = null;
    }

    limpiarControlesLaberinto();
}

/* =====================================
   INICIAR UNA PARTIDA
===================================== */

function iniciarLaberinto() {
    detenerLaberinto();

    // Elegir un mapa al azar sin repetir el anterior
    let nuevoIndice = Math.floor(Math.random() * LABERINTOS.length);

    if (LABERINTOS.length > 1) {
        while (nuevoIndice === indiceLaberintoActual) {
            nuevoIndice = Math.floor(Math.random() * LABERINTOS.length);
        }
    }

    indiceLaberintoActual = nuevoIndice;
    mapaLaberintoActual = LABERINTOS[indiceLaberintoActual];

    ganoLaberinto = false;
    direccionJugadorLaberinto = "abajo";

    // Posición inicial
    jugadorLaberinto.x =
        TAM_CELDA_LABERINTO +
        (TAM_CELDA_LABERINTO - jugadorLaberinto.ancho) / 2;

    jugadorLaberinto.y =
        TAM_CELDA_LABERINTO +
        (TAM_CELDA_LABERINTO - jugadorLaberinto.alto) / 2;

    // El otro personaje será quien nos espere al final
    acompananteLaberinto =
        personajeSeleccionado === "Yomi"
            ? "Zxs_Angel"
            : "Yomi";

    const configAcompanante =
        configuracionSprites[acompananteLaberinto];

    imagenAcompananteLaberinto = new Image();
    imagenAcompananteLaberinto.src = configAcompanante.archivo;

    numeroLaberinto.textContent =
        (indiceLaberintoActual + 1) + " / 4";

    mensajeLaberinto.textContent =
        "Usa las flechas o WASD para encontrar a " +
        acompananteLaberinto + ".";

    botonOtroLaberinto.classList.add("oculto");

    animacionLaberinto =
        requestAnimationFrame(bucleLaberinto);
}

/* =====================================
   COLISIONES DEL LABERINTO
===================================== */

function esParedLaberinto(x, y) {
    const izquierda =
        Math.floor(x / TAM_CELDA_LABERINTO);

    const derecha =
        Math.floor(
            (x + jugadorLaberinto.ancho - 1) /
            TAM_CELDA_LABERINTO
        );

    const arriba =
        Math.floor(y / TAM_CELDA_LABERINTO);

    const abajo =
        Math.floor(
            (y + jugadorLaberinto.alto - 1) /
            TAM_CELDA_LABERINTO
        );

    const puntos = [
        [izquierda, arriba],
        [derecha, arriba],
        [izquierda, abajo],
        [derecha, abajo]
    ];

    return puntos.some(([columna, fila]) => {

        if (
            !mapaLaberintoActual[fila] ||
            mapaLaberintoActual[fila][columna] === undefined
        ) {
            return true;
        }

        return mapaLaberintoActual[fila][columna] === "#";
    });
}

/* =====================================
   MOVIMIENTO DEL PERSONAJE
===================================== */

function actualizarLaberinto() {
    if (ganoLaberinto) return;

    let dx = 0;
    let dy = 0;

    if (controlesLaberinto.izquierda) dx--;
    if (controlesLaberinto.derecha) dx++;
    if (controlesLaberinto.arriba) dy--;
    if (controlesLaberinto.abajo) dy++;

    // Evitar que el movimiento diagonal sea más rápido
    if (dx !== 0 && dy !== 0) {
        dx *= 0.7071;
        dy *= 0.7071;
    }

    if (dy < 0) {
        direccionJugadorLaberinto = "arriba";
    } else if (dy > 0) {
        direccionJugadorLaberinto = "abajo";
    } else if (dx < 0) {
        direccionJugadorLaberinto = "izquierda";
    } else if (dx > 0) {
        direccionJugadorLaberinto = "derecha";
    }

    const nuevoX =
        jugadorLaberinto.x + dx * VELOCIDAD_LABERINTO;

    const nuevoY =
        jugadorLaberinto.y + dy * VELOCIDAD_LABERINTO;

    // Movimiento horizontal
    if (
        dx !== 0 &&
        !esParedLaberinto(nuevoX, jugadorLaberinto.y)
    ) {
        jugadorLaberinto.x = nuevoX;
    }

    // Movimiento vertical
    if (
        dy !== 0 &&
        !esParedLaberinto(jugadorLaberinto.x, nuevoY)
    ) {
        jugadorLaberinto.y = nuevoY;
    }

    // Comprobar si llegó a la salida
    const columnaJugador = Math.floor(
        (jugadorLaberinto.x + jugadorLaberinto.ancho / 2) /
        TAM_CELDA_LABERINTO
    );

    const filaJugador = Math.floor(
        (jugadorLaberinto.y + jugadorLaberinto.alto / 2) /
        TAM_CELDA_LABERINTO
    );

    if (
        mapaLaberintoActual[filaJugador]?.[columnaJugador] === "G"
    ) {
        ganarLaberinto();
    }
}

/* =====================================
   DIBUJAR LOS PERSONAJES
===================================== */

function dibujarSpriteLaberinto(
    ctx,
    nombre,
    imagen,
    centroX,
    baseY,
    escala,
    direccion = "abajo"
) {
    if (
        !imagen ||
        !imagen.complete ||
        imagen.naturalWidth === 0
    ) {
        return;
    }

    const config = configuracionSprites[nombre];

    if (!config) return;

    let sx, sy, sw, sh;

    if (nombre === "Zxs_Angel") {

        const indiceDireccion =
            config.direcciones[direccion] ?? 0;

        sx = config.recorte.x;
        sy = config.recorte.y[indiceDireccion];
        sw = config.recorte.ancho;
        sh = config.recorte.alto;

    } else {

        sw = imagen.naturalWidth / config.columnas;
        sh = config.cuadro.alto;

        sx =
            (config.direcciones[direccion] ?? 0) * sw;

        sy = config.cuadro.y;
    }

    const dw = sw * escala;
    const dh = sh * escala;

    ctx.drawImage(
        imagen,
        sx, sy, sw, sh,
        centroX - dw / 2,
        baseY - dh,
        dw, dh
    );
}

/* =====================================
   CORAZÓN DE LA SALIDA
===================================== */

function dibujarCorazonLaberinto(ctx, x, y, tamano = 12) {
    const p = tamano / 4;

    ctx.fillStyle = "#ef6f9b";

    ctx.fillRect(x, y, p * 2, p);
    ctx.fillRect(x + p * 2, y, p * 2, p);

    ctx.fillRect(x - p, y + p, p * 6, p);
    ctx.fillRect(x, y + p * 2, p * 4, p);
    ctx.fillRect(x + p, y + p * 3, p * 2, p);
}

/* =====================================
   DIBUJAR EL MAPA
===================================== */

function dibujarLaberinto() {
    const ctx = ctxLaberinto;

    ctx.clearRect(
        0, 0,
        lienzoLaberinto.width,
        lienzoLaberinto.height
    );

    ctx.fillStyle = "#1e2c3b";
    ctx.fillRect(
        0, 0,
        lienzoLaberinto.width,
        lienzoLaberinto.height
    );

    // Información superior
    ctx.fillStyle = "#fff0d7";
    ctx.font = "bold 15px Arial";
    ctx.textAlign = "left";
    ctx.fillText("LABERINTO", 20, 25);

    ctx.textAlign = "right";
    ctx.fillText(
        "MAPA " + (indiceLaberintoActual + 1) + " / 4",
        620,
        25
    );

    // Dibujar las paredes y los caminos
    for (
        let fila = 0;
        fila < mapaLaberintoActual.length;
        fila++
    ) {
        for (
            let columna = 0;
            columna < mapaLaberintoActual[fila].length;
            columna++
        ) {
            const celda =
                mapaLaberintoActual[fila][columna];

            const x =
                ORIGEN_X_LABERINTO +
                columna * TAM_CELDA_LABERINTO;

            const y =
                ORIGEN_Y_LABERINTO +
                fila * TAM_CELDA_LABERINTO;

            if (celda === "#") {

                ctx.fillStyle = "#355b49";
                ctx.fillRect(
                    x, y,
                    TAM_CELDA_LABERINTO,
                    TAM_CELDA_LABERINTO
                );

                ctx.fillStyle = "#426f57";
                ctx.fillRect(x + 4, y + 4, 24, 4);

                ctx.fillStyle = "#294638";
                ctx.fillRect(x + 3, y + 27, 26, 3);

                if ((fila + columna) % 3 === 0) {
                    ctx.fillStyle = "#6a8b60";
                    ctx.fillRect(x + 8, y + 14, 4, 4);
                    ctx.fillRect(x + 20, y + 19, 3, 3);
                }

            } else {

                ctx.fillStyle =
                    (fila + columna) % 2 === 0
                        ? "#eadbb9"
                        : "#e3d1aa";

                ctx.fillRect(
                    x, y,
                    TAM_CELDA_LABERINTO,
                    TAM_CELDA_LABERINTO
                );

                ctx.fillStyle = "rgba(151, 123, 82, 0.18)";
                ctx.fillRect(x + 5, y + 7, 3, 3);
                ctx.fillRect(x + 23, y + 22, 2, 2);
            }

            // Punto de inicio
            if (celda === "S") {
                ctx.fillStyle = "#f0bf59";
                ctx.fillRect(x + 12, y + 12, 8, 8);
            }

            // Casilla de llegada
            if (celda === "G") {
                ctx.fillStyle = "#f7b7d0";
                ctx.fillRect(x + 3, y + 3, 26, 26);

                ctx.fillStyle = "#ffe6ef";
                ctx.fillRect(x + 7, y + 7, 18, 18);

                dibujarCorazonLaberinto(
                    ctx,
                    x + 10,
                    y + 9,
                    12
                );
            }
        }
    }

    // Dibujar al personaje que espera en la salida
    const salidaX =
        ORIGEN_X_LABERINTO +
        15 * TAM_CELDA_LABERINTO +
        TAM_CELDA_LABERINTO / 2;

    const salidaY =
        ORIGEN_Y_LABERINTO +
        10 * TAM_CELDA_LABERINTO - 3;

    dibujarSpriteLaberinto(
        ctx,
        acompananteLaberinto,
        imagenAcompananteLaberinto,
        salidaX,
        salidaY,
        0.12,
        "abajo"
    );

    // Dibujar al personaje que estamos controlando
    if (spriteCargado && personajeSeleccionado) {

        const centroX =
            ORIGEN_X_LABERINTO +
            jugadorLaberinto.x +
            jugadorLaberinto.ancho / 2;

        const baseY =
            ORIGEN_Y_LABERINTO +
            jugadorLaberinto.y +
            jugadorLaberinto.alto;

        dibujarSpriteLaberinto(
            ctx,
            personajeSeleccionado,
            personajeSprite,
            centroX,
            baseY,
            0.12,
            direccionJugadorLaberinto
        );
    }

    // Mensaje visual cuando se encuentran
    if (ganoLaberinto) {
        ctx.fillStyle = "rgba(19, 25, 42, 0.78)";
        ctx.fillRect(100, 170, 440, 70);

        ctx.strokeStyle = "#f7c6d8";
        ctx.lineWidth = 3;
        ctx.strokeRect(100, 170, 440, 70);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 19px Arial";
        ctx.textAlign = "center";
        ctx.fillText("¡SE ENCONTRARON! ♥", 320, 212);
    }
}

/* =====================================
   GANAR EL LABERINTO
===================================== */

function ganarLaberinto() {
    if (ganoLaberinto) return;

    ganoLaberinto = true;
    desbloquearPieza("laberinto");

    limpiarControlesLaberinto();

    mensajeLaberinto.textContent =
        "¡Encontraste a " + acompananteLaberinto +
        "! Cada camino valió la pena.";

    botonOtroLaberinto.classList.remove("oculto");
}

/* =====================================
   BUCLE DEL JUEGO
===================================== */

function bucleLaberinto() {
    if (pantallaLaberinto.classList.contains("oculto")) {
        animacionLaberinto = null;
        return;
    }

    actualizarLaberinto();
    dibujarLaberinto();

    animacionLaberinto =
        requestAnimationFrame(bucleLaberinto);
}

/* =====================================
   SALIR DEL LABERINTO
===================================== */

function salirLaberinto() {
    detenerLaberinto();

    pantallaLaberinto.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
}

if (botonSalirLaberinto) {
    botonSalirLaberinto.addEventListener(
        "click",
        salirLaberinto
    );
}

if (botonOtroLaberinto) {
    botonOtroLaberinto.addEventListener(
        "click",
        iniciarLaberinto
    );
}

/* =====================================
   CONTROLES DE TECLADO
===================================== */

document.addEventListener("keydown", evento => {
    if (
        pantallaLaberinto.classList.contains("oculto") ||
        ganoLaberinto
    ) {
        return;
    }

    const tecla = evento.key.toLowerCase();

    const mapaTeclas = {
        arrowup: "arriba",
        w: "arriba",

        arrowdown: "abajo",
        s: "abajo",

        arrowleft: "izquierda",
        a: "izquierda",

        arrowright: "derecha",
        d: "derecha"
    };

    const direccion = mapaTeclas[tecla];

    if (direccion) {
        controlesLaberinto[direccion] = true;
        evento.preventDefault();
    }
});

document.addEventListener("keyup", evento => {
    const tecla = evento.key.toLowerCase();

    const mapaTeclas = {
        arrowup: "arriba",
        w: "arriba",

        arrowdown: "abajo",
        s: "abajo",

        arrowleft: "izquierda",
        a: "izquierda",

        arrowright: "derecha",
        d: "derecha"
    };

    const direccion = mapaTeclas[tecla];

    if (direccion) {
        controlesLaberinto[direccion] = false;
    }
});

/* =====================================
   CONTROLES TÁCTILES
===================================== */

document.querySelectorAll("[data-laberinto-dir]")
    .forEach(boton => {

        const direccion = boton.dataset.laberintoDir;

        boton.addEventListener("pointerdown", evento => {
            evento.preventDefault();

            if (!ganoLaberinto) {
                controlesLaberinto[direccion] = true;
            }
        });

        const soltar = evento => {
            evento.preventDefault();
            controlesLaberinto[direccion] = false;
        };

        boton.addEventListener("pointerup", soltar);
        boton.addEventListener("pointerleave", soltar);
        boton.addEventListener("pointercancel", soltar);
    });
    /* =====================================
   MINIJUEGO: ESQUIVA OBSTÁCULOS
===================================== */

const pantallaObstaculos = document.getElementById("pantalla-minijuego-obstaculos");
const lienzoObstaculos = document.getElementById("lienzo-obstaculos");
const ctxObstaculos = lienzoObstaculos.getContext("2d");
const mensajeObstaculos = document.getElementById("mensaje-obstaculos");
const tiempoObstaculosTexto = document.getElementById("tiempo-obstaculos");
const vidasObstaculosTexto = document.getElementById("vidas-obstaculos");
const botonSaltarObstaculos = document.getElementById("boton-saltar-obstaculos");
const botonReintentarObstaculos = document.getElementById("boton-reintentar-obstaculos");
const botonSalirObstaculos = document.getElementById("boton-salir-obstaculos");

ctxObstaculos.imageSmoothingEnabled = false;

const DURACION_OBSTACULOS = 30;
const PISO_OBSTACULOS = 295;

const jugadorObstaculos = {
    x: 88,
    y: PISO_OBSTACULOS - 48,
    ancho: 34,
    alto: 48,
    velocidadY: 0,
    enSuelo: true,
    invulnerableHasta: 0
};

let obstaculosEnJuego = [];
let vidasEnJuegoObstaculos = 3;
let tiempoInicioObstaculos = 0;
let ultimoFrameObstaculos = 0;
let siguienteObstaculoEn = 0;
let animacionObstaculos = null;
let juegoObstaculosActivo = false;
let juegoObstaculosTerminado = false;
 
const fondoCaminoObstaculos = new Image();
const puntosObstaculosTexto = document.getElementById("puntos-obstaculos");

let corazonesObstaculos = [];
let puntosCorazonesObstaculos = 0;
let siguienteCorazonObstaculos = 0;
fondoCaminoObstaculos.src = "assets/escenarios/fondos/camino-magico.png";
/* =====================================
   INICIAR Y DETENER
===================================== */

function detenerEsquivaObstaculos() {
    juegoObstaculosActivo = false;

    if (animacionObstaculos !== null) {
        cancelAnimationFrame(animacionObstaculos);
        animacionObstaculos = null;
    }
}

function iniciarEsquivaObstaculos() {
    detenerEsquivaObstaculos();

    corazonesObstaculos = [];
puntosCorazonesObstaculos = 0;
if (puntosObstaculosTexto) {
    puntosObstaculosTexto.textContent = "0";
}
siguienteCorazonObstaculos = performance.now() + 1800;
    obstaculosEnJuego = [];
    vidasEnJuegoObstaculos = 3;
    tiempoInicioObstaculos = performance.now();
    ultimoFrameObstaculos = tiempoInicioObstaculos;
    siguienteObstaculoEn = tiempoInicioObstaculos + 1100;
    juegoObstaculosTerminado = false;

    jugadorObstaculos.y = PISO_OBSTACULOS - jugadorObstaculos.alto;
    jugadorObstaculos.velocidadY = 0;
    jugadorObstaculos.enSuelo = true;
    jugadorObstaculos.invulnerableHasta = 0;

    tiempoObstaculosTexto.textContent = DURACION_OBSTACULOS;
    vidasObstaculosTexto.textContent = "♥ ♥ ♥";
    mensajeObstaculos.textContent = "¡Salta para esquivar las piedras, troncos y arbustos!";
    botonReintentarObstaculos.classList.add("oculto");

    juegoObstaculosActivo = true;
    dibujarEscenaObstaculos();
    animacionObstaculos = requestAnimationFrame(bucleEsquivaObstaculos);
}

/* =====================================
   SALTO
===================================== */

function saltarObstaculos() {
    if (!juegoObstaculosActivo || !jugadorObstaculos.enSuelo) return;

    jugadorObstaculos.velocidadY = -12.5;
    jugadorObstaculos.enSuelo = false;
}

/* =====================================
   CREAR OBSTÁCULOS
===================================== */

function crearObstaculoJuego() {
    const tipos = ["piedra", "tronco", "arbusto"];
    const tipo = tipos[Math.floor(Math.random() * tipos.length)];

    const dimensiones = {
        piedra: { ancho: 31, alto: 25 },
        tronco: { ancho: 43, alto: 22 },
        arbusto: { ancho: 38, alto: 33 }
    };

    const tamaño = dimensiones[tipo];

    obstaculosEnJuego.push({
        tipo,
        x: lienzoObstaculos.width + 10,
        y: PISO_OBSTACULOS - tamaño.alto,
        ancho: tamaño.ancho,
        alto: tamaño.alto
    });
}

/* =====================================
   ACTUALIZAR MOVIMIENTO
===================================== */

function actualizarEsquivaObstaculos(ahora, factorTiempo) {

    // Física del salto
    if (!jugadorObstaculos.enSuelo) {
        jugadorObstaculos.velocidadY += 0.62 * factorTiempo;
        jugadorObstaculos.y += jugadorObstaculos.velocidadY * factorTiempo;

        const alturaSuelo = PISO_OBSTACULOS - jugadorObstaculos.alto;

        if (jugadorObstaculos.y >= alturaSuelo) {
            jugadorObstaculos.y = alturaSuelo;
            jugadorObstaculos.velocidadY = 0;
            jugadorObstaculos.enSuelo = true;
        }
    }

    // Crear obstáculos con intervalos variables
    if (ahora >= siguienteObstaculoEn) {
        crearObstaculoJuego();
        siguienteObstaculoEn = ahora + 1250 + Math.random() * 450;
    }

    const segundosTranscurridos = (ahora - tiempoInicioObstaculos) / 1000;
    const velocidad = 5.1 + Math.min(segundosTranscurridos * 0.035, 1.2);
    // Crear corazones
if (ahora >= siguienteCorazonObstaculos) {
    crearCorazonObstaculos();
    siguienteCorazonObstaculos = ahora + 2200 + Math.random() * 1200;
}

// Mover y recoger corazones
for (let i = corazonesObstaculos.length - 1; i >= 0; i--) {

    const corazon = corazonesObstaculos[i];
    corazon.x -= velocidad * factorTiempo;

    const recogido =
        jugadorObstaculos.x + jugadorObstaculos.ancho > corazon.x &&
        jugadorObstaculos.x < corazon.x + corazon.ancho &&
        jugadorObstaculos.y + jugadorObstaculos.alto > corazon.y &&
        jugadorObstaculos.y < corazon.y + corazon.alto;

    if (recogido) {
        puntosCorazonesObstaculos++;
        puntosObstaculosTexto.textContent = puntosCorazonesObstaculos;
        corazonesObstaculos.splice(i, 1);
        continue;
    }

    if (corazon.x < -30) {
        corazonesObstaculos.splice(i, 1);
    }
}

    for (let i = obstaculosEnJuego.length - 1; i >= 0; i--) {

        const obstaculo = obstaculosEnJuego[i];
        obstaculo.x -= velocidad * factorTiempo;

        // Caja de colisión un poco más pequeña que el dibujo
        const jugadorIzquierda = jugadorObstaculos.x + 7;
        const jugadorDerecha = jugadorObstaculos.x + jugadorObstaculos.ancho - 5;
        const jugadorArriba = jugadorObstaculos.y + 8;
        const jugadorAbajo = jugadorObstaculos.y + jugadorObstaculos.alto - 3;

        const obstaculoIzquierda = obstaculo.x + 3;
        const obstaculoDerecha = obstaculo.x + obstaculo.ancho - 3;
        const obstaculoArriba = obstaculo.y + 3;
        const obstaculoAbajo = PISO_OBSTACULOS;

        const hayChoque =
            jugadorDerecha > obstaculoIzquierda &&
            jugadorIzquierda < obstaculoDerecha &&
            jugadorAbajo > obstaculoArriba &&
            jugadorArriba < obstaculoAbajo;

        if (hayChoque && ahora >= jugadorObstaculos.invulnerableHasta) {

            vidasEnJuegoObstaculos--;

            vidasObstaculosTexto.textContent =
                "♥ ".repeat(vidasEnJuegoObstaculos).trim() || "—";

            jugadorObstaculos.invulnerableHasta = ahora + 1000;

            obstaculosEnJuego.splice(i, 1);

            if (vidasEnJuegoObstaculos <= 0) {
                terminarEsquivaObstaculos(false);
                return;
            }

            continue;
        }

        if (obstaculo.x + obstaculo.ancho < 0) {
            obstaculosEnJuego.splice(i, 1);
        }
    }

    const tiempoRestante = Math.max(
        0,
        DURACION_OBSTACULOS - Math.floor((ahora - tiempoInicioObstaculos) / 1000)
    );

    tiempoObstaculosTexto.textContent = tiempoRestante;

    if (tiempoRestante <= 0) {
        terminarEsquivaObstaculos(true);
    }
}

/* =====================================
   DIBUJAR FONDO Y PISO
===================================== */

function dibujarFondoObstaculos(ctx) {

    if (
        fondoCaminoObstaculos.complete &&
        fondoCaminoObstaculos.naturalWidth > 0
    ) {

        ctx.drawImage(
            fondoCaminoObstaculos,
            0,
            0,
            lienzoObstaculos.width,
            lienzoObstaculos.height
        );

    } else {

        ctx.fillStyle = "#382d67";
        ctx.fillRect(
            0,
            0,
            lienzoObstaculos.width,
            lienzoObstaculos.height
        );

    }
}

/* =====================================
   DIBUJAR PERSONAJE
===================================== */


function dibujarJugadorObstaculos(ctx) {

if (!spriteCargado || !personajeSeleccionado) return;

// Parpadeo breve tras recibir un golpe
if (
performance.now() < jugadorObstaculos.invulnerableHasta &&
Math.floor(performance.now() / 100) % 2 === 0
) {
return;
}

const config = configuracionSprites[personajeSeleccionado];
const direccion = config.direcciones.derecha;

let sx, sy, sw, sh;

if (personajeSeleccionado === "Zxs_Angel") {
sx = config.recorte.x;
sy = config.recorte.y[direccion];
sw = config.recorte.ancho;
sh = config.recorte.alto;
} else {
sw = personajeSprite.naturalWidth / config.columnas;
sh = config.cuadro.alto;
sx = direccion * sw;
sy = config.cuadro.y;
}

const escala = 0.21;
const anchoDibujo = sw * escala;
const altoDibujo = sh * escala;

ctx.drawImage(
personajeSprite,
sx, sy, sw, sh,
jugadorObstaculos.x + (jugadorObstaculos.ancho - anchoDibujo) / 2,
jugadorObstaculos.y + jugadorObstaculos.alto - altoDibujo,
anchoDibujo,
altoDibujo
);
}

/* =====================================
CELEBRACIÓN FINAL
===================================== */

function dibujarCelebracionObstaculos() {

const ctx = ctxObstaculos;

dibujarFondoObstaculos(ctx);

// Panel
ctx.fillStyle = "rgba(35, 20, 55, 0.88)";
ctx.fillRect(35, 20, 570, 320);

ctx.strokeStyle = "#ffb6dc";
ctx.lineWidth = 4;
ctx.strokeRect(35, 20, 570, 320);

// Título
ctx.textAlign = "center";
ctx.fillStyle = "#ffffff";
ctx.font = "bold 27px Arial";
ctx.fillText("¡LO LOGRAMOS JUNTOS!", 320, 65);

// Mensaje
ctx.font = "16px Arial";
ctx.fillStyle = "#ffd6ec";
ctx.fillText("Cada pequeño momento contigo", 320, 95);
ctx.fillText("es una victoria. ♥", 320, 117);

// Corazones conseguidos
ctx.font = "bold 18px Arial";
ctx.fillStyle = "#ff69b4";
ctx.fillText(
"♥ Corazones conseguidos: " + puntosCorazonesObstaculos + " ♥",
320,
150
);

// Zxs_Angel
const configAngel = configuracionSprites.Zxs_Angel;

if (
spriteAngelCelebracion.complete &&
spriteAngelCelebracion.naturalWidth > 0
) {
ctx.drawImage(
spriteAngelCelebracion,
configAngel.recorte.x,
configAngel.recorte.y[configAngel.direcciones.abajo],
configAngel.recorte.ancho,
configAngel.recorte.alto,
185, 165, 100, 135
);
}

// Yomi
const configYomi = configuracionSprites.Yomi;

if (
spriteYomiCelebracion.complete &&
spriteYomiCelebracion.naturalWidth > 0
) {
const sw = spriteYomiCelebracion.naturalWidth / configYomi.columnas;
const sh = configYomi.cuadro.alto;

ctx.drawImage(
spriteYomiCelebracion,
configYomi.direcciones.abajo * sw,
configYomi.cuadro.y,
sw,
sh,
355, 165, 100, 135
);
}

// Decoraciones
const decoraciones = [
[90, 180, "♥"], [540, 180, "♥"],
[115, 285, "✦"], [520, 275, "✦"],
[145, 65, "♥"], [490, 65, "♥"],
[320, 205, "♥"], [320, 285, "✦"],
[75, 300, "✦"], [565, 300, "✦"]
];

decoraciones.forEach((item, i) => {
ctx.fillStyle = i % 2 === 0 ? "#ff8ac7" : "#ffe66d";
ctx.font = "bold 22px Arial";
ctx.fillText(item[2], item[0], item[1]);
});

// Frase final
ctx.fillStyle = "#ffffff";
ctx.font = "bold 17px Arial";
ctx.fillText("Tú y yo, siempre en el mismo equipo ♥", 320, 325);
}

/* =====================================
   DIBUJAR OBSTÁCULOS
===================================== */

function dibujarObstaculosEnEscena(ctx) {

    obstaculosEnJuego.forEach(obstaculo => {

        const x = Math.round(obstaculo.x);
        const y = obstaculo.y;

        if (obstaculo.tipo === "piedra") {

            ctx.fillStyle = "#4d5962";
            ctx.fillRect(x + 5, y + 7, 22, 18);
            ctx.fillRect(x + 10, y + 2, 14, 8);

            ctx.fillStyle = "#84909a";
            ctx.fillRect(x + 10, y + 6, 8, 4);

            ctx.fillStyle = "#303b43";
            ctx.fillRect(x + 7, y + 21, 20, 4);

        } else if (obstaculo.tipo === "tronco") {

            ctx.fillStyle = "#56351f";
            ctx.fillRect(x, y + 4, 43, 18);

            ctx.fillStyle = "#98643a";
            ctx.fillRect(x + 4, y + 6, 33, 10);

            ctx.fillStyle = "#c18a51";
            ctx.fillRect(x + 6, y + 7, 22, 3);

            ctx.fillStyle = "#4a2d1c";
            ctx.fillRect(x + 36, y + 5, 5, 16);

        } else {

            ctx.fillStyle = "#294b37";
            ctx.fillRect(x + 4, y + 13, 30, 20);
            ctx.fillRect(x + 9, y + 5, 12, 12);
            ctx.fillRect(x + 23, y + 8, 12, 13);

            ctx.fillStyle = "#6f985b";
            ctx.fillRect(x + 11, y + 8, 7, 5);
            ctx.fillRect(x + 25, y + 11, 6, 4);
        }
    });
}

/* =====================================
   DIBUJAR ESCENA COMPLETA
===================================== */

function dibujarEscenaObstaculos() {

    const ctx = ctxObstaculos;

    ctx.clearRect(
        0,
        0,
        lienzoObstaculos.width,
        lienzoObstaculos.height
    );

    dibujarFondoObstaculos(ctx);
    dibujarObstaculosEnEscena(ctx);
    dibujarCorazonesObstaculos(ctx);
    dibujarJugadorObstaculos(ctx);

    if (juegoObstaculosTerminado) {

        ctx.fillStyle = "rgba(17, 24, 39, 0.78)";
        ctx.fillRect(75, 125, 490, 110);

        ctx.strokeStyle = "#f4c6d8";
        ctx.lineWidth = 3;
        ctx.strokeRect(75, 125, 490, 110);

        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 23px Arial";
        ctx.textAlign = "center";

        ctx.fillText(
            vidasEnJuegoObstaculos > 0
                ? "¡LO LOGRASTE! ♥"
                : "¡INTÉNTALO OTRA VEZ!",
            320,
            170
        );

        ctx.font = "16px Arial";

        ctx.fillText(
            vidasEnJuegoObstaculos > 0
                ? "¡Esquivaste todos los obstáculos!"
                : "Los obstáculos te alcanzaron.",
            320,
            202
        );
    }
}

/* =====================================
   TERMINAR PARTIDA
===================================== */


function terminarEsquivaObstaculos(gano) {

    if (juegoObstaculosTerminado) return;

    juegoObstaculosTerminado = true;
    detenerEsquivaObstaculos();

    if (gano) {
        desbloquearPieza("obstaculos");
        mensajeObstaculos.textContent =
            "¡Lo logramos juntos! Cada pequeño momento contigo es una victoria. ♥";

        dibujarCelebracionObstaculos();
    } else {
        mensajeObstaculos.textContent =
            "Se acabaron tus tres vidas. ¡Inténtalo otra vez!";
        dibujarEscenaObstaculos();
    }

    botonReintentarObstaculos.classList.remove("oculto");
}


/* =====================================
   BUCLE PRINCIPAL
===================================== */
function bucleEsquivaObstaculos(ahora) {
    if (!juegoObstaculosActivo ||
        pantallaObstaculos.classList.contains("oculto")) {
        detenerEsquivaObstaculos();
        return;
    }

    const factorTiempo = Math.min(
        (ahora - ultimoFrameObstaculos) / 16.67,
        2.5
    );

    ultimoFrameObstaculos = ahora;

    actualizarEsquivaObstaculos(ahora, factorTiempo);

    // Si terminó el juego, no dibujamos la escena normal.
    if (juegoObstaculosTerminado) return;

    dibujarEscenaObstaculos();

    if (juegoObstaculosActivo) {
        animacionObstaculos = requestAnimationFrame(
            bucleEsquivaObstaculos
        );
    }
}


/* =====================================
   SALIR Y REINTENTAR
===================================== */

function salirEsquivaObstaculos() {

    detenerEsquivaObstaculos();

    pantallaObstaculos.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
}

botonSalirObstaculos.addEventListener("click", salirEsquivaObstaculos);

botonReintentarObstaculos.addEventListener(
    "click",
    iniciarEsquivaObstaculos
);

botonSaltarObstaculos.addEventListener("pointerdown", evento => {

    evento.preventDefault();
    saltarObstaculos();

});

botonSaltarObstaculos.addEventListener(
    "click",
    saltarObstaculos
);

/* =====================================
   TECLADO
===================================== */

document.addEventListener("keydown", evento => {

    if (pantallaObstaculos.classList.contains("oculto")) return;

    if (
        evento.code === "Space" ||
        evento.key === "ArrowUp" ||
        evento.key.toLowerCase() === "w"
    ) {
        evento.preventDefault();

        if (!evento.repeat) {
            saltarObstaculos();
        }
    }
});
function crearCorazonObstaculos() {
    corazonesObstaculos.push({
        x: 660,
        y: PISO_OBSTACULOS - 75,
        ancho: 22,
        alto: 22
    });
}

function dibujarCorazonesObstaculos(ctx) {
    ctx.font = "24px Arial";
    ctx.textAlign = "center";
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000000";
    ctx.fillStyle = "#FF00FF";

    corazonesObstaculos.forEach(corazon => {
        const x = corazon.x + 11;
        const y = corazon.y + 21;

        ctx.strokeText("♥", x, y);
        ctx.fillText("♥", x, y);
    });
}

/* =====================================
   MINIJUEGO 5: ¿CUÁNTO NOS CONOCEMOS?
===================================== */

const pantallaPreguntas = document.getElementById("pantalla-minijuego-preguntas");
const numeroPregunta = document.getElementById("numero-pregunta");
const puntosPreguntas = document.getElementById("puntos-preguntas");
const textoPregunta = document.getElementById("texto-pregunta");
const opcionesPreguntas = document.getElementById("opciones-preguntas");
const mensajePreguntas = document.getElementById("mensaje-preguntas");
const botonSiguientePregunta = document.getElementById("boton-siguiente-pregunta");
const resultadoPreguntas = document.getElementById("resultado-preguntas");
const textoResultadoPreguntas = document.getElementById("texto-resultado-preguntas");
const botonSalirPreguntas = document.getElementById("boton-salir-preguntas");

const preguntasTrivia = [
    {
        pregunta: "¿Dónde nos conocimos?",
        opciones: ["Among Us", "Facebook", "Minecraft"],
        correctas: ["Among Us"]
    },
    {
        pregunta: "¿Cuántas razones te dio Zxs_Angel de por qué te ama?",
        opciones: ["5", "101", "100"],
        correctas: ["101"]
    },
    {
        pregunta: "¿Cuál es el primer apellido de Zxs_Angel?",
        opciones: ["Murillo", "Ramírez", "Rodríguez"],
        correctas: ["Murillo"]
    },
    {
        pregunta: "¿Qué día comenzó nuestra relación?",
        opciones: ["31 de octubre", "30 de septiembre", "27 de septiembre"],
        correctas: ["30 de septiembre"]
    },
    {
        pregunta: "¿Cómo te dice más Zxs_Angel?",
        opciones: ["Mi bebeshita", "Mi niña", "Mi mujer"],
        correctas: ["Mi bebeshita", "Mi niña", "Mi mujer"]
    },
    {
        pregunta: "¿Cuántos «Te amo» había en el mensaje de Zxs_Angel?",
        opciones: ["67", "1000", "100"],
        correctas: ["1000"]
    },
    {
        pregunta: "¿Qué es lo que más queremos hacer cuando nos veamos?",
        opciones: [
            "Coshitash 👻",
            "Besarnos hasta cansarnos",
            "Abrazarnos",
            "Todas las anteriores"
        ],
        correctas: [
            "Coshitash 👻",
            "Besarnos hasta cansarnos",
            "Abrazarnos",
            "Todas las anteriores"
        ]
    },
    {
        pregunta: "¿Qué quiere hacer Zxs_Angel contigo?",
        opciones: [
            "Envejecer",
            "Durar para toda la vida",
            "Amarte eternamente",
            "Todas las anteriores"
        ],
        correctas: [
            "Envejecer",
            "Durar para toda la vida",
            "Amarte eternamente",
            "Todas las anteriores"
        ]
    },
    {
        pregunta: "¿Cómo se llama la canción que hizo Zxs_Angel para ti?",
        opciones: ["Diez kilómetros", "Mil kilómetros", "Un metro"],
        correctas: ["Mil kilómetros"]
    },
    {
        pregunta: "¿Cómo se llama el amiguito de Zxs_Angel?",
        opciones: ["Fueguito", "Chispita", "Bomboncito"],
        correctas: ["Chispita"]
    },
    {
        pregunta: "¿Qué es lo que más le gusta a Zxs_Angel de Yomi?",
        opciones: [
            "Su carita",
            "Su pelo",
            "Sus shishis,toto y kolita👻",
            "Todas las anteriores"
        ],
        correctas: [
            "Su carita",
            "Su pelo",
            "Sus shishis,toto y kolita👻",
            "Todas las anteriores"
        ]
    }
];

let indicePregunta = 0;
let puntuacionPreguntas = 0;
let preguntaRespondida = false;

function mezclarOpcionesPreguntas(opciones) {
    const copia = [...opciones];

    for (let i = copia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}

function iniciarPreguntas() {
    indicePregunta = 0;
    puntuacionPreguntas = 0;
    preguntaRespondida = false;

    puntosPreguntas.textContent = "0";

    resultadoPreguntas.style.display = "none";
    botonSiguientePregunta.style.display = "none";

    document.querySelector(".contenedor-pregunta").style.display = "block";

    mostrarPregunta();
}

function mostrarPregunta() {
    const preguntaActual = preguntasTrivia[indicePregunta];

    preguntaRespondida = false;

    numeroPregunta.textContent =
        `${indicePregunta + 1} / ${preguntasTrivia.length}`;

    textoPregunta.textContent = preguntaActual.pregunta;

    mensajePreguntas.textContent = "";

    opcionesPreguntas.innerHTML = "";

    botonSiguientePregunta.style.display = "none";

    const opcionesMezcladas = mezclarOpcionesPreguntas(
        preguntaActual.opciones
    );

    opcionesMezcladas.forEach(opcion => {
        const boton = document.createElement("button");

        boton.textContent = opcion;
        boton.classList.add("opcion-pregunta");

        boton.addEventListener("click", () => {
            responderPregunta(opcion, boton);
        });

        opcionesPreguntas.appendChild(boton);
    });
}

function responderPregunta(respuesta, botonSeleccionado) {
    if (preguntaRespondida) return;

    preguntaRespondida = true;

    const preguntaActual = preguntasTrivia[indicePregunta];

    const esCorrecta = preguntaActual.correctas.includes(respuesta);

    if (esCorrecta) {
        puntuacionPreguntas++;

        puntosPreguntas.textContent = puntuacionPreguntas;

        mensajePreguntas.textContent = "¡Correcto, mi amor! 💗";

        botonSeleccionado.classList.add("respuesta-correcta");

    } else {
        mensajePreguntas.textContent = "¡Casi, mi amor! 💕";

        botonSeleccionado.classList.add("respuesta-incorrecta");
    }

    const botones = opcionesPreguntas.querySelectorAll("button");

    botones.forEach(boton => {
        boton.disabled = true;

        if (preguntaActual.correctas.includes(boton.textContent)) {
            boton.classList.add("respuesta-correcta");
        }
    });

    botonSiguientePregunta.style.display = "block";

    if (indicePregunta === preguntasTrivia.length - 1) {
        botonSiguientePregunta.textContent = "Ver resultado";
    } else {
        botonSiguientePregunta.textContent = "Siguiente";
    }
}

function avanzarPregunta() {
    if (!preguntaRespondida) return;

    indicePregunta++;

    if (indicePregunta < preguntasTrivia.length) {
        mostrarPregunta();
    } else {
        terminarPreguntas();
    }
}

function terminarPreguntas() {
    desbloquearPieza("preguntas");
    document.querySelector(".contenedor-pregunta").style.display = "none";

    resultadoPreguntas.style.display = "block";

    textoResultadoPreguntas.textContent =
        `¡Conseguiste ${puntuacionPreguntas} de ${preguntasTrivia.length} puntos! 
        Cada respuesta es un recuerdo más de nuestra historia.
        Te amo muchísimo, mi Yomi. 💗`;
}

function salirPreguntas() {
    resultadoPreguntas.style.display = "none";
    document.querySelector(".contenedor-pregunta").style.display = "block";

    pantallaPreguntas.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
}

botonSiguientePregunta.addEventListener("click", avanzarPregunta);

botonSalirPreguntas.addEventListener("click", salirPreguntas);

/* =====================================
   SORPRESA ESPECIAL
===================================== */

const botonSorpresa = document.getElementById("boton-sorpresa");
const pantallaSorpresa = document.getElementById("pantalla-sorpresa");
const respuestaSorpresa = document.getElementById("respuesta-sorpresa");
const botonComprobarSorpresa = document.getElementById("boton-comprobar-sorpresa");
const mensajeSorpresa = document.getElementById("mensaje-sorpresa");
const contenidoSorpresa = document.getElementById("contenido-sorpresa");
const botonSalirSorpresa = document.getElementById("boton-salir-sorpresa");

function abrirSorpresa() {
    menuPrincipal.classList.add("oculto");
    pantallaSorpresa.classList.remove("oculto");
}

function comprobarSorpresa() {
    const respuesta = respuestaSorpresa.value.trim().toLowerCase();

    if (respuesta === "tikitoo") {
        document.getElementById("zona-pista-sorpresa").classList.add("oculto");
        contenidoSorpresa.classList.remove("oculto");
    } else {
        mensajeSorpresa.textContent =
            "Esa no es la palabra secreta. ¡Inténtalo otra vez!";
    }
}

botonSorpresa.addEventListener("click", abrirSorpresa);

botonComprobarSorpresa.addEventListener("click", comprobarSorpresa);

botonSalirSorpresa.addEventListener("click", () => {
    pantallaSorpresa.classList.add("oculto");
    menuPrincipal.classList.remove("oculto");
});
