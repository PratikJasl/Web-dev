
function change_color(){
    try {
        button = document.querySelector('.change_color_button');
        toggle = false
        if(button){
            button.addEventListener('click', () => {
                if(toggle == true){
                    document.querySelector('.header').style.color = "Blue";
                    toggle = false
                }else{
                    document.querySelector('.header').style.color = "Orange";
                    toggle = true
                }
                
            })
        }
    } catch (error) {
        console.log("Error occured during DOM manipulation", error);
    }
}

change_color();

function add_image(){
    try {
        button = document.querySelector('.add_image_button');
        if(button){
            button.addEventListener('click', ()=>{
                image_element = document.createElement('img');
                image_element.setAttribute('src', './image/background.jpg');
                image_element.setAttribute('alt', 'image of the himalyan mountians');
                document.querySelector('.image-container').appendChild(image_element);
            })
        }
    } catch (error) {
        console.log("Error occured during DOM manipulation", error);
    }
}

add_image();

function remove_image(){
    try {
        button = document.querySelector('.remove_image_button');
        if(button){
            button.addEventListener('click', ()=>{
                img_tag = document.querySelector('img');
                img_tag.parentNode.removeChild(img_tag)
            })
        }
    } catch (error) {
        console.log("Error occured during DOM manipulation", error);
    }
}

remove_image()

