// app/api/gen-regen-sitemap/route.js
import { generateSitemap } from "@/lib/sitemap";
import { revalidatePath } from "next/cache";

export async function POST(request) {
  const secret = request.headers.get("x-webhook-secret");
  if (secret !== process.env.WEBHOOK_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const model =
      body?.model ||
      body?.model_uid ||
      body?.model_uid?.split("::")?.[1]?.split(".")?.[0];

    if (model !== "blog") {
      return new Response("Ignored non-blog event", { status: 204 });
    }

    const slug = body?.entry?.slug;

    // Ping Google when it's a live update
    await generateSitemap({ pingGoogle: true });

    if (slug) {
      await revalidatePath(`/blog/${slug}`);
    }
    await revalidatePath("/blog");
    await revalidatePath("/");

    return new Response(
      JSON.stringify({ message: "Sitemap regenerated and pages revalidated" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook error:", error);
    return new Response(
      JSON.stringify({ message: "Failed to process webhook" }),
      { status: 500 }
    );
  }
}
