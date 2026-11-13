
/* =================================
   SKYRIM BUILD RANDOMIZER
   VERSION 1.1
================================= */


/* =================================
   DATA: RAZAS E IMÁGENES
================================= */

const races = [
    {
        name: "Altmer",
        description: "Alto Elfo",
        imagePrefix: "altmer"
    },
    {
        name: "Argoniano",
        description: "Habitante de Ciénaga Negra",
        imagePrefix: "argonian"
    },
    {
        name: "Bosmer",
        description: "Elfo del Bosque",
        imagePrefix: "woodelf"
    },
    {
        name: "Bretón",
        description: "Habitante de Roca Alta",
        imagePrefix: "breton"
    },
    {
        name: "Dunmer",
        description: "Elfo Oscuro",
        imagePrefix: "darkelf"
    },
    {
        name: "Imperial",
        description: "Habitante de Cyrodiil",
        imagePrefix: "imperial"
    },
    {
        name: "Khajiit",
        description: "Habitante de Elsweyr",
        imagePrefix: "khajiit"
    },
    {
        name: "Nórdico",
        description: "Habitante de Skyrim",
        imagePrefix: "nord"
    },
    {
        name: "Orco",
        description: "Habitante de Orsinium",
        imagePrefix: "orc"
    },
    {
        name: "Guardia Rojo",
        description: "Habitante de Páramo del Martillo",
        imagePrefix: "redguard"
    }
];


/* =================================
   DATA: SEXO
================================= */

const genders = [
    {
        name: "Masculino",
        description: "Personaje masculino",
        value: "male",
        icon: "♂"
    },
    {
        name: "Femenino",
        description: "Personaje femenino",
        value: "female",
        icon: "♀"
    }
];


/* =================================
   CURRENT CHARACTER
================================= */

let selectedRace = null;
let selectedGender = null;


/* =================================
   UPDATE CHARACTER IMAGE
================================= */

function updateCharacterImage() {

    const image = document.getElementById("race-image");
    const placeholder = document.getElementById("race-placeholder");

    // Necesitamos raza y sexo para mostrar el retrato

    if (!selectedRace || !selectedGender) {

        image.classList.remove("visible");
        placeholder.style.display = "block";
        placeholder.textContent = "?";

        return;
    }

    // Construimos el nombre de archivo correspondiente

    const imagePath = `images/${selectedRace.imagePrefix}_${selectedGender.value}.jpg`;

    image.classList.remove("visible");
    placeholder.style.display = "block";
    placeholder.textContent = "...";

    // Cargamos la imagen

    image.onload = () => {

        image.classList.add("visible");
        placeholder.style.display = "none";

    };

    image.onerror = () => {

        image.classList.remove("visible");
        placeholder.style.display = "block";
        placeholder.textContent = "?";

        console.error("No se ha encontrado la imagen:", imagePath);

    };

    image.src = imagePath;
    image.alt = `${selectedRace.name} ${selectedGender.name}`;

}


/* =================================
   RANDOMIZER: CHARACTER (RACE + GENDER)
================================= */

function randomizeCharacter() {
    selectedRace = races[Math.floor(Math.random() * races.length)];
    selectedGender = genders[Math.floor(Math.random() * genders.length)];

    document.getElementById("race-name").textContent = selectedRace.name;
    document.getElementById("race-description").textContent = selectedRace.description;

    const genderSymbol = document.getElementById("gender-symbol");
    genderSymbol.textContent = selectedGender.icon;
    genderSymbol.classList.toggle("female", selectedGender.value === "female");
    genderSymbol.classList.toggle("male", selectedGender.value === "male");
    genderSymbol.setAttribute(
        "aria-label",
        selectedGender.name
    );

    updateCharacterImage();
}


/* =================================
   RANDOMIZER: FULL BUILD
================================= */


function generateFullBuild() {

    randomizeCharacter();
    randomizeTraits();
    randomizeOriginStory();

}



/* =================================
   BUTTONS
================================= */

document.getElementById("race-button")
    .addEventListener("click", randomizeCharacter);

document.getElementById("generate-all")
    .addEventListener("click", generateFullBuild);

/* =================================
   DATA: CHARACTER TRAITS
   106 RASGOS DISPONIBLES
================================= */

