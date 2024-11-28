// Seleciona elementos do DOM que serão utilizados
const botoesDashboard = document.querySelectorAll(".dashboard-link");
const conteudoDashboard = document.getElementById("dashboardContent");
const detalhesMes = document.getElementById("monthDetails");

class Contas {
  constructor(descricao, tipo = 0, tipoV = 0, vencimento, preco, desconto) {
    this.descricao = descricao
    this.tipo = tipo
    this.tipoVencimento = tipoV
    this.vencimento = vencimento
    this.preco = preco
    this.desconto = desconto
  }

  validarDados() {

    for (const i in this) {

      if (this[i] == undefined || this[i] == '' || this[i] == null) {
        this.criarmodal(false)
        return false
      }
    }
    this.criarmodal(true)
    return true
  }

  criarmodal(x) {
    if (x) {

      document.getElementById('registraDespesaLabel').innerText = 'Sucesso Gravação'
      document.getElementById('modalText').innerText = 'Gravação foi realizada com sucesso!'
      document.getElementsByClassName('modal-header')[0].className = 'modal-header text-success'
      document.getElementById('modal-btn').innerText = 'Voltar'
      document.getElementById('modal-btn').className = 'btn btn-success'

    } else {

      document.getElementById('registraDespesaLabel').innerText = 'Erro na gravação'
      document.getElementById('modalText').innerText = 'Existem campos obrigatorios que não foram preenchidos'
      document.getElementsByClassName('modal-header')[0].className = 'modal-header text-danger'
      document.getElementById('modal-btn').innerText = 'Voltar e corrigir'
      document.getElementById('modal-btn').className = 'btn btn-danger'

    }
  }

}

class Bd {
  constructor() {
    let id = localStorage.getItem('id')

    if (id === null) {
      localStorage.setItem('id', 0)
    }
  }

  getProximoId() {
    let proximoId = localStorage.getItem('id')
    return parseInt(proximoId) + 1
  }

  splitMes(x, data) {
    if (x) {
      const partesData = data.split("-")
      return `${partesData[2]}/${partesData[1]}/${partesData[0]}`
    } else{
      const partesData = data.split("-")
      return partesData
    }
  }

  gravar(d) {
    const dataAtual = this.dataAtual()
    
    console.log(d);
    

    if (d.vencimento > dataAtual) {

      const vencimento = new Date(d.vencimento)
      let vencimentoLogica = new Date(d.vencimento)
      vencimentoLogica = vencimentoLogica.setMonth(vencimentoLogica.getMonth() + 1)

      
      const dataAtual = this.dataAtual()
      let dataIteracao = new Date(dataAtual)

      
      while (vencimentoLogica >= dataIteracao ) {

        let id = this.getProximoId()
        let ano = dataIteracao.getFullYear();
        let mes = (dataIteracao.getMonth() + 1).toString().padStart(2, '0')

        const partesData = this.splitMes(false, d.vencimento)

        d.vencimento = `${ano}-${mes}-${partesData[2]}`

        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id', id)

        dataIteracao.setMonth(dataIteracao.getMonth() + 1)
      }

    } else {
      let id = this.getProximoId()
      localStorage.setItem(id, JSON.stringify(d))
      localStorage.setItem('id', id)
    }
  }

  recuperarTodosRegistros() {
    let contas = Array()
    let id = localStorage.getItem('id')
    for (let i = 1; i <= id; i++) {

      let conta = JSON.parse(localStorage.getItem(i))

      if (conta === null) {
        continue
      }

      conta.id = i
      contas.push(conta)
    }
    return contas
  }

  pesquisar(conta) {
    let contasFiltradas = []
    contasFiltradas = this.recuperarTodosRegistros()

    if (conta.ano != '') {
      contasFiltradas = contasFiltradas.filter(d => d.ano == conta.ano)
    }

    if (conta.mes != '') {
      contasFiltradas = contasFiltradas.filter(d => d.mes == conta.mes)
    }
    if (conta.dia != '') {
      contasFiltradas = contasFiltradas.filter(d => d.dia == conta.dia)
    }
    if (conta.tipo != '') {
      contasFiltradas = contasFiltradas.filter(d => d.tipo == conta.tipo)
    }
    if (conta.descricao != '') {
      contasFiltradas = contasFiltradas.filter(d => d.descricao == conta.descricao)
    }
    if (conta.valor != '') {
      contasFiltradas = contasFiltradas.filter(d => d.valor == conta.valor)
    }

    return contasFiltradas
  }

