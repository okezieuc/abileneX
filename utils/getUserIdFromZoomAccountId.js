import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";

export default async function getUserIdFromZoomAccountId(zoomAccountId) {
  const { data: userDataFromZoomId, error } = await supabaseClient
    .from("profiles")
    .select("user_id, zoom_user_id")
    .eq("zoom_user_id", zoomAccountId);

  if (userDataFromZoomId.length == 1) {
    return userDataFromZoomId[0].user_id;
  }

  return false;
}
