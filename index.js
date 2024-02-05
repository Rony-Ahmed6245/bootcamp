
// main data 
const data = [
  {
    id:1,
    title: 'modern javascript 01',
    img: 'https://i.ibb.co/HdqPnmb/3d-illustration-wallet-with-coins-credit-cards-prev-ui.png',
    seats:60,
    price: 1450
},
{
    id:2,
    title: 'modern javascript 02',
    img: 'https://i.ibb.co/HdqPnmb/3d-illustration-wallet-with-coins-credit-cards-prev-ui.png',
    seats:60,
    price: 1360
},
{
    id:3,
    title: 'modern javascript 03',
    img: 'https://i.ibb.co/HdqPnmb/3d-illustration-wallet-with-coins-credit-cards-prev-ui.png',
    seats:60,
    price: 1300
},
{
    id:4,
    title:'modern javascript 04',
    img: 'https://i.ibb.co/HdqPnmb/3d-illustration-wallet-with-coins-credit-cards-prev-ui.png',
    seats:60,
    price: 1400
},
{
    id:5,
    title:'modern javascript 05',
    img: 'https://i.ibb.co/HdqPnmb/3d-illustration-wallet-with-coins-credit-cards-prev-ui.png',
    seats:60,
    price: 1600
},
{
    id:6,
    title:'modern javascript 06',
    img: 'https://i.ibb.co/HdqPnmb/3d-illustration-wallet-with-coins-credit-cards-prev-ui.png',
    seats:60,
    price: 1200
},
];




// start js code 

const cart = {
  items: [],
  subtotal: 0,
};



// dynamic card function 
function renderCourses() {
  const parentElement = document.getElementById('parent');
  parentElement.innerHTML = data.map(item => {
    return `
    <div class="card w-80 bg-base-100 shadow-xl">
      <figure class="px-4 pt-8">
        <img src="${item.img}" alt="Course Image" />
      </figure>
      <div class="p-4 px-4 text-start">
        <h2 class="card-title text-2xl">${item.title}</h2>
        <p class="mb-2">${item.price} TK</p>
        <button class="buy-btn rounded-full btn-sm text-white hover:bg-green-600 bg-[#21B573]"
          onclick="buyCourse(${item.id}, '${item.title}', ${item.price}, 'course-${item.id}')">
          Buy Courses
        </button>
      </div>
      <div class="flex justify-between p-3">
        <div class="flex items-center gap-2">
          <img src="./images/calendar-outline 1.png" alt="" srcset="">
          <p>Start 20 April, 2021</p>
        </div>
        <div class="flex items-center gap-2">
          <img src="./images/people-outline 1.png" alt="" srcset="">
          <p>${item.seats} Seats</p>
        </div>
      </div>
    </div>`;
  }).join('');
}






function buyCourse(id, title, price, courseId) {
  const selectedItem = data.find(item => item.id === id);

  if (selectedItem && selectedItem.seats > 0) {
    const newItem = { id, title, price };
    cart.items.push(newItem);
    cart.subtotal += price;

    // Decrease seat
    selectedItem.seats--;

    // Render 
    renderCartCard(courseId, title, price, selectedItem.img);

    renderCart();
    // update 
    renderCourses(); 
  } else {
    alert('No available seats for this course!');
  }
}


//---------------------------- remove cart item seat------------------------


function removeFromCart(courseId) {
  const removedItemIndex = cart.items.findIndex(item => `course-${item.id}` === courseId);

  if (removedItemIndex !== -1) {
    const removedItem = cart.items[removedItemIndex];

    // Increase  seats
    const selectedCourse = data.find(item => item.id === removedItem.id);
    selectedCourse.seats++;

    cart.subtotal -= removedItem.price;
    cart.items.splice(removedItemIndex, 1);

    // Remove the card 
    const removedCard = document.getElementById(courseId);
    removedCard.remove();

    renderCart();
    renderCourses(); 
  } else {
    alert('Course not found in the cart!');
  }
}


// ---------------------calculate --------------------------

function renderCart() {
  const subtotalInfo = document.getElementById('subtotal-info');
  const totalAmount = document.getElementById('total-amount');

  subtotalInfo.textContent = `${cart.items.length} Items`;
  totalAmount.textContent = `${cart.subtotal} TK`;
}




// -------------------generate card ---------------------------------

function renderCartCard(courseId, title, price, img) {
  const menuContainer = document.getElementById('menu-container');

  const newCard = document.createElement('div');
  newCard.classList.add('card', 'card-side', 'flex');
  newCard.id = courseId;

  newCard.innerHTML = `
    <figure>
      <img class="w-16 p-2 rounded-2xl" src="${img}" alt="Course Image" />
    </figure>
    <div class="flex">
      <div class="p-1">
        <h2 class="font-bold">${title}!</h2>
        <p>${price} TK</p>
      </div>
      <button class="btn btn-square" onclick="removeFromCart('${courseId}')">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  `;

  menuContainer.appendChild(newCard);
}

document.addEventListener('DOMContentLoaded', () => {
  renderCourses();
  renderCart();
});