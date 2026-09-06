import { createClient } from "@supabase/supabase-js";
import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";

export type WaitlistResult =
  | { ok: true; type: string }
  | { ok: false; error: string };

const ROLES = new Set([
  "clinic",
  "vet",
  "owner",
  "researcher",
  "organization",
  "other",
]);

/** Free-text bound. Keeps a pasted essay out of the row. */
const MAX_CONTRIBUTION = 2000;
const MAX_NAME = 200;

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw data({ ok: false, error: "Method not allowed." }, { status: 405 });
  }

  const form = await request.formData();
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase();
  const name = String(form.get("name") || "")
    .trim()
    .slice(0, MAX_NAME);
  const type = String(form.get("type") || "clinic").trim();
  const contribution = String(form.get("contribution") || "")
    .trim()
    .slice(0, MAX_CONTRIBUTION);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return data(
      {
        ok: false,
        error: "Please enter a valid email.",
      } satisfies WaitlistResult,
      { status: 400 },
    );
  }

  const role = ROLES.has(type) ? type : "other";
  const url =
    process.env.SUPABASE_URL ?? "https://zgrktbhvjgzeidvtvbxz.supabase.co";
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[waitlist:dev-no-supabase]", { email, type: role });
      return { ok: true, type: role } satisfies WaitlistResult;
    }
    return data(
      {
        ok: false,
        error: "The form is not configured yet. Try again soon.",
      } satisfies WaitlistResult,
      { status: 503 },
    );
  }

  const supabase = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { error } = await supabase.from("study_waitlist").upsert(
    {
      email,
      name,
      role,
      contribution,
      source: "billionanimals.org",
    },
    { onConflict: "email" },
  );

  if (error) {
    console.error("[waitlist:supabase]", error.message);
    return data(
      {
        ok: false,
        error: "Could not save your details. Try again shortly.",
      } satisfies WaitlistResult,
      { status: 502 },
    );
  }

  return { ok: true, type: role } satisfies WaitlistResult;
}
