$(document).ready(function(){
    $('#search').keyup(function(event){ // Funzione ricerca
        var charFilter = $(this).val().toLowerCase(); // Assegno alla variabile il lower case del valore in input
        $('.friend-chat').each(function(){ // Faccio una ricerca su tutti i contenitori delle friend-chat
            var highlightText = $(this).find('h3').text().toLowerCase().includes(charFilter); // Assegno a una variabile il check successivo
            if (highlightText) { // se nell'h3 del contenitore è incluco il valore di input
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    var listaRisposte = [ // Array di risposte che verranno generate automaticamente in seguito
        'È soltanto nelle misteriose equazioni dell’amore che si può trovare ogni ragione logica. Io sono qui grazie a te. Tu sei la ragione per cui io esisto. Tu sei tutte le mie ragioni.',
        '"Amore” significa non dover mai dire “mi dispiace”.',
        'Alcune volte perdere il tuo equilibrio per amore è necessario per vivere una vita equilibrata.',
        'La gente spesso definisce impossibili cose che semplicemente non ha mai visto.',
        'Sono salito sulla cattedra per ricordare a me stesso che dobbiamo sempre guardare le cose da angolazioni diverse. E il mondo appare diverso da quassù. Non vi ho convinti? Venite a vedere voi stessi. Coraggio! È proprio quando credete di sapere qualcosa che dovete guardarla da un’altra prospettiva.',
        'Ogni minuto che passa è un’occasione per rivoluzionare tutto completamente.',
        'Non permettere mai a nessuno di dirti che non sai fare qualcosa. Se hai un sogno tu lo devi proteggere. Quando le persone non sanno fare qualcosa lo dicono a te che non la sai fare. Se vuoi qualcosa, vai e inseguila. Punto.',
        'Perché, senza l’amaro, amico mio, il dolce non è tanto dolce.',
        'Quando non sei in grado di combattere abbraccia il tuo nemico. Se ha le braccia intorno a te non può puntarti contro il fucile.',
        'Sono le scelte che facciamo… che dimostrano quel che siamo veramente, molto più delle nostre capacità.',
        'La vera follia è fare finta di essere felici, fare finta che il modo in cui ti vanno le cose sia il modo in cui devono andare per il resto della tua vita, tutti i desideri, le speranze, tutte le gioie, le emozioni e le passioni che la vita ti ha tolto sono lì davanti a te, puoi riprenderti tutto!',
        'Non scriviamo e leggiamo poesie perché è carino. Noi leggiamo e scriviamo poesie perché siamo membri della razza umana, e la razza umana è piena di passione. Medicina, legge, economia, ingegneria sono nobili professioni, necessarie al nostro sostentamento. Ma la poesia, la bellezza, il romanticismo, l’amore… sono queste le cose che ti tengono in vita.',
        'La vita è come una scatola di cioccolatini, non sai mai quello che ti capita!',
        'Andai nei boschi perché volevo vivere con saggezza e profondità… e succhiare tutto il midollo della vita, sbaragliare tutto ciò che non era vita e non scoprire in punto di morte che non ero vissuto.',
        'Prima o poi capirai, come ho fatto anch’io, che una cosa è conoscere il sentiero giusto, un’altra è imboccarlo.',
        'Ogni persona è un abisso, vengono le vertigini a guardarci dentro.',
        'Prima di cambiare il mondo, devi capire che ne fai parte anche tu: non puoi restare ai margini e guardare dentro.',
        'Non può piovere per sempre!',
        'L’amore più bello è quello che risveglia l’anima e che ci fa desiderare di arrivare più in alto, è quello che incendia il nostro cuore e che porta la pace nella nostra mente.',
        'Se vuoi qualcosa nella vita…datti da fare e prendila!',
        'Io ho bisogno di credere che qualcosa di straordinario sia possibile.',
        'Perché l’amore non è innamorarsi di un bel sedere o di un fisico perfetto. L’amore non è andare in giro e vantarsi perché si ha una ‘fidanzata perfetta’ o un ‘ragazzo sexy’. L’amore non è fermarsi alle apparenze. L’amore è andare oltre: l’amore è scavare nel profondo per trovare l’anima, guardare oltre ciò che siamo esteriormente, non fermarsi alla taglia del reggiseno, o dei jeans. L’amore è scovare quello che c’è dentro al nostro corpo, che è solamente l’involucro della nostra essenza.',
        'Esattamente questo quello che voglio, nessuna pietà… da dove viene, che cosa ha fatto… io me ne frego.',
        'Il cuore di una donna è un profondo oceano di segreti.',
        'Chi salva una vita , salva il mondo intero.'
    ];

    $('.fa-paper-plane').hide(); // Inizialmente nascondo l'icona di invio messaggio
    $(document).on('input', '#send', function () {
        if ($(this).val().trim().length !== 0) { // Se l'input di invio messaggio non è vuoto
            $('.fa-microphone').hide(); // Nascondo il microfono e mostro l'aeroplanino
            $('.fa-paper-plane').show();
        } else { // Altrimenti viceversa
            $('.fa-paper-plane').hide();
            $('.fa-microphone').show();
        }
    });

    $('.fa-paper-plane').click(function(){ // Se clicco sull'aeroplanino
        sendMessage();
    });

    $("#send").keypress(function(event) { // Se premo Invio (13) svolgo la funzione precedente assegnata al click dell'aeroplanino
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
        }
    });

    function sendMessage() { // Funzione per mandare un messaggio con risposta
        var textToSend = $('#send').val();
        if (textToSend.trim().length > 0) {
            $('#send').val('');
            createMessage(textToSend, 'sent');
            $('.fa-microphone').show(); // Dopo aver inviato il messaggio solito giochino tra microfono e aeroplanino
            $('.fa-paper-plane').hide();
            setTimeout(function() {
                var indiceRisposte = generaRandom(0, 24);
                var rispostaRandom = listaRisposte[indiceRisposte];
                createMessage(rispostaRandom, 'received');
                $('.last-seen').text(getHour());
            }, 1000);
        };
    };

    function createMessage(textMessage, sentOrReceived) { // Funzione per creare un messaggio generico
        var newMessage = $('.template .chat-text').clone();
        newMessage.find('p').text(textMessage);
        newMessage.find('small').text(getHour());
        newMessage.addClass(sentOrReceived);
        $('.chat').append(newMessage);
        scrolled();
        $('.last-message').text(cropMessage(textMessage));
    };

    function cropMessage(message) { // Funzione per tagliare un messaggio da input
        var showChar = 35;
        var points = "...";
            if(message.length > showChar) {
                var display = message.substr(0, showChar);
                var text = display + points;
            }
        return text;
    };

    function getHour(){ // Funzione per estrapolare l'ora attuale con minuti sempre a due cifre
        var currentDate = new Date();
        var dateTime = currentDate.getHours() + ":" + (currentDate.getMinutes() <10?'0':'') + currentDate.getMinutes();
        return dateTime;
    };

    function scrolled() { // Funzione di autoscrollamento in basso
        var pixelScroll = $('.chat').height();
        $('.chat').scrollTop(pixelScroll);
    }

    function generaRandom(min, max) { // Solita funzione random tra due numeri
        var numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        return numeroRandom;
    }
});
