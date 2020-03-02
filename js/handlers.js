const button4 = document.querySelector('.button-4');
const button5 = document.querySelector('.button-5');
const button6 = document.querySelector('.button-6');

function handlerClickButton(){    
    button4.style.color = '#bdbdbd';
    button5.style.color = '#bdbdbd';
    button6.style.color = '#bdbdbd';
    event.toElement.style.color = '#3989ac';
}

button4.addEventListener('click', () => handlerClickButton());
button5.addEventListener('click', () => handlerClickButton());
button6.addEventListener('click', () => handlerClickButton());

const numberFull = document.querySelectorAll('.car-number-full');

for( let elem of numberFull){    
    elem.addEventListener('click', () => { 
        console.log(event.toElement)   
        event.toElement.parentElement.innerHTML = '8800600000';
    })
}

const seriesdescriptionASutoSmall = document.querySelector('.series-description-auto-small');
const seriesdescriptionASutoFull = document.querySelector('.series-description-auto-full');
const seriesfullDescript1 = document.querySelector('.series-full-descript1');
const seriesfullDescript1Full = document.querySelector('.series-full-descript1-full');

seriesfullDescript1.addEventListener('click', () => {    
    seriesdescriptionASutoSmall.style.display = 'none';
    seriesdescriptionASutoFull.style.display = 'block';
})

seriesfullDescript1Full.addEventListener('click', () => {    
    seriesdescriptionASutoSmall.style.display = 'block';
    seriesdescriptionASutoFull.style.display = 'none';
})


for( let elem of document.querySelectorAll('.pagination-button')){    
    elem.addEventListener('click', () => { 
        for(let element of document.querySelectorAll('.pagination-button')){
            element.style.color = '#bdbdbd';            
        }
        event.toElement.style.color = '#3989ac';        
    })
}

for( let elem of document.querySelectorAll('input')){    
    elem.addEventListener('click', () => {         
            event.toElement.value='';
            event.toElement.style.color = '#3989ac';           
    })
}

for( let elem of document.querySelectorAll('select')){    
    elem.addEventListener('click', () => {     
           event.toElement.style.color = '#3989ac';           
    })
}
