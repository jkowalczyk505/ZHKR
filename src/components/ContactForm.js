import { useState } from "react";
import Button from "./Button";

const empty = { name: "", email: "", subject: "", message: "" };

export default function ContactForm() {
  const [form, setForm]     = useState(empty);
  const [errors, setErrors] = useState({});
  const [touched, setTouch] = useState({});

  const nameRe  = /^[A-Za-zÀ-ÿĄ-Źą-ź\s'-]{2,40}$/;
  const mailRe  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (field, value) => {
    switch (field) {
      case "name":
        return nameRe.test(value) ? "" :
          "Podaj pełne imię i nazwisko (min. 2 znaki)";
      case "email":
        return mailRe.test(value) ? "" : "Niepoprawny adres e-mail";
       case "subject":
        if (value.trim().length < 3)
            return "Temat min. 3 znaki";
        if (value.length > 80)
            return "Temat max. 80 znaków";
        return "";
      case "message":
        if (value.trim().length < 10) return "Wiadomość min. 10 znaków";
        if (value.length > 1000)     return "Wiadomość max. 1000 znaków";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouch((t) => ({ ...t, [name]: true }));
    setErrors((er) => ({ ...er, [name]: validate(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErr = {};
    Object.entries(form).forEach(([field, value]) => {
      const msg = validate(field, value);
      if (msg) newErr[field] = msg;
    });

    setErrors(newErr);
    setTouch({ name: true, email: true, subject: true, message: true });

    if (Object.keys(newErr).length) return;
    console.log("Wysyłam formularz:", form);
    setForm(empty);
    setTouch({});
  };

  const hasError = Object.values(errors).some(Boolean);

  const showErr = (field) => touched[field] && errors[field];

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <label className={showErr("name") ? "error" : ""}>
        <input
          type="text"
          name="name"
          placeholder="Imię i nazwisko"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showErr("name") && <span>{errors.name}</span>}
      </label>

      <label className={showErr("email") ? "error" : ""}>
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showErr("email") && <span>{errors.email}</span>}
      </label>

      <label className={showErr("subject") ? "error" : ""}>
        <input
          type="text"
          name="subject"
          placeholder="Temat"
          value={form.subject}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showErr("subject") && <span>{errors.subject}</span>}
      </label>

      <label className={showErr("message") ? "error" : ""}>
        <textarea
          name="message"
          rows="4"
          placeholder="Wiadomość"
          value={form.message}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {showErr("message") && <span>{errors.message}</span>}
      </label>

      <Button type="submit" variant="primary" disabled={hasError}>
        Wyślij
      </Button>
    </form>
  );
}
