/*
"use client";

import React, { useState, useMemo } from "react";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  CalculatorProps,
  CalculatorState,
  ChartDataPoint,
} from "./Calculator.types";

const INTEREST_RATE = 0.07;

export const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [state, setState] = useState<CalculatorState>({
    initialInvestment: 100000,
    monthlyInvestment: 10000,
    investmentYears: 10,
  });

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const parseNumber = (str: string): number => {
    return parseInt(str.replace(/\s/g, "")) || 0;
  };

  const formatYAxis = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} mil.`;
    }
    return `${Math.round(value / 1000)} tis.`;
  };

  const calculateInvestment = useMemo(() => {
    const { initialInvestment, monthlyInvestment, investmentYears } = state;
    const chartData: ChartDataPoint[] = [];
    const currentYear = new Date().getFullYear();

    for (let year = 0; year < investmentYears; year++) {
      const yearsElapsed = year + 1;
      const initialValue =
        initialInvestment * Math.pow(1 + INTEREST_RATE, yearsElapsed);
      const monthlyValue =
        monthlyInvestment *
        12 *
        ((Math.pow(1 + INTEREST_RATE, yearsElapsed) - 1) / INTEREST_RATE);

      const totalValue = initialValue + monthlyValue;
      const totalSavings =
        initialInvestment + monthlyInvestment * 12 * yearsElapsed;
      const appreciation = totalValue - totalSavings;

      chartData.push({
        year: `${currentYear + year}`,
        savings: Math.round(totalSavings),
        appreciation: Math.round(appreciation),
        total: Math.round(totalValue),
      });
    }

    return chartData;
  }, [state]);

  const finalData = calculateInvestment[calculateInvestment.length - 1];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-lg">
          <p className="text-neutral-600 text-sm mb-2">Rok {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-semibold">
                {entry.name === "savings" ? "Vaše úspory" : "Zhodnocení"}:
              </span>{" "}
              {formatNumber(entry.value)} Kč
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className={cn("py-8 lg:py-14", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
        <div className="space-y-8 w-full">
          <Title as="h2">
            Spočítejte si, kolik{" "}
            <span className="text-golden-gate">vám vydělají</span> vaše peníze
          </Title>

          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Počáteční jednorázová investice
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={formatNumber(state.initialInvestment)}
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value >= 1000 && value <= 1000000) {
                      setState({ ...state, initialInvestment: value });
                    }
                  }}
                  className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  Kč
                </span>
              </div>
            </div>
            <Slider
              value={[state.initialInvestment]}
              onValueChange={([value]) =>
                setState({ ...state, initialInvestment: value })
              }
              min={1000}
              max={1000000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 000 Kč</span>
              <span>1 000 000 Kč</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Pravidelná měsíční investice
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={formatNumber(state.monthlyInvestment)}
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value >= 1000 && value <= 100000) {
                      setState({ ...state, monthlyInvestment: value });
                    }
                  }}
                  className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  Kč
                </span>
              </div>
            </div>
            <Slider
              value={[state.monthlyInvestment]}
              onValueChange={([value]) =>
                setState({ ...state, monthlyInvestment: value })
              }
              min={1000}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 000 Kč</span>
              <span>100 000 Kč</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Doba investování
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={state.investmentYears}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value >= 1 && value <= 50) {
                      setState({ ...state, investmentYears: value });
                    }
                  }}
                  className="w-full pl-3 pr-12 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  let
                </span>
              </div>
            </div>
            <Slider
              value={[state.investmentYears]}
              onValueChange={([value]) =>
                setState({ ...state, investmentYears: value })
              }
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 rok</span>
              <span>50 let</span>
            </div>
          </div>

          <div className="space-y-6 pt-4">
            <div>
              <p className="text-neutral-600 text-base mb-2">
                Odhadovaný výnos
              </p>
              <p className="text-golden-gate text-3xl lg:text-4xl font-bold">
                10,2 % ročně
              </p>
            </div>
            <ButtonLink
              href="/spoluprace#kontakt"
              variant="primary"
              theme="dark"
            >
              Chci začít investovat
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <div className="bg-neutral-50 rounded-xl p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={calculateInvestment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#737373" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#737373" }}
                  tickLine={false}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => {
                    if (value === "savings") return "Vaše úspory";
                    if (value === "appreciation") return "Zhodnocení";
                    return value;
                  }}
                />
                <Bar
                  dataKey="savings"
                  stackId="a"
                  fill="#3D1A0F"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="appreciation"
                  stackId="a"
                  fill="#EC4C19"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#220B03] rounded-xl p-6 lg:p-8 text-white">
            <div className="grid grid-cols-1 gap-6">
              <div>
                <p className="text-white/80 text-sm mb-2">
                  Celková částka na konci investice
                </p>
                <p className="text-golden-gate text-3xl lg:text-4xl font-bold">
                  {formatNumber(finalData?.total || 0)} Kč
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-white/80 text-sm mb-2">Održený úrok</p>
                  <p className="text-golden-gate text-2xl lg:text-3xl font-bold">
                    {formatNumber(finalData?.appreciation || 0)} Kč
                  </p>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-2">
                    Investovaná částka
                  </p>
                  <p className="text-white text-2xl lg:text-3xl font-bold">
                    {formatNumber(finalData?.savings || 0)} Kč
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
*/

