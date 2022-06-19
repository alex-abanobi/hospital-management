console.log('I am working');
const servicesdropdown = document.querySelector('.servicesdropdown-inactive');
const servicelinkhead = document.querySelectorAll('.links')[2];

// servicesdropdown.addEventListener('mouseover', (event) => {
//   console.log(event);
// })


// servicesdropdown.addEventListener('mouseenter', e => {
//    console.log('mouse has entered')
//   });
  
// servicesdropdown.addEventListener('mouseleave', e => {
//     console.log('Mouse has left')
// });


servicelinkhead.addEventListener('mouseenter', e => {
    console.log('mouse has entered')
    servicesdropdown.classList.remove('servicesdropdown-inactive')
    servicesdropdown.classList.add('servicesdropdown-active')
    console.dir(servicesdropdown)
});

servicelinkhead.addEventListener('mouseleave', e => {
    console.log('Mouse has left')
    servicesdropdown.classList.remove('servicesdropdown-active')
    servicesdropdown.classList.add('servicesdropdown-inactive')

});


servicesdropdown.addEventListener('mouseenter', e => {
    console.log('mouse has entered')
    servicesdropdown.classList.remove('servicesdropdown-inactive')
    servicesdropdown.classList.add('servicesdropdown-active')
    console.dir(servicesdropdown)
});

servicesdropdown.addEventListener('mouseleave', e => {
    console.log('Mouse has left')
    servicesdropdown.classList.remove('servicesdropdown-active')
    servicesdropdown.classList.add('servicesdropdown-inactive')

});

// colorboxes.forEach((value, index1) => {

//     value.addEventListener('click', (event) => {
//         if (event.target.style.backgroundColor == "") {
//             console.log(`Hi, I do not have any color asigned to me !!, and I am at positon ${index1}`);
//         } else {
//             console.log(`Hi... the name of this color is ${event.target.style.backgroundColor} and I am at position ${index1+1}`);
//         }
//     })

// })
