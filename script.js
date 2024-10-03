let total = 0;

function adicionarValor() {
    const valorInput = document.getElementById('valor');
    const valor = parseFloat(valorInput.value);
    
    if (!isNaN(valor)) {
        total += valor;
        
        const historico = document.getElementById('historico');
        const novoItem = document.createElement('li');
        
        const dataHora = new Date();
        const dataFormatada = dataHora.toLocaleDateString('pt-BR');
        const horaFormatada = dataHora.toLocaleTimeString('pt-BR');
        
        novoItem.innerHTML = `R$: ${valor} - ${dataFormatada} - ${horaFormatada}   <button class="remove-btn" onclick="removerValor(this, ${valor})"><i class="fa-solid fa-trash"></i></button>`;
        historico.appendChild(novoItem);
        
        document.getElementById('total').textContent = total;
        valorInput.value = '';
    } else {
        alert('Por favor, insira um valor válido.');
    }
}

function removerValor(element, valor) {
    const item = element.parentElement;
    item.remove();
    total -= valor;
    document.getElementById('total').textContent = total;
}
