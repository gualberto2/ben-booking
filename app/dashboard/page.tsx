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
    <section>
      <div></div>
    </section>
  );
};
export default Dashboard;
