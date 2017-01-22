$(function () {

    var socket = io();

    socket.on('time', function (msg) {
        // $('.timer-div').html(msg);
        // $('.timer-div').html(audio.currentTime);
    });

    var audio = document.getElementById('audio-id');

    

    socket.on('first', function (msg) {
        // $('#audio-id').attr('controls', "1"); 

        // $('.control-button').show();
        // $('.control-button').removeClass('hide');

        audio.ontimeupdate = function () {
            socket.emit("seek", audio.currentTime);
        // $('.timer-div').html(audio.currentTime);
        };

        $('#play-button').click(function() {
            console.log("Play Clicked");
            socket.emit("play", audio.currentTime);
            
        });

        $('#pause-button').click(function() {
            console.log("Pause Clicked");
            socket.emit("pause", audio.currentTime);
        });

        $('input[name=track]').attr('disabled', false);

        $('input[name=track]').click(function() {
             socket.emit("reset", $(this).val());
        });
    });

    socket.on("current", function (msg) {
        $('.timer-span').html(msg);
        var diff = audio.currentTime - msg;
        if (diff < 0 || diff > 1) {
            audio.currentTime = msg;
        }
    });

    socket.on("reset", function (msg) {
        console.log(msg);
        socket.emit("pause", 0.00);
        $('input[name=track]').attr('checked', false);        
        $('input[value='+ msg +']').attr('checked', true);

        var label = "";

        if (msg == 1) {
            label = "Cute";
            $('.audio-source').attr('src', 'music/cute.mp3')
        }
        else if (msg == 2) {
            label = "Acoustic Breeze";
            $('.audio-source').attr('src', 'music/acousticbreeze.mp3')
        }
        if (msg == 3) {
            label = "The Jazz Piano";
            $('.audio-source').attr('src', 'music/thejazzpiano.mp3')
        }

        $('.label').html(label);
        audio.load();
    });



    socket.on("play", function (msg) {
        audio.currentTime = msg;
        audio.play();
        $('#play-button').addClass('hide');
        $('#pause-button').removeClass('hide');
    });

    socket.on("pause", function(msg) {
        audio.currentTime = msg;
        audio.pause();
        $('#play-button').removeClass('hide');
        $('#pause-button').addClass('hide');
    })




});