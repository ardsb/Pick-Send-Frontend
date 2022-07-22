
import React, { useState,useEffect } from "react";

function HomepageReciever(){
    const [PackageTrackDetails, setPackageTrackDetails] = useState([]);
    useEffect(() => {
        async function fetchPackageTracksDetails() {
          let result = await fetch("http://localhost:8080/api/package_tracks");
          result = await result.json();
          setPackageTrackDetails(result);
        }
        fetchPackageTracksDetails();
      }, []);
    
    return(
        <> 
        
        <div className="App">
      <h1> Admin Panel</h1>
      <header className="App-header">
      <h4>Status of the package</h4>
      {
          PackageTrackDetails.map((item) => (
          <input
          type="text"
          value={[item.packageStatus,item.packageId,item.dateCreated]}
          onChange={(e) => setPackageTrackDetails(e.target.value)}
          placeholder="Package Satus"
        ></input>
         ))}
      </header>
      </div>
</>
    )
} 

export default HomepageReciever