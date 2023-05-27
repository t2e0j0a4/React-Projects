import React , {useState} from 'react'
import Card from './Components/Card'

const data = [
  {
    id: 1,
    name: "John Doe",
    role: "Web Developer",
    desc: "Drinking vinegar polaroid street art echo park, actually semiotics next level butcher master cleanse hammock flexitarian ethical paleo.",
    image: "https://www.course-api.com/images/people/person-3.jpeg",
  },
  {
    id: 2,
    name: "Deepak Raj",
    role: "Project Head",
    desc: "Fingerstache umami squid, kinfolk subway tile selvage tumblr man braid viral kombucha gentrify fanny pack raclette pok pok mustache.",
    image: "https://www.course-api.com/images/people/person-4.jpeg",
  },
  {
    id: 3,
    name: "Kingsley Red",
    role: "UX Designer",
    desc: "Gastropub sustainable tousled prism occupy. Viral XOXO roof party brunch actually, chambray listicle microdosing put a bird on it paleo subway tile squid umami.",
    image: "https://www.course-api.com/images/people/person-2.jpeg",
  },
  {
    id: 4,
    name: "Micheal Richard",
    role: "Q.A Lead",
    desc: "Marfa af yr 3 wolf moon kogi, readymade distillery asymmetrical seitan kale chips fingerstache cloud bread mustache twee messenger bag.",
    image: "https://www.course-api.com/images/people/person-1.jpeg",
  },
];

const App = () => {

  let moveBy = 100;
  let totalCards = data.length;
  const [moveValue, setMoveValue] = useState(1);
  const [moveUpdate, setMoveUpdate] = useState(0);

  const playCarousal = (type) => {

    if (type === 'next') {

      if (moveValue === totalCards) {
        setMoveValue(1);
        setMoveUpdate(0);
      }
      else {
        setMoveUpdate(moveBy * moveValue);
        setMoveValue((val) => val + 1);
      }
    }

    else {

      if (moveValue === 1) {
        setMoveValue(4);
        setMoveUpdate(300);
      }

      else {
        setMoveValue((val) => val - 1);
        setMoveUpdate(moveBy * (moveValue - 2));
      }
      
    }

  }

  return (
    <main className="main">
      <section className="carousal">
        <div className="carousal__track">
          {/* Carousal Items */}
          {data.map((person) => {
            return <Card key={person.id} details={person} moveCardBy={moveUpdate}/>;
          })}
          {/* Carousal Items */}
        </div>
        <div className="carousal__btns">
          <button type="button" title="Back" onClick={(e) => {playCarousal('back')}} className="btn__toggle">
            <ion-icon name="chevron-back"></ion-icon>
          </button>
          <button type="button" title="Next" onClick={(e) => {playCarousal('next')}} className="btn__toggle">
            <ion-icon name="chevron-forward"></ion-icon>
          </button>
        </div>
      </section>
    </main>
  );
}

export default App