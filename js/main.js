$(document).ready(function(){
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
        var textReceived = 'Ok!';
        var newReceived = $('.template-received .chat-text').clone();
        newReceived.find('p').text(textReceived);
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

    $("#send").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".fa-paper-plane").click();
        }
    });
});
