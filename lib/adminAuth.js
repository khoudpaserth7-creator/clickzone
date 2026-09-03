import { cookies } from "next/headers";

export const ADMIN_COOKIE = "click_zone_admin";

export function isAdminAuthed() {
  const store = cookies();
  return store.get(ADMIN_COOKIE)?.value === "true";
}
