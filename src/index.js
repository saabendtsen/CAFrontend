import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"
import personFacade from "./personFacade"

document.getElementById("all-content").style.display = "block"

personFacade.getPersons()
  .then(persons => {
    console.log("i was clicked")
    const personRow = persons.map(person => `
    ${createPersonRow(person)}`)

    
    const personAsString = personRow.join("")
    document.getElementById("allUserRows").innerHTML = personAsString;
  })





const data = {
  firstName: "Post",
  lastName: "Man",
  address: {
    street: "Postaddress",
    additionalInfo: "is a place",
    cityInfoDTO: {
      zipcode: "3911",
      city: "Sisimiut"
    }
  },
  phones: [
    {
      number: 74921234,
      description: "Jeg har en nokia"
    }
  ],
  hobbies: [
    {
      name: "Bus spotting"
    }
  ]
}


function addPerson() {
  console.log("i was clicked")

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


function seachPerson(id) {
  var personRow;
  personFacade.getPerson(id)
    .then(person => {
      personRow = `

      <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Address</th>
        <th>Phones</th>
        <th>Hobbies</th>
    </thead>
        ${createPersonRow(person)}`
      document.getElementById("seachUserRows").innerHTML = personRow;
    })

}


function createPersonRow(person){

  return `
  <tr>
        <td>${person.id}</td>
        <td>${person.firstName + " " + person.lastName}</td>
        <td>${person.address.street}<br>${person.address.additionalInfo}</td>
        <td>${person.phones.map(phone => `
        ${phone.number}<br>${phone.description}
        `)}</td>
        <td>${person.hobbies.map(hobby => `
        ${hobby.name}<br>${hobby.description}
        `)}</td>
      </tr>`
}


function deletePerson() {
  const id = document.getElementById("deleteId").value;

  personFacade.deletePerson(id).then(person =>
    alert(person.name + "has been deleted")
    );

}

function sortSeach(){
  const id = document.getElementById("seachId");
  const hobby = document.getElementById("seachHobby");

  if (id.value){
    seachPerson(id.value);
  } else if ( hobby.value){
    console.log( hobby.value)

  }
  


  

}


document.getElementById("seachBtn").onclick = sortSeach;

document.getElementById("deleteBtn").onclick = deletePerson;

document.getElementById("addPersonbtn").onclick = addPerson;

document.getElementById("refreshList").onclick = personFacade.getPersons;



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
    case "ex1": hideAllShowOne("ex1_html"); break
    case "ex2": hideAllShowOne("ex2_html"); break
    case "ex3": hideAllShowOne("ex3_html"); break
    default: hideAllShowOne("about_html"); break

  }
  evt.preventDefault();
}
document.getElementById("menu").onclick = menuItemClicked;
hideAllShowOne("ex3_html");



