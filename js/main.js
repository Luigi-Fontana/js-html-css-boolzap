$(document).ready(function(){
    var listaRisposte = [
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

    $('.send-input').click(function(){
        $('.fa-microphone').removeClass('active');
        $('.fa-paper-plane').addClass('active');
    });

    $('.fa-paper-plane').click(function(){
        sendMessage();
        scrolled();
        $('.fa-microphone').addClass('active');
        $('.fa-paper-plane').removeClass('active');
        setTimeout(function(){
            receiveMessage();
            scrolled();
        }, 1000);
    });

    function sendMessage(){
        var textToSend = $('#send').val();
        $('#send').val('');
        var newSent = $('.template-sent .chat-text').clone();
        newSent.find('p').text(textToSend);
        newSent.find('small').text(getHour());
        $('.chat').append(newSent);
    };

    function receiveMessage(){
        var indiceRisposte = generaRandom(0, 24);
        var rispostaRandom = listaRisposte[indiceRisposte];
        var newReceived = $('.template-received .chat-text').clone();
        newReceived.find('p').text(rispostaRandom);
        newReceived.find('small').text(getHour());
        $('.chat').append(newReceived);
    };

    function getHour(){
        var currentDate = new Date();
        var dateTime = currentDate.getHours() + ":" + (currentDate.getMinutes() <10?'0':'') + currentDate.getMinutes();
        return dateTime;
    };

    function scrolled() {
        var scrollBot = document.getElementById('scrolled');
        scrollBot.scrollTop = scrollBot.scrollHeight;
    }

    function generaRandom(min, max) {
        var numeroRandom = Math.floor(Math.random() * (max - min + 1)) + min;
        return numeroRandom;
    }

    $("#send").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
        }
    });
});
