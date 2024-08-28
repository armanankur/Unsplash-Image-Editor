// src/components/CanvasEditor.js
import React, { useEffect, useRef } from "react";
import {
  Canvas,
  Image as FabricImage,
  IText,
  Rect,
  Circle,
  Triangle,
} from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null); // This will store the fabric.Canvas instance

  useEffect(() => {
    // Initialize the fabric canvas and store the instance in fabricCanvasRef
    const canvas = new Canvas(canvasRef.current);
    fabricCanvasRef.current = canvas;

    // Load the image from the URL
    FabricImage.fromURL(imageUrl, (img) => {
      canvas.setWidth(img.width);
      canvas.setHeight(img.height);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    // Cleanup on component unmount
    return () => {
      canvas.dispose();
    };
  }, [imageUrl]);

  const addText = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const text = new IText("Enter text here", {
      left: 50,
      top: 50,
      fill: "#000",
      fontSize: 20,
    });
    canvas.add(text);
  };

  const addShape = (shapeType) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    let shape;
    if (shapeType === "rect") {
      shape = new Rect({
        left: 50,
        top: 50,
        fill: "red",
        width: 100,
        height: 100,
      });
    } else if (shapeType === "circle") {
      shape = new Circle({
        left: 50,
        top: 50,
        fill: "blue",
        radius: 50,
      });
    } else if (shapeType === "triangle") {
      shape = new Triangle({
        left: 50,
        top: 50,
        fill: "green",
        width: 100,
        height: 100,
      });
    }
    canvas.add(shape);
  };

  const downloadImage = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1,
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas-image.png";
    link.click();
  };

  return (
    <div>
      <canvas ref={canvasRef}></canvas>
      <div>
        <button
          onClick={addText}
          style={{
            margin: "25px",
            height: "40px",
            width: "140px",
            color: "#ecf0f1",
            backgroundColor: "#7b241c",
            borderRadius: "12px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Add Text
        </button>
        <button
          onClick={() => addShape("rect")}
          style={{
            margin: "25px",
            height: "40px",
            width: "140px",
            color: "#ecf0f1",
            backgroundColor: "#512e5f",
            borderRadius: "12px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Add Rectangle
        </button>
        <button
          onClick={() => addShape("circle")}
          style={{
            margin: "25px",
            height: "40px",
            width: "140px",
            color: "#ecf0f1",
            backgroundColor: "#154360",
            borderRadius: "12px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Add Circle
        </button>
        <button
          onClick={() => addShape("triangle")}
          style={{
            margin: "25px",
            height: "40px",
            width: "140px",
            color: "#ecf0f1",
            backgroundColor: "#515a5a",
            borderRadius: "12px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Add Triangle
        </button>
        <button
          onClick={downloadImage}
          style={{
            margin: "25px",
            height: "40px",
            width: "140px",
            color: "#ecf0f1",
            backgroundColor: "#145a32",
            borderRadius: "12px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CanvasEditor;
