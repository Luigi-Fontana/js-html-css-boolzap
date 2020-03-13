$(document).ready(function(){
    $('#search').keyup(function(event){ // Funzione ricerca
        var charFilter = $(this).val().toLowerCase(); // Assegno alla variabile il lower case del valore in input
        $('.friend-chat').each(function(){ // Faccio una ricerca su tutti i contenitori delle friend-chat
            var highlightText = $(this).find('h3').text().toLowerCase().includes(charFilter); // Assegno a una variabile il check se l'input è incluso nell'h3 in questione
            if (highlightText) { // Check positivo
                $(this).show();
            } else { // Check negativo
                $(this).hide();
            }
        });
    });

    $('.notification-text p').click(function(){ // Funzione sul click del testo attiva/disattiva notifiche
        $('.notification-icon i').toggleClass('active'); // Mostra la campanella relativa
        $('.notification-text p').toggleClass('active'); // Mostra il testo relativo
    });

    $('.friend-chat').click(function(){ // Funzione sul click delle friend-chat
        $('.friend-chat').removeClass('active'); // Intanto togli a tutte la classe active (in CSS gli ho dato stile diverso)
        $(this).addClass('active'); // E aggiungi la classe solo a quello cliccato
        var thisAvatar = $(this).find('img').attr('src'); // Creo una variabile con il valore del src dell'immagine dell'avatar cliccato
        var thisName = $(this).find('h3').text(); // Variabile con il Nome dell'amico cliccato
        var thisHour = $(this).find('.last-seen').text(); // Variabile con l'ultimo accesso dell'amico cliccato
        $('.header-right-avatar img').attr('src', thisAvatar); // Assegno all'header-right i valori appena dichiarati così da avere in alto sempre i dati della chat premuta
        $('.header-right-text h3').text(thisName);
        $('.header-right-text .last-seen').text(thisHour);
        var friend = $(this).data('friend'); // Faccio una foto del valore del data della chat cliccata
        $('.chat').each(function(){ // Ciclo each su tutte le chat
            if (friend == $(this).data('friend')) { // Se il data corrisponde nascondo tutto e mostro solo quella
                $('.chat').removeClass('active');
                $(this).addClass('active');
            };
        });
    });

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

    $(document).on('click', '.chat-message i', function(){ // Se clicco sulla freccetta faccio il toggle del menù a tendina
        $('.chat-message i').not(this).siblings('.message-dropdown').slideUp(100);
        $(this).siblings('.message-dropdown').slideToggle(100);
    });

    $(document).on('click', '.message-dropdown .delete', function(){ // Se clicco su cancella Messaggio mi elimina quel messaggio
        $(this).parentsUntil('.chat').remove();
        var lastMessage = $('.chat.active').find('.chat-text:last-child .chat-message .message-text').text(); // Assegno a una variabile il testo dell'ultimo messaggio della chat attiva
        var cropLast = cropMessage(lastMessage); // Lo taglio
        $('.friend-chat.active').find('.last-message').text(cropLast); // Sostituisco questo valore al testo nella chat laterale attiva
        var lastSeen = $('.chat.active').find('.chat-text:last-child .chat-message small').text(); // Assegno a una variabile l'orario dell'ultimo messaggio della chat attiva
        $('.friend-chat.active').find('.last-seen').text(lastSeen); // Sostituisco questo valore all'orario nella chat laterale attiva
    });

    var source = $("#template-message").html(); // Clono il template message
    var sourceTwo = $("#template-chat").html(); // Clono il template chat
    var template = Handlebars.compile(source); // lo do in pasto a handlebars
    var templateTwo = Handlebars.compile(sourceTwo);

    var listaMessaggi = { // Oggetto contenente i messaggi che mostro al caricamento della pagina
        c0: [
            {
                text: 'Ciao Marcellino',
                hour: '16:58',
                direction: 'sent'
            },
            {
                text: 'Come stai?',
                hour: '16:59',
                direction: 'received'
            }
        ],
        c1: [
            {
                text: 'Ciao Cosima',
                hour: '16:31',
                direction: 'sent'
            },
            {
                text: 'Ciao Luigi',
                hour: '16:32',
                direction: 'received'
            }
        ],
        c2: [
            {
                text: 'Wela Gennarino',
                hour: '16:29',
                direction: 'sent'
            },
            {
                text: 'Bella bro',
                hour: '16:30',
                direction: 'received'
            }
        ],
        c3: [
            {
                text: 'Giadona bella',
                hour: '16:17',
                direction: 'sent'
            },
            {
                text: 'Che tenero! <3',
                hour: '16:18',
                direction: 'received'
            }
        ],
        c4: [
            {
                text: 'Devo darti una notiziona',
                hour: '15:48',
                direction: 'sent'
            },
            {
                text: 'Dimmi tutto',
                hour: '15:49',
                direction: 'received'
            }
        ],
        c5: [
            {
                text: 'Giochiamo stasera?',
                hour: '15:47',
                direction: 'sent'
            },
            {
                text: 'Stasera non posso',
                hour: '15:48',
                direction: 'received'
            }
        ],
        c6: [
            {
                text: 'Elisa Nazionale!',
                hour: '15:29',
                direction: 'sent'
            },
            {
                text: 'Non prendermi in giro :P',
                hour: '15:30',
                direction: 'received'
            }
        ],
        c7: [
            {
                text: 'Io posso passare?',
                hour: '14:59',
                direction: 'sent'
            },
            {
                text: 'TU. NON PUOI. PASSARE!',
                hour: '15:00',
                direction: 'received'
            }
        ],
        c8: [
            {
                text: 'Si può fare?',
                hour: '14:26',
                direction: 'sent'
            },
            {
                text: 'SI. PUÓ. FARE!',
                hour: '14:27',
                direction: 'received'
            }
        ],
        c9: [
            {
                text: 'My name is Melissa...',
                hour: '14:14',
                direction: 'sent'
            },
            {
                text: 'And I\'m sixteen.',
                hour: '14:15',
                direction: 'received'
            }
        ]
    };
    for (var key in listaMessaggi) { // Ciclo all'interno dell'oggetto
        var chatNumber = key[1]; // Assegno a una variabile la chiave attuale con cifra in posizione 1
        for (var i = 0; i < key.length; i++) { // Ciclo all'interno dell'array della chiave
            var object = listaMessaggi[key][i]; // Assegno a una variabile l'oggetto attuale
            var text = object.text; // Estrapolo i valori delle 3 chiavi
            var hour = object.hour;
            var direction = object.direction;
            var selector = $('.chat[data-friend="' + chatNumber + '"]'); // Assegno a una variabile la chat attuale ottenuta con la chiave attuale
            createMessage(text, hour, direction, selector); // Faccio la funziona Crea Messaggio con tutti questi valori
        }
    };

    var listaChat = [ // Array contente gli oggetti delle chat
        {
            source: 'img/avatar2.png',
            name: 'Marcellino',
            message: 'Come stai?',
            hour: '16:59'
        },
        {
            source: 'img/avatar3.png',
            name: 'Cosima',
            message: 'Ciao Luigi',
            hour: '16:32'
        },
        {
            source: 'img/avatar4.png',
            name: 'Gennarino',
            message: 'Bella bro',
            hour: '16:30'
        },
        {
            source: 'img/avatar5.png',
            name: 'Giadona',
            message: 'Che tenero! <3',
            hour: '16:18'
        },
        {
            source: 'img/avatar6.png',
            name: 'Lucone',
            message: 'Dimmi tutto',
            hour: '15:49'
        },
        {
            source: 'img/avatar7.png',
            name: 'Alfredino',
            message: 'Stasera non posso',
            hour: '15:48'
        },
        {
            source: 'img/avatar8.png',
            name: 'Elisa',
            message: 'Non prendermi in giro :P',
            hour: '15:30'
        },
        {
            source: 'img/avatar9.png',
            name: 'Gandalf',
            message: 'TU. NON PUOI. PASSARE!',
            hour: '15:00'
        },
        {
            source: 'img/avatar10.png',
            name: 'Albert',
            message: 'SI. PUÓ. FARE!',
            hour: '14:27'
        },
        {
            source: 'img/avatar11.png',
            name: 'Melissa',
            message: 'And I\'m sixteen.',
            hour: '14:15'
        }
    ];
    for (var i = 0; i < listaChat.length; i++) { // Ciclo su questo array
        var layout = listaChat[i]; // Faccio la foto dell'oggetto ciclato
        var selectChatTwo = $('.friend-chat[data-friend="' + i + '"]'); // Assegno a una variabile la chat attuale ottenuta con l'indice dell'array
        var htmlTwo = templateTwo(layout); // Popolo il template
        $(selectChatTwo).append(htmlTwo); // E lo appendo nella chat giusta
    }
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

    $('.fa-paper-plane').click(function(){ // Se clicco sull'aeroplanino (invio)
        sendMessage();
    });

    $("#send").keypress(function(event) { // Se premo Invio (13) svolgo la funzione precedente assegnata al click dell'aeroplanino
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
        }
    });

    function sendMessage() { // Funzione per mandare un messaggio con risposta
        var textToSend = $('#send').val(); // Foto del valore dell'input
        if (textToSend.trim().length > 0) { // Se non è vuoto vado avanti
            $('#send').val(''); // E intanto riazzero l'input
            createMessage(textToSend, getHour(), 'sent', '.chat.active'); // Funzione messaggio usando la variabile creata prima
            $('.friend-chat.active').find('.last-message').text(cropMessage(textToSend)); // Aggiorna con ultimo messaggio e accesso la finestra laterale della chat
            $('.friend-chat.active').find('.last-seen').text(getHour());
            $('.fa-microphone').show(); // Dopo aver inviato il messaggio solito giochino tra microfono e aeroplanino
            $('.fa-paper-plane').hide();
            setTimeout(function() { // Dopo 1 secondo risposta automatica
                var indiceRisposte = generaRandom(0, 24);
                var rispostaRandom = listaRisposte[indiceRisposte];
                createMessage(rispostaRandom, getHour(), 'received', '.chat.active'); // Risposta scelta random
                $('.friend-chat.active').find('.last-message').text(cropMessage(rispostaRandom));
                $('.friend-chat.active').find('.last-seen').text(getHour());
                $('.friend-chat.active').find('.last-seen').text(getHour()); // Aggiorno i vari "ultima visita" del sito
                $('.header-right-chat').find('.last-seen').text(getHour());
            }, 1000);
        };
    };

    function createMessage(textMessage, getHour, sentOrReceived, selectChat) { // Funzione per creare un messaggio generico
        var newMessage = { // Definisco un oggetto base
            message: textMessage,
            hour: getHour,
            class: sentOrReceived
        };
        var html = template(newMessage) // Popolo il template con il contenuto dell'oggetto
        $(selectChat).append(html); // Lo appendo alla chat attiva
        scrolled();
    };

    function cropMessage(message) { // Funzione per tagliare un messaggio da input
        var showChar = 35; // Numero di caratteri che voglio mostrare
        var points = "..."; // Puntini di sospensione
        var text = message;
            if (message.length > showChar) { // Se il messaggio è più lungo taglialo in base alla variabile showChar
                var display = message.substr(0, showChar);
                text = display + points;
            };
        return text;
    };

    function getHour(){ // Funzione per estrapolare l'ora attuale con minuti sempre a due cifre
        var currentDate = new Date();
        var dateTime = currentDate.getHours() + ":" + (currentDate.getMinutes() <10?'0':'') + currentDate.getMinutes(); // se getMinutes è minore di 10 aggiungi uno zero
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
