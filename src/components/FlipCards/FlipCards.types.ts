export interface FlipCard {
    id: number;
    title: string;
    description: string;
    image: string; 
  }
  
  export interface FlipCardsProps {
    sectionTitle: string;
    cards: FlipCard[];
    className?: string;
  }