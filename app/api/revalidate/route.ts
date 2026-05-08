import { revalidateTag, revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slug = body?.slug as string | undefined;
    const postType = body?.post_type as string | undefined;
    const event = body?.event as string | undefined;

    if (event === "post_deleted" && slug) {
      revalidatePath(`/blog/${slug}`);
      revalidatePath(`/blog`);
      revalidatePath(`/sitemap.xml`);
      return NextResponse.json({ revalidated: true });
    }

    if (postType === "post" || postType === "page") {
      revalidateTag(postType === "post" ? "posts" : "pages", "max");
      revalidatePath(`/${postType === "page" ? "page" : "blog"}`);
      revalidatePath(`/sitemap.xml`);
      if (slug) {
        revalidatePath(`/blog/${slug}`);
      }
    }

    revalidatePath(`/`);
    revalidatePath(`/sitemap.xml`);

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }
}