const traits = [

["Akaviri Roots", "Linaje akaviri",
"Las armas y armaduras akaviri son un 25 % más potentes. Todas las demás armas y armaduras son un 25 % menos potentes."],

["Alchemical Focus", "Enfoque alquímico",
"Todas las pociones que creas son un 15 % más potentes, pero solo puedes tener hasta 4 efectos de poción activos al mismo tiempo."],

["Arcane Warrior", "Guerrero arcano",
"Tus hechizos de Armas vinculadas infligen un 25 % más de daño y cuestan un 25 % menos de magia. Los demás hechizos cuestan un 25 % más."],

["Aspiring Bard", "Bardo en ciernes",
"Tus habilidades de bardo son un 25 % más potentes, pero infliges un 25 % menos de daño con armas y hechizos."],

["Avid Defender", "Defensor incansable",
"Bloqueas un 30 % del daño mágico y físico al defenderte con un escudo. Tus ataques y hechizos infligen un 15 % menos de daño."],

["Back to Basics", "Volver a lo básico",
"Las armas y armaduras de hierro, madera y piel son un 25 % más potentes. Las demás son un 25 % menos potentes."],

["Backstabber", "Puñalada por la espalda",
"Infliges un 15 % más de daño mientras estás agachado, pero un 15 % menos mientras estás de pie. Los comerciantes te ofrecen precios un 25 % peores."],

["Bare Barbarian", "Bárbaro desnudo",
"Estar desnudo aumenta tu Salud, Magia y Aguante en 100 puntos. Cada pieza de armadura o ropa reduce esta bonificación en 30 puntos."],

["Beast Hunter", "Cazador de bestias",
"Infliges un 25 % más de daño a animales, insectos, trols y gigantes, pero un 25 % menos a todos los demás."],

["Blood Mage", "Mago de sangre",
"Infliges un 25 % más de daño con hechizos de Absorción de salud, pero un 25 % menos con los demás tipos de hechizos."],

["Bone Carver", "Tallador de huesos",
"Las armas y armaduras fabricadas con hueso son un 25 % más potentes. Las demás son un 25 % menos potentes."],

["Bookworm", "Ratón de biblioteca",
"Tu Magia aumenta en 50 puntos, pero correr reduce tu Aguante en 2 puntos por segundo."],

["Bullseye", "En el blanco",
"Los arcos y las ballestas infligen un 15 % más de daño, pero tardan un 30 % más en tensarse."],

["Bulwark", "Baluarte",
"Cuando permaneces inmóvil, tu índice de armadura aumenta en 100 puntos. Correr consume 2 puntos de Aguante por segundo."],

["Cave-Dweller", "Habitante de cuevas",
"Tu Aguante y Magia aumentan en 25 puntos mientras estás en interiores, pero se reducen en 25 puntos cuando estás en el exterior."],

["Child of the Forest", "Hijo del bosque",
"Los spriggans no te atacarán, pero eres un 25 % más vulnerable al fuego."],

["Close Combat", "Combate cuerpo a cuerpo",
"Infliges un 15 % más de daño con armas cuerpo a cuerpo, pero un 15 % menos con magia y otras armas."],

["Combat Monk", "Monje de combate",
"Infliges un 25 % más de daño con bastones de combate, pero un 25 % menos con magia y otras armas."],

["Corpse Looter", "Saqueador de cadáveres",
"Encuentras más oro en los bolsillos de los enemigos derrotados, pero los comerciantes te ofrecen precios un 25 % peores."],

["Craftsman", "Artesano",
"Tus habilidades de Herrería, Encantamiento y Alquimia progresan un 25 % más rápido, pero todas las demás habilidades progresan un 25 % más despacio."],

["Critical Strike", "Golpe crítico",
"Tus ataques tienen un 15 % más de probabilidades de ser críticos, pero infliges un 15 % menos de daño con armas y magia."],

["Crowd Control", "Control de masas",
"Recibes un 25 % menos de daño cuando luchas contra 3 enemigos o más, pero recibes un 25 % más cuando te enfrentas a menos enemigos."],

["Cultist", "Cultista",
"Mientras estás bajo los efectos de una bendición de cultista, obtienes un 10 % de resistencia mágica. Tus hechizos de Restauración son un 25 % más débiles."],

["Cutthroat", "Degollador",
"Infliges un 25 % más de daño con dagas, pero un 25 % menos con magia y otras armas."],

["Daedric Influence", "Influencia daédrica",
"Los artefactos, armas y armaduras daédricas son un 25 % más potentes. Todas las demás armas y armaduras son un 25 % menos potentes."],

["Dark Oath", "Juramento oscuro",
"Puedes levantar cadáveres de mayor nivel. Tus hechizos de Nigromancia cuestan un 25 % menos de Magia y duran un 25 % más. Los demás hechizos son un 25 % más débiles."],

["Dragon Ward", "Protección contra dragones",
"Tu resistencia al fuego, hielo y electricidad aumenta un 30 % al enfrentarte a un dragón, pero es un 15 % menor en cualquier otra situación."],

["Dragonslayer", "Matadragones",
"Infliges un 25 % más de daño a los dragones, pero un 25 % menos a todos los demás enemigos."],

["Duelist", "Duelista",
"Las espadas y los estoques se blanden un 15 % más rápido cuando tienes la mano izquierda vacía. En caso contrario, se blanden un 15 % más despacio."],

["Dwarven Craft", "Forja enana",
"Las armas y armaduras dwemer son un 25 % más potentes, pero todas las demás armas y armaduras son un 25 % menos potentes."],

["Dwemer Resercher", "Investigador dwemer",
"Los autómatas dwemer proporcionan más materiales y pueden ser saboteados. Tu capacidad de carga aumenta en 25 puntos, pero eres un 25 % más vulnerable a la electricidad."],

["Electromancer", "Electromante",
"Infliges un 25 % más de daño con hechizos de electricidad, pero los demás hechizos infligen un 25 % menos de daño."],

["Elven Supremacy", "Supremacía élfica",
"Las armas y armaduras élficas y de cristal son un 25 % más potentes. Todas las demás armas y armaduras son un 25 % menos potentes."],

["Faithless", "Sin fe",
"Tu resistencia mágica y tu resistencia al daño aumentan un 15 %, pero únicamente si no rezas para recibir la bendición de ningún Divino o Príncipe Daédrico."],

["Fast Learner", "Aprendiz rápido",
"La experiencia se acumula un 25 % más rápido y los entrenadores cuestan un 50 % menos. Sin embargo, pierdes un punto de ventaja cada 5 niveles."],

["Fast Shot", "Disparo rápido",
"Los arcos y las ballestas se tensan un 15 % más rápido, pero infligen un 30 % menos de daño."],

["Flayer", "Desollador",
"Infliges un 25 % más de daño con látigos, pero un 25 % menos con magia y otras armas."],

["Former Forsworn", "Antiguo renegado",
"Cuando vistes como un Renegado, infliges un 15 % más de daño y tus hechizos son un 15 % más potentes. Los comerciantes te ofrecen precios un 25 % peores."],

["Free Strider", "Caminante libre",
"Te mueves un 10 % más rápido cuando vas descalzo y un 10 % más despacio cuando llevas calzado. Los comerciantes te ofrecen precios un 25 % peores."],

["Frenzied Fury", "Furia frenética",
"Cuando tu Salud está por debajo del 25 %, infliges y recibes un 25 % más de daño y tus hechizos son un 25 % más potentes."],

["Friend of Beasts", "Amigo de las bestias",
"Los animales salvajes que domesticas obtienen 100 puntos adicionales de Salud y Aguante. Los comerciantes te ofrecen precios un 15 % peores."],

["Frost Mage", "Mago de hielo",
"Infliges un 25 % más de daño con hechizos de hielo, pero los demás hechizos infligen un 25 % menos de daño."],

["Gentle Thief", "Ladrón discreto",
"Agacharte para moverte sigilosamente ya no consume Aguante, pero infliges un 75 % menos de daño con armas y magia mientras estás en sigilo."],

["Gourmet", "Gourmet",
"Los beneficios de la comida son un 50 % más potentes, pero los efectos de las pociones son un 50 % más débiles."],

["Green Pact Follower", "Seguidor del Pacto Verde",
"Puedes obtener carne de tus enemigos, pero no puedes recoger plantas ni cortar madera. Los comerciantes bosmer te ofrecen precios un 25 % mejores; los demás hacen lo contrario."],

["Hasty Retreat", "Retirada apresurada",
"Cuando tu Salud está por debajo del 25 %, infliges un 25 % menos de daño, pero te mueves un 15 % más rápido."],

["Healer", "Sanador",
"Tus hechizos de curación son un 25 % más potentes, pero todos los demás hechizos son un 25 % más débiles."],

["Herbalist", "Herbolario",
"Consumir ingredientes crudos proporciona efectos 5 veces más potentes, pero las pociones son un 50 % más débiles."],

["Illusionist", "Ilusionista",
"Tus hechizos de Ilusión son un 25 % más potentes y duran un 25 % más, pero todos los demás hechizos son un 25 % más débiles."],

["Impaler", "Empalador",
"Infliges un 25 % más de daño con lanzas y alabardas, pero un 25 % menos con magia y otras armas."],

["Imperial Loyalist", "Leal imperial",
"Cuando llevas una coraza imperial, tu resistencia mágica aumenta un 15 %, pero tus ataques de poder infligen un 15 % menos de daño."],

["Injured Knee", "Rodilla herida",
"Las flechas te infligen un 75 % menos de daño, pero esprintar consume todo tu Aguante."],

["Kinslayer", "Asesino de congéneres",
"Infliges un 25 % más de daño a humanos, mer y hombres bestia, pero un 25 % menos a todos los demás."],

["Known Criminal", "Criminal conocido",
"Los comerciantes te ofrecen precios un 25 % mejores cuando tu recompensa supera las 1000 monedas de oro, pero un 25 % peores en caso contrario. Los peristas siempre te ofrecen precios un 25 % mejores."],

["Left Handed", "Zurdo",
"Los ataques realizados con la mano izquierda son un 25 % más potentes. Equipar un arma en la mano derecha hace que tus ataques físicos sean un 25 % más débiles."],

["Lichdom Seeker", "Buscador de la lichdom",
"Tu Salud se reduce en 50 puntos. Convertirte en un liche aumenta tu Magia en 150 puntos."],

["Lone Wolf", "Lobo solitario",
"Cuando viajas solo, infliges un 25 % más de daño y tu capacidad de carga aumenta en 50 puntos. Lo contrario se aplica cuando no viajas solo."],

["Loud Brute", "Bruto temible",
"Infliges un 25 % más de daño con ataques de poder, pero no puedes utilizar el sigilo."],

["Market Dweller", "Habitual del mercado",
"Todos los precios de los comerciantes son un 25 % más favorables, pero tus habilidades de Herrería, Alquimia y Encantamiento progresan un 25 % más despacio."],

["Marksman", "Tirador",
"Infliges un 15 % más de daño con arcos y ballestas, pero un 15 % menos con magia y otras armas."],

["Mudcrab Curse", "Maldición del cangrejo del barro",
"Tu índice de armadura aumenta permanentemente en 50 puntos. Los cangrejos del barro te matarán de un solo golpe."],

["Mudtrotter", "Caminante del barro",
"Mientras estás cubierto de barro, obtienes un 75 % de resistencia al veneno y las enfermedades, pero te mueves un 10 % más despacio."],

["Natural Conduit", "Conducto natural",
"El clima potencia o debilita tus hechizos elementales un 15 %. Utiliza electricidad cuando llueve, hielo cuando nieva y fuego cuando hace sol."],

["Old Wound", "Herida antigua",
"Infliges un 10 % más de daño con ataques de poder, pero recibes 5 puntos de daño a la Salud por segundo mientras realizas estos ataques."],

["One-Eyed", "Tuerto",
"Pierdes parte de tu visión. Tus ataques tienen un 10 % más de probabilidades de ser críticos, pero infliges un 10 % menos de daño con armas a distancia y magia."],

["Pacifist", "Pacifista",
"Tu Aguante y Magia aumentan en 75 puntos fuera de combate, pero se reducen en 25 puntos durante el combate."],

["Pack Mule", "Mula de carga",
"Tu capacidad de carga aumenta en 75 puntos, pero los comerciantes te ofrecen precios un 25 % peores."],

["Pilgrim", "Peregrino",
"Todos los hechizos de Restauración cuestan un 25 % menos mientras llevas un amuleto de los Divinos. Equipar armas, armaduras o artefactos daédricos te hará daño."],

["Plague Weaver", "Tejedor de plagas",
"Infliges un 25 % más de daño con hechizos de veneno, pero todos los demás hechizos infligen un 25 % menos de daño."],

["Poisoner", "Envenenador",
"Tus venenos son un 25 % más potentes y duran el doble de impactos, pero infliges un 25 % menos de daño con ataques físicos."],

["Proud Heritage", "Orgullosa herencia",
"Las armas y armaduras nórdicas talladas son un 25 % más potentes. Todas las demás armas y armaduras son un 25 % menos potentes."],

["Pugilist", "Pugilista",
"Tus ataques sin armas infligen 10 puntos de daño adicionales, pero recibes un 10 % más de daño de todas las fuentes."],

["Pyromancer", "Piromante",
"Infliges un 25 % más de daño con hechizos de fuego, pero los demás hechizos infligen un 25 % menos de daño."],

["Raised by Orcs", "Criado por orcos",
"Las armas y armaduras de oricalco son un 25 % más potentes. Todas las demás armas y armaduras son un 25 % menos potentes."],

["Ranged Summoner", "Invocador a distancia",
"Los hechizos de Conjuración y las runas pueden lanzarse al doble de distancia, pero todos los hechizos cuestan un 25 % más de Magia."],

["Reveler", "Juerguista",
"Cuando estás ebrio, infliges y resistes un 25 % más de daño físico. Cuando estás sobrio, infliges y resistes un 10 % menos de daño."],

["Rune Warden", "Guardián de runas",
"Las runas infligen un 25 % más de daño, pero cuestan un 25 % más de Magia."],

["Sacred Oath", "Juramento sagrado",
"Infliges un 25 % más de daño a los no muertos, daedra y hombres lobo, pero un 25 % menos a todos los demás."],

["Scout", "Explorador",
"Tu Aguante y Magia aumentan en 25 puntos mientras estás al aire libre, pero se reducen en 25 puntos cuando estás en interiores."],

["Shield Brawler", "Luchador con escudo",
"Bloqueas un 30 % más de daño con escudos si no llevas un arma en la mano derecha. En caso contrario, bloqueas un 15 % menos de daño."],

["Short-Sighted", "Corto de vista",
"No puedes ver bien a distancia sin gafas. Tus ataques tienen un 30 % menos de probabilidades de ser críticos, pero infliges un 15 % más de daño con armas y hechizos."],

["Skooma Addict", "Adicto al skooma",
"Mientras estás bajo los efectos del skooma, resistes un 25 % del daño físico y te mueves un 15 % más rápido. Cuando estás sobrio, te mueves un 15 % más despacio y resistes un 25 % menos de daño."],

["Sly Merchant", "Comerciante astuto",
"Los precios de compra y venta son un 30 % más favorables, pero infliges un 15 % menos de daño con armas y magia."],

["Sorcerer", "Hechicero",
"Los bastones y pergaminos son un 25 % más potentes y sus efectos duran un 25 % más, pero los demás hechizos y armas son un 25 % más débiles."],

["Stormcloak Rebel", "Rebelde de los Capas de la Tormenta",
"Cuando llevas una coraza de los Capas de la Tormenta, tus ataques de poder infligen un 15 % más de daño, pero tu resistencia mágica disminuye un 15 %."],

["Street Beggar", "Mendigo callejero",
"Eres un 25 % mejor forzando cerraduras y robando bolsillos, pero los precios de los comerciantes son un 25 % peores. Mientras llevas ropa, resistes un 10 % del daño físico."],

["Swift Thu'um", "Thu'um veloz",
"Puedes utilizar tus gritos un 25 % más a menudo, pero su eficacia se reduce un 25 %."],

["Tadpole", "Renacuajo",
"Nadas un 50 % más rápido y regeneras 5 puntos de Salud, Aguante y Magia por segundo. En tierra te mueves un 10 % más despacio."],

["Thalmor Agent", "Agente del Dominio",
"Infliges un 25 % más de daño a humanos, khajiitas, argonianos y orcos, pero un 25 % menos a los elfos. Los comerciantes te ofrecen precios un 25 % peores."],

["Thaumaturgist", "Taumaturgo",
"Los encantamientos son un 10 % más potentes y consumen un 10 % menos de carga, pero tu resistencia mágica disminuye un 25 %."],

["Theoretical Mage", "Mago teórico",
"Cuando lanzas hechizos fuera de combate, son un 25 % más potentes y duran un 25 % más. Lanzar hechizos durante el combate los hace un 25 % más débiles."],

["Thick-Skulled", "Cabeza dura",
"Infliges y resistes un 15 % más de daño al utilizar armas a dos manos. Tienes dificultades para leer libros y utilizar magia."],

["Tradition Keeper", "Guardián de la tradición",
"Tu experiencia se acumula un 25 % más despacio, pero infliges un 10 % más de daño con hechizos y armas."],

["Underachiever", "Poco aplicado",
"Los hechizos de nivel Principiante y Aprendiz cuestan un 25 % menos de Magia. Todos los demás cuestan un 25 % más."],

["Unshaken", "Imperturbable",
"Regeneras 2 puntos de Aguante y Magia por segundo mientras estás bajo los efectos de Estrés Crítico o Severo."],

["Unstable Portal", "Portal inestable",
"Tus hechizos de Conjuración cuestan un 25 % menos, pero tienes un 15 % de probabilidades de invocar a un dremora hostil cada vez que lanzas uno."],

["Untamed Spirit", "Espíritu indómito",
"Infliges un 25 % más de daño físico cuando estás en forma de bestia, pero un 25 % menos de daño físico en cualquier otra forma."],

["Veilwalker", "Caminante del velo",
"Tienes un 25 % menos de resistencia mágica. Cuando tu Salud está por debajo del 25 %, tu Magia se recupera más rápido y tienes un 10 % de probabilidades de absorber hechizos."],

["Ward Protector", "Protector de barreras",
"Tus hechizos de barrera cuestan un 30 % menos de Magia, pero todos los demás hechizos cuestan un 15 % más."],

["Way of the Voice", "Camino de la Voz",
"Tus gritos hostiles son un 25 % menos potentes, pero utilizar gritos no hostiles tiene un 10 % de probabilidades de reiniciar el tiempo de recarga de tus gritos."],


/* =================================
   NUEVOS RASGOS
================================= */

["Dual-wielder", "Doble empuñadura",
"Empuñar armas de una mano en ambas manos aumenta tu daño un 15 %, pero también recibes un 15 % más de daño físico."],

["Equestrian Knight", "Caballero ecuestre",
"Infliges un 30 % más de daño físico mientras estás montado a caballo, pero un 15 % menos cuando vas a pie."],

["Landbound", "Ligado a tierra",
"Te mueves un 90 % más despacio mientras nadas, pero un 10 % más rápido en tierra firme."],

["Light-bearer", "Portador de luz",
"Infliges un 15 % más de daño con armas y magia mientras llevas una antorcha, pero un 15 % menos cuando no la llevas."],

["Oblivion Bound", "Vinculado a Oblivion",
"Tu Magia y Aguante aumentan en 75 puntos mientras estás en los planos de Oblivion, pero se reducen en 25 puntos fuera de ellos."],

["Shield Mage", "Mago con escudo",
"Bloqueas un 30 % más de daño con el escudo cuando empuñas magia en la mano derecha. En caso contrario, bloqueas un 15 % menos de daño."]

];


