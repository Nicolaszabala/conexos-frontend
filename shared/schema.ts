import { z } from "zod";

// Esquemas para validación de formularios del frontend
export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
