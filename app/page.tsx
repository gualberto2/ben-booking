import { HeroHighlightDemo } from "@/components/hero-highlight-temp";

import { createClient } from "@/utils/supabase/server";

import LoginButton from "@/components/auth-components/login";

export default function Home() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="h-screen mx-auto">
      <HeroHighlightDemo />

      <div className="h-[40rem] flex justify-center">
        <div className="flex flex-col items-center justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
