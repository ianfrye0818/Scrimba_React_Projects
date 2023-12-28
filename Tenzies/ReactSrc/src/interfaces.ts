import { SetStateAction, Dispatch } from 'react';
export interface DiceInterface {
  id: number;
  value: number;
  held: boolean;
}
export interface DieProps {
  setDice: Dispatch<SetStateAction<DiceInterface[]>>;
  diceObj: DiceInterface;
}
