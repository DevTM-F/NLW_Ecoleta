

function populateUFs() {
    let ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for( let state of states) {
            ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`

        }
        
          

    })

}

populateUFs()

function getCities(event) {
    let citySelect = document.querySelector("[name=city]")
    let stateinput = document.querySelector("[name=state]")

    let ufvalue = event.target.value

    let indexOfSelectedState = event.target.selectedIndex
    stateinput.value = event.target.options[indexOfSelectedState].text


    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`


    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true 


    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( let city of cities) {
            citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`

        }
        
        citySelect.disabled = false

    })
}


document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// Ítens de coleta
// pegar todos os li 
let itemsToCollect = document.querySelectorAll(".items-grid li")
for (let item of itemsToCollect) {
    item.addEventListener("click",handleSelectedItem)
}

let collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {

    let itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected") 

 

    let itemId = itemLi.dataset.id

    console.log('ITEM ID: ', itemId)

    // verificar se existem ítens selecionados, se sim
    //  pegar os ítens selecionados

    let alreadySelected = selectedItems.findIndex(item => {

        let itemFound = item == itemId //Isso será true ou false
        return itemFound

    })

    
    // se já estiver selecionado, 
    if(alreadySelected >=0) {
     // tirar da seleção
     const filteredItems = selectedItems.filter(item => {
        let itemIsDifferent = item != itemId // false
        return itemIsDifferent
     })

     selectedItems = filteredItems
    }
    else {

    // se não estiver selecionado,
    //  adicionar a seleção

    selectedItems.push(itemId)


    }

    console.log('selectedItems', itemId)

    // atualizar o campo escondido com os ítens selecionados


    collectedItems.value = selectedItems
    
}