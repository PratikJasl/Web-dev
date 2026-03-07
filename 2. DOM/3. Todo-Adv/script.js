const inputTextElement = document.querySelector('.task-input');
const listElement = document.querySelector('.tasks');
const todoForm = document.querySelector('.todo-form');

function addTasks(){
    console.log("Add Tasks function running");
    if(!todoForm || !inputTextElement || !listElement){
        console.log("Line: 7")
        return;
    }

    try {
        //Step 1: Add an event listner to our form. This makes the code run even when you press enter from keyboard.
        todoForm.addEventListener('submit', (event)=>{
            event.preventDefault();

            //Step 2: Store the text entered by user.
            const userText = inputTextElement.value.trim();
            if(userText === ''){
                alert('No user input');
                return "No Task entered by user"
            }

            //Step 3: Create a new element and add class
            const li = document.createElement('li');
            li.classList.add('todo-item');
            console.log("List created", li);

            //Step 4: Add the user text to a span element.
            const span = document.createElement('span');
            span.textContent = userText;
            console.log('Span created',span);

            //Step 5: Create delete button.
            const deleteBn = document.createElement('button');
            deleteBn.textContent = "Delete";

            deleteBn.classList.add('delete-button');
            
            deleteBn.type = 'button';
            console.log("Delete Button created", deleteBn)

            //Step6: Add the span and button inside li.
            li.append(span, deleteBn);
            listElement.append(li);

            //Step7: clear the input field, for next input.
            inputTextElement.value = ''
        })
    } catch (error) {
        console.log("error adding Task");
    }
}

function deleteTasks(){
    console.log("Delete Tasks function running");
    if(!listElement){
        console.log("Line: 7")
        return;
    }

    try {
        // Step1: Add an event lister to parent.
        listElement.addEventListener('click', (event)=>{

            // Step2: Identify the element clicked.
            const clickedElement = event.target;

            // Step3: Check if we are deleting the right button.
            if(clickedElement.classList.contains('delete-button')){
                //Find the parent element of the button and remove it.
                const itemToRemove = clickedElement.closest('.todo-item');
                if(itemToRemove){
                    itemToRemove.remove();
                }
            }
        })
    } catch (error) {
        console.log("error deleting list element", error);
    }
}


addTasks();
deleteTasks();
