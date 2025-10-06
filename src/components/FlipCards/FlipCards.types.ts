export interface FlipCard {
    id: number;
    title: string;
    description: string;
    image: string; // URL obrázku
  }
  
  export interface FlipCardsProps {
    sectionTitle: string;
    cards: FlipCard[];
    className?: string;
  }