import { supabaseServiceClient } from "./supabaseServiceClient";

export default async function getUserIdFromZoomAccountId(zoomAccountId) {
  const { data: userDataFromZoomId, error } = await supabaseServiceClient
    .from("profiles")
    .select("user_id, zoom_user_id")
    .eq("zoom_user_id", zoomAccountId);

  if (userDataFromZoomId.length == 1) {
    return userDataFromZoomId[0].user_id;
  }

  return false;
}
