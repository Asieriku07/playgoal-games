document.getElementById("main-title").addEventListener("click", volverMenu);
    const jugadoresCorrectos = [
      "Cristiano Ronaldo",
      "Lionel Messi",
      "Robert Lewandowski",
      "Karim Benzema",
      "Raúl González",
      "Ruud van Nistelrooy",
      "Thomas Müller",
      "Andriy Shevchenko",
      "Zlatan Ibrahimović",
      "Filippo Inzaghi"
    ];

    let encontrados = JSON.parse(localStorage.getItem("top10_encontrados")) || Array(10).fill(false);


   function volverMenu() {
  document.getElementById("menu-principal").classList.remove("hidden");
  document.getElementById("top10-game").classList.remove("active");
  document.getElementById("wordle-game").classList.add("hidden");
  document.getElementById("impostor-game").classList.remove("active");
  document.getElementById("toplist-game").classList.add("hidden");

}


   function iniciarTop10() {
  const container = document.getElementById('inputs');
  container.innerHTML = '';
  document.getElementById('win-message').style.display = 'none';

  jugadoresCorrectos.forEach((nombre, i) => {
    const fila = document.createElement('div');
    fila.className = 'rank-row' + (encontrados[i] ? ' correct' : '');

    const num = document.createElement('div');
    num.className = 'rank-num';
    num.textContent = (i + 1) + '.';

    const texto = document.createElement('span');
    texto.textContent = encontrados[i] ? nombre : '';
    texto.id = `jugador-${i}`;

    fila.appendChild(num);
    fila.appendChild(texto);
    container.appendChild(fila);
  });

  document.getElementById('guess-input').value = '';
  document.getElementById('guess-input').focus();
}


    function normalizarTexto(texto) {
      return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    }

    document.getElementById('guess-input').addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const guess = normalizarTexto(this.value);

        const index = jugadoresCorrectos.findIndex((nombre, i) => {
          return !encontrados[i] && normalizarTexto(nombre).split(" ").some(parte => parte.startsWith(guess));
        });

        if (index >= 0) {
          if (encontrados[index]) {
            alert("¡Ya ingresaste ese jugador!");
          } else {
            encontrados[index] = true;
            localStorage.setItem("top10_encontrados", JSON.stringify(encontrados));
            document.getElementById(`jugador-${index}`).textContent = jugadoresCorrectos[index];
            document.querySelectorAll('.rank-row')[index].classList.add('correct');

            if (encontrados.every(e => e)) {
              document.getElementById('win-message').style.display = 'block';
            }
          }
          this.value = '';
        } else {
          this.classList.add('already-entered');
          setTimeout(() => this.classList.remove('already-entered'), 1000);
        }
      }
    });

    window.addEventListener('load', () => {
      if (document.getElementById('top10-game').classList.contains('active')) {
        iniciarTop10();
      }
      
    });
const jugadoresWordle = ["modric", "ronaldo", "xavi", "messi", "kane", "neymar"];
let jugadorSecreto = jugadoresWordle[Math.floor(Math.random() * jugadoresWordle.length)];
const intentosMaximos = 6;
let intentosWordle = [];

function mostrarJuego(juego) {
  document.getElementById('menu-principal').classList.add('hidden');
  if (juego === 'top10') {
    iniciarTop10();
    document.getElementById('top10-game').classList.add('active');
  }
  if (juego === 'Wordle') {
    iniciarWordle();
    document.getElementById('wordle-game').classList.remove('hidden');
    document.getElementById('wordle-lose').classList.add('hidden');
    document.getElementById('wordle-input').disabled = false;
   const teclado = "qwertyuiopasdfghjklzxcvbnm";
const tecladoDiv = document.getElementById('keyboard');
tecladoDiv.innerHTML = "";

teclado.split('').forEach(letra => {
  const key = document.createElement('div');
  key.classList.add('key');
  key.textContent = letra;
  key.onclick = () => {
    document.getElementById('wordle-input').value += letra;
  };
  tecladoDiv.appendChild(key); 
  document.getElementById('wordle-input').focus();
document.getElementById('wordle-input').addEventListener('input', () => {
  const input = document.getElementById('wordle-input');
  const intento = input.value;
  const fila = document.querySelectorAll('.wordle-fila')[intentosWordle.length];
  const celdas = fila.querySelectorAll('.wordle-cell');

  for (let i = 0; i < celdas.length; i++) {
    celdas[i].textContent = intento[i] || '';
  }
});

  
});

const borrar = document.createElement('div');
borrar.classList.add('key');
borrar.textContent = "←";
borrar.onclick = () => {
  const input = document.getElementById('wordle-input');
  input.value = input.value.slice(0, -1);
};
tecladoDiv.appendChild(borrar);
document.getElementById('wordle-input').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    adivinarWordle();
  }
});

  }
     if (juego === "Impostor") {
    document.getElementById("top10-game").classList.remove("active");
    document.getElementById("wordle-game").classList.add("hidden");
    document.getElementById("impostor-game").classList.remove("active");

    iniciarImpostor();
    document.getElementById("impostor-game").classList.add("active");
  }
  
  if (juego === "TopList") {
  document.getElementById("top10-game").classList.remove("active");
  document.getElementById("wordle-game").classList.add("hidden");
  document.getElementById("impostor-game").classList.remove("active");

  document.getElementById("toplist-game").classList.remove("hidden");
  iniciarTopList();
}


}

