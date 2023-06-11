document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  let option = document.querySelector(".star-wars__option");
  let optionValue = option.value;
  let inputNumer = document.querySelector(".star-wars__input-number");
  let inputNumerValue = inputNumer.value;
  let resultContainer = document.querySelector(".star-wars__result");
  let resultContainerError = document.querySelector(".star-wars__error");

  // Проверка на пустые значения
  if (inputNumerValue === "" || optionValue === "") {
    resultContainerError.innerHTML = `
      <div id=""><span class="">Ошибка:</span> Заполните все поля</div>`;
    return; // Прерываем выполнение кода
  }

  resultContainer.innerHTML = "Идёт загрузка..."; // Показываем сообщение о загрузке

  fetch("https://swapi.dev/api/" + optionValue + "/" + inputNumerValue + "/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Сервер не доступен");
      }
      return response.json();
    })
    .then((element) => {
      resultContainerError.innerHTML = ""; // Очищаем сообщение об ошибке
      if (optionValue !== "films") {
        resultContainer.innerHTML = `
          <div id=""><span class="">Name:</span> ${element.name}</div>`;
      } else if (optionValue === "films") {
        resultContainer.innerHTML = `
          <div id=""><span class="">Name:</span> ${element.title}</div>`;
      }
    })
    .catch((error) => {
      resultContainer.innerHTML = ""; // Очищаем предыдущий результат
      resultContainerError.innerHTML = `
        <div id=""><span class="">Ошибка:</span> ${error.message}</div>`;
    })
    .finally(() => {
      inputNumer.value = ""; // Сбрасываем значение ввода
    });
});
