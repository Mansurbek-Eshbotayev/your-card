var elForm = document.querySelector(".form");
var elInputTitle = document.querySelector(".form__title");
var elInputRel = document.querySelector(".form__rel");
var elInputTel = document.querySelector(".form__tel");
var elList = document.querySelector(".card__list");

var data = [];

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  var inputName = elInputTitle.value.trim();
  var inputRel = elInputRel.value.trim();
  var inputTel = elInputTel.value.trim();

  var obj = {
    id: data.length > 0 ? data[data.length - 1].id + 1 : 1,
    user_name: inputName,
    user_rel: inputRel,
    user_tel: inputTel,
  };

  if (inputName && inputRel && inputTel !== "") {
    data.push(obj);
  }

  createData(data);
  elForm.reset();
});

function createData(arr) {
  var fragment = new DocumentFragment();
  var elTemplate = document.querySelector(".card-template").content;
  elList.innerHTML = "";

  arr.forEach((obj) => {
    var cloneTemplate = elTemplate.cloneNode(true);
    cloneTemplate.querySelector(".card__item");
    cloneTemplate.querySelector(".card__title").textContent = obj.user_name;
    cloneTemplate.querySelector(".card__rel").textContent = obj.user_rel;
    cloneTemplate.querySelector(".card__tel").textContent = obj.user_tel;
    cloneTemplate.querySelector(".card__del").dataset.id = obj.id;

    fragment.appendChild(cloneTemplate);
  });

  elList.appendChild(fragment);
}

elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".card__del")) {
    let btnId = Number(evt.target.dataset.id);
    let itemId = data.findIndex((obj) => obj.id === btnId);
    data.splice(itemId, 1);
    createData(data);
  }
});
