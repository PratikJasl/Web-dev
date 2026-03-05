// 1. Cache the DOM elements
const addButton = document.querySelector('.add-item-button');
const inputContainer = document.querySelector('.input-container');
const removeButton = document.querySelector('.remove-item-button');

// 2. Add Item function
function setupAddItems() {
    if (!addButton || !inputContainer) return; // Guard clause

    addButton.addEventListener('click', () => {
        try {
            const newInput = document.createElement('input');
            newInput.type = 'text';
            newInput.placeholder = 'Enter Text';
            newInput.name = 'user-input';
            
            inputContainer.append(newInput);
        } catch (error) {
            console.error("Error creating new input:", error);
        }
    });
}

// 3. Remove Item function
function setupRemoveItems() {
    if (!removeButton) return; // Guard clause

    removeButton.addEventListener('click', () => {
        try {
            //Select item to remove
            const itemToRemove = document.querySelector('input');
            
            if (itemToRemove) {
                // Remove in one clean step without parent.
                itemToRemove.remove(); 
            }
        } catch (error) {
            console.error("Error removing input:", error);
        }
    });
}

// 4. Initialize
setupAddItems();
setupRemoveItems();