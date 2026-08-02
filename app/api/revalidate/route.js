// app/api/revalidate/page.js
import { revalidateTag, revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { JOBS_CACHE_TAG, JOBS_ROUTE } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function POST(request) {
  const secret = request.headers.get("x-strapi-signature");
  const strapiWebhookSecret = process.env.STRAPI_WEBHOOK_SECRET;

  if (!secret || !strapiWebhookSecret) {
    console.warn("Missing webhook secret");
    return NextResponse.json(
      { message: "Error: Unauthorized" },
      { status: 401 }
    );
  }

  const secretBuffer = Buffer.from(secret);
  const strapiWebhookSecretBuffer = Buffer.from(strapiWebhookSecret);

  if (
    secretBuffer.length !== strapiWebhookSecretBuffer.length ||
    !timingSafeEqual(secretBuffer, strapiWebhookSecretBuffer)
  ) {
    console.warn("Unauthorized webhook call");
    return NextResponse.json(
      { message: "Error: Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const { model, entry } = body;

    if (model === "job-position" && entry?.erp_job_id) {
      revalidateTag(JOBS_CACHE_TAG);
      revalidateTag(`job:${entry.erp_job_id}`);
      revalidatePath(JOBS_ROUTE);

      console.log(`Revalidated job position: ${entry.erp_job_id}`);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    if (model === "blog" && entry) {
      // Revalidate the specific blog post
      revalidatePath(`/blog/${entry.slug}`);

      // Revalidate the main blog page
      revalidateTag("blog");

      // Revalidate the categories
      if (entry.categories && entry.categories.length > 0) {
        entry.categories.forEach((category) => {
          revalidateTag(`category:${category.slug}`);
        });
      }
      revalidateTag("category");

      console.log(`Revalidated blog post: ${entry.slug}`);
      return NextResponse.json({ revalidated: true, now: Date.now() });
    }

    return NextResponse.json({ revalidated: false, now: Date.now() });
  } catch (error) {
    console.error("Error during revalidation:", error);
    return NextResponse.json(
      { message: "Error during revalidation" },
      { status: 500 }
    );
  }
}
