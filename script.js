const inputProduto = document.querySelector('.inputProduto');
const inputQuantidade = document.querySelector('.inputQuantidade');
const inputPesquisar = document.querySelector('.inputPesquisar')
const btnAdd = document.querySelector('.btnAdd');
const tabela = document.querySelector('.tabela');
const btnListar = document.querySelector('.listar');
const btnRemover = document.querySelector('.remover');
const btnAtualizar = document.querySelector('.atualizar');
const btnPesquisar = document.querySelector('.btnPesquisar')

var produtos = [];

if (localStorage.getItem('produtos')) {
  produtos = JSON.parse(localStorage.getItem('produtos'));
}

mostrarTabela();

function criarProduto(Nome, Quantidade){
  produtos.push({
    "Produto" : Nome,
    "Quantidade" : Number(Quantidade)
  });
  mostrarTabela();
  salvar();
}

function salvar(){
  localStorage.produtos = JSON.stringify(produtos);
}

function removerAcento(nome){
  nome.replace(/[áàãâ]/, 'a')
  nome.replace(/[éèê]/, 'e')
  nome.replace(/[íìî]/, 'i')
  nome.replace(/[ôõòó]/, 'o')
  nome.replace(/[ûúù]/, 'u')
}

function pesquisarIndex(nome){
  for(let index in produtos){
    if(removerAcento(produtos[index].Produto.toLowerCase()) == removerAcento(nome.toLowerCase())){
      return index;
    }
  }
}

function pesquisarTabela(nome){
  tabela.innerHTML = "";
  for(let index in produtos){
    if(produtos[index].Produto == nome){
      tabela.innerHTML += '<tr><th scope="row">'+(Number(index)+1)+'</th><td>'+produtos[index].Produto+'</td><td>'+produtos[index].Quantidade;
    }
  }
};

function verificaArray(nome){
  for(let index in produtos){
    if(produtos[index].Produto.toLowerCase() == nome.toLowerCase().trim()){
      return true;
    }
  }
  return false;
};

function limpaInput(){
  inputProduto.value = '';
  inputProduto.focus();
  inputQuantidade.value = '';
  inputPesquisar.value = '';
}

function mostrarTabela(){
  limpaInput();
  tabela.innerHTML="";
  for(let index in produtos){
    tabela.innerHTML += '<tr><th scope="row">'+(Number(index)+1)+'</th><td>'+produtos[index].Produto+'</td><td>'+produtos[index].Quantidade;
  }
}

function atualizarEstoque(nome){
  if(verificaArray(nome)){
    let index = pesquisarIndex(nome)
    let operacao = Number(prompt('Qual operção deseja realizar:\n 1-Entrada\n 2-Saida'));
    let quant;
    switch (operacao){
      case 1:
        quant = parseInt(prompt('Qual a quantidade?'));
        if(!isNaN(quant)){
          produtos[index].Quantidade += quant;
        }else{
          alert('Quantidade Invalida!')
          alert('Operação cancelada!');
        }
        mostrarTabela();
        break;

      case 2:
        quant = parseInt(prompt('Qual a quantidade?'));
        if(!isNaN(quant)){
          if(produtos[index].Quantidade > quant){
            produtos[index].Quantidade -= quant;
          }else{
            alert('Quantidade de saida maior que estoque!')
            alert('Operação cancelada!');
          } 
        }else{
          alert('Quantidade Invalida!')
          alert('Operação cancelada!');
        }
        mostrarTabela();
        break;

      default:
        alert('Operação invalida');
        alert('Operação cancelada!');
        break;
    }
  }else{
    alert('Produto invalido!');
    alert('Operação cancelada!');
  }
  salvar();
};

function removerProduto(nome){
  let confirmacao = confirm(`Deseja realmenta APAGAR o produto: "${nome}" ?`)
  if(confirmacao == true){
    produtos.splice(pesquisarIndex(nome), 1);
  }else{
    alert('Operação cancelada!')
  }

  
}

btnAdd.addEventListener('click', (event) => {
  if(inputProduto.value !== '' || undefined && inputQuantidade.value !== '' || undefined){
    if(!verificaArray(inputProduto.value)){
      criarProduto(inputProduto.value, inputQuantidade.value);
    }
  }
});

btnPesquisar.addEventListener('click', (event) => {
  pesquisarTabela(inputPesquisar.value);
});

btnListar.addEventListener('click', (event) => {
  mostrarTabela();
});

btnRemover.addEventListener('click', (event) => {
  removerProduto(prompt('Qual produto voce deseja remover?'));
  mostrarTabela();
  salvar();
});

btnAtualizar.addEventListener('click', (event) => {
  atualizarEstoque(prompt('Qual produto deseja atulizar o estoque?'));
});

inputQuantidade.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    if(inputProduto.value !== '' || undefined && inputQuantidade.value !== '' || undefined){
      if(!verificaArray(inputProduto.value)){
        criarProduto(inputProduto.value, inputQuantidade.value);
      }
    }
  }
})