  dataAtual() {
    const diaAtual = new Date().getDate().toString().padStart(2, '0')
    const mesAtual = (new Date().getMonth() + 1).toString().padStart(2, '0')
    const anoAtual = new Date().getFullYear()

    let dataAtual = `${anoAtual}-${mesAtual}-${diaAtual}`
    return dataAtual
  }

  remover(id) {
    localStorage.removeItem(id)
    montarDados.montarContas("editar")
  }

}

let bd = new Bd()

function verificarVencimento() {
  let tipoVencimento = document.getElementById("tipoVencimento");
  let vencimento = document.getElementById("vencimento");

  if (tipoVencimento.value == 1) {
    vencimento.removeAttribute('disabled')
  } else {
    vencimento.setAttributeNode(document.createAttribute('disabled'))
    vencimento.value = ''
  }
}

function cadastrarConta() {

  let descricao = document.getElementById("descricao");
  let tipoConta = document.getElementById("tipoConta");
  let tipoVencimento = document.getElementById("tipoVencimento");
  let vencimento = document.getElementById("vencimento");
  vencimento.value = vencimento.value === '' ? vencimento.value = bd.dataAtual() : vencimento.value
  let preco = document.getElementById("preco");
  let desconto = document.getElementById("desconto");

  let conta = new Contas(
    descricao.value,
    tipoConta.value,
    tipoVencimento.value,
    vencimento.value,
    preco.value,
    desconto.value,
  )

  let limparRegistros = (descricao, tipo, tipoV, vencimento, preco, desconto) => {
    descricao.value = ''
    tipo.value = ''
    tipoV.value = ''
    vencimento.value = ''
    preco.value = ''
    desconto.value = ''
  }

  if (conta.validarDados()) {
    bd.gravar(conta)
    $('#modalRegistraDespesa').modal('show')
    limparRegistros(descricao, tipoConta, tipoVencimento, vencimento, preco, desconto)
  } else {
    $('#modalRegistraDespesa').modal('show')
  }

}

function atualizar(){
  window.location.reload()
}

class MontarDados {
  constructor(opcaoSelecionada) {
    this.opcaoSelecionada = opcaoSelecionada
    this.contas = bd.recuperarTodosRegistros()
    this.tipoConta = (x) => {
      switch (x.tipo) {
        case '0': return ''
        case '1': return 'Alimentação'
        case '2': return 'Cartões'
        case '3': return 'lazer'
        case '4': return 'Saúde'
        case '5': return 'Transporte'
        case '6': return 'Casa'
      }
    }
  }



