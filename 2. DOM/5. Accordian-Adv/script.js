const buttons = document.querySelectorAll('.accordion-header');
const allsections = document.querySelectorAll('.accordion-content');
console.log(buttons);

if(buttons){
    buttons.forEach((button, index, arr)=>{
        button.addEventListener('click', (event)=>{
            const clickedButton = event.target;
            const sectionToToggle = clickedButton.nextElementSibling;

            allsections.forEach((section)=>{
                if(section !== sectionToToggle){
                    section.classList.remove('active');
                }
            })

            if(sectionToToggle){
                sectionToToggle.classList.toggle('active')
            }
        })
    })
}