function iniciarWordle() {
 jugadorSecreto = jugadoresWordle[Math.floor(Math.random() * jugadoresWordle.length)];

  intentosWordle = [];
  const grid = document.getElementById('wordle-grid');
  grid.innerHTML = '';
  document.getElementById('wordle-input').value = '';
  document.getElementById('wordle-input').maxLength = jugadorSecreto.length;
  document.getElementById('wordle-win').classList.add('hidden');
  document.getElementById('wordle-lose').classList.add('hidden');

  const longitud = jugadorSecreto.length;

  for (let i = 0; i < intentosMaximos; i++) {
    const fila = document.createElement('div');
    fila.className = 'wordle-fila';

    for (let j = 0; j < longitud; j++) {
      const celda = document.createElement('div');
      celda.className = 'wordle-cell';
      fila.appendChild(celda);
    }

    grid.appendChild(fila);
  }
}




function adivinarWordle() {
  const input = document.getElementById('wordle-input');
  const intento = normalizarTexto(input.value);
  if (!intento || intento.length < 3) return;

 mostrarIntentoWordle(intento);

if (intento === jugadorSecreto) {
  document.getElementById('wordle-win').classList.remove('hidden');
  input.disabled = true;
} else if (intentosWordle.length >= intentosMaximos) {
  document.getElementById('wordle-lose').classList.remove('hidden');
  input.disabled = true;
}

  input.value = '';
}

function mostrarIntentoWordle(palabra) {
  const filaIndex = intentosWordle.length;
  const fila = document.querySelectorAll('.wordle-fila')[filaIndex];
  const celdas = fila.querySelectorAll('.wordle-cell');

  for (let i = 0; i < jugadorSecreto.length; i++) {
    celdas[i].textContent = palabra[i] || '';
    celdas[i].style.fontWeight = 'bold';
    celdas[i].style.display = 'flex';
    celdas[i].style.alignItems = 'center';
    celdas[i].style.justifyContent = 'center';

    if (palabra[i] === jugadorSecreto[i]) {
      celdas[i].style.background = '#4caf50';
    } else if (jugadorSecreto.includes(palabra[i])) {
      celdas[i].style.background = '#fbc02d';
    } else {
      celdas[i].style.background = '#757575';
    }
  }

  intentosWordle.push(palabra);
}

// Incluye esto al final del script
const jugadoresImpostor = [
  { nombre: "Messi", esCorrecto: true, foto: "img/messi.jpg"},
  { nombre: "Cristiano", esCorrecto: true, foto: "img/cristiano.jpg" },
  { nombre: "Modric", esCorrecto: true, foto: "img/modric.jpg" },
  { nombre: "Xavi", esCorrecto: false, foto: "img/xavi.jpg" },
  { nombre: "Benzema", esCorrecto: true, foto: "img/benzema.jpg" },
  { nombre: "Valverde", esCorrecto: false,  foto: "img/valverde.jpg"}
];

