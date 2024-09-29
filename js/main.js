//====================== get elements from HTML file by id ======================//
var productNameInput = document.getElementById("productNameInput");

var productPriceInput = document.getElementById("productPriceInput");

var productCategoryInput = document.getElementById("productCategoryInput");

var searchInput = document.getElementById("search");

var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);

var addBtn = document.getElementById("addBtn");

var updateBtn = document.getElementById("updateBtn");

// * container to store products
var productsContainer = [];

// * check if local storage empty or not
if (localStorage.getItem("myProducts") != null) {
  productsContainer = JSON.parse(localStorage.getItem("myProducts"));
  displayProducts(productsContainer);
} else {
  productsContainer = [];
}

//====================== function to add product ======================//
function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };

  productsContainer.push(product);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  clearForm();
  displayProducts(productsContainer);
}

//======================  function to clear form ======================//
function clearForm() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

//======================  function to display products ======================//
function displayProducts(productList) {
  var cartoona = ``;

  for (let i = 0; i < productList.length; i++) {
    cartoona += ` 
        <tr >
            <td>${i}</td>
            <td>${productList[i].name}</td>
            <td>${productList[i].price}</td>
            <td>${productList[i].category}</td>
            <td>${productList[i].description}</td>
            <td><button onclick="getProductToUpdate(${i})" class="btn btn-outline-warning">update</button></td>
            <td><button onclick="deleteProducts(${i})" class="btn btn-outline-danger">delete</button></td>
        </tr>
`;
  }
  document.getElementById("tableBody").innerHTML = cartoona;
}

//======================  function to search products ======================//
function searchProducts() {
  var searchTerm = searchInput.value;

  var searchResult = [];
  for (let i = 0; i < productsContainer.length; i++) {
    if (
      productsContainer[i].name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) == true
    ) {
      searchResult.push(productsContainer[i]);
    }
  }
  displayProducts(searchResult);
}

//======================  function to delete products ======================//
function deleteProducts(deleteIndex) {
  productsContainer.splice(deleteIndex, 1);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  displayProducts(productsContainer);
}

//======================  function to get product to update them ======================//
function getProductToUpdate(updateIndex) {
  productNameInput.value = productsContainer[updateIndex].name;
  productPriceInput.value = productsContainer[updateIndex].price;
  productCategoryInput.value = productsContainer[updateIndex].category;
  productDescriptionInput.value = productsContainer[updateIndex].description;

  updateBtn.classList.replace("d-none", "d-inline-block");
  addBtn.classList.add("d-none");
  productsContainer.splice(updateIndex, 1);
}

//======================  function to update product ======================//
function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };

  productsContainer.push(product);
  localStorage.setItem("myProducts", JSON.stringify(productsContainer));
  clearForm();
  displayProducts(productsContainer);
  updateBtn.classList.replace("d-inline-block", "d-none");
  addBtn.classList.replace("d-none", "d-inline-block");
}

function validationProduct() {
  var regex = /^[A-Z][a-z]{3,6}$/;
  console.log(productNameInput.value);
  console.log(regex.test(productNameInput.value));
  if (regex.test(productNameInput.value) == true) {
    if (productNameInput.classList.contains("is-invalid")) {
      productNameInput.classList.replace("is-invalid", "is-valid");
      return true;
    }
  } else {
    productNameInput.classList.add("is-invalid");
    return false;
  }
}
