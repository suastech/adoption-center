import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddPetForm from "../components/AddPetForm";
import axios from "axios";
import EditForm from "../components/EditForm";
import MakeArrayToShow from "../components/MakeArrayToShow";
import SearchBar from "../components/SearchBar";
import GetRequests from "../components/GetRequests";

export default function Admin({ adminLogged }) {
  const navigate = useNavigate();
  
  if (!adminLogged) {
    setTimeout( () => navigate("/"), 3000);
    return ( 
      <div style={{textAlign:"center"}} className="main-content-page">
        <h1>You have not logged in!</h1>
        <h1>Redirecting...</h1>
      </div>
      ) 
  } 
  

  // The real component starts here
  const [petsList, setPetsList] = useState([]);
  const [displayEditForm, setDisplayEditForm] = useState(false);
  const [indexElementToEdit, setIndexElementToEdit] = useState(null);
  const [arrayToShow, setArrayToShow] = useState([]);

  //
  const [displayNewForm, setDisplayNewForm] = useState(false)
  const [displayAllDogs, setDisplayAllDogs] = useState(false)
  const [displayRequests, setDisplayRequests] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

/*   useEffect(() => {
    axios
      .get("https://api-pets.adaptable.app/pets")
      .then((result) => {
        setPetsList(result.data);
        setArrayToShow(result.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []); */

  const [indexToDelete, setIndexToDelete] = useState()
  const [idToDelete, setIdToDelete] = useState();

  function handleDelete(index, petId) {
    setIndexToDelete(index)
    setIdToDelete(petId)
    setConfirmDelete(true)
  }

  function deleteConfirmed() {
    const newList = [...petsList];
    newList.splice(indexToDelete, 1);
    setPetsList(newList);
    axios.delete("https://api-pets.adaptable.app/pets/" + idToDelete)
      .then((response) => {
          console.log(response)
          setConfirmDelete(false)
          setDisplayAllDogs(false)
          alert("Item Deleted")
        }
      )
      .catch((error) => {
        console.log(error)
        alert("It was not possible to delete the item")
        setConfirmDelete(false)
      }
      )
  }

  function handleEdit(index) {
    setIndexElementToEdit(index);
    setDisplayEditForm(true);
  }

  function handleDetails(index, petId) {
    window.open(`/pet/${petId}`, '_blank');
  }

  function handleSeeAll() {
    setDisplayNewForm(false)
    setDisplayRequests(false)
    setDisplayAllDogs(true)
    setIsLoading(true)
    axios.get("https://api-pets.adaptable.app/pets")
      .then((result) => {
        setPetsList(result.data);
        setArrayToShow(result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function handleAddNew() {
    setDisplayAllDogs(false)
    setDisplayRequests(false)
    setDisplayNewForm(true)
  }
  function handleSeeRequest() {
    setDisplayAllDogs(false);
    setDisplayNewForm(false);
    setDisplayRequests(true)
  }
  function activateSearch (searchInfo) {
    MakeArrayToShow(searchInfo, petsList, setArrayToShow);
  }

  // function getLocation(){
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success, error);
  //   } else {
  //     console.log("Geolocation not supported");
  //   }
    
  //   function success(position) {
  //     const latitude = position.coords.latitude;
  //     const longitude = position.coords.longitude;
  //     console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  //   }
    
  //   function error() {
  //     console.log("Unable to retrieve your location");
  //   }
  // }

  // getLocation()

  return (
    <div className="main-content-page" style={ displayNewForm ? {background:'none'}:{} } >
            
      {confirmDelete && 
          <div id="delete-confirmation">
            <h2>Do you want to delete this element?</h2>
            <div className="delete-conf-buttons">
              <button className="btn btn-secondary delete-conf-buttons" onClick={() => setConfirmDelete(false)}>Back</button>
              <button className="btn btn-secondary delete-conf-buttons" onClick={deleteConfirmed}>Delete</button>
          </div>
          </div>
      }

      <div className="wrapper">
        <div className="container container-admin">
          <h1 className="admin-hero-text text-center main-content-light">Welcome, Admin!</h1>

          <div className="container options-admin p-2">
            <div className="row border-0 ">
              <div className="col btn mx-3 admin-options-btn" onClick={handleSeeAll}>See All Pets</div>
              <div className="col btn mx-3 admin-options-btn" onClick={handleAddNew}>Add New Pet</div>
              <div className="col btn mx-3 admin-options-btn" onClick={handleSeeRequest}>See Requests</div>
            </div>
          </div>

        </div>
      </div>

      {displayNewForm &&
      <AddPetForm setDisplayNewForm={setDisplayNewForm} setDisplayAllDogs={setDisplayAllDogs}/>
      } 

      {displayEditForm && (
        <EditForm itemToEdit={petsList[indexElementToEdit]} setDisplayEditForm={setDisplayEditForm} setDisplayAllDogs={setDisplayAllDogs} />
      )}

      {displayAllDogs &&
        (
        isLoading?
        (
          <div className="loading-effect">
            <div className="circle"></div>
            <h2 className="main-content-light">Loading...</h2>
         </div>
        ) :
        (
            <div className="dogs-list container">
              <SearchBar activateSearch={activateSearch}/>
              <h3 className="showing-text main-content-light" style={{color:"white"}}>Showing: {arrayToShow.length} dogs </h3>
              {arrayToShow.map((characterObj, index) => {
                return (
                  <div key={characterObj.id || index} className="col-md-4 cards-admin">
                  <div key={index} className="dog-item">
                      <div className="dog-photos card p-2 m-2 mb-3 shadow">
                        <img className="card-img-top rounded" src={characterObj.image} />
                    
                    <h4 className="card-header font-weight-bold">{characterObj.name}</h4>
                    <div className="card-body">
                    <p className="card-subtitle mb-2 ">{characterObj.breed}</p>
                    <span className="card-subtitle mb-2 text-muted"><span>{characterObj.age} years, </span> 
                    <span>{characterObj.gender}</span></span>
                    </div>
                    
                    <div className="admin-buttons btn-group mx-auto" role="group">
                      <button type="button" className="btn btn-secondary border border-dark" onClick={() => handleDetails(index, characterObj.id)}>Details</button>
                      
                      
                      <button type="button" className="btn btn-secondary border border-dark " onClick={() => handleEdit(index)}>Edit</button>
                      <button type="button" className="btn btn-secondary border border-dark " onClick={() => handleDelete(index,characterObj.id)}>
                        Delete
                      </button>
                      </div>
                    </div>
                    </div>
                  </div>
                );
              })}
            </div>
        ))
      }

      {displayRequests && 
        <GetRequests/>
      }
    </div>
    
  );
}


/*
function getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }
    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      console.log(Latitude: ${latitude}, Longitude: ${longitude});
    }
    function error() {
      console.log("Unable to retrieve your location");
    }
  }
*/