/*
// components/Calculator/Calculator.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  CalculatorProps,
  CalculatorState,
  ChartDataPoint,
} from "./Calculator.types";

const INTEREST_RATE = 0.07; // 7% p.a.

export const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [state, setState] = useState<CalculatorState>({
    initialInvestment: 100000,
    monthlyInvestment: 10000,
    investmentYears: 10,
  });

  // Formátování čísla s mezerami
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Parse čísla z inputu (odstraní mezery)
  const parseNumber = (str: string): number => {
    return parseInt(str.replace(/\s/g, "")) || 0;
  };

  // Formátování pro Y osu grafu
  const formatYAxis = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} mil.`;
    }
    return `${Math.round(value / 1000)} tis.`;
  };

  // Výpočet investice s složeným úročením
  // OPRAVENO: dependency array používá jednotlivé hodnoty místo celého objektu state
  const calculateInvestment = useMemo(() => {
    const { initialInvestment, monthlyInvestment, investmentYears } = state;
    const chartData: ChartDataPoint[] = [];
    const currentYear = new Date().getFullYear();

    for (let year = 0; year < investmentYears; year++) {
      const yearsElapsed = year + 1;

      // Složené úročení pro počáteční investici
      const initialValue =
        initialInvestment * Math.pow(1 + INTEREST_RATE, yearsElapsed);

      // Budoucí hodnota pravidelných měsíčních plateb
      const monthlyValue =
        monthlyInvestment *
        12 *
        ((Math.pow(1 + INTEREST_RATE, yearsElapsed) - 1) / INTEREST_RATE);

      const totalValue = initialValue + monthlyValue;
      const totalSavings =
        initialInvestment + monthlyInvestment * 12 * yearsElapsed;
      const appreciation = totalValue - totalSavings;

      chartData.push({
        year: `${currentYear + year}`,
        savings: Math.round(totalSavings),
        appreciation: Math.round(appreciation),
        total: Math.round(totalValue),
      });
    }

    return chartData;
  }, [state.initialInvestment, state.monthlyInvestment, state.investmentYears]); // OPRAVENO

  const finalData = calculateInvestment[calculateInvestment.length - 1];

  // Custom Tooltip pro graf
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-lg">
          <p className="text-neutral-600 text-sm mb-2">Rok {label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-semibold">
                {entry.name === "savings" ? "Vaše úspory" : "Zhodnocení"}:
              </span>{" "}
              {formatNumber(entry.value)} Kč
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className={cn("py-8 lg:py-14", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
        <div className="space-y-8 w-full">
          <Title as="h2">
            Spočítejte si, kolik{" "}
            <span className="text-golden-gate">vám vydělají</span> vaše peníze
          </Title>

          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Počáteční jednorázová investice
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={formatNumber(state.initialInvestment)}
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value >= 1000 && value <= 1000000) {
                      setState((prev) => ({
                        ...prev,
                        initialInvestment: value,
                      }));
                    }
                  }}
                  className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  Kč
                </span>
              </div>
            </div>
            <Slider
              value={[state.initialInvestment]}
              onValueChange={([value]) =>
                setState((prev) => ({ ...prev, initialInvestment: value }))
              }
              min={1000}
              max={1000000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 000 Kč</span>
              <span>1 000 000 Kč</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Pravidelná měsíční investice
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={formatNumber(state.monthlyInvestment)}
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value >= 1000 && value <= 100000) {
                      setState((prev) => ({
                        ...prev,
                        monthlyInvestment: value,
                      }));
                    }
                  }}
                  className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  Kč
                </span>
              </div>
            </div>
            <Slider
              value={[state.monthlyInvestment]}
              onValueChange={([value]) =>
                setState((prev) => ({ ...prev, monthlyInvestment: value }))
              }
              min={1000}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 000 Kč</span>
              <span>100 000 Kč</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Doba investování
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={state.investmentYears}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value >= 1 && value <= 50) {
                      setState((prev) => ({ ...prev, investmentYears: value }));
                    }
                  }}
                  className="w-full pl-3 pr-12 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  let
                </span>
              </div>
            </div>
            <Slider
              value={[state.investmentYears]}
              onValueChange={([value]) =>
                setState((prev) => ({ ...prev, investmentYears: value }))
              }
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 rok</span>
              <span>50 let</span>
            </div>
          </div>

          <div className="hidden lg:block space-y-6 pt-4">
            <div>
              <p className="text-neutral-600 text-base mb-2">
                Odhadovaný výnos
              </p>
              <p className="text-golden-gate text-3xl lg:text-4xl font-bold">
                7 % ročně
              </p>
            </div>
            <ButtonLink
              href="/spoluprace#kontakt"
              variant="primary"
              theme="dark"
            >
              Chci začít investovat
            </ButtonLink>
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <div className="bg-neutral-50 rounded-xl p-3 md:p-4 lg:p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={calculateInvestment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#737373" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#737373" }}
                  tickLine={false}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                  iconSize={16}
                  formatter={(value) => {
                    if (value === "savings") return "Vaše úspory";
                    if (value === "appreciation") return "Zhodnocení";
                    return value;
                  }}
                />
                <Bar
                  dataKey="savings"
                  stackId="a"
                  fill="#3D1A0F"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="appreciation"
                  stackId="a"
                  fill="#EC4C19"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-[#220B03] rounded-xl p-6 lg:p-8 text-white">
            <div className="hidden lg:flex items-stretch gap-6">
              <div className="flex-1">
                <p className="text-white/80 text-sm mb-2">
                  Celková částka na konci investice
                </p>
                <Title as="h4" className="text-golden-gate">
                  {formatNumber(finalData?.total || 0)} Kč
                </Title>
              </div>

              <div className="w-px bg-white/10" />

              <div className="flex-1">
                <p className="text-white/80 text-sm mb-2">Održený úrok</p>
                <Title as="h4" className="text-golden-gate text-xl">
                  {formatNumber(finalData?.appreciation || 0)} Kč
                </Title>
              </div>

              <div className="flex-1">
                <p className="text-white/80 text-sm mb-2">Investovaná částka</p>
                <Title as="h4" className="text-white text-xl">
                  {formatNumber(finalData?.savings || 0)} Kč
                </Title>
              </div>
            </div>

            <div className="lg:hidden space-y-6">
              <div>
                <p className="text-white/80 text-sm mb-2">
                  Celková částka na konci investice
                </p>
                <Title as="h4" className="text-golden-gate text-2xl">
                  {formatNumber(finalData?.total || 0)} Kč
                </Title>
              </div>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/80 text-sm mb-2">Održený úrok</p>
                  <Title as="h4" className="text-golden-gate text-lg">
                    {formatNumber(finalData?.appreciation || 0)} Kč
                  </Title>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-2">
                    Investovaná částka
                  </p>
                  <Title as="h4" className="text-white text-lg">
                    {formatNumber(finalData?.savings || 0)} Kč
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden space-y-6 pt-8">
        <div>
          <p className="text-neutral-600 text-base mb-2">Odhadovaný výnos</p>
          <p className="text-golden-gate text-3xl font-bold">7 % ročně</p>
        </div>
        <ButtonLink href="/spoluprace#kontakt" variant="primary" theme="dark">
          Chci začít investovat
        </ButtonLink>
      </div>
    </section>
  );
};
*/

