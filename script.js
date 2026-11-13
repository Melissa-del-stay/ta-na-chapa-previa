
// =====================================
// PRODUTOS DO CARDÁPIO
// =====================================

const produtos = [
    {
        id: 1,
        nome: "X-Burguer Clássico",
        descricao: "Pão, hambúrguer artesanal, queijo e molho especial.",
        preco: 22.90,
        categoria: "hamburgueres",
        imagem: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600"
    },
    {
        id: 2,
        nome: "X-Bacon",
        descricao: "Hambúrguer, queijo, bacon crocante e molho da casa.",
        preco: 27.90,
        categoria: "hamburgueres",
        imagem: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=600"
    },
    {
        id: 3,
        nome: "Hot Dog Especial",
        descricao: "Pão, salsicha, milho, batata palha e molho.",
        preco: 18.90,
        categoria: "hotdogs",
        imagem: "https://images.unsplash.com/photo-1612392061981-9d086fe894ed?w=600"
    },
    {
        id: 4,
        nome: "Hot Dog Duplo",
        descricao: "Duas salsichas, queijo, milho e batata palha.",
        preco: 23.90,
        categoria: "hotdogs",
        imagem: "https://blogs.correiobraziliense.com.br/lianasabo/wp-content/uploads/sites/25/2024/04/WhatsApp-Image-2024-03-26-at-2.36.08-PM-1.jpeg"
    },
    {
        id: 5,
        nome: "Refrigerante Lata",
        descricao: "Refrigerante gelado de 350ml.",
        preco: 6.00,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=600"
    },
    {
        id: 6,
        nome: "Suco de Laranja",
        descricao: "Suco de laranja refrescante.",
        preco: 8.00,
        categoria: "bebidas",
        imagem: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=600"
    }
];


// =====================================
// CARRINHO
// =====================================

let carrinho = [];


// =====================================
// FORMATAR PREÇOS
// =====================================

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}


// =====================================
// MOSTRAR PRODUTOS
// =====================================

const listaProdutos = document.getElementById("listaProdutos");

