import { ReactComponent as CatIcon } from "./cat.svg";
import "./App.css";
import "./Card.css";
import Card from "./Card";
import React, { useState, useEffect } from "react";

function App() {
  const [cards, setCards] = useState([]);
  const [selectedImage, setSelectionImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCats = () => {
    setLoading(true);
    fetch("https://api.thecatapi.com/v1/images/search?limit=6")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setTimeout(() => setLoading(false), 1500);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchCats();
  }, []);



  const handleClick = () => {
    fetchCats();
  };

  const openModal = (image) => {
    setSelectionImage(image);
  };

  const closeModal = () => {
    setSelectionImage(null);
  };


  

  return (
    <div className="app-container">
      <h2>Welcome in Random Cats Page!</h2>
      <CatIcon className="cat-svg" />
      <button className="btn-prime" onClick={handleClick}>
        Refresh cats
      </button>

      {loading ? (
        <div className="loader-wrapper"></div>
      ) : (
        <>
          <div className="cards-container">
            {cards.slice(0, 6).map((cardData, index) => (
              <Card
                key={cardData.id || index}
                title={`Cat ${index + 1}`}
                image={cardData.url}
                onClick={() => openModal(cardData.url)}
              />
            ))}
          </div>

          {selectedImage && (
            <div className="modal" onClick={closeModal}>
              <img src={selectedImage} alt="Cat" className="modal-img" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default App;
