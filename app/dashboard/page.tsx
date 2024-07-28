import { createClient } from "@/utils/supabase/server";

import { redirect } from "next/navigation";

const Dashboard = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div>
      <div>thisis te dashboard</div>
    </div>
  );
};
export default Dashboard;
