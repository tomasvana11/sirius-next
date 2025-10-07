/*
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
    gdprConsent: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.gdprConsent) {
      setSubmitStatus({
        type: "error",
        message: "Musíte souhlasit se zpracováním osobních údajů",
      });
      return;
    }

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
        }),
      });

      const result = await response.json();

      setIsSubmitting(false);

      if (result.success) {
        setSubmitStatus({
          type: "success",
          message: "Formulář byl úspěšně odeslán!",
        });
        // Reset formuláře
        setFormData({
          Name: "",
          Phone: "",
          Email: "",
          gdprConsent: false,
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
    <>
      <style jsx>{`
        .custom-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 24px;
          height: 24px;
          min-width: 24px;
          border: none;
          border-radius: 8px;
          background-color: white;
          cursor: pointer;
          position: relative;
          transition: all 0.2s ease;
        }

        .custom-checkbox:checked {
          background-color: white;
        }

        .custom-checkbox:checked::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          width: 6px;
          height: 10px;
          border: solid #ec4c19;
          border-width: 0 2px 2px 0;
        }

        .custom-checkbox:focus {
          outline: none;
        }
      `}</style>

      <form
        onSubmit={handleSubmit}
        className={cn("space-y-2 max-w-md mx-auto", className)}
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
            className="w-full p-3 rounded-xl bg-white focus:outline-none "
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
            className="w-full p-3 rounded-xl bg-white focus:outline-none "
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
            className="w-full p-3 rounded-xl bg-white focus:outline-none "
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="gdprConsent"
            name="gdprConsent"
            checked={formData.gdprConsent}
            onChange={handleChange}
            className="custom-checkbox"
          />
          <label htmlFor="gdprConsent" className="text-sm text-white/80">
            Souhlasím se zpracováním osobních údajů
          </label>
        </div>

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
    </>
  );
};
*/

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
      {/* Jméno */}
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

      {/* Telefon */}
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

      {/* Email */}
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

      {/* Text GDPR */}
      <p className="text-sm text-white/80">
        Odesláním souhlasíte se zpracováním osobních údajů
      </p>

      {/* Honeypot */}
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

      {/* Status zpráva */}
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

      {/* Submit button */}
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
