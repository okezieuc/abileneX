import { supabaseServiceClient } from "./supabaseServiceClient";

type Profile = {
  user_id: string;
  zoom_user_id?: string;
  full_name?: string;
};

export default async function getUserIdFromZoomAccountId(
  zoomAccountId: string
) {
  const { data: userDataFromZoomId, error } = await supabaseServiceClient
    .from<Profile>("profiles")
    .select("user_id, zoom_user_id")
    .eq("zoom_user_id", zoomAccountId);

  if (userDataFromZoomId && userDataFromZoomId.length == 1) {
    return userDataFromZoomId[0].user_id;
  }

  return false;
}
