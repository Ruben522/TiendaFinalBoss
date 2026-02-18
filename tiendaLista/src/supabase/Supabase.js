import { createClient } from "@supabase/supabase-js";

const supabaseConexion = createClient(
    "https://goeusitnaphhoibnnzsc.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdvZXVzaXRuYXBoaG9pYm5uenNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4Mjg1ODksImV4cCI6MjA4NDQwNDU4OX0.irHPQmaxHJcMuOlfhG2jDN6ilzy1htqaoZ1Kqcn2e9Q",
);

export { supabaseConexion };
