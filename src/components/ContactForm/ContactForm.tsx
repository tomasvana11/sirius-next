"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/Button";
import type { ContactFormProps } from "./ContactForm.types";

export const ContactForm: React.FC<ContactFormProps> = ({ className }) => {
  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    Email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: formData.Name,
          Phone: formData.Phone,
          Email: formData.Email,
          fromPage: window.location.pathname,
        }),
      });

      const result = await response.json();
      setIsSubmitting(false);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Formulář byl úspěšně odeslán!",
        });
        setFormData({
          Name: "",
          Phone: "",
          Email: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: result.error || "Něco se pokazilo",
        });
      }
    } catch (error) {
      setIsSubmitting(false);
      setSubmitStatus({
        type: "error",
        message: "Nepodařilo se odeslat formulář",
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4 max-w-md mx-auto", className)}
    >
      <div>
        <input
          type="text"
          id="Name"
          name="Name"
          placeholder="Celé jméno"
          value={formData.Name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <input
          type="tel"
          id="Phone"
          name="Phone"
          placeholder="Telefonní číslo"
          value={formData.Phone}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div>
        <input
          type="email"
          id="Email"
          name="Email"
          placeholder="E-mail"
          value={formData.Email}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <p className="text-sm text-white/80">
        Odesláním souhlasíte se zpracováním osobních údajů
      </p>

      <input
        type="text"
        name="website"
        value=""
        onChange={() => {}}
        style={{ position: "absolute", left: "-9999px" }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {submitStatus.type && (
        <div
          className={cn(
            "p-4 rounded-md text-sm",
            submitStatus.type === "success"
              ? "bg-green-50 text-green-800"
              : "bg-red-50 text-red-800"
          )}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          variant="primary"
          theme="light2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Odesílám..." : "Chci se spojit s odborníky"}
        </Button>
      </div>
    </form>
  );
};
