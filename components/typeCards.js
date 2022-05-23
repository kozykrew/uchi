import {useState} from 'react'
import {TypeCard} from './typeCard.js'
import { supabase } from '../utils/supabaseClient'
import styles from './typeCard.module.css'



let types = []

// reference: Selectable Card React Component https://codepen.io/sheefu/pen/mddGQqb?editors=0010
export default function TypeCards(props) {
  // selected card state of card group
  console.log(props.name)
  const [selectedCard, setSelectedCard] = useState(null);

  async function updateType(type) {
      const user = supabase.auth.user()
      const updates = {
        featureType: type,
      }
      let { data } = await supabase.from('UserHome').update(updates).eq('userID', user.id).eq('featureName', props.name)
  }  

  if (props.name == 'refrigerator') {
    types = [{type:"Top Freezer", imgpath:"/images/refrigerator/topfreezer.jpg"},
                {type:"Bottom Freezer", imgpath:"/images/refrigerator/bottomfreezer.jpg"},
                {type:"Side by Side", imgpath:"/images/refrigerator/sidebyside.jpg"},
                {type:"French Door", imgpath:"/images/refrigerator/frenchdoor.webp"},
                {type:"Built-in", imgpath:"/images/refrigerator/builtin.png"}];
  } else if (props.name == 'roof') {
    types = [{type:"Asphalt", imgpath:"/images/roof/asphalt.jpeg"},
    {type:"Clay", imgpath:"/images/roof/clay.png"},
    {type:"Metal", imgpath:"/images/roof/metal.jpg"},
    {type:"Slate", imgpath:"/images/roof/slate.jpg"}]
  }

  const handleSelectCard = (i) => {
    setSelectedCard(i);
    updateType(types[i].type)
  };

  var cards = [];
  for (let i = 0; i < types.length; i++) {
    cards.push(
      <TypeCard cardID={i} type={types[i].type} imgpath={types[i].imgpath}
        onClick={(e) => handleSelectCard(i)} selectedCard={selectedCard} selectedName={props.name}/>
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
