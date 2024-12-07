let uiElements = {
  tableBody: document.querySelector('.table-body'),
  cargoRow: document.querySelector('.cargo-row'),
  cargoTemplate: document.querySelector('#cargoTemplate'),
  cargoId: document.querySelector('.cargo-id'),
  cargoName: document.querySelector('.cargo-name'),
  cargoDeparturePoint: document.querySelector('.cargo-departure-point'),
  cargoDestinationPoint: document.querySelector('.cargo-destination-point'),
  cargoDepartureDate: document.querySelector('.cargo-departure-date'),
  statusTemplate: document.querySelector('.statusTemplate')
};

async function getResponseList() {
  let response = await fetch('http://localhost:3000/cargoList');
  return await response.json();
}

async function getCargoData() {
  let data = await getResponseList();
  return data;
}

async function getResponseStatuses() {
  let response = await fetch('http://localhost:3000/cargoStatuses');
  return await response.json();
}

async function getCargoStatusesData() {
  let data = await getResponseStatuses();
  return data;
}

async function renderCargoList() {
  let cargoData = await getCargoData();
  let cargoStatuses = await getCargoStatusesData();
  for (let cargoItem of cargoData) {
    let cargoContent = uiElements.cargoTemplate.content.cloneNode(true);
    cargoContent.querySelector('.cargo-id').textContent = cargoItem.id;
    cargoContent.querySelector('.cargo-name').textContent = cargoItem.name;
    for (let value of Object.values(cargoStatuses)) {
      let cargoSelectOption = document.createElement('option');
      cargoSelectOption.textContent = value;
      cargoContent.querySelector('.cargo-status').append(cargoSelectOption);
    }
    cargoContent.querySelector('.cargo-status').value = cargoItem.status;
    cargoContent.querySelector('.cargo-departure-point').textContent = cargoItem.origin;
    cargoContent.querySelector('.cargo-destination-point').textContent = cargoItem.destination;
    cargoContent.querySelector('.cargo-departure-date').textContent = cargoItem.departureDate;
    uiElements.tableBody.append(cargoContent);
  }
}
renderCargoList();