/* =================================
   RANDOMIZER: TRAITS
================================= */

function randomizeTraits() {

    // Copiamos la lista para no modificar la original
    const availableTraits = [...traits];

    const selectedTraits = [];

    // Seleccionar exactamente tres rasgos sin repetir
    for (let i = 0; i < 3; i++) {

        const randomIndex = Math.floor(
            Math.random() * availableTraits.length
        );

        selectedTraits.push(
            availableTraits.splice(randomIndex, 1)[0]
        );

    }

    const traitsGrid = document.getElementById("traits-grid");

    traitsGrid.innerHTML = "";

    selectedTraits.forEach((trait, index) => {

        const card = document.createElement("article");

        card.className = "trait-card";

        const number = String(index + 1).padStart(2, "0");

        card.innerHTML = `
            <span class="trait-number">${number}</span>

            <h4>${trait[1]}</h4>

            <span class="trait-original">${trait[0]}</span>

            <p>${trait[2]}</p>
        `;

        traitsGrid.appendChild(card);

    });

}


/* =================================
   TRAITS BUTTON
================================= */

document.getElementById("traits-button")
    .addEventListener("click", randomizeTraits);

/* =================================
   DATA: ORIGIN STORIES
   40 HISTORIAS DE ORIGEN
================================= */

const originStories = [

{
    name: "Dark Trail",
    translation: "Rastro oscuro",
    description: `La última carta de tu buena amiga Elara indica que estaba explorando una cueva llena de setas luminosas. Desde entonces no has vuelto a tener noticias de ella y temes que le haya ocurrido algo terrible.

Debes encontrar la cueva y descubrir qué le sucedió.`,
    image: "images/DarkTrail.jpeg"
},

{
    name: "The Best of Intentions",
    translation: "Las mejores intenciones",
    description: `Tu amigo Aurelian siempre ha sido un optimista. En su última carta te contó que había decidido convencer a un grupo de magos renegados para que abandonaran su aquelarre y confesaran sus actividades.

Desde entonces no ha vuelto a escribirte. Pretendes encontrar al grupo de magos y descubrir qué le ha ocurrido a tu amigo.`,
    image: "images/TheBestOfIntentions.jpeg"
},

{
    name: "The Last Vigil",
    translation: "La última vigilia",
    description: `Cassian Volker, un Vigilante de Stendarr y amigo de confianza, te envió una carta detallando su investigación sobre la actividad vampírica en la región. No has vuelto a saber nada de él.

Pretendes encontrar el refugio de los vampiros y averiguar qué ha sido de tu amigo.`,
    image: "images/TheLastVigil.jpeg"
},

{
    name: "Beneath the Brass",
    translation: "Bajo el bronce",
    description: `Los dwemer siempre te han fascinado. Llevas muchos años buscando los escritos de Dumarac, un célebre ingeniero dwemer.

Tus investigaciones apuntan a que pudo haber vivido en Skyrim. Pretendes explorar las ruinas de la región hasta descubrir la obra de toda su vida.`,
    image: "images/BeneathTheBrass.jpeg"
},

{
    name: "Ash and Ancestry",
    translation: "Cenizas y linaje",
    description: `El amuleto de tu familia se perdió hace generaciones. Fue robado durante la época del Culto del Dragón y enterrado junto a uno de sus sirvientes.

Antiguos registros y leyendas señalan las ruinas nórdicas de la región. Pretendes explorar estos lugares ancestrales y recuperar aquello que fue arrebatado a tu linaje.`,
    image: "images/AshAndAncestry.jpeg"
},

{
    name: "The Final Promise",
    translation: "La última promesa",
    description: `Tu madre ha fallecido y, en sus últimos momentos, te habló de un colgante que había sido robado hacía mucho tiempo. El amuleto había pertenecido a tu familia durante generaciones y lamentaba no haber podido entregártelo.

Para aliviar su dolor, prometiste recuperarlo. Tu madre ya no está, pero la promesa que le hiciste sigue en pie. Las pistas conducen a un escondite de bandidos en algún lugar de Skyrim.`,
    image: "images/TheFinalPromise.jpeg"
},

{
    name: "Trader's Folly",
    translation: "La imprudencia del comerciante",
    description: `En un momento de debilidad, vendiste una reliquia familiar que había pasado de generación en generación. Lograste localizar al comerciante, pero el objeto ya había sido vendido a otro mercader en algún lugar de Skyrim.

Pretendes recorrer todos los mercados y tiendas hasta recuperar el Candelabro de Plata.`,
    image: "images/TradersFolly.jpeg"
},

{
    name: "Vampire Crusade",
    translation: "Cruzada vampírica",
    description: `Cuando eras pequeño, un vampiro asesinó a tu madre delante de tus ojos mientras tú te escondías aterrorizado. Eras solo un niño, pero la culpa todavía pesa sobre ti.

Has oído rumores sobre un vampiro que coincide con la descripción de aquel que viste en algún lugar de Skyrim. Esta vez no te esconderás. Pretendes encontrarlo y hacer que pague por lo que hizo.`,
    image: "images/VampireCrusade.jpeg"
},

{
    name: "Left for Dead",
    translation: "Abandonado a tu suerte",
    description: `Unos bandidos asesinaron a tus padres en el camino y te dejaron moribundo. Entre el dolor y la oscuridad, un nombre quedó grabado en tu memoria: Thorolf.

Has seguido su rastro hasta una de las comarcas de Skyrim, donde se esconde en un refugio de bandidos. Pretendes encontrarlo y hacerle pagar por lo que hizo.`,
    image: "images/LeftForDead.jpeg"
},

{
    name: "Blood of the Reach",
    translation: "Sangre de la Cuenca",
    description: `Los Renegados incendiaron tu hogar y masacraron a todos aquellos que no consiguieron escapar. Sobreviviste, pero nunca olvidaste al hombre que dirigió el ataque: Korrak.

Has descubierto dónde se esconde en la Cuenca. Pretendes encontrarlo y hacer justicia por todos aquellos a quienes asesinó.`,
    image: "images/BloodoftheReach.jpeg"
},

{
    name: "Hunter Becomes Hunted",
    translation: "El cazador se convierte en presa",
    description: `La Mano de Plata te acusó de ser una bestia e intentó matarte en el acto. Conseguiste escapar, pero nunca dejaron de perseguirte.

Se acabó huir. Pretendes encontrar al hombre responsable de organizar la persecución y ponerle fin de una vez por todas.`,
    image: "images/HunterBecomesHunted.jpeg"
},

{
    name: "The Last Lesson",
    translation: "La última lección",
    description: `La búsqueda de conocimiento de tu mentor lo ha llevado por el mal camino. Los rumores hablan de nigromancia y de pactos cuyo precio supera con creces cualquier recompensa.

Ya no sabes qué queda del hombre que conocías, pero depende de ti solucionar la situación. Pretendes encontrarlo y hacerle comprender sus errores. Si se niega, tendrá que enfrentarse a la justicia.`,
    image: "images/TheLastLesson.jpeg"
},

{
    name: "The Great Hunt",
    translation: "La gran cacería",
    description: `Las leyendas hablan de un dientes de sable más grande que cualquier otro que haya visto un cazador, más rápido que cualquier flecha y lo bastante letal como para acabar incluso con los más habilidosos.

Muchos lo han buscado y han fracasado, pero tú pretendes conseguirlo. Seguirás el rastro de la bestia, te enfrentarás a ella y la cazarás, tal como te enseñó tu padre.`,
    image: "images/TheGreatHunt.jpeg"
},

{
    name: "Marked by the Moon",
    translation: "Marcado por la luna",
    description: `Tu amigo Einar te ha confiado un terrible secreto: se ha convertido en hombre lobo y, con cada luna, la bestia que lleva dentro se vuelve más fuerte. Ya no tiene el control y teme lo que pueda llegar a hacer.

Quiere que pongas fin a su sufrimiento. Pretendes encontrar a tu amigo y cumplir su última voluntad.`,
    image: "images/MarkedByTheMoon.jpeg"
},

{
    name: "The Price of Power",
    translation: "El precio del poder",
    description: `Tu amiga Selvara siempre fue ambiciosa y decidida, pero nunca imaginaste que llegaría a entregarse por completo a su codicia de poder.

Has oído que ahora se ha convertido en una arpía de una crueldad extraordinaria y que se esconde entre los Renegados. Pretendes encontrarla y acabar con el monstruo en el que se ha convertido.`,
    image: "images/ThePriceOfPower.jpeg"
},

{
    name: "Ashes of the Dragon Cult",
    translation: "Cenizas del Culto del Dragón",
    description: `Hace generaciones, tus antepasados fueron esclavizados bajo el cruel dominio de un sacerdote dragón. Sus templos se construyeron con la sangre y el sufrimiento de tu familia.

Ahora circulan rumores sobre los muertos que vuelven a caminar y la posible reaparición del sacerdote. Pretendes encontrarlo y hacer justicia de una vez por todas.`,
    image: "images/AshesoftheDragonCult.jpeg"
},

{
    name: "No Questions Asked",
    translation: "Sin hacer preguntas",
    description: `Una figura misteriosa te pidió que asesinaras a un objetivo inocente. No te dio ninguna explicación, únicamente prometió pagarte con el oro que encontraras en el cadáver.

Te ordenó que no hicieras preguntas, que cumplieras el encargo y tomaras lo que te correspondía. Dudaste por un momento, pero finalmente aceptaste el contrato, sabiendo que ese es el camino que estás destinado a seguir.`,
    image: "images/NoQuestionsAsked.jpeg"
},

{
    name: "Blind Justice",
    translation: "Justicia ciega",
    description: `Un guardia ha abusado de la autoridad que le otorga su uniforme para obtener beneficios personales, intimidando a los demás y escapando constantemente de cualquier responsabilidad.

Al no encontrar otra forma de conseguir justicia, has decidido tomar cartas en el asunto. Pretendes encontrar al guardia y acabar con su vida.`,
    image: "images/BlindJustice.jpeg"
},

{
    name: "Blue Sapphire",
    translation: "Zafiro azul",
    description: `Tu padre fue ejecutado por un crimen que no cometió, acusado injustamente para encubrir las acciones de otra persona. Tu madre pasó su vida buscando respuestas y, finalmente, las encontró.

El verdadero responsable escapó de la justicia y huyó a Skyrim. Su única pista es un anillo engastado con un zafiro azul. No sabes en qué comarca puede encontrarse, pero pretendes localizar al anciano que lleva ese anillo y hacer justicia.`,
    image: "images/BlueSapphire.jpeg"
},

{
    name: "Knight on the Road",
    translation: "Caballero del camino",
    description: `Hace años, un hombre llamado Halmar te salvó la vida en el camino, pero murió por ello. Llevaba consigo un diario en el que mencionaba a una hija que vivía en Skyrim y lo importante que era para él.

No sabes quién es ni dónde encontrarla, pero pretendes dar con ella y entregarle el diario de su padre.`,
    image: "images/KnightOnTheRoad.jpeg"
},

{
    name: "Words Left Unspoken",
    translation: "Palabras que quedaron sin decir",
    description: `Un hombre sacrificó su vida para protegerte. En su diario escribió sobre un hijo al que había desheredado por convertirse en bardo en lugar de soldado. Tenía intención de recorrer todo Skyrim para pedirle perdón.

Ahora esa responsabilidad recae sobre ti. Pretendes hablar con todos los bardos hasta encontrar al hijo de aquel soldado.`,
    image: "images/WordsLeftUnspoken.jpeg"
},

{
    name: "Sight To See",
    translation: "Un lugar digno de contemplar",
    description: `Has oído hablar mucho del Santuario de Azura, situado en lo alto de las montañas cerca de Hibernalia. Todo el mundo asegura que es un lugar impresionante y quieres comprobarlo por ti mismo.

Ha llegado el momento de seguir la llamada de la aventura que despierta en tu interior. Y todo comienza en el Santuario de Azura.`,
    image: "images/SightToSee.jpeg"
},

{
    name: "Top of the World",
    translation: "En la cima del mundo",
    description: `Pretendes visitar la Garganta del Mundo y conocer el monasterio de los Barbas Grises. Deseas subir los siete mil escalones y alcanzar el punto más elevado de todo Tamriel.

No importa si los Barbas Grises te reciben o te rechazan. Lo verdaderamente importante es el viaje hasta la cima de la Garganta del Mundo.`,
    image: "images/TopOfTheWorld.jpeg"
},

{
    name: "Sightseeing",
    translation: "De ruta por Skyrim",
    description: `El camino te llama. Quieres recorrer todo Skyrim, visitar cada ciudad y conocer todas sus comarcas.

No te importa la guerra ni los conflictos civiles: hay historias que descubrir, misterios que presenciar y lugares que contemplar. La curiosidad te guiará mientras visitas todas las capitales de las comarcas.`,
    image: "images/Sightseeing.jpeg"
},

{
    name: "The Standing Stones",
    translation: "Las piedras guardianas",
    description: `Las Piedras Guardianas te llaman. Trece monumentos repartidos por Skyrim, cada uno con un antiguo poder y propósito. Has estudiado sus leyendas durante suficiente tiempo.

Pretendes encontrar todas estas piedras y contemplarlas con tus propios ojos. El viaje puede ser peligroso, pero sabes que es lo que estás destinado a hacer.`,
    image: "images/TheStandingStones.jpeg"
},

{
    name: "Golden Touch",
    translation: "El toque de oro",
    description: `Siempre has admirado a quienes poseen grandes riquezas. Mientras otros persiguen la gloria en el campo de batalla, tú buscas algo mucho más tangible: oro.

No descansarás hasta reunir 10.000 septims, una cantidad suficiente para alcanzar el verdadero control sobre tu propio destino.`,
    image: "images/GoldenTouch.jpeg"
},

{
    name: "A Place To Call Home",
    translation: "Un lugar al que llamar hogar",
    description: `Estás cansado de vagar sin rumbo. Las posadas y los campamentos estuvieron bien durante un tiempo, pero ahora quieres algo más que una cama para pasar la noche. Quieres un lugar que realmente te pertenezca.

Pretendes conseguir una vivienda de verdad, comprada honestamente, con paredes a las que regresar y una puerta que puedas cerrar tras de ti. Un lugar donde guardar tus pertenencias... Un lugar al que llamar hogar.`,
    image: "images/APlaceToCallHome.jpeg"
},

{
    name: "Duty and Honor",
    translation: "Deber y honor",
    description: `Siempre has admirado a los thanes: la forma en que su presencia inspira respeto, no mediante el miedo, sino gracias a la confianza que depositan en ellos los demás.

Ser juramentado de una comarca y convertirse en alguien en quien puedan confiar para protegerla es el propósito que anhelas. Deber, honor y responsabilidad. Pretendes ganarte ese reconocimiento convirtiéndote en thane de una de las comarcas.`,
    image: "images/DutyAndHonor.jpeg"
},

{
    name: "Chaos Incarnate",
    translation: "El caos encarnado",
    description: `Crees que las personas solo fingen ser civilizadas, pero que en el fondo todos siguen siendo animales dominados por el miedo y los instintos. Ya no estás dispuesto a fingir lo contrario.

Deseas desatar el caos en Skyrim hasta que todos pronuncien tu nombre con terror. Pretendes conseguir una recompensa enorme por tu cabeza y lograr que todos los guardias te persigan.`,
    image: "images/ChaosIncarnate.jpeg"
},

{
    name: "Raise Those Fists",
    translation: "¡Alza los puños!",
    description: `Nunca has sido capaz de rechazar una pelea de taberna. Para ti, los puños hablan con más claridad que las palabras, y dicen que Skyrim es una tierra donde la fuerza se demuestra de verdad, entre cerveza y moratones.

Si esta tierra realmente alberga a los luchadores más duros, pretendes encontrarlos y demostrarles, uno a uno, que mereces estar entre los mejores.`,
    image: "images/RaiseThoseFists.jpeg"
},

{
    name: "The Path of Love",
    translation: "El camino del amor",
    description: `Llevas el amuleto de Mara y sueñas con una vida llena de amor. Un matrimonio, un hogar, quizá hijos... Todo aquello que siempre has deseado.

Skyrim está lleno de posibilidades y mantienes tu corazón abierto, confiando en que el amor te está esperando. Pretendes encontrar a alguien de quien enamorarte y casarte en esta fría tierra.`,
    image: "images/ThePathofLove.jpeg"
},

{
    name: "The Path of the Warrior",
    translation: "El camino del guerrero",
    description: `Has decidido seguir los pasos de tu madre y convertirte en guerrero. Pretendes unirte a los Compañeros de Carrera Blanca, aprender sus costumbres y honrar su memoria.

Mientras conserves su anillo, sentirás que una parte de ella te acompaña. Te unirás a los guerreros más fieros de la tierra y ella estará orgullosa de la persona en la que te conviertas.`,
    image: "images/ThePathoftheWarrior.jpeg"
},

{
    name: "The Path of the Mage",
    translation: "El camino del mago",
    description: `Pretendes unirte al Colegio de Hibernalia para estudiar magia y honrar la memoria de tu padre. Mientras conserves su anillo, sentirás que una parte de él camina a tu lado.

Seguirás sus pasos uniéndote al Colegio y él estará orgulloso de la persona en la que te conviertas.`,
    image: "images/ThePathoftheMage.jpeg"
},

{
    name: "The Path of the Shadows",
    translation: "El camino de las sombras",
    description: `Un asesino de la Hermandad Oscura te entregó un anillo. Desde entonces has seguido cada rumor y susurro relacionado con la Hermandad. Ahora todas las pistas apuntan hacia Ventalia.

Sientes la llamada de las sombras y sabes que este es el camino que debes recorrer. Pretendes encontrar a la Hermandad Oscura y unirte a sus filas.`,
    image: "images/ThePathoftheShadows.jpeg"
},

{
    name: "The Path of the Thief",
    translation: "El camino del ladrón",
    description: `Nunca estuviste destinado a llevar una vida honrada. Robar te sale de forma natural y la emoción de hacerlo importa más que el dinero. Los pequeños encargos ya no son suficientes y ahora buscas algo más.

Has oído rumores sobre el Gremio de Ladrones de Riften y pretendes unirte a sus filas.`,
    image: "images/ThePathoftheThief.jpeg"
},

{
    name: "The Path of the Bard",
    translation: "El camino del bardo",
    description: `Tu abuela era una bardo. Antes de fallecer, te entregó su anillo y le prometiste que seguirías sus pasos.

Pretendes viajar a Soledad y unirte al Colegio de Bardos para honrar su memoria. Mientras conserves su anillo, sabrás que ella te guía durante el camino.`,
    image: "images/ThePathoftheBard.jpeg"
},

{
    name: "The Path of the Soldier",
    translation: "El camino del soldado",
    description: `El Dominio se hace cada vez más fuerte mientras Skyrim se desgarra por intereses egoístas. Tu padre murió durante la Gran Guerra protegiendo al Imperio y no permitirás que su sacrificio haya sido en vano.

Con su anillo en la mano, pretendes unirte a la Legión y luchar para mantener el Imperio en pie.`,
    image: "images/ThePathoftheSoldier.jpeg"
},

{
    name: "The Path of Freedom",
    translation: "El camino de la libertad",
    description: `Tu padre murió durante la Gran Guerra y lo único que conservas de él es su anillo. Ahora el Imperio se doblega ante el Dominio y permite que otros decidan a qué dioses pueden rezar sus ciudadanos.

Crees que Skyrim merece mantenerse independiente, igual que hizo Páramo del Martillo. Por eso, pretendes unirte a los Capas de la Tormenta y luchar por la libertad.`,
    image: "images/ThePathofFreedom.jpeg"
},

{
    name: "Chasing the Rush",
    translation: "Persiguiendo la emoción",
    description: `Vives por la caída. Por el silencio que precede al salto y la descarga de adrenalina que viene después. Skyrim está lleno de acantilados, puentes y salientes ocultos que parecen estar esperando a que alguien los ponga a prueba, y pretendes probarlos todos.

Encontrarás los mejores lugares desde los que saltar y lanzarte al vacío sin dudarlo.`,
    image: "images/ChasingTheRush.jpeg"
},

{
    name: "The Quiet Above",
    translation: "La calma de las alturas",
    description: `Siempre has encontrado paz en los lugares elevados. Skyrim es una tierra de imponentes montañas y sientes una profunda atracción por ellas, no por la gloria, sino por el silencio que ofrecen.

Pretendes escalar las montañas más altas de todo Skyrim y meditar en sus cumbres.`,
    image: "images/TheQuietAbove.jpeg"
}

];


