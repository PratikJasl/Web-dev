function addItems(){
    try {
        let button = document.querySelector('.add-item-button');
        button.addEventListener('click', ()=>{
            const newInput = document.createElement('input');
            if (newInput) {
                newInput.setAttribute('type', 'text');
                newInput.setAttribute('placeholder', 'Enter Text');
            }
            const inputContainer = document.querySelector('.input-container')
            if (inputContainer) {
                inputContainer.append(newInput);
            }
        })
    } catch (error) {
        console.log("Error occured during DOM manipulation", error);
    }
}

addItems()

function removeItems(){
    try {
        const button = document.querySelector('.remove-item-button');
        button.addEventListener('click', ()=>{
            const itemToRemove = document.querySelector('input');
            if(itemToRemove){
                document.querySelector('.input-container').removeChild(itemToRemove);
            }
        })
    } catch (error) {
        console.log("Error occured during DOM manipulation", error);
    }
}

removeItems()