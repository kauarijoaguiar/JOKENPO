/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
const jokenpo = { // solução orientadad a objetos
    maoJogadorUm: null, // propriedade: chave/ valor
    maoJogadorDois: null,
    maos: {
        pedra: {
            vence: {
                tesoura: 'quebra',
                lagarto: 'esmaga'
            }
        },
        papel: {
            vence: {
                pedra: 'embrulha',
                spock: 'refuta'
            }
        },
        tesoura: {
            vence: {
                papel: 'corta',
                lagarto: 'decapita'
            }
        },
        lagarto: {
            vence: {
                papel: 'come',
                spock: 'envenena'
            }
        },
        spock: {
            vence: {
                tesoura: 'quebra',
                pedra: 'vaporiza'
            }
        }
    },
    jogar: function() { // método: prop c/ function
        if (this.maoJogadorUm === null) {
            // lançar exceção
            throw new Error('Jogador um não escolheu uma mão');
        }
        if (this.maoJogadorDois === null) {
            throw new Error('Jogador dois não escolheu uma mão');
        }
        // --------------------------------
        if (this.maoJogadorUm === this.maoJogadorDois) {
            return {
                vencedor: 0,
                texto: 'Empatou'
            };
        }
        const mao1 = this.maoJogadorUm;
        const mao2 = this.maoJogadorDois;
        if (jokenpo['maos'][mao1]['vence'][mao2]) {
            return {
                vencedor: 1,
                texto: `${mao1} ${jokenpo['maos'][mao1]['vence'][mao2]} ${mao2}`
            };
        } else {
            return {
                vencedor: 2,
                texto: `${mao2} ${jokenpo['maos'][mao2]['vence'][mao1]} ${mao1}`
            };
        }
    }
};

// logica para o humano selecionar uma mão
const botaoJogar= document.querySelector('button');
// console.log(botaoJogar);
const divHumano=document.querySelector('div#humano');
let maoSelecionada= null;
const selecionarMao= function(e) { // "e" de "event"
    console.log(e.target); // debug, warn, dir, table
    console.log(e.target.classList);
    if (e.target.classList.contains('mao')) {
        if (e.target=== maoSelecionada) {
            e.target.classList.remove('selecionada');
            maoSelecionada = null;
        } else {
            if (maoSelecionada!== null) {
                maoSelecionada.classList.remove('selecionada');
            }
            maoSelecionada = e.target;
            maoSelecionada.classList.add('selecionada');
        }
        if (maoSelecionada) {
            botaoJogar.removeAttribute('disabled');
        } else {
            botaoJogar.setAttribute('disabled', 'disabled');
        }
    }
};
divHumano.addEventListener('click', selecionarMao);
// botão jogar
// função anonima para evento // CALLBACK
botaoJogar.addEventListener('click', function(e) {
    document.querySelectorAll('div#computador img.mao').forEach((img) => img.classList.add('carregando'));

    jokenpo.maoJogadorUm=maoSelecionada.getAttribute('alt');
    console.dir(jokenpo);

    const maos=['pedra', 'papel', 'tesoura', 'lagarto', 'spock'];
    const indice=Math.floor(Math.random()*5);
    jokenpo.maoJogadorDois=maos[indice];

    setTimeout(function() {
        document.querySelectorAll('div#computador img.mao').forEach((img) => img.classList.remove('carregando'));

        document.querySelector(`div#computador img[alt=${jokenpo.maoJogadorDois}]`).classList.add('selecionada');

        const resp = jokenpo.jogar();
        document.querySelector('div#resultado').textContent = resp.texto;
    }, 3000);
});
// logica para o computador selecionar uma mão
// apresentar quem ganhou

