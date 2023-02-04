const cracker = document.getElementById("cracker"),
    leftCracker = document.getElementById("linkerCracker"),
    rightCracker = document.getElementById("rightCracker"),
    message = document.getElementById("weihnachten"),
    jokeWrap = document.getElementById("witzfeld"),
    joke = document.getElementById("joke"),
    punchline = document.getElementById("punchline"),
    jokes =[{Q: "Was wäre, wenn Weihnachten nicht vor über 2000 Jahren, sondern heute stattgefunden hätte?" ,A: "Säugling in Stall gefunden - Polizei und Jugendamt ermitteln. Schreiner aus Nazareth und unmündige Mutter vorläufig festgenommen."},
        {Q: "Vater: \"Fritzchen, zünde doch bitte den Christbaum an!\"" ,A: "Nach einer Weile fragt Fritzchen: \"Vati, die Kerzen auch?\""},
        {Q: "Fritzchen, warum hast du denn jetzt schon alle Türen vom Adventskalender aufgemacht?" ,A: "Stoßlüften, wegen Corona."},
        {Q: "Ach, Oma, die Trommel von dir war wirklich mein schönstes Weihnachtsgeschenk bisher." ,A: "\"Tatsächlich?\" freut sich Oma. \"Ja, Mami gibt mir seit Weihnachten jeden Tag einen Euro, wenn ich aufhöre zu spielen!\""},
        {Q: "Fragt die eine Gans eine andere: \"Glaubst du an ein Leben nach Weihnachten?\"" ,A: ""},
        {Q: "Treffen sich 2 Blondinen, sagt die eine: \"Dieses Jahr ist Weihnachten an einem Freitag!\" Sagt die andere: \"Hoffentlich nicht an einem 13ten!\"" ,A: ""},
        {Q: "Die Großmutter zur Enkelin: \"Du darfst Dir zu Weihnachten von mir ein schönes Buch wünschen!\"" ,A: "\"Fein, dann wünsche ich mir Dein Sparbuch.\""},
        {Q: "Was macht die Blondine mit zwei Kerzen vor sich vor dem Spiegel?" ,A: "Sie feiert den vierten Advent."},
        {Q: "Zwei Blondinen sind im Wald und suchen nach dem passenden Weihnachtsbaum." ,A: "Nach etwa zwei Stunden sagt die eine: \"Komm, nehmen wir doch einfach eine Tanne ohne Weihnachtskugeln.\""}],
    titles = ["Frohe Weihnachten",
        "Merry Christmas",
        "Vrolijk kerstfeest",
        "Joyeux Noël",
        "Buon Natale",
        "Frohe Weihnachten",
        "圣诞快乐",
        "क्रिसमस की बधाई",
        "Feliz Navidad"];

let clicks = 0,
    counter = Math.floor(Math.random() * 4),
    open = false;

cracker.addEventListener('click', () => {
    if(clicks < counter){
        clicks++;
    } else{
        if(!open) {
            open = true;
            let num = Math.floor(Math.random() * jokes.length),
                num2 = Math.floor(Math.random() * titles.length);

            joke.textContent = jokes[num].Q;
            punchline.textContent = jokes[num].A;
            message.textContent = titles[num2];

            leftCracker.style.animation = "left 1s forwards";
            rightCracker.style.animation = "right 1s forwards";
            message.style.animation = "title 1s forwards";
            jokeWrap.style.animation = "joke 2s forwards";
            cracker.style.transform = "scaleX(1)";
        } else {
            open = false;

            counter = Math.floor(Math.random() * 6);
            clicks = 0;

            joke.textContent = "";
            punchline.textContent = "";

            leftCracker.style.animation = "leftReset 0.1s forwards";
            rightCracker.style.animation = "rightReset 0.1s forwards";
            message.style.animation = "titleReset forwards";
            jokeWrap.style.animation = "jokeReset forwards";
            cracker.style.transform = "scaleX(1)";
        }
    }
});
