document.addEventListener("DOMContentLoaded", function () {
  // Seleciona elementos do DOM que serão utilizados
  const botoesDashboard = document.querySelectorAll(".dashboard-btn");
  const conteudoDashboard = document.getElementById("dashboardContent");
  const detalhesMes = document.getElementById("monthDetails");
  const closeMenu = document.getElementById("close-menu")
  const burguer = document.getElementById("burguer")

  // fechar menu
  function closeMen(x) {
    var windowWidth = window.innerWidth;
    var header = document.getElementById("header")
    var nav_header = document.getElementById("nav-header")
    var menu_dashboard = document.getElementById("menu-dashboard")
    if (windowWidth < 700) {
      if (x === true) {

        header.style = `z-index: 1;
                        position: absolute;
                        width: 100%;
                        height: 100vh;
                        flex-direction: column;
                        justify-content: center;
                        top: 0; `;
        closeMenu.style = `display: block`
        nav_header.style = `display: block`
        menu_dashboard.style = `flex-direction = column; display:flex;
                    `
      } else {

        header.style = `display: flex;
                        justify-content: space-between;
                        align-items: center;`
        closeMenu.style = `display: none`
        nav_header.style = `display: none
                    @media(width > 700px) {
                    .nav-header {
                    display: none;
                    }}
          `
        menu_dashboard.style = `display:block`

      }
    } else {
      header.style = `display: flex;
                        justify-content: space-between;
                        align-items: center;`
      closeMenu.style = `display: none`
      nav_header.style = `display: block`
      menu_dashboard.style = `display:block 
                    @media(width < 700px) {
                    .menu-dashboard {
                    display: none;
                    }}`
    }



  }

  burguer.addEventListener("click", function () {
    closeMen(true)
  })

  closeMenu.addEventListener("click", function () {
    closeMen(false)
  })

  const mesesNumericos = {
    Janeiro: 1,
    Fevereiro: 2,
    Março: 3,
    Abril: 4,
    Maio: 5,
    Junho: 6,
    Julho: 7,
    Agosto: 8,
    Setembro: 9,
    Outubro: 10,
    Novembro: 11,
    Dezembro: 12,
  };

  let todasContas = JSON.parse(localStorage.getItem("todasContas")) || [];

  //carrega conteudo da opção selecionada 
  function carregarConteudoDashboard(opcaoSelecionada) {
    botoesDashboard.forEach((btn) => {
      btn.addEventListener("click", function () {
        botoesDashboard.forEach((btn) => {
          btn.classList.remove("selecionado-das");
        });

        // Adiciona a classe 'selecionado-das' apenas ao botão clicado
        this.classList.add("selecionado-das");
      });
    });
    switch (opcaoSelecionada) {
      case "contas":
        todasContas.length === 0
          ? (conteudoDashboard.innerHTML = `<h3>Contas</h3><p>Não há contas cadastradas.</p>`)
          : carregarContas(opcaoSelecionada);
        break;
      case "adicionar":
        carregarFormularioAdicao();
        break;
      case "excluir":

        todasContas.length === 0
          ? (conteudoDashboard.innerHTML = `<h3>Contas</h3><p>Sem itens a excluir.</p>`)
          : carregarContas(opcaoSelecionada);
        break;
      case "editar":

        todasContas.length === 0
          ? (conteudoDashboard.innerHTML = `<h3>Contas</h3><p>Não há contas para editar.</p>`)
          : carregarContas(opcaoSelecionada);
        break;
      case "todos":
        todasContas.length === 0
          ? (conteudoDashboard.innerHTML = `<h3>Contas</h3><p>Sem dados cadastrados.</p>`)
          : carregarContas(opcaoSelecionada);
        break;
      default:
        conteudoDashboard.innerHTML = `<h3>Selecionado</h3><p>Conteúdo do item selecionado.</p>`;
        break;

    }
  }

  function getMesAtual() {
    return new Date().getMonth() + 1;
  }

  function getNomeMes(mes) {
    const nomeMes = mesesNumericos[mes.toLowerCase()];
    if (nomeMes) {
      return nomeMes.charAt(0).toUpperCase() + mes.toLowerCase().slice(1);
    }
    return mes; // Retorna o próprio mês se não estiver no objeto mesesNumericos
  }

  function numeroParaNomeMes(numero) {
    const meses = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    if (numero >= 1 && numero <= 12) {
      return meses[numero - 1];
    } else {
      return "Mês inválido";
    }
  }


  function adicionarSelecaoMes(selecionado) {
    const botoesMes = document.querySelectorAll(".mes-btn");

    botoesMes.forEach((btn) => {
      btn.addEventListener("click", function () {
        const mesSelecionado = this.getAttribute("data-mes");
        const dadosMes = todasContas.filter(
          (conta) => conta.nome === mesSelecionado
        );

        atualizarSelecaoMes(this, selecionado);
        mostrarDetalhesMes(dadosMes, selecionado);
      });
    });
  }

  function atualizarSelecaoMes(buttonSelecionado, selecionado) {
    const botoesMes = document.querySelectorAll(".mes-btn");

    botoesMes.forEach((btn) => {
      btn.classList.remove("selecionado");
    });
    buttonSelecionado.classList.add("selecionado");
  }

  // Funções relacionadas ao detalhamento e manipulação das contas do mês
  function mostrarDetalhesMes(dadosMes, selecionado = "") {
    const nomeMesSelecionado =
      dadosMes.length > 0 ? getNomeMes(dadosMes[0].nome) : "";
    console.log(dadosMes[0].vencimento);
    if (selecionado === "contas") {
      const tabela = `
            <h3>Contas do Mês de ${nomeMesSelecionado}</h3>
            <br>
            <div class="responsive-table">
            <table>
                <thead>
                    <tr>
                        <th>Tipo</th>
                        <th>Vencimento</th>
                        <th>Desconto</th>
                        <th>Preço</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${dadosMes
          .map(
            (conta) =>
              `
                        <tr>
                            <td>${conta.tipoConta}</td>
                            <td>${conta.vencimento}</td>
                            <td>${conta.desconto.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}</td>
                            <td>${conta.preco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}</td>
                            <td>${(conta.preco - conta.desconto).toLocaleString(
                "pt-BR",
                { style: "currency", currency: "BRL" }
              )}</td>
                        </tr>
                    `
          )
          .join("")}
                </tbody>
            </table>
          </div>
        `;
      detalhesMes.innerHTML = tabela;
    } else if (selecionado === "excluir") {
      const tabela = `
                <h3>Contas do Mês de ${nomeMesSelecionado}</h3>
                <br>
                <div id="contasMes">
                    ${dadosMes
          .map(
            (conta) => `
                        <label for="conta${conta.id}">
                            <div class="conta-item">
                                <input type="checkbox" id="conta${conta.id}" class="checkbox-conta" value="${conta.id}">
                                <div class="conta-info">
                                    <strong>${conta.tipoConta}</strong>
                                    <span class="vencimento">Vencimento: ${conta.vencimento}</span>
                                </div>
                            </div>
                          </label>
                          `
          )
          .join("")}
                </div>
                <button id="excluirBtn" disabled>Excluir Selecionados</button>
                <div><button id="excAll">Excluir Todos</button></div>
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
          if (
            confirm(
              `Tem certeza que deseja excluir ${contasSelecionadas.length === 1 ? "esta conta" : "estas contas"
              }?`
            )
          ) {
            excluirContas(contasSelecionadas);
          }
        });
      document.getElementById("excAll").addEventListener("click", function () {
        if (confirm(`Dejesa excluir todos os dados?`)) {
          localStorage.clear();
          location.reload();
        }
      });
    } else if (selecionado === "editar") {
      const tabela = `
      <h3>Contas do Mês de ${nomeMesSelecionado}</h3>
      <br>
      <div class="responsive-table">
      <table>
          <thead>
              <tr>
                  <th>Tipo</th>
                  <th>Vencimento</th>
                  <th>Desconto</th>
                  <th>Preço</th>
                  <th>Total</th>
                  <th>Ações</th>
              </tr>
          </thead>
          <tbody>
              ${dadosMes
          .map(
            (conta) => `
                      <tr>
                          <td>${conta.tipoConta}</td>
                          <td>${conta.vencimento}</td>
                          <td>${conta.desconto.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</td>
                          <td>${conta.preco.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}</td>
                          <td>${(conta.preco - conta.desconto).toLocaleString(
              "pt-BR",
              { style: "currency", currency: "BRL" }
            )}</td>
                          <td>
                              <button class="editar-btn" data-id="${conta.id
              }">Editar</button>
                          </td>
                      </tr>
                  `
          )
          .join("")}
          </tbody>
      </table>
    </div>
  `;
      detalhesMes.innerHTML = tabela;

      // Adiciona event listeners aos botões de edição
      const editarBtns = document.querySelectorAll(".editar-btn");
      editarBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          const contaId = this.getAttribute("data-id");
          const contaSelecionada = dadosMes.find(
            (conta) => conta.id === contaId
          );

          // Mostra a div de edição com os detalhes da conta selecionada
          mostrarDivEdicao(contaSelecionada);
        });
      });
    } else {

      let tabela = "";
      const mesesAgrupados = {};

      // Agrupa as contas por mês de vencimento
      dadosMes.forEach((conta) => {
        const mesVencimento = new Date(conta.vencimento).getMonth() + 1;
        if (!mesesAgrupados[mesVencimento]) {
          mesesAgrupados[mesVencimento] = [];
        }
        mesesAgrupados[mesVencimento].push(conta);
      });

      // Ordena os meses
      const mesesOrdenados = Object.keys(mesesAgrupados).sort((a, b) => {
        return a - b;
      });

      // Cria as tabelas ordenadas por mês
      mesesOrdenados.forEach((mes) => {
        tabela += `
              <div class="tabelasTodos">
                <h3>Contas do Mês de ${getNomeMes(numeroParaNomeMes(mes))}</h3>
                <br>
                <table>
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Vencimento</th>
                            <th>Desconto</th>
                            <th>Preço</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
        mesesAgrupados[mes].forEach((conta) => {
          tabela += `
                        <tr>
                            <td>${conta.tipoConta}</td>
                            <td>${conta.vencimento}</td>
                            <td>${conta.desconto.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</td>
                            <td>${conta.preco.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}</td>
                            <td>${(conta.preco - conta.desconto).toLocaleString(
            "pt-BR",
            { style: "currency", currency: "BRL" }
          )}</td>
                        </tr>
                `;
        });
        tabela += `
                    </tbody>
                </table>
              </div>
                <br>
            `;
      });

      detalhesMes.innerHTML = tabela;
    }
  }

  function carregarMesesComContas() {
    const mesesComContas = [
      ...new Set(todasContas.map((conta) => conta.nome)),
    ].sort((a, b) => {
      const nomeA = a.charAt(0).toUpperCase() + a.slice(1).toLowerCase();
      const nomeB = b.charAt(0).toUpperCase() + b.slice(1).toLowerCase();

      return mesesNumericos[nomeA] - mesesNumericos[nomeB];
    });

    return mesesComContas;
  }
  function carregarContas(selecionado) {

    const mesesComContas = carregarMesesComContas();

    if (selecionado === "excluir" || selecionado === undefined) {
      conteudoDashboard.innerHTML = `
            <div id="opcoesMes" class="month">
                ${mesesComContas
          .map(
            (mes) => `
                    <button class="mes-btn cnt-btn" data-mes="${mes}">
                        ${mes}
                    </button>
                `
          )
          .join("")}
            </div>
        `;

      adicionarSelecaoMes(selecionado);
    } else if (selecionado === "contas") {
      conteudoDashboard.innerHTML = `
            <div id="opcoesMes">
                ${mesesComContas
          .map(
            (mes) => `
                    <button class="mes-btn cnt-btn" data-mes="${mes}">
                        ${mes}
                    </button>
                `
          )
          .join("")}
            </div>
        `;

      adicionarSelecaoMes(selecionado);
    } else if (selecionado === "editar") {
      conteudoDashboard.innerHTML = `
      <div id="opcoesMes">
          ${mesesComContas
          .map(
            (mes) => `
              <button class="mes-btn cnt-btn" data-mes="${mes}">
                  ${mes}
              </button>
          `
          )
          .join("")}
      </div>
  `;
      adicionarSelecaoMes(selecionado);
    } else {
      mostrarDetalhesMes(todasContas, "todos");
    }
  }

  // mostrar div de edição
  function mostrarDivEdicao(conta) {
    // Verifica se a div de edição já está presente no DOM
    const divEdicaoExistente = document.querySelector(".edicao-conta");

    // Se a div de edição já estiver presente, remove-a

    if (divEdicaoExistente) {
      console.log(divEdicaoExistente);

      divEdicaoExistente.remove();
      return; // Retorna para evitar a criação de uma nova div de edição
    }

    // Cria uma div para edição
    const divEdicao = document.createElement("div");
    divEdicao.classList.add("edicao-conta");

    // Cria um formulário para edição
    const formEdicao = document.createElement("form");
    formEdicao.innerHTML = `
        <label for="tipoContaEdit">Tipo de Conta:</label>
        <input type="text" id="tipoContaEdit" name="tipoContaEdit" value="${conta.tipoConta}"><br><br>
        <label for="descontoEdit">Desconto:</label>
        <input type="number" id="descontoEdit" name="descontoEdit" value="${conta.desconto}"><br><br>
        <label for="precoEdit">Preço:</label>
        <input type="number" id="precoEdit" name="precoEdit" value="${conta.preco}"><br><br>
        <button type="button" id="salvarEdicaoBtn">Salvar</button>
        <button type="button" id="cancelarEdicaoBtn">Cancelar</button>
    `;



    divEdicao.appendChild(formEdicao);

    // Adiciona a div de edição ao DOM
    conteudoDashboard.appendChild(divEdicao);

    // Adiciona um event listener para o botão "Salvar"
    const salvarEdicaoBtn = document.getElementById("salvarEdicaoBtn");
    const cancelarEdicaoBtn = document.getElementById("cancelarEdicaoBtn");

    salvarEdicaoBtn.addEventListener("click", function () {
      // Lógica para salvar as edições
      const tipoContaEdit = document.getElementById("tipoContaEdit").value;
      const descontoEdit = parseFloat(
        document.getElementById("descontoEdit").value
      );
      const precoEdit = parseFloat(document.getElementById("precoEdit").value);

      // Atualiza os dados da conta selecionada
      conta.tipoConta = tipoContaEdit;
      conta.desconto = descontoEdit;
      conta.preco = precoEdit;

      // Atualiza o array de todas as contas com a conta editada
      todasContas = todasContas.map((c) => {
        if (c.id === conta.id) {
          return conta;
        } else {
          return c;
        }
      });

      // Salva as contas atualizadas no cache (localStorage)
      localStorage.setItem("todasContas", JSON.stringify(todasContas));

      // Atualiza a visualização da tabela com os novos dados
      limparConteudoDashboard();
      carregarContas("editar");

      // Remove a div de edição
      divEdicao.remove();
    });

    cancelarEdicaoBtn.addEventListener("click", function () {
      divEdicao.remove();
    })
  }

  function carregarFormularioAdicao() {
    conteudoDashboard.innerHTML = `
            <h3>Adicionar Conta</h3>
            <form id="addForm">
                <label for="tipoConta">Tipo de Conta:</label>
                <input type="text" id="tipoConta" name="tipoConta"><br><br>
                <label for="vencimento">Vencimento:</label>
                <input type="date" id="vencimento" name="vencimento"><br><br>
                <label for="desconto">Desconto:</label>
                <input type="number" id="desconto" name="desconto"><br><br>
                <label for="preco">Preço:</label>
                <input type="number" id="preco" name="preco"><br><br>
                <button type="button" id="addBtn">Adicionar</button>
            </form>
        `;

    handleAdicionarConta();
  }

  function validarFormularioAdicao() {
    const tipoConta = document.getElementById("tipoConta").value;
    const vencimento = document.getElementById("vencimento").value;
    const desconto = document.getElementById("desconto").value;
    const preco = document.getElementById("preco").value;

    if (!tipoConta || !vencimento || !desconto || !preco) {
      alert("Por favor, preencha todos os campos.");
      return false;
    }

    return true;
  }

  function adicionarContaAoArray(
    id,
    contasAtualizadas,
    tipoConta,
    vencimento,
    desconto,
    preco
  ) {
    if (!Array.isArray(contasAtualizadas)) {
      contasAtualizadas = []; // Se não for um array, inicializa como um array vazio
    }

    contasAtualizadas.push({
      id: id,
      nome: vencimento.toLocaleString("pt-BR", { month: "long" }).toLowerCase(),
      tipoConta: tipoConta,
      vencimento: vencimento.toISOString().split("T")[0],
      desconto: desconto,
      preco: preco,
    });
  }

  function generateUUID() {
    let dt = new Date().getTime();
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }
  // atualiza array
  function handleAdicionarConta() {
    const addBtn = document.getElementById("addBtn");

    addBtn.addEventListener("click", function () {
      if (!validarFormularioAdicao()) {
        return;
      }

      let contador = JSON.parse(localStorage.getItem("contador")) || 0;
      contador++;

      const tipoConta = document.getElementById("tipoConta").value;
      const vencimento = new Date(document.getElementById("vencimento").value);
      const desconto = parseFloat(document.getElementById("desconto").value);
      const preco = parseFloat(document.getElementById("preco").value);
      const mesAtual = getMesAtual();

      let contasAtualizadas = [...todasContas];

      if (vencimento.getMonth() + 1 > mesAtual) {
        let dataTemp = new Date(vencimento);

        while (dataTemp.getMonth() + 1 > mesAtual) {
          const id = generateUUID();

          if (dataTemp.getMonth() === mesAtual) {
            break;
          } else {
            dataTemp.setMonth(dataTemp.getMonth() - 1);
            adicionarContaAoArray(
              id,
              contasAtualizadas,
              tipoConta,
              dataTemp,
              desconto,
              preco
            );
          }
        }
      }

      // Adiciona a nova conta ao array de contas
      const id = generateUUID();
      adicionarContaAoArray(
        id,
        contasAtualizadas,
        tipoConta,
        vencimento,
        desconto,
        preco
      );

      // Salva as contas atualizadas no localStorage
      localStorage.setItem("todasContas", JSON.stringify(contasAtualizadas));
      todasContas = contasAtualizadas;

      // Recarrega as contas
      carregarContas("contas");
    });
  }

  // Função para excluir contas selecionadas
  function excluirContas(contasSelecionadas) {
    const novasContas = todasContas.filter(
      (conta) => !contasSelecionadas.includes(conta.id)
    );
    let selecionada = "excluir";
    todasContas = novasContas;

    localStorage.setItem("todasContas", JSON.stringify(todasContas));
    limparConteudoDashboard();
    carregarContas(selecionada);
  }
  //limpar dashboard 
  function limparConteudoDashboard() {
    conteudoDashboard.innerHTML = "";
    detalhesMes.innerHTML = "";
  }

  botoesDashboard.forEach((btn) => {
    btn.addEventListener("click", function () {
      limparConteudoDashboard();
      const opcaoSelecionada = this.getAttribute("data-option");
      // carregar conteudo
      carregarConteudoDashboard(opcaoSelecionada);
    });
  });
});
