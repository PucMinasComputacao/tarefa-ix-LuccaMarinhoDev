const data = {
  produtos: [
    {id:1,nome:"iPhone 13",preco:4500,categoria:"Celulares",descricao:"iPhone moderno",emEstoque:true},
    {id:2,nome:"Galaxy S21",preco:3800,categoria:"Celulares",descricao:"Samsung topo de linha",emEstoque:true},
    {id:3,nome:"Notebook Dell",preco:5200,categoria:"Notebooks",descricao:"Notebook potente",emEstoque:false},
    {id:4,nome:"Mouse Gamer",preco:150,categoria:"Acessórios",descricao:"Mouse RGB",emEstoque:true},
    {id:5,nome:"Teclado Mecânico",preco:300,categoria:"Acessórios",descricao:"Teclado bom",emEstoque:true},
    {id:6,nome:"PS5",preco:4500,categoria:"Games",descricao:"Console Sony",emEstoque:false},
    {id:7,nome:"Xbox Series X",preco:4300,categoria:"Games",descricao:"Console Microsoft",emEstoque:true},
    {id:8,nome:"Notebook Lenovo",preco:4000,categoria:"Notebooks",descricao:"Custo benefício",emEstoque:true}
  ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const btnRender = document.getElementById("btnRender");

function formatPrice(preco){
  return "R$ " + preco.toFixed(2);
}

function createProductCard(produto){
  const card = document.createElement("div");
  card.setAttribute("data-id", produto.id);
  card.classList.add("card");
  card.style.background = "#f9f9f9";

  const title = document.createElement("h3");
  title.innerText = produto.nome;

  const img = document.createElement("img");
  img.src = produto.imagem;

  const price = document.createElement("p");
  price.innerText = formatPrice(produto.preco);

  const cat = document.createElement("p");
  cat.innerText = produto.categoria;

  const btnDetails = document.createElement("button");
  btnDetails.innerText = "Ver detalhes";

  const btnHighlight = document.createElement("button");
  btnHighlight.innerText = "Destacar";

  btnDetails.addEventListener("click", ()=> showProductDetails(produto));
  btnHighlight.addEventListener("click", ()=> card.classList.toggle("highlight"));

  card.appendChild(title);
  card.appendChild(img);
  card.appendChild(price);
  card.appendChild(cat);
  card.appendChild(btnDetails);
  card.appendChild(btnHighlight);

  return card;
}

function renderProducts(produtos){
  productList.innerHTML = "";
  produtos.forEach(p => productList.appendChild(createProductCard(p)));

  const cards = document.querySelectorAll(".card");
  cards.forEach(c => console.log(c.getAttribute("data-id")));
}

function renderCategories(){
  const categorias = [...new Set(data.produtos.map(p=>p.categoria))];
  categorySelect.innerHTML = "<option>Todas</option>";
  categorias.forEach(cat=>{
    const option = document.createElement("option");
    option.innerText = cat;
    categorySelect.appendChild(option);
  });
}

function showProductDetails(produto){
  productDetails.innerHTML = `
    <h2>${produto.nome}</h2>
    <p>Preço: ${formatPrice(produto.preco)}</p>
    <p>Categoria: ${produto.categoria}</p>
    <p>Estoque: ${produto.emEstoque ? "Disponível" : "Indisponível"}</p>
    <p>${produto.descricao}</p>
  `;
}

function filterProducts(){
  const text = searchInput.value.toLowerCase();
  const category = categorySelect.value;

  return data.produtos.filter(p=>{
    const matchText = p.nome.toLowerCase().includes(text);
    const matchCat = category === "Todas" || p.categoria === category;
    return matchText && matchCat;
  });
}

searchInput.addEventListener("input", ()=> renderProducts(filterProducts()));
categorySelect.addEventListener("change", ()=> renderProducts(filterProducts()));
btnRender.addEventListener("click", ()=> renderProducts(filterProducts()));

renderCategories();
renderProducts(data.produtos);