  montarContas = (x) => {

    if (x === "contas") {
      const tabela = `
              <h4>Contas Cadastradas</h4>
              <br>
              <table class="table table-hover">
                  <thead>
                      <tr>
                          <th scope="col">Descricao</th>
                          <th scope="col">Tipo</th>
                          <th scope="col">Vencimento</th>
                          <th scope="col">Total</th>
                      </tr>
                  </thead>
                  <tbody>
                      ${this.contas.map((conta) => `
                          <tr">
                              <td>${conta.descricao}</td>
                              <td>${this.tipoConta(conta)}</td>
                              <td>${bd.splitMes(true,conta.vencimento)}</td>
                              <td>${(conta.preco - conta.desconto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                          </tr>
                      `).join("")}
                  </tbody>
              </table>
              <div class="row justify-content-end">
                <span class="btn btn-primary" onclick="atualizar()"><i class="fa-solid fa-arrows-rotate"></i></span>
              </div>
          `;
      detalhesMes.innerHTML = tabela;
    } else if (x === 'adicionar') {
      conteudoDashboard.innerHTML = `
            <h4>Adicionar Conta</h4>
            <br>
            <form id="addForm" >
              <div class="form-row">
                <div class="form-group col-md-5">
                  <label for="descricao">Descrição</label>
                  <input id="descricao" type="text" class="form-control" id="descricao">
                </div>
                <div class="form-group col-md-3">
                  <label for="tipoConta">Tipo de Conta:</label>
                  <select id="tipoConta" class="form-control name="tipoConta">
                    <option value="0">Tipo</option>
                    <option value="1">Alimentação</option>
                    <option value="2">Cartões</option>
                    <option value="3">Lazer</option>
                    <option value="4">Saúde</option>
                    <option value="5">Transporte</option>
                    <option value="6">Casa</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="tipoVencimento">É mensalmente:</label>
                  <select id="tipoVencimento" onclick="verificarVencimento()" class="form-control name="tipoVencimento">
                    <option value="0">não</option>
                    <option value="1">Sim</option>
                  </select>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-3" >
                  <label for="vencimento">Ultimo Pagamento:</label>
                  <input type="date" id="vencimento" class="form-control" value="" disabled name="vencimento">
                </div>
                <div class="form-group col-md-3">
                  <label for="preco">Preço:</label>
                  <input type="number" id="preco" class="form-control name="preco">
                </div>
                <div class="form-group col-md-3">
                  <label for="desconto">Desconto:</label>
                  <input type="number" id="desconto" class="form-control name="desconto">
                </div>
              </div>
              <div class="form-group">
                <button id="addBtn" class="btn btn-primary" onclick="cadastrarConta()" type="button">Adicionar</button>
              </div>
            </form>
        `
    } else if (x === 'excluir') {
      const tabela = `
      <h4>Escolha as contas a exlcuir!</h4>
      <br>
      <div id="contasMes">
      <table class="table table-hover">
        <thead>
          <tr>
              <th scope="col"></th>
              <th scope="col">Descrição</th>
              <th scope="col">Vencimento</th>
          </tr>
        </thead>
        <tbody>
          ${this.contas.map((conta) => `
          <label>
            <tr>
              <td><input type="checkbox" id="conta_${conta.id}" class="checkbox-conta" value="${conta.id}"></td>
              <td>${conta.descricao}</td>
              <td>${bd.splitMes(true,conta.vencimento)}</td>
            </tr>  
          </label>
            `).join("")}
        </tbody>
      </table>
      </div>
      <button id="excluirBtn" disabled>Excluir Selecionados</button>
      <div class="container text-md-right">
        <div class="row justify-content-end">
          <div class="col-md-1">
            <span class="btn btn-primary" onclick="atualizar()"><i class="fa-solid fa-arrows-rotate"></i></span>
          </div>
          <div class="col-md-2">
            <button id="excAll">Excluir Todos</button>
          </div>
        </div>
      </div>
  `;

      detalhesMes.innerHTML = tabela;

      // Define checkboxes e contasSelecionadas no escopo global ou fora do bloco if/else
      const checkboxes = document.querySelectorAll(".checkbox-conta");
      const excluirBtn = document.getElementById("excluirBtn");
      const contasSelecionadas = []; // Array para armazenar os valores dos checkboxes selecionados

      // Adiciona um event listener aos checkboxes
      checkboxes.forEach((cb) => {
        cb.addEventListener("change", function () {
          const checkboxSelecionados = document.querySelectorAll(
            ".checkbox-conta:checked"
          );

          if (checkboxSelecionados.length > 0) {
            excluirBtn.disabled = false;
          } else {
            excluirBtn.disabled = true;
          }

          // Limpa e re-popula o array contasSelecionadas
          contasSelecionadas.length = 0; // Limpa o array

          checkboxSelecionados.forEach((cb) => {
            contasSelecionadas.push(cb.value);
          });
        });
      });

      // Adiciona um event listener ao botão "Excluir Selecionados"
      document
        .getElementById("excluirBtn")
        .addEventListener("click", function () {
          if (confirm(`Tem certeza que deseja excluir ${contasSelecionadas.length === 1 ? "esta conta" : "estas contas"}?`)) {
            contasSelecionadas.forEach(element => {
              bd.remover(element);
            });
          }
        });
      document.getElementById("excAll").addEventListener("click", function () {
        if (confirm(`Dejesa excluir todos os dados?`)) {
          localStorage.clear();
        }
      });
    } else if (x === 'editar') {
      const tabela = `
      <h4>Editar contas</h4>
      <br>
      <table class="table">
          <thead>
            <tr>
              <th scope="col">Descricao</th>
              <th scope="col">Tipo</th>
              <th scope="col">Vencimento</th>
              <th scope="col">Total</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
              ${this.contas.map((conta) => `
                <tr>
                    <td>${conta.descricao}</td>
                    <td>${this.tipoConta(conta)}</td>
                    <td>${bd.splitMes(true,conta.vencimento)}</td>
                    <td>${(conta.preco - conta.desconto).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                    <td><button class="editar-btn btn btn-success" data-id="${conta.id}"><i class="fa-solid fa-pen-to-square"></i></button></td>
                </tr>
              `).join("")}
          </tbody>
      </table>
      <div class="row justify-content-end">
        <span class="btn btn-primary" onclick="atualizar()"><i class="fa-solid fa-arrows-rotate"></i></span>
      </div>
  `;
      detalhesMes.innerHTML = tabela;

      // Adiciona event listeners aos botões de edição
      const editarBtns = document.querySelectorAll(".editar-btn");
      editarBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const contas = bd.recuperarTodosRegistros()
          const contaId = parseInt(this.getAttribute("data-id"))
          contas.forEach(conta => {
            const contaSelecionada = () => {
              if (conta.id === contaId) {
                mostrarDivEdicao(conta);
              }
            }
            contaSelecionada()

          });
        });
      });
    }
  }
}

