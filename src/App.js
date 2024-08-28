// src/App.js
import React, { useState } from "react";
import ImageSearch from "./components/ImageSearch";
import CanvasEditor from "./components/CanvasEditor";
import "./App.css";

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="App">
      <h1
        style={{
          fontSize: "30px",
          textAlign: "center",
          backgroundColor: "#283747",
          color: "#ecf0f1",
          padding: "20px",
        }}
      >
        Unsplash Image Editing App
      </h1>
      <ImageSearch onImageSelect={setSelectedImage} />
      {selectedImage && <CanvasEditor imageUrl={selectedImage} />}
    </div>
  );
};

export default App;
