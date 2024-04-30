import { useState, useEffect } from "react";
import "./App.css";
import styled from "styled-components";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(
          "https://rickandmortyapi.com/api/character"
        );
        const responseData = await response.json();
        setData(responseData.results);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getData();
  }, []);

  return (
    <CardsContainer>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <Cards status={item.status}>
              <Image src={item.image} alt="" />

              <InfoContainer>
                <h1> {item.name}</h1>
                <p>
                  <Span>Status:</Span> {item.status}
                </p>
                <p>
                  <Span>Species:</Span> {item.species}
                </p>
                <p>
                  <Span>Last known location:</Span> {item.origin.name}
                </p>
                <p>
                  <Span>First seen in:</Span> {item.location.name}
                </p>
              </InfoContainer>
            </Cards>
          </div>
        );
      })}
    </CardsContainer>
  );
}

export default App;

const CardsContainer = styled.div`
  margin: 10px;
  flex-wrap: wrap;
  gap: 20px;
  display: flex;
  justify-content: space-between;
`;
const Cards = styled.div`
  width: 310px;
  box-shadow: 5px 5px 10px gray;
  border-radius: 15px;
  border: 5px solid
    ${({ status }) =>
      status === "Alive" ? "green" : status === "Dead" ? "red" : "gray"};
`;

const InfoContainer = styled.div`
  padding: 10px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 10px 10px 0 0;
`;

const Span = styled.span`
  font-weight: 700;
  color: #296574;
`;
