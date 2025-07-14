import React, { useEffect, useState } from "react";
import "./Gallery.css"; 

function GALLERY() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const number = 4;
    fetch(`https://picsum.photos/v2/list?page=${number}&limit=6`)
      .then(res => res.json())
      .then(data => setPhotos(data))
      .catch(err => console.error("Error fetching images:", err));
  }, []);

  return (
    <div className="gallery-container">
      <h2>Image Gallery</h2>
      <div className="gallery-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img
              src={`https://picsum.photos/id/${photo.id}/300/200`}
              alt={`By ${photo.author}`}
            />
            <p className="author">📷 {photo.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GALLERY;
