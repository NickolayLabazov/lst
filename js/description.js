const descriptionASutoSmall = document.querySelector('.description-auto-small');
const descriptionASutoFull = document.querySelector('.description-auto-full');
const fullDescript1 = document.querySelector('.full-descript1');
const fullDescript1Full = document.querySelector('.full-descript1-full');

fullDescript1.addEventListener('click', () => {    
    descriptionASutoSmall.style.display = 'none';
    descriptionASutoFull.style.display = 'block';
})

fullDescript1Full.addEventListener('click', () => {    
    descriptionASutoSmall.style.display = 'block';
    descriptionASutoFull.style.display = 'none';
})

const equipmentSmall = document.querySelector('.equipment-small');
const equipmentFull = document.querySelector('.equipment-full');
const fullDescript2 = document.querySelector('.full-descript2');
const fullDescript2Full = document.querySelector('.full-descript2-full');

fullDescript2.addEventListener('click', () => {    
    equipmentSmall.style.display = 'none';
    equipmentFull.style.display = 'block';
}) 

fullDescript2Full.addEventListener('click', () => {    
    equipmentSmall.style.display = 'block';
    equipmentFull.style.display = 'none';
})













