import "./style.css"
import "bootstrap/dist/css/bootstrap.css"
import "./jokeFacade"
import jokeFacade from "./jokeFacade"

document.getElementById("all-content").style.display = "block"

/* 
  Add your JavaScript for all exercises Below or in separate js-files, which you must the import above
*/

/* JS For Exercise-1 below */


/* JS For Exercise-2 below */



/* JS For Exercise-3 below */


const URL = "https://manlyman69.rocks/CA1/api/person"
fetch(URL)
.then(res=> res.json())
.then(persons => {
    const personRow = persons.map(person => `
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
    
    </tr>
    `)
    const personAsString = personRow.join("")
    document.getElementById("allUserRows").innerHTML = personAsString;
})


document.getElementById("addPerson").addEventListener('click',addPerson);


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

function addPerson(){
fetch('https://manlyman69.rocks/CA1/api/person', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
}


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



