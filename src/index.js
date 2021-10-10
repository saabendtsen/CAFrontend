import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"
import personFacade from "./personFacade"
import * as bootstrap from 'bootstrap';
import '@popperjs/core';
import { computeStyles } from "@popperjs/core"

document.getElementById("all-content").style.display = "block"
updateList()

document.getElementById("allUserRows").addEventListener('click', e => {
  e.preventDefault();
  const node = e.target;
  const name = node.getAttribute("name")
  const id = node.getAttribute("id")

  switch (name) {
    case "edit": editPerson(id); editModal.toggle; break;
    case "delete": personFacade.deletePerson(id); break;
  }

})

let modalElement = document.getElementById("editmodal")
let editModal = new bootstrap.Modal(modalElement)



function updateList() {
  personFacade.getPersons()
    .then(persons => {
      console.log("i was clicked")
      const personRow = persons.map(person => `
    ${createPersonRow(person)}`)

      const personAsString = personRow.join("")
      document.getElementById("allUserRows").innerHTML = personAsString;
    })
}


function editPerson(id) {
  personFacade.getPerson(id)
    .then(data => {
      console.log(data.address.street)
       
        document.getElementById("edit_id").value = data.id
        document.getElementById("fName").value = data.firstName
        document.getElementById("lName").value = data.lastName
        
        document.getElementById("streetModal").value = data.address.street
        document.getElementById("zipModal").value = data.address.cityInfoDTO.zipcode
        document.getElementById("cityModal").value = data.address.cityInfoDTO.city
      })
    .then(editModal.toggle());
    
    
}

function addPerson() {
  const data = {
    firstName: document.getElementById("fname").value,
    lastName: document.getElementById("lname").value,
    address: {
      street: document.getElementById("street").value,
      additionalInfo: document.getElementById("addressAdditionalInfo").value,
      cityInfoDTO: {
        zipcode: document.getElementById("zipcode").value,
        city: document.getElementById("city").value
      }
    },
    phones: [
      {
        number: document.getElementById("phoneNr").value,
        description: document.getElementById("phoneDes").value
      }
    ],
    hobbies: [
      {
        name: document.getElementById("hobbyName").value,
        description: document.getElementById("hobbyDes").value
      }
    ]
  }
  personFacade.addPerson(data)
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


function seachPersonByID(id) {
  var personRow;
  personFacade.getPerson(id)
    .then(person => {
      personRow = `     
      ${createPersonRow(person)}`

      const stringWithHeader = createPersonHeader() + personRow;
      document.getElementById("seachUserRows").innerHTML = stringWithHeader;
    })
}

function seachPersonsByHobby(hobby) {
  personFacade.getByHobby(hobby)
    .then(persons => {
      const personRow = persons.map(person => `
  ${createPersonRow(person)}`)

      const personAsString = personRow.join("")
      const personWithHeader = createPersonHeader() + personAsString;
      document.getElementById("seachUserRows").innerHTML = personWithHeader;
    })
}



function createPersonHeader() {
  return `
  <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phones</th>
        <th>Hobbies</th>
        <th></th>
        </tr>
  </thead>
  
  `
}

function createPersonRow(person) {

  return `
      <tr>
        <td>${person.id}</td>
        <td>${person.firstName + " " + person.lastName}</td>
        <td>${person.address.street}<br>${person.address.additionalInfo}<br>${person.address.cityInfoDTO.city}<br>${person.address.cityInfoDTO.zipcode}</td>
        <td>${person.phones.map(phone => `
        ${phone.number}<br>${phone.description}`)}</td>
        <td>${person.hobbies.map(hobby => `
        ${hobby.name}<br>${hobby.description}`)}</td>
        <td><input id="${person.id}" type="button"  name="edit" value="edit"/></td>
        <td><input id="${person.id}" type="button"  name="delete" value="delete"/></td>
      </tr>`
}


function deletePerson() {

  const id = document.getElementById("deleteId").value;

  const person = personFacade.getPerson(id).then(getPerson => person = getPerson)
  
  personFacade.deletePerson(id).then(
    alert(person.name + "has been deleted")
  );

  updateList;

}

function sortSeach() {
  const id = document.getElementById("seachId");
  const hobby = document.getElementById("seachHobby");

  if (id.value) {
    seachPersonByID(id.value);
  } else if (hobby.value) {
    seachPersonsByHobby(hobby.value)

  }





}


document.getElementById("seachBtn").onclick = sortSeach;

document.getElementById("deleteBtn").onclick = deletePerson;

document.getElementById("addPersonbtn").onclick = addPerson;

document.getElementById("refreshList").onclick = updateList;



/* 
Do NOT focus on the code below, UNLESS you want to use this code for something different than
the Period2-week2-day3 Exercises
*/

function hideAllShowOne(idToShow) {
  document.getElementById("about_html").style = "display:none"
  document.getElementById("ex1_html").style = "display:none"
  document.getElementById("ex2_html").style = "display:none"
  document.getElementById("ex3_html").style = "display:none"
  document.getElementById(idToShow).style = "display:block"
}

function menuItemClicked(evt) {
  const id = evt.target.id;

  switch (id) {
    case "ex1": hideAllShowOne("ex1_html"); updateList(); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break

  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("ex3_html");



