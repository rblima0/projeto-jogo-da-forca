var criaController = function (jogo) {

    var $entrada = $('#entrada');
    var $lacunas = $('.lacunas');

    var exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>').addClass('lacuna').text(lacuna).appendTo($lacunas);
        });
    };

    var mudaPlaceHolder = function (texto) {
        $entrada.attr('placeholder', texto);
    };

    var guardaPalavraSecreta = function () {
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chute');
            exibeLacunas(); 
        } catch (error) {
            alert(error.message);
        }
        
    };

    var reinicia = function () {
        $lacunas.empty();
        mudaPlaceHolder('Palavra secreta');
        jogo.reinicia();
    };

    var leChute = function () {
        try {
            jogo.processaChute($entrada.val().trim().substr(0, 1));
            $entrada.val('');
            exibeLacunas();

            if (jogo.ganhouOuPerdeu()) {
                setTimeout(function () {
                    if (jogo.ganhou()) {
                        alert('Você ganhou !!!');
                    } else if (jogo.perdeu()) {
                        alert('Você perdeu, tente novamente.');
                    }
                    jogo.reinicia();
                    reinicia();
                }, 200);
            }
        } catch (error) {
            alert(error.message);
        }
    };

    

    var inicia = function () {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    }
    return { inicia: inicia };
};