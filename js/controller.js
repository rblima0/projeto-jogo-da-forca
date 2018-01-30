const criaController = jogo => {

    const $entrada = $('#entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = function () {
        $lacunas.empty();
        jogo.getLacunas().forEach(function (lacuna) {
            $('<li>').addClass('lacuna').text(lacuna).appendTo($lacunas);
        });
    };

    const mudaPlaceHolder = texto => $entrada.attr('placeholder', texto);

    const guardaPalavraSecreta = () => {
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('chute');
            exibeLacunas(); 
        } catch (error) {
            alert(error.message);
        }
    };

    const reinicia = () => {
        $lacunas.empty();
        mudaPlaceHolder('Palavra secreta');
        jogo.reinicia();
    };

    const leChute = () => {
        try {
            jogo.processaChute($entrada.val().trim().substr(0, 1));
            $entrada.val('');
            exibeLacunas();

            if (jogo.ganhouOuPerdeu()) {
                setTimeout(() => {
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

    const inicia = () => {

        $entrada.keypress(event => {
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
    return { inicia };
};