function mostrarProdutos(categoria = "todos") {

    const filtrados = categoria === "todos"
        ? produtos
        : produtos.filter(produto => produto.categoria === categoria);

    listaProdutos.innerHTML = "";

    filtrados.forEach(produto => {

        const card = document.createElement("article");
        card.className = "produto";

        card.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}">

            <div class="produto-info">
                <h3>${produto.nome}</h3>

                <p>${produto.descricao}</p>

                <div class="produto-preco">
                    ${formatarPreco(produto.preco)}
                </div>

                <button
                    class="adicionar-carrinho"
                    onclick="adicionarCarrinho(${produto.id})">
                    Adicionar ao carrinho
                </button>
            </div>
        `;

        listaProdutos.appendChild(card);
    });
}


// =====================================
// FILTRAR CATEGORIAS
// =====================================

document.querySelectorAll(".categoria").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelector(".categoria.ativa")
            ?.classList.remove("ativa");

        botao.classList.add("ativa");

        mostrarProdutos(botao.dataset.categoria);
    });

});


// =====================================
// ADICIONAR AO CARRINHO
// =====================================

function adicionarCarrinho(id) {

    const produto = produtos.find(item => item.id === id);

    const itemExistente = carrinho.find(item => item.id === id);

    if (itemExistente) {
        itemExistente.quantidade++;
    } else {
        carrinho.push({
            ...produto,
            quantidade: 1
        });
    }

    atualizarCarrinho();
}


// =====================================
// CONTROLE DO CARRINHO
// =====================================

const carrinhoTela = document.getElementById("carrinho");
const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");

const itensCarrinho = document.getElementById("itensCarrinho");
const valorTotal = document.getElementById("valorTotal");

abrirCarrinho.addEventListener("click", () => {
    carrinhoTela.classList.add("aberto");
    atualizarCarrinho();
});

fecharCarrinho.addEventListener("click", () => {
    carrinhoTela.classList.remove("aberto");
});


// =====================================
// ATUALIZAR CARRINHO
// =====================================

function atualizarCarrinho() {

    const quantidadeTotal = carrinho.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    document.getElementById("quantidadeCarrinho")
        .textContent = quantidadeTotal;

    itensCarrinho.innerHTML = "";

    if (carrinho.length === 0) {
        itensCarrinho.innerHTML = `
            <p class="carrinho-vazio">
                Seu carrinho está vazio.
            </p>
        `;
    }

    carrinho.forEach(item => {

        const produtoCarrinho = document.createElement("div");

        produtoCarrinho.className = "item-carrinho";

        produtoCarrinho.innerHTML = `
            <div class="item-carrinho-imagem">
                <img src="${item.imagem}" alt="${item.nome}">
            </div>

            <div class="item-carrinho-info">

                <h3>${item.nome}</h3>

                <p>${formatarPreco(item.preco)}</p>

                <div class="item-carrinho-controles">

                    <button onclick="alterarQuantidade(${item.id}, -1)">
                        −
                    </button>

                    <span>${item.quantidade}</span>

                    <button onclick="alterarQuantidade(${item.id}, 1)">
                        +
                    </button>

                </div>

                <button
                    class="remover-produto"
                    onclick="removerProduto(${item.id})">
                    Remover
                </button>

            </div>
        `;

        itensCarrinho.appendChild(produtoCarrinho);
    });

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );

    valorTotal.textContent = formatarPreco(total);
}


// =====================================
// ALTERAR QUANTIDADE
// =====================================

function alterarQuantidade(id, valor) {

    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    item.quantidade += valor;

    if (item.quantidade <= 0) {
        removerProduto(id);
        return;
    }

    atualizarCarrinho();
}


// =====================================
// REMOVER PRODUTO
// =====================================

function removerProduto(id) {

    carrinho = carrinho.filter(item => item.id !== id);

    atualizarCarrinho();
}


// =====================================
// ABRIR E FECHAR FINALIZAÇÃO
// =====================================

const finalizacao = document.getElementById("finalizacao");
const fecharFinalizacao = document.getElementById("fecharFinalizacao");
const finalizarPedido = document.getElementById("finalizarPedido");

finalizarPedido.addEventListener("click", () => {

    if (carrinho.length === 0) {
        alert("Adicione algum produto ao carrinho primeiro!");
        return;
    }

    carrinhoTela.classList.remove("aberto");
    finalizacao.classList.add("aberta");
});

fecharFinalizacao.addEventListener("click", () => {
    finalizacao.classList.remove("aberta");
});


// =====================================
// CAMPO DE TROCO
// =====================================

const pagamento = document.getElementById("pagamento");
const campoTroco = document.getElementById("campoTroco");

pagamento.addEventListener("change", () => {

    if (pagamento.value === "Dinheiro") {
        campoTroco.style.display = "block";
    } else {
        campoTroco.style.display = "none";
    }

});


// =====================================
// INICIAR CARDÁPIO
// =====================================

mostrarProdutos();
atualizarCarrinho();


// =====================================
// ENVIAR PEDIDO PELO WHATSAPP
// =====================================

const formularioPedido = document.getElementById("formularioPedido");

formularioPedido.addEventListener("submit", (evento) => {

    evento.preventDefault();

    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        finalizacao.classList.remove("aberta");
        return;
    }

    const nome = document.getElementById("nomeCliente").value;
    const rua = document.getElementById("ruaCliente").value;
    const numero = document.getElementById("numeroCliente").value;
    const bairro = document.getElementById("bairroCliente").value;

    const complemento = document.getElementById("complementoCliente").value;
    const referencia = document.getElementById("referenciaCliente").value;
    const observacao = document.getElementById("observacaoCliente").value;

    const formaPagamento = pagamento.value;
    const troco = document.getElementById("troco").value;

    const total = carrinho.reduce(
        (soma, item) => soma + item.preco * item.quantidade,
        0
    );


let mensagem = `NOVO PEDIDO - TA NA CHAPA

*CLIENTE*
Nome: ${nome}

*ENDERECO*
Rua: ${rua}
Numero: ${numero}
Bairro: ${bairro}`;
if (complemento) mensagem += `\nComplemento: ${complemento}`;
if (referencia) mensagem += `\nReferência: ${referencia}`;

mensagem += `\n\n*PEDIDO*`;

carrinho.forEach(item => {
    mensagem += `\n${item.quantidade}x ${item.nome} - ${formatarPreco(item.preco * item.quantidade)}`;
});

mensagem += `\n\n*TOTAL: ${formatarPreco(total)}*`;
mensagem += `\nPagamento: ${formaPagamento}`;

if (formaPagamento === "Dinheiro" && troco) {
    mensagem += `\nTroco para: R$ ${Number(troco).toFixed(2).replace(".", ",")}`;
}

if (observacao) {
    mensagem += `\n\nObservações: ${observacao}`;
}

const numeroWhatsApp = "5511998508722";

const linkWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

window.open(linkWhatsApp, "_blank");

});