// components/Calculator/Calculator.tsx
"use client";

import React, { useState, useMemo } from "react";
import { Title } from "@/components/Title";
import { ButtonLink } from "@/components/ButtonLink";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type {
  CalculatorProps,
  CalculatorState,
  ChartDataPoint,
} from "./Calculator.types";

const INTEREST_RATE = 0.07; // 7% p.a.

// PŘIDÁNO: TypeScript interface pro Tooltip
interface TooltipPayloadEntry {
  name: string;
  value: number;
  color: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({ className }) => {
  const [state, setState] = useState<CalculatorState>({
    initialInvestment: 100000,
    monthlyInvestment: 10000,
    investmentYears: 10,
  });

  // Formátování čísla s mezerami
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Parse čísla z inputu (odstraní mezery)
  const parseNumber = (str: string): number => {
    return parseInt(str.replace(/\s/g, "")) || 0;
  };

  // Formátování pro Y osu grafu
  const formatYAxis = (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(value % 1000000 === 0 ? 0 : 1)} mil.`;
    }
    return `${Math.round(value / 1000)} tis.`;
  };

  // Výpočet investice s složeným úročením
  const calculateInvestment = useMemo(() => {
    const { initialInvestment, monthlyInvestment, investmentYears } = state;
    const chartData: ChartDataPoint[] = [];
    const currentYear = new Date().getFullYear();

    for (let year = 0; year < investmentYears; year++) {
      const yearsElapsed = year + 1;

      // Složené úročení pro počáteční investici
      const initialValue =
        initialInvestment * Math.pow(1 + INTEREST_RATE, yearsElapsed);

      // Budoucí hodnota pravidelných měsíčních plateb
      const monthlyValue =
        monthlyInvestment *
        12 *
        ((Math.pow(1 + INTEREST_RATE, yearsElapsed) - 1) / INTEREST_RATE);

      const totalValue = initialValue + monthlyValue;
      const totalSavings =
        initialInvestment + monthlyInvestment * 12 * yearsElapsed;
      const appreciation = totalValue - totalSavings;

      chartData.push({
        year: `${currentYear + year}`,
        savings: Math.round(totalSavings),
        appreciation: Math.round(appreciation),
        total: Math.round(totalValue),
      });
    }

    return chartData;
  }, [state.initialInvestment, state.monthlyInvestment, state.investmentYears]);

  const finalData = calculateInvestment[calculateInvestment.length - 1];

  // Custom Tooltip pro graf - OPRAVENO: proper TypeScript typy
  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-neutral-200 rounded-lg p-3 shadow-lg">
          <p className="text-neutral-600 text-sm mb-2">Rok {label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-semibold">
                {entry.name === "savings" ? "Vaše úspory" : "Zhodnocení"}:
              </span>{" "}
              {formatNumber(entry.value)} Kč
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section className={cn("py-8 lg:py-14", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8 lg:gap-12">
        {/* Levá strana - Title, Slidery, Odhadovaný výnos a tlačítko (desktop) */}
        <div className="space-y-8 w-full">
          {/* Title */}
          <Title as="h2">
            Spočítejte si, kolik{" "}
            <span className="text-golden-gate">vám vydělají</span> vaše peníze
          </Title>

          {/* Počáteční jednorázová investice */}
          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Počáteční jednorázová investice
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={formatNumber(state.initialInvestment)}
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value >= 1000 && value <= 1000000) {
                      setState((prev) => ({
                        ...prev,
                        initialInvestment: value,
                      }));
                    }
                  }}
                  className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  Kč
                </span>
              </div>
            </div>
            <Slider
              value={[state.initialInvestment]}
              onValueChange={([value]) =>
                setState((prev) => ({ ...prev, initialInvestment: value }))
              }
              min={1000}
              max={1000000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 000 Kč</span>
              <span>1 000 000 Kč</span>
            </div>
          </div>

          {/* Pravidelná měsíční investice */}
          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Pravidelná měsíční investice
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={formatNumber(state.monthlyInvestment)}
                  onChange={(e) => {
                    const value = parseNumber(e.target.value);
                    if (value >= 1000 && value <= 100000) {
                      setState((prev) => ({
                        ...prev,
                        monthlyInvestment: value,
                      }));
                    }
                  }}
                  className="w-full pl-3 pr-10 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  Kč
                </span>
              </div>
            </div>
            <Slider
              value={[state.monthlyInvestment]}
              onValueChange={([value]) =>
                setState((prev) => ({ ...prev, monthlyInvestment: value }))
              }
              min={1000}
              max={100000}
              step={1000}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 000 Kč</span>
              <span>100 000 Kč</span>
            </div>
          </div>

          {/* Doba investování */}
          <div>
            <div className="flex justify-between items-center mb-4 gap-4">
              <label className="text-neutral-800 font-semibold flex-shrink-0">
                Doba investování
              </label>
              <div className="relative flex-shrink-0 w-32">
                <input
                  type="text"
                  value={state.investmentYears}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    if (value >= 1 && value <= 50) {
                      setState((prev) => ({ ...prev, investmentYears: value }));
                    }
                  }}
                  className="w-full pl-3 pr-12 py-2 border border-neutral-300 rounded-lg text-left focus:outline-none focus:ring-2 focus:ring-golden-gate"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                  let
                </span>
              </div>
            </div>
            <Slider
              value={[state.investmentYears]}
              onValueChange={([value]) =>
                setState((prev) => ({ ...prev, investmentYears: value }))
              }
              min={1}
              max={50}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-neutral-500 mt-2">
              <span>1 rok</span>
              <span>50 let</span>
            </div>
          </div>

          {/* Odhadovaný výnos a tlačítko - POUZE DESKTOP */}
          <div className="hidden lg:block space-y-6 pt-4">
            <div>
              <p className="text-neutral-600 text-base mb-2">
                Odhadovaný výnos
              </p>
              <p className="text-golden-gate text-3xl lg:text-4xl font-bold">
                7 % ročně
              </p>
            </div>
            <ButtonLink
              href="/spoluprace#kontakt"
              variant="primary"
              theme="dark"
            >
              Chci začít investovat
            </ButtonLink>
          </div>
        </div>

        {/* Pravá strana - Graf a výsledky */}
        <div className="space-y-6 lg:space-y-8">
          {/* Graf */}
          <div className="bg-neutral-50 rounded-xl p-3 md:p-4 lg:p-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={calculateInvestment}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                <XAxis
                  dataKey="year"
                  tick={{ fill: "#737373" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#737373" }}
                  tickLine={false}
                  tickFormatter={formatYAxis}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  iconType="circle"
                  iconSize={16}
                  formatter={(value) => {
                    if (value === "savings") return "Vaše úspory";
                    if (value === "appreciation") return "Zhodnocení";
                    return value;
                  }}
                />
                <Bar
                  dataKey="savings"
                  stackId="a"
                  fill="#3D1A0F"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="appreciation"
                  stackId="a"
                  fill="#EC4C19"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Výsledky - tmavý panel */}
          <div className="bg-[#220B03] rounded-xl p-6 lg:p-8 text-white">
            {/* Desktop layout */}
            <div className="hidden lg:flex items-stretch gap-6">
              <div className="flex-1">
                <p className="text-white/80 text-sm mb-2">
                  Celková částka na konci investice
                </p>
                <Title as="h4" className="text-golden-gate">
                  {formatNumber(finalData?.total || 0)} Kč
                </Title>
              </div>

              {/* Vertical divider */}
              <div className="w-px bg-white/10" />

              <div className="flex-1">
                <p className="text-white/80 text-sm mb-2">Održený úrok</p>
                <Title as="h4" className="text-golden-gate text-xl">
                  {formatNumber(finalData?.appreciation || 0)} Kč
                </Title>
              </div>

              <div className="flex-1">
                <p className="text-white/80 text-sm mb-2">Investovaná částka</p>
                <Title as="h4" className="text-white text-xl">
                  {formatNumber(finalData?.savings || 0)} Kč
                </Title>
              </div>
            </div>

            {/* Mobile layout */}
            <div className="lg:hidden space-y-6">
              <div>
                <p className="text-white/80 text-sm mb-2">
                  Celková částka na konci investice
                </p>
                <Title as="h4" className="text-golden-gate text-2xl">
                  {formatNumber(finalData?.total || 0)} Kč
                </Title>
              </div>

              <div className="h-px bg-white/10" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/80 text-sm mb-2">Održený úrok</p>
                  <Title as="h4" className="text-golden-gate text-lg">
                    {formatNumber(finalData?.appreciation || 0)} Kč
                  </Title>
                </div>
                <div>
                  <p className="text-white/80 text-sm mb-2">
                    Investovaná částka
                  </p>
                  <Title as="h4" className="text-white text-lg">
                    {formatNumber(finalData?.savings || 0)} Kč
                  </Title>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Odhadovaný výnos a tlačítko - POUZE MOBILE */}
      <div className="lg:hidden space-y-6 pt-8">
        <div>
          <p className="text-neutral-600 text-base mb-2">Odhadovaný výnos</p>
          <p className="text-golden-gate text-3xl font-bold">7 % ročně</p>
        </div>
        <ButtonLink href="/spoluprace#kontakt" variant="primary" theme="dark">
          Chci začít investovat
        </ButtonLink>
      </div>
    </section>
  );
};
