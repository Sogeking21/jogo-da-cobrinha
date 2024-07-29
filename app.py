import logging
from flask import Flask, render_template, request, session
import random

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'

# Configuração do logging
logging.basicConfig(filename='app.log', level=logging.DEBUG,
                    format='%(asctime)s %(levelname)s %(message)s')

def escolher_palavra():
    palavras = ["caminho", "carro", "porta", "janela", "livro", "cachorro", "gato", "sol", "lua", "estrela"]
    return random.choice(palavras)

def verificar_tentativa(palavra, tentativa):
    resultado = []
    max_len = min(len(palavra), len(tentativa))

    for i in range(max_len):
        if tentativa[i] == palavra[i]:
            resultado.append((tentativa[i], 'correct'))
        elif tentativa[i] in palavra:
            resultado.append((tentativa[i], 'incorrect'))
        else:
            resultado.append((tentativa[i], 'default'))

    if len(tentativa) < len(palavra):
        for _ in range(len(tentativa), len(palavra)):
            resultado.append(('_', 'default'))

    return resultado

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/cobrinha')
def cobrinha():
    return render_template('cobrinha.html')

@app.route('/adivinha_palavra', methods=['GET', 'POST'])
def adivinha_palavra():
    if request.method == 'POST':
        palavra = session.get('palavra', escolher_palavra())
        tentativas_restantes = session.get('tentativas_restantes', 5)
        tentativas = session.get('tentativas', [])
        vitoria = session.get('vitoria', False)

        tentativa = ''.join(request.form.getlist('tentativa')).strip()
        resultado = verificar_tentativa(palavra, tentativa)

        logging.debug(f"Tentativa: {tentativa}")
        logging.debug(f"Palavra: {palavra}")
        logging.debug(f"Resultado: {resultado}")
        logging.debug(f"Tentativas Restantes: {tentativas_restantes}")
        logging.debug(f"Tentativas: {tentativas}")
        logging.debug(f"Vitória: {vitoria}")

        if tentativa == palavra:
            vitoria = True
            mensagem = "Parabéns! Você acertou a palavra!"
            resultado = [(letra, 'correct') for letra in palavra]
        else:
            mensagem = None
            tentativas.append(resultado)
            tentativas_restantes -= 1

            if tentativas_restantes <= 0:
                if not vitoria:
                    mensagem = "Você esgotou todas as tentativas. A palavra era: " + palavra

        session['tentativas'] = tentativas
        session['tentativas_restantes'] = tentativas_restantes
        session['vitoria'] = vitoria

        return render_template('adivinha_palavra.html', palavra=palavra, tentativas=tentativas,
                               tentativas_restantes=tentativas_restantes, mensagem=mensagem, vitoria=vitoria)
    else:
        session['palavra'] = escolher_palavra()
        session['tentativas'] = []
        session['tentativas_restantes'] = 5
        session['vitoria'] = False

        logging.debug(f"Nova Palavra: {session['palavra']}")

        return render_template('adivinha_palavra.html', palavra=session['palavra'], tentativas=session['tentativas'],
                               tentativas_restantes=session['tentativas_restantes'], mensagem=None, vitoria=False)

if __name__ == '__main__':
    app.run(debug=True)


