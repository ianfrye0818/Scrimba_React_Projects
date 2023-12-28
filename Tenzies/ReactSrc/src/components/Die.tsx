import { DieProps } from '../interfaces';

//start of Die component
const Die = ({ diceObj, setDice }: DieProps) => {
  //const for rendering out the background color of the dice based on if it's held
  const backgroundColor = diceObj.held ? '#59E391' : '#fff';

  //function to change the dice background and its property to held
  function handleClickDice() {
    setDice((prevDice) =>
      prevDice.map((d) => (d.id === diceObj.id ? { ...d, held: !d.held } : d))
    );
  }

  //start of JSX
  return (
    <div
      style={{ backgroundColor: backgroundColor }}
      className='dice'
      onClick={handleClickDice}
    >
      {diceObj.value}
    </div>
  );
};

export default Die;
