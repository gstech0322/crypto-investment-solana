import React from 'react';
import CardComponent from './CardComponent';
import cards from '../../helpers/homeCardsData';
import './Home.css';
import Header from '../../components/LandingPageNavBar/LandingPageHeader';

interface Props {}

const Home: React.FC<Props> = () => {
  // View
  return (
    <>
      <Header />
      <div className="App">
        <header className="App-header">
          <h1>Welcome to Crypto Trading App! 👋💎</h1>
          <div className="home-content">
            {cards.map((card) => {
              return (
                <CardComponent
                  key={card.id}
                  title={card.title}
                  color1={card.color1}
                  color2={card.color2}
                />
              );
            })}
          </div>
        </header>
      </div>
    </>
  );
};

export default Home;
