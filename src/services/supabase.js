import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://hvtjwlwywhxdaezzvcwz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2dGp3bHd5d2h4ZGFlenp2Y3d6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ2MDYwNzEsImV4cCI6MjAxMDE4MjA3MX0.greee2ZhKOLSRQX2N3AFBbfKzsZovufQymy_f5QrIy0";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
