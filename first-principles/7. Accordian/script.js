const buttons = document.querySelectorAll('button');

if(buttons){
    buttons.forEach((value, index, arr)=>{
        value.addEventListener('click', (event)=>{
            const clickedButton = event.target;
            const section = clickedButton.nextElementSibling;
            if(section.style.display == 'none'){
                section.style.display = 'block';
            }else{
                section.style.display = 'none';
            }
        })
    })
}