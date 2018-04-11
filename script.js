// Initializations in local storage; avoid errors on first run on any browser
if (localStorage.contacts == null) {
  localStorage.contacts = JSON.stringify([]);
}
if (localStorage.idEdited == null) {
  localStorage.idEdited = JSON.stringify(0);
}

//
/*************** add previously stored contacts to DOM ***************/
(function () {
  // attempt to retrieve previously stored contacts for display
  var contacts = getStoredContacts();
  contacts.forEach(function(contact) {displayContact(contact)});
})();

// on submission of form store contact
var form = document.getElementById('contact-form');
form.addEventListener('submit', addContact);

/********** function to store contact on submission of form **********/
function addContact(e) {
  if(form.firstname.value == '' || 
    form.lastname.value == '' || 
    form.phone.value == '' || 
    form.email.value == '' ||
    form.address.value == '') {
    // var removeNotice = Notice('A field is empty', 'yellow', 'black');
    // setTimeout(removeNotice, 2000);
    e.preventDefault();
    return;
  }

  // generate a unique id to identify a particular contact by
  var id = new Date().getTime();

  // create new contact
  var contact = {
    firstname :  form.firstname.value,
    lastname  :  form.lastname.value,
    phone     :  form.phone.value,
    email     :  form.email.value,
    address   :  form.address.value,
    id        :  id
  }

  // capitalize name initials (a little sanitation)
  contact.firstname = contact.firstname[0].toUpperCase() + contact.firstname.slice(1).toLowerCase();
  contact.lastname = contact.lastname[0].toUpperCase() + contact.lastname.slice(1).toLowerCase();

  // add contact to DOM
  displayContact(contact);

  // add contact to local storage
  var contacts = getStoredContacts();
  contacts.push(contact);
  localStorage.contacts = JSON.stringify(contacts);

  // signal that contact has been added
  // var removeNotice = Notice('A Contact has been added!', 'lime', 'white');
  // setTimeout(removeNotice, 2000);

  //displaySortButton();
  e.preventDefault();
}

/******************** Delete Function ********************/
function deleteContact(id) {
  var list = document.getElementById('contact-list');

  // delete 
  var item = document.getElementById(id);
  list.removeChild(item);

  // delete from local storage
  var contacts = getStoredContacts();
  var index = 0; 
  contacts.forEach(function(contact) {
    if( id == contact.id) {
      contacts.splice(index, 1);
    }
    index++;
  });

  // update local storage
  localStorage.contacts = JSON.stringify(contacts);

  // notice that contact is deleted
  // var removeNotice = Notice('A Contact has been deleted!', 'red', 'white');
  // setTimeout(removeNotice, 2000);

}

/*********** function to edit previously stored contact ***********/
function editContact(id) { // editing is actually done in edit.js
  // store id, to be retrieved in edit.js on edit.html
  localStorage.idEdited = JSON.stringify(id);
}

/************ function to show all details of a contact ************/
function showFullDetails(id) {
  var item = document.getElementById(id); // get list item
  var fullDetails = item.getElementsByClassName('full-details')[0]; // get details section

  if(fullDetails != undefined) {
    if(fullDetails.style.display == 'none') {
      fullDetails.style.display = 'block';
      item.title = "click to hide details";
    }
    else {
      fullDetails.style.display = 'none';
      item.title = "click to show details";
    }
  }
}

// /******* function to display (toggle) confirmation message *******/
// function Notice(msg, backgroundColor, textColor) {
//   var updateBox = document.getElementById('confirmation-box');
//   updateBox.style.backgroundColor = backgroundColor;
//   updateBox.style.color = textColor;
//   document.getElementById('confirmation-msg').innerHTML = msg;

//   // toggle display message
//   var end = setInterval(function() {
//     updateBox.style.display = (updateBox.style.display == 'none') ? 'block': 'none';
//   }, 300);

//   // clear display always
//   updateBox.style.display = '';

//   return function () {
//     clearInterval(end);
//   }
// }

// randomly return a color
function color() {
  var colors = ['#f00', 'indigo', '#00f', '#0f0', 'darkgreen', 'maroon',
                'brown', 'tomato', 'darkblue', 'violet', 'orange', 'pink'
              ];
  return colors[Math.floor(Math.random() * 8)];
}

/******* this happens only when a contact is updated in edit.js *******/
if(JSON.parse(localStorage.idEdited) == 'updated') {
  localStorage.idEdited = JSON.stringify(0); // clear id
  // var removeNotice = Notice('Contact has been updated!', 'darkgreen', 'white');
  // setTimeout(removeNotice, 3300); // just testing closure, so cool since i learnt it :smiles
}


/********************************************************************/
/************************* HELPER FUNCTIONS *************************/
/********************************************************************/

// function to retrieve all stored contacts from local storage; this is an array
function getStoredContacts() {
  return JSON.parse(localStorage.contacts);
}


// function to add a single contact to the DOM
function displayContact(contact) {
  var list = document.getElementById('contact-list');

  if(contact.id != undefined){
    var listItem = `<li id="${contact.id}" class="contact" onclick="showFullDetails('${contact.id}')" title="click to show details">
                      <div class="contact-list-details">
                        <img src="pictures/Contacts_64px.png" class="contact-list-image">
                        <p class="contact-list-name">${contact.firstname} ${contact.lastname}</p>
                      </div>
                      <span class="modify">
                        <a class="edit" href="edit.html" onclick="editContact('${contact.id}')" title="click to edit contact details">edit</a>
                        <button class="delete" title="click to delete contact" onclick="deleteContact('${contact.id}')">&times</button>
                      </span>
                      <div class="full-details" style="display:none;">
                      <br><br>
                        <div><strong>Firstname: ${contact.firstname}</strong></div>
                        <div><strong>Lastname: ${contact.lastname}</strong></div>
                        <div><strong>Phone: ${contact.phone} </strong></div>
                        <div><strong>Email: ${contact.email} </strong></div>
                        <div><strong>Address: ${contact.address} </strong></div>
                      </div>
                    </li>`;


    list.innerHTML = listItem + list.innerHTML; // ...for newly added items to appear at the top
  }
}

function clearItemsFromDOM() {
  var list = document.getElementById('contact-list').innerHTML = '';
}
