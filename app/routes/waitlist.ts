import type { ActionFunctionArgs } from "react-router";
import { data } from "react-router";

export type WaitlistResult =
  | { ok: true; type: string }
  | { ok: false; error: string };

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== "POST") {
    throw data({ ok: false, error: "Method not allowed." }, { status: 405 });
  }

  const form = await request.formData();
  const email = String(form.get("email") || "")
    .trim()
    .toLowerCase();
  const type = String(form.get("type") || "clinic").trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return data(
      { ok: false, error: "Please enter a valid email." } satisfies WaitlistResult,
      { status: 400 },
    );
  }

  const allowed = new Set(["clinic", "vet", "owner", "advocate"]);
  const role = allowed.has(type) ? type : "clinic";

  const webhook = process.env.WAITLIST_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          type: role,
          source: "billionanimals.org",
          createdAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        return data(
          {
            ok: false,
            error: "Could not save your invite. Try again shortly.",
          } satisfies WaitlistResult,
          { status: 502 },
        );
      }
    } catch {
      return data(
        {
          ok: false,
          error: "Could not save your invite. Try again shortly.",
        } satisfies WaitlistResult,
        { status: 502 },
      );
    }
  } else {
    console.info("[waitlist]", { email, type: role });
  }

  return { ok: true, type: role } satisfies WaitlistResult;
}
