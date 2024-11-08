// app/api/form/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(request: Request) {
  const formData = await request.json();

  const { data, error } = await supabase
    .from('form_entries')
    .insert([formData]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Submitted successfully!' }, { status: 200 });
}