function iniciarImpostor() {
  const grid = document.getElementById("jugadores-grid");
  const resultado = document.getElementById("resultado");
  const confirmBtn = document.getElementById("confirmar-seleccion");
  const categoria = document.getElementById("categoria");

  grid.innerHTML = "";
  resultado.textContent = "";
  confirmBtn.classList.add("hidden");
  categoria.textContent = "Ballon d'Or winners";

  let seleccionado = null;
  let bloqueado = false;

  jugadoresImpostor.forEach((jugador, index) => {
    const div = document.createElement("div");
    div.className = "jugador";
div.innerHTML = `
  <img src="${jugador.foto}" alt="${jugador.nombre}" class="jugador-foto" />
  <div class="jugador-nombre">${jugador.nombre}</div>
`;

    div.onclick = () => {
      if (bloqueado) return;

      document.querySelectorAll(".jugador").forEach(j => j.classList.remove("seleccionado"));
      div.classList.add("seleccionado");
      seleccionado = { div, jugador };
      confirmBtn.classList.remove("hidden");
    };

    grid.appendChild(div);
  });

  confirmBtn.onclick = () => {
    if (!seleccionado) return;

    if (seleccionado.jugador.esCorrecto) {
      seleccionado.div.classList.add("correcto");
    } else {
      seleccionado.div.classList.add("impostor");
      resultado.textContent = "¡Era un impostor! ❌";
      bloquearJuego();
      return;
    }

    seleccionado = null;
    confirmBtn.classList.add("hidden");

    const todosCorrectos = [...document.querySelectorAll(".jugador")]
      .filter((el, i) => jugadoresImpostor[i].esCorrecto)
      .every(el => el.classList.contains("correcto"));

    if (todosCorrectos) {
      resultado.textContent = "¡Todos correctos! 🎉";
      bloquearJuego();
    }
  };

  function bloquearJuego() {
    bloqueado = true;
    confirmBtn.classList.add("hidden");
  }
}

// === Futbol List A (TopList) ===


// === Datos de TopList ===
const futbolListA = [
  {
    question: "Jugadores con más partidos en el Manchester City dirigidos por Pep Guardiola",
    answers: [
      "Bernardo Silva",   "Kevin De Bruyne",  "Ederson",           "Ilkay Gündoğan",
      "Kyle Walker",      "Phil Foden",       "Raheem Sterling",   "John Stones",
      "Rodri",            "Fernandinho",      "Gabriel Jesus",     "Riyad Mahrez",
      "Rúben Dias",       "Sergio Agüero",    "Aymeric Laporte"
    ]
  },
  {
    question: "Otra pregunta para el día 2",
    answers: ["Respuesta 1","Respuesta 2","Respuesta 3"]
  }
];

// Decoys (no suman progreso)
const decoyPlayers = [

//premier league  
  "David Beckham",       "Ryan Giggs",          "Steven Gerrard",     "Frank Lampard",
  "John Terry",         "Rio Ferdinand",       "Nemanja Vidić",      "Paul Scholes",
  "Michael Owen",       "Wayne Rooney",        "Didier Drogba",      "Eden Hazard",
  "N'Golo Kanté",       "David Silva",         "Santi Cazorla",      "Arjen Robben",
  "Cesc Fàbregas",      "Ashley Cole",         "Michael Essien",     "Claude Makélélé",
  "Petr Čech",          "Romelu Lukaku",       "Willian",            "Juan Mata",
  "Oscar",              "Emmanuel Adebayor",   "Nicolas Anelka",     "Yaya Touré",
  "Mason Mount",        "Reece James",         "Marcus Rashford",    "Bruno Fernandes",
  "Anthony Martial",    "Jadon Sancho",        "Bukayo Saka",        "Aleksandar Mitrović",
  "Tom Cairney",        "Wilfried Zaha",       "Christian Benteke",  "Richarlison",
  "Dominic Calvert-Lewin","Troy Deeney",       "Ismaïla Sarr",       "Neal Maupay",
  "Danny Welbeck",      "Ben Mee",             "Ashley Westwood",    "Lewis Dunk",
  "Pascal Groß",        "Lloyd Kelly",         "Marc Cucurella",     "Ben Chilwell",
  "Trent Alexander-Arnold","Andy Robertson",   "Virgil van Dijk",    "Roberto Firmino",
  "Mohamed Salah",      "Sadio Mané",          "Alisson Becker",     "Jordan Henderson",
  "James Milner",       "Georginio Wijnaldum", "Naby Keïta",         "Dele Alli",
  "Christian Eriksen",  "Harry Kane",          "Son Heung-min",      "Hugo Lloris",
  "Harry Maguire",      "Eric Dier",           "Jan Vertonghen",     "Toby Alderweireld",
  "Kieran Trippier",    "Jack Grealish",       "John McGinn",        "Ollie Watkins",
  "Tyrone Mings",       "Emiliano Martínez",   "Jack Cork",          "Wilfried Bony",
  "Gylfi Sigurðsson",   "Jonjo Shelvey",       "Danny Murphy",       "Leon Osman",
  "Tim Cahill",         "Leighton Baines",     "Seamus Coleman",     "Ross Barkley",
  "Victor Moses",       "Marcos Alonso",       "Samir Nasri",        "Demba Ba",
  "Salomon Kalou",      "Jimmy Floyd Hasselbaink","Ruud van Nistelrooy","Darius Vassell",
  "Jermain Defoe",      "Gabriel Agbonlahor",  "Ashley Barnes",      "Michail Antonio",
  "Mark Noble",         "Declan Rice",         "James Ward-Prowse",  "Pierre-Emerick Aubameyang",
  "Mesut Özil",         "Robin van Persie",    "Thierry Henry",      "Patrick Vieira",
  "Dennis Bergkamp",    "Tony Adams",          "David Seaman",       "Ray Parlour",
  "Lee Dixon",          "Martin Keown",        "Nigel Winterburn",   "Steve Bould",
  "Emmanuel Petit",     "Robert Pires",        "Alex Scott",         "Alan Shearer",
  "Andy Cole",          "Les Ferdinand",       "Chris Sutton",       "Tim Sherwood",
  "Peter Crouch",       "Emile Heskey",        "Craig Bellamy",      "Jay-Jay Okocha",
  "Yakubu Aiyegbeni",   "Darren Bent",         "Jack Harrison",      "Ivan Toney",
  "Emile Smith Rowe",   "Gabriel Martinelli",  "Kieran Tierney",     "Thomas Partey",
  "Martin Ødegaard",    "Granit Xhaka",        "Nicolas Pépé",       "Alexandre Lacazette",
  "Ángel Di María",     "Memphis Depay",       "Jesse Lingard",      "Ashley Young",
  "Patrice Evra",       "Glen Johnson",        "Phil Jagielka",      "Joleon Lescott",
  "Kolo Touré",         "Micah Richards",      "Joe Hart",           "Shay Given",
  "Mark Schwarzer",     "Edwin van der Sar",   "David de Gea",       "Pepe Reina",
  "Brad Friedel",       "Tim Howard",          "Asmir Begović",      "Kasper Schmeichel",
  "Brad Guzan",         "Łukasz Fabiański",    "Wojciech Szczęsny",  "Nicolas Otamendi",
  "Thibaut Courtois",   "Manuel Lanzini",      "Kurt Zouma",         "Aaron Cresswell",
  "Pablo Fornals",      "Diogo Jota",          "Luis Díaz",          "Alex Oxlade-Chamberlain",
  "Joe Allen",          "Eddie Nketiah",       "Jarrod Bowen",       "Michy Batshuayi",
  "Christian Pulisic",  "Hakim Ziyech",        "Ruben Loftus-Cheek", "Michael Keane",
  "Joe Gomez",          "Caglar Söyüncü",      "Youri Tielemans",    "Wilfred Ndidi",
  "Victor Lindelöf",    "Raphaël Varane",      "Sergio Reguilón",    "Luke Shaw",
  "Brandon Williams",   "Axel Tuanzebe",       "Callum Hudson-Odoi", "Tammy Abraham",
  "Aaron Ramsey",       "Andre Gray",          "Glenn Murray",       "Wayne Hennessey",
  "Harry Arter",        "Ben Foster",          "Joelinton",          "Aaron Ramsdale",  
  "Claudio Bravo",      "Fabian Delph",        "Leroy Sané",
  "Edin Džeko",         "Oleksandr Zinchenko" ,"João Cancelo",
  "Vincent Kompany",    "Kelechi Iheanacho",   "Benjamin Mendy",
  "Zack Steffen",       "Stefan Ortega",       "Julián Álvarez",
  "Aleksandar Kolarov", "Nathan Ake",          "Ángelino" 

  //
];

let currentListIndex = 0;
let foundAnswers = [];
let foundDecoys = [];

// Arranca o refresca la vista
function iniciarTopList() {
  const { question, answers } = futbolListA[currentListIndex];
  foundAnswers = [];
  foundDecoys = [];

  document.querySelector(".flista-question").textContent = question;
  document.getElementById("found-list").innerHTML = "";
  document.getElementById("suggestions-list").innerHTML = "";
  updateProgress(0, answers.length);

  // Reemplazo input para resetear listeners
  const old = document.getElementById("flista-input");
  const input = old.cloneNode(true);
  old.replaceWith(input);

  input.value = "";
  input.disabled = false;
  input.addEventListener("input", renderSuggestions);
  input.addEventListener("keydown", checkInput);
}

// Actualiza círculo y texto X/Y
function updateProgress(found, total) {
  const pct = total ? Math.round(found/total*100) : 0;
  document.getElementById("circle-progress")
          .setAttribute("stroke-dasharray", `${pct},100`);
  document.getElementById("progress-text").textContent = `${found}/${total}`;
}

// Sugiere correctos + decoys
// === Sugerencias estrictas: mínimo 2 letras + prefijo ===
function renderSuggestions(e) {
  const val = normalizarTexto(e.currentTarget.value);
  const { answers } = futbolListA[currentListIndex];
  const list = document.getElementById("suggestions-list");
  list.innerHTML = "";

  // Si quieres exigir mínimo 2 letras:
  if (val.length < 2) return;

  // 1) Verdaderos que empiecen por el prefijo
  const correctMatches = answers
    .filter(a => 
      normalizarTexto(a)
        .split(" ")
        .some(word => word.startsWith(val)) &&
      !foundAnswers.includes(a)
    );

  // 2) Decoys que empiecen por el prefijo
  const fakeMatches = decoyPlayers
    .filter(d => 
      normalizarTexto(d)
        .split(" ")
        .some(word => word.startsWith(val)) &&
      !foundDecoys.includes(d)
    );

  // Unión respetando el orden (correctos arriba), y límite a 5
  const suggestions = [...correctMatches, ...fakeMatches].slice(0, 5);

  suggestions.forEach(name => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "item";
    btn.textContent = name;

    btn.addEventListener("click", () => {
      const isDecoy = decoyPlayers.includes(name);
      addFound(name, isDecoy);
      e.currentTarget.focus();
    });

    list.appendChild(btn);
  });
}


// === Enter estricto: sólo si hay al menos 2 letras ===
function checkInput(e) {
  if (e.key !== "Enter") return;
  e.preventDefault();

  const input = e.currentTarget;
  const val = normalizarTexto(input.value);

  // Requerir al menos 2 caracteres antes de aceptar
  if (val.length < 2) {
    input.value = "";
    return;
  }

  const { answers } = futbolListA[currentListIndex];

  // 1) Exacta
  let match = answers.find(a =>
    normalizarTexto(a) === val && !foundAnswers.includes(a)
  );

  // 2) Si no exacta, primera sugerencia disponible
  if (!match) {
    const first = document.querySelector("#suggestions-list .item");
    if (first) match = first.textContent;
  }

  if (match) {
    addFound(match, decoyPlayers.includes(match));
  }

  input.value = "";
  document.getElementById("suggestions-list").innerHTML = "";
}


// Añade al listado y, sólo si es correcto, suma progreso
function addFound(name, isDecoy) {
  const list = document.getElementById("found-list");
  const div = document.createElement("div");
  div.className = "item" + (isDecoy ? " decoy" : "");
  div.textContent = name;

  if (isDecoy) {
    // si es decoy, al final
    list.appendChild(div);
    foundDecoys.push(name);
  } else {
    // si es correcto, justo antes del primer decoy
    const firstDecoy = list.querySelector(".item.decoy");
    if (firstDecoy) {
      list.insertBefore(div, firstDecoy);
    } else {
      list.appendChild(div);
    }
    foundAnswers.push(name);
    updateProgress(
      foundAnswers.length,
      futbolListA[currentListIndex].answers.length
    );
    if (
      foundAnswers.length ===
      futbolListA[currentListIndex].answers.length
    ) {
      document.getElementById("flista-input").disabled = true;
    }
  }
}


// Navegación
function previousDay() {
  if (currentListIndex>0) {
    currentListIndex--;
    iniciarTopList();
  }
}
function nextDay() {
  if (currentListIndex < futbolListA.length-1) {
    currentListIndex++;
    iniciarTopList();
  }
}
function revealAnswers() {
  futbolListA[currentListIndex].answers.forEach(a => {
    if (!foundAnswers.includes(a)) addFound(a,false);
  });
  document.getElementById("flista-input").disabled = true;
}

// Exponer a tu HTML
window.iniciarTopList = iniciarTopList;
window.previousDay   = previousDay;
window.nextDay       = nextDay;
window.revealAnswers = revealAnswers;








