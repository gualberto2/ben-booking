import { toTitleCase } from "./utils";
import { createClient } from "@/utils/supabase/client";

type Team = {
  id: number;
  team_name: string;
  team_color: string;
  user_id: string;
  created_at: string;
};

export async function getTeams(): Promise<Team[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("teams")
    .select("id, team_name, team_color, user_id, created_at")
    .returns<Team[]>();

  if (error) {
    console.error("Error fetching teams:", error);
    return [];
  }
  return data ?? [];
}