let montarDados = new MontarDados()

botoesDashboard.forEach((btn) => {
  btn.addEventListener("click", function () {
    limparConteudoDashboard()
    const opcaoSelecionada = this.getAttribute("data-option")
    montarDados.montarContas(opcaoSelecionada)
  });
});

function mostrarDivEdicao(conta) {
  const divEdicaoExistente = document.querySelector(".edicao-conta");

  if (divEdicaoExistente) {
    divEdicaoExistente.remove();
    return;
  }

  const divEdicao = document.createElement("div")
  divEdicao.classList.add("edicao-conta")

  // Cria um formulário para edição
  const formEdicao = document.createElement("form")
  formEdicao.innerHTML = `
      <div class="form-row">
      <div class="form-group col-md-6">
        <label for="descricaoEdit">Descrição:</label>
        <input type="text" id="descricaoEdit" class="form-control" name="descricaoEdit" value="${conta.descricao}">
      </div>
        <div class="form-group col-md-3">
          <label for="descontoEdit">Desconto:</label>
          <input type="number" id="descontoEdit" class="form-control" name="descontoEdit" value="${conta.desconto}">
        </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="precoEdit">Preço:</label>
            <input type="number" id="precoEdit" class="form-control" name="precoEdit" value="${conta.preco}">
          </div>
          <div class="form-group col-md-6">
            <label for="vencEdit">Vencimento:</label>
            <input type="date" id="vencEdit" class="form-control" name="vencEdit" value="${conta.vencimento}">
          </div>
        </div>
        <button type="button" id="salvarEdicaoBtn" class="btn btn-primary">Salvar</button>
        <button type="button" id="cancelarEdicaoBtn" class="btn btn-danger">Cancelar</button>
      </div>
    `

  divEdicao.appendChild(formEdicao);

  conteudoDashboard.appendChild(divEdicao);

  const salvarEdicaoBtn = document.getElementById("salvarEdicaoBtn");
  const cancelarEdicaoBtn = document.getElementById("cancelarEdicaoBtn");

  salvarEdicaoBtn.addEventListener("click", function () {

    let descricao = document.getElementById("descricaoEdit");
    let vencimento = document.getElementById("vencEdit");
    vencimento.value = vencimento.value === '' ? vencimento.value = bd.dataAtual() : vencimento.value
    let desconto = document.getElementById("descontoEdit");
    let preco = document.getElementById("precoEdit");

    let contaEdit = new Contas(
      descricao.value,
      tipoConta = conta.tipo,
      tipov = conta.tipoVencimento,
      vencimento.value,
      preco.value,
      desconto.value,
    )

    contaEdit.descricao = descricao.value
    contaEdit.tipoConta = tipoConta
    contaEdit.tipoVencimento = tipov
    contaEdit.vencimento = vencimento.value
    contaEdit.preco = preco.value
    contaEdit.desconto = desconto.value

    bd.remover(conta.id)
    bd.gravar(contaEdit)
  });

  cancelarEdicaoBtn.addEventListener("click", function () {
    divEdicao.remove();
  })
}

//limpar dashboard 
function limparConteudoDashboard() {
  conteudoDashboard.innerHTML = "";
  detalhesMes.innerHTML = "";
}


// this.descricao = descricao
//     this.tipo = tipo
//     this.tipoVencimento = tipoV
//     this.vencimento = vencimento
//     this.preco = preco
//     this.desconto = desconto
// function pesquisarContas() {
//   let descricao = document.getElementById('descricao').value
//   let tipo = document.getElementById('tipoConta').value
//   let tipoVencimento = document.getElementById('tipoVencimento').value
//   let vencimento = document.getElementById('vencimento').value
//   vencimento.value = vencimento.value === '' ? vencimento.value = bd.dataAtual() : vencimento.value
//   let preco = document.getElementById('preco').value
//   let desconto = document.getElementById('desconto').value

//   let conta = new Contas(descricao, tipo, tipoVencimento, vencimento, preco, desconto)

//   let contas = bd.pesquisar(conta)

//   carregaListaDepesas(contas, true)

// }