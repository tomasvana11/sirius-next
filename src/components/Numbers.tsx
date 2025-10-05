// components/Numbers/Numbers.tsx
import React from "react";
import { ContentWrapper } from "@/components/ContentWrapper";
import { Title } from "@/components/Title";

interface NumberItem {
  id: number;
  Number: Array<{
    children: Array<{
      text: string;
    }>;
  }>;
  Description: string;
}

interface NumbersProps {
  numbers: NumberItem[];
}

export const Numbers: React.FC<NumbersProps> = ({ numbers }) => {
  const formatNumber = (text: string) => {
    const parts = text.split(" ");
    if (parts.length === 0) return { first: "", rest: "" };

    return {
      first: parts[0],
      rest: parts.slice(1).join(" "),
    };
  };

  return (
    <section className="py-10 bg-white">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 lg:gap-x-14 gap-y-10">
        {numbers.map((item) => {
          const numberText = item.Number[0]?.children[0]?.text || "";
          const { first, rest } = formatNumber(numberText);

          return (
            <div key={item.id} className="text-left space-y-2">
              <Title
                as="h3"
                className="text-[36px] md:!text-[48px] font-bold leading-none"
              >
                <span className="text-neutral-800">{first}</span>
                {rest && <span className="text-golden-gate"> {rest}</span>}
              </Title>
              <p className="text-base text-neutral-600">{item.Description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
