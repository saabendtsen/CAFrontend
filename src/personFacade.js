//const URL = "https://manlyman69.rocks/CA1/api/person"
//const URL = "http://192.168.1.59:8081/CA1-1.0.1/api/person" //HP server
const URL = "http://localhost:8080/CA1_war_exploded/api/person" //Localhost



function getPersons(){
    return fetch(URL)
    .then(res => res.json())
}

function getPerson(id){
  return fetch(`${URL}/${id}`)
  .then(res => res.json())
}

function addPerson(person){
    const options = makeOptions("POST",person)
    return fetch(URL,options)
    .then(res => res.json())
}

function editPerson(person){

}

function deletePerson(id){
  console.log(id)
  const options = makeOptions("DELETE")
  return fetch(`${URL}/${id}`,options)
  .then(res => res.json())
}


const personFacade = {
    getPersons,
    getPerson,
    addPerson,
    editPerson,
    deletePerson
}


function makeOptions(method, body) {
    var opts =  {
      method: method,
      headers: {
        "Content-type": "application/json",
        "Accept": "application/json"
      }
    }
    if(body){
      opts.body = JSON.stringify(body);
    }
    return opts;
   }
   

   function handleHttpErrors(res){
    if(!res.ok){
      return Promise.reject({status: res.status, fullError: res.json() })
    }
    return res.json();
   }
   

export default personFacade;