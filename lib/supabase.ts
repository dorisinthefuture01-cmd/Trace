import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// 检查环境变量是否正确设置
if (!url || !anonKey) {
  console.warn("Supabase environment variables are not properly set:");
  console.warn(`NEXT_PUBLIC_SUPABASE_URL: ${url ? 'Set' : 'Missing'}`);
  console.warn(`NEXT_PUBLIC_SUPABASE_ANON_KEY: ${anonKey ? 'Set' : 'Missing'}`);
}

export const supabase = createClient(url, anonKey);
