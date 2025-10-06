// components/FlipCards/FlipCards.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Title } from "@/components/Title";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import type { FlipCardsProps } from "./FlipCards.types";

export const FlipCards: React.FC<FlipCardsProps> = ({
  sectionTitle,
  cards,
  className,
}) => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());

  const toggleCard = (cardId: number) => {
    setFlippedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section className={cn(className)}>
      {/* Nadpis sekce */}
      <Title as="h2" className="text-3xl lg:text-5xl text-center mb-12">
        {sectionTitle}
      </Title>

      {/* Grid karet */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => {
          const isFlipped = flippedCards.has(card.id);

          return (
            <div
              key={card.id}
              className="relative h-[500px] rounded-xl overflow-hidden cursor-pointer"
              onClick={() => toggleCard(card.id)}
            >
              {/* Obrázek na pozadí - hover zoom jen když není flipped */}
              <Image
                src={card.image}
                alt={card.title}
                fill
                className={cn(
                  "object-cover transition-transform duration-500",
                  isFlipped ? "scale-110" : "hover:scale-110"
                )}
              />

              {/* Gradient overlay - mění barvu */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t to-transparent transition-colors duration-700 ease-out pointer-events-none",
                  isFlipped ? "from-black/85" : "from-golden-gate/85"
                )}
              />

              {/* Obsah - fixní pozice */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none">
                <Title as="h3" className="text-white mb-4">
                  {card.title}
                </Title>

                {/* Description - vysouvá se nahoru */}
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-700 ease-in",
                    isFlipped
                      ? "max-h-96 mb-4 opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-white/90 text-base">{card.description}</p>
                </div>

                {/* Tlačítko */}
                <Button
                  variant="primary"
                  theme={isFlipped ? "dark" : undefined}
                  className="self-start"
                >
                  Detail
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
