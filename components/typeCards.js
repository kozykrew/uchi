import {useState} from 'react'
import {TypeCard} from './typeCard.js'

import styles from './typeCard.module.css'

const typesRefrigerator = [{type:"Top Freezer", imgpath:"/images/refrigerator/topfreezer.jpg"},
                {type:"Bottom Freezer", imgpath:"/images/refrigerator/bottomfreezer.jpg"},
                {type:"Side by Side", imgpath:"/images/refrigerator/sidebyside.jpg"},
                {type:"French Door", imgpath:"/images/refrigerator/frenchdoor.webp"},
                {type:"Built-in", imgpath:"/images/refrigerator/builtin.png"}];

const typesRoof = [{type:"Asphalt", imgpath:"/images/roof/asphalt.jpeg"},
                  {type:"Clay", imgpath:"/images/roof/clay.png"},
                  {type:"Metal", imgpath:"/images/roof/metal.jpg"},
                  {type:"Slate", imgpath:"/images/roof/slate.jpg"}]

// reference: Selectable Card React Component https://codepen.io/sheefu/pen/mddGQqb?editors=0010
export default function TypeCards() {
  // selected card state of card group
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectCard = (i) => {
    setSelectedCard(i);
    console.log(selectedCard);
  };

  var cards = [];
  for (let i = 0; i < typesRoof.length; i++) {
    cards.push(
      <TypeCard cardID={i} type={typesRoof[i].type} imgpath={typesRoof[i].imgpath}
        onClick={(e) => handleSelectCard(i)} selectedCard={selectedCard} />
    );
  }

  return (
    <div className={styles.cardContainer}>
      {cards}
    </div>
  )
}

// function getTypeCards() {
//   var cards = [];
//   for (let i = 0; i < types.length; i++) {
//     cards.push(
//       <TypeCard key={i} type={types[i].type} imgpath={types[i].imgpath} handleSelectCard={handleSelectCard} />
//     );
//   }
//   return cards;
// }
