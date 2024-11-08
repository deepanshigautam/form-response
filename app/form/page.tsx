// app/form/page.tsx
"use client";

import { useState, ChangeEvent, FormEvent } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { FormData } from '../../types/formTypes';

const FormPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    body: '',
  });
  const [status, setStatus] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('Loading...');

    // Insert form data into Supabase table `form_response`
    const { data, error } = await supabase
      .from('form-response')
      .insert([formData]);

    if (error) {
      setStatus(`Error: ${error.message}`);
    } else {
      setStatus('Submitted successfully!');
      setFormData({ name: '', email: '', body: '' }); // Clear form fields after submission
    }
  };

  return (
    <div>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Message:
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{status}</p>
    </div>
  );
};

export default FormPage;
