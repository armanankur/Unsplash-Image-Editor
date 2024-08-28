// src/components/ImageSearch.js
import React, { useState } from "react";
import axios from "axios";

const ImageSearch = ({ onImageSelect }) => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query, per_page: 8 },
          headers: {
            Authorization: `Client-ID WzrgsotS0vc7iSFy8iI_HKTcrOBEC634iV00tp9otKA`,
          },
        }
      );
      setImages(response.data.results);
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for images"
        style={{
          marginTop: "10px",
          height: "40px",
          width: "400px",
          borderRadius: "12px",
          outline: "none",
          textAlign: "center",
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          margin: "25px",
          height: "40px",
          width: "140px",
          color: "#ecf0f1",
          backgroundColor: "#283747",
          borderRadius: "12px",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        Search
      </button>

      <div
        className="image-results"
        style={{
          display: "flex",
          justifyContent: "space-around",
          gap: "15px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* {images.map((image) => (
          <img
            key={image.id}
            src={image.urls.thumb}
            alt={image.alt_description}
            onClick={() => onImageSelect(image.urls.full)}
            style={{
                marginTop: "25px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-around",
                gap: "15px",
                alignItems: "center",
                flexWrap: "wrap",
                height: "250px",
                width: "250px",
              }}
          />     
        ))} */}

        {images.map((image) => (
          <div key={image.id} className="image-item">
            <img
              src={image.urls.small}
              alt={image.alt}
              style={{
                marginTop: "25px",
                padding: "10px",
                display: "flex",
                justifyContent: "space-around",
                gap: "15px",
                alignItems: "center",
                flexWrap: "wrap",
                height: "250px",
                width: "250px",
              }}
            />
            <button
              onClick={() => onImageSelect(image.urls.full)}
              style={{
                marginLeft: "10px",
                height: "40px",
                width: "140px",
                color: "#ecf0f1",
                backgroundColor: "#283747",
                borderRadius: "12px",
                fontSize: "15px",
                cursor: "pointer",
              }}
            >
              Add Captions
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSearch;
