var form = document.getElementById('update-form');

// autofill form with current details of contact being edited
(function () {
  var contacts = getStoredContacts();
  var idEdited = JSON.parse(localStorage.idEdited);

  contacts.forEach(function (contact) {
    if(idEdited == contact.id) {
      form.firstname.value  = contact.firstname;
      form.lastname.value   = contact.lastname;
      form.phone.value      = contact.phone;
      form.address.value    = contact.address;
      form.email.value      = contact.email;
    }
  });
})();

// on submission of form update contact
form.addEventListener('submit', updateContact);

/**************** function to update edited contact ****************/
function updateContact() {
  var contacts = getStoredContacts();
  var idEdited = JSON.parse(localStorage.idEdited);

  contacts.forEach(function (contact) {
    if(idEdited == contact.id) { // capitalize name initials (a little sanitation)
      contact.firstname = form.firstname.value[0].toUpperCase() + form.firstname.value.slice(1).toLowerCase(),
      contact.lastname  = form.lastname.value[0].toUpperCase() + form.lastname.value.slice(1).toLowerCase(),
      contact.phone     = form.phone.value,
      contact.address   = form.address.value,
      contact.email     = form.email.value
    }
  });

  // add contact to local storage
  localStorage.contacts = JSON.stringify(contacts);
  localStorage.idEdited = JSON.stringify('updated');
}


/****** HELPER FUNCTIONS ******/

// function to retrieve all stored contacts from local storage; this is an array
function getStoredContacts() {
  return JSON.parse(localStorage.contacts);
}
