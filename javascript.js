const imgs = Array.from(document.getElementsByClassName("card-img-top"));
const titles = Array.from(document.getElementsByClassName("card-title"));
const prices = Array.from(document.getElementsByClassName("card-text"));
const discardButtons = Array.from(
  document.getElementsByClassName("btn-danger")
);
const addButtons = Array.from(document.getElementsByClassName("btn-success"));
const myBooks = document.getElementById("my-books");
const cartDisplay = document.getElementById("cart-display");
const clearButton = document.getElementById("clear-button");

clearButton.addEventListener("click", () => {
  localStorage.clear();
  renderCart();
});

const discardBook = function (e) {
  e.target.parentElement.parentElement.remove();
};

discardButtons.forEach((button) => {
  button.addEventListener("click", discardBook);
});

const renderCart = function () {
  cartDisplay.innerHTML = localStorage.getItem("cartHTML");
};
const removeFromCart = function (e) {
  e.target.parentElement.remove();
  localStorage.setItem("cartHTML", cartDisplay.innerHTML);

  renderCart();
};

const addBook = function (e) {
  const targetParent = e.target.parentElement;
  const titleToAdd = targetParent.querySelector("h5").textContent;
  const priceToAdd = targetParent.querySelector(".card-text").textContent;
  const divContainer = document.createElement("div");
  cartDisplay.appendChild(divContainer);
  divContainer.classList.add("d-flex");
  divContainer.classList.add("justify-content-between");
  const paragraph = document.createElement("p");
  paragraph.innerText = ` ${titleToAdd} ${priceToAdd}`;
  const buttonDelete = document.createElement("button");
  buttonDelete.classList.add("btn");
  buttonDelete.classList.add("btn-warning");
  buttonDelete.innerText = "Remove";
  buttonDelete.addEventListener("click", removeFromCart);
  divContainer.appendChild(paragraph);
  divContainer.appendChild(buttonDelete);
  localStorage.setItem("cartHTML", cartDisplay.innerHTML);
  renderCart();
};

addButtons.forEach((button) => {
  button.addEventListener("click", addBook);
});

const arrayOfBooks = [];

const getBooks = function () {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((data) => {
      data.forEach((dato, i) => {
        titles[i].innerHTML = data[i].title;
      });
      data.forEach((dato, i) => {
        prices[i].innerHTML = data[i].price + "$";
      });
      data.forEach((dato, i) => {
        imgs[i].src = data[i].img;
      });
    })

    .catch((err) => {
      console.log(err);
    });
};

// const discard = (e) => {};

getBooks();
renderCart();
