const messages = [
    "T'es sûre ?",
    "Vraiment sûre ??",
    "Genre... sûre sûre ?",
    "Allez s'il te plaît",
    "Réfléchis bien quand même !",
    "Si tu dis non, je vais être trop triste...",
    "Je vais être très triste...",
    "Très très très triste... 😢",
    "Ok d'accord, j'arrête de demander...",
    "Je rigole, dis oui stp ! ❤️"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');

    noButton.textContent = messages[messageIndex];
    messageIndex++;

    // Tous les textes sont passés : plus moyen de dire non
    if (messageIndex >= messages.length) {
        noButton.disabled = true;
    }

    // Le bouton Oui grossit à chaque "Non"
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;

    // Et le bouton Non rétrécit un peu
    const noSize = parseFloat(window.getComputedStyle(noButton).fontSize);
    noButton.style.fontSize = `${Math.max(noSize * 0.9, 11)}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}
