var criaJogo = function(sprite) {

    var etapa = 1;
    var lacunas = [];
    var palavraSecreta = '';

    var ganhou = function () {
        return lacunas.length ? !lacunas.some(function(lacuna) {
            return lacuna == '';
        })
        : false;
    };

    var perdeu = function () {
        return sprite.isFinished();
    };

    var ganhouOuPerdeu = function () {
        return ganhou() || perdeu();
    };

    var reinicia = function () {
        var etapa = 1;
        var lacunas = [];
        var palavraSecreta = '';
        sprite.reset();
    };

    var processaChute = function(chute) {
        if(!chute.trim()) {
            throw Error('Chute inválido.');
        }
        var exp = new RegExp(chute, 'gi'), 
        resultado, 
        acertou = false;

        while (resultado = exp.exec(palavraSecreta)) {
            acertou = lacunas[resultado.index] = chute;
        }

        if(!acertou) {
            sprite.nextFrame();
        }
    };

    var criaLacunas = function() {
        for (let i = 0; i < palavraSecreta.length; i++) {
            lacunas.push('');
        }
    };

    var proximaEtapa = function() {
        etapa = 2;
    };

    var setPalavraSecreta = function(palavra) {
        if(!palavra.trim()) {
            throw Error('Palavra secreta inválida.');
        }
        palavraSecreta = palavra;
        criaLacunas();
        proximaEtapa();
    };

    var getLacunas = function() {
        return lacunas;
    };

    var getEtapa = function() {
        return etapa;
    };

    return {
        setPalavraSecreta, getLacunas, getEtapa, processaChute, ganhou, perdeu, ganhouOuPerdeu, reinicia
    }
}