/* =================================
   RANDOMIZER: ORIGIN STORY
================================= */

function randomizeOriginStory() {

    const randomIndex = Math.floor(
        Math.random() * originStories.length
    );

    const story = originStories[randomIndex];

    document.getElementById("origin-name").textContent =
        story.translation;

    document.getElementById("origin-original").textContent =
        story.name;

    document.getElementById("origin-description").textContent =
        story.description;

    const image = document.getElementById("origin-image");
    const placeholder = document.getElementById("origin-placeholder");

    if (image && placeholder) {
        image.classList.remove("visible");
        placeholder.style.display = "block";
        placeholder.textContent = "...";

        image.onload = () => {
            image.classList.add("visible");
            placeholder.style.display = "none";
        };

        image.onerror = () => {
            image.classList.remove("visible");
            placeholder.style.display = "block";
            placeholder.textContent = "?";
            console.error("No se ha encontrado la imagen:", story.image);
        };

        image.src = story.image;
        image.alt = story.name;
    }

}


/* =================================
   ORIGIN STORY BUTTON
================================= */

document.getElementById("origin-button")
    .addEventListener("click", randomizeOriginStory);


/* =================================
   BACK TO TOP
================================= */

const backToTopButton = document.getElementById("back-to-top");

window.addEventListener("scroll", () => {
    backToTopButton.classList.toggle("visible", window.scrollY > 350);
});

backToTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
