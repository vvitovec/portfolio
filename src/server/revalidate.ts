import "server-only";

import { revalidatePath, revalidateTag } from "next/cache";

type RevalidateProjectsInput = {
  slug?: string;
};

export const revalidatePublicProjects = ({ slug }: RevalidateProjectsInput) => {
  const config = { expire: 0 };
  revalidateTag("projects", config);
  revalidateTag("projects:cs", config);
  revalidateTag("projects:en", config);

  if (slug) {
    revalidateTag(`project:${slug}`, config);
    revalidateTag(`project:${slug}:cs`, config);
    revalidateTag(`project:${slug}:en`, config);
  }

  revalidatePath("/cs");
  revalidatePath("/en");
  revalidatePath("/cs/projects");
  revalidatePath("/en/projects");

  if (slug) {
    revalidatePath(`/cs/projects/${slug}`);
    revalidatePath(`/en/projects/${slug}`);
  }
};

export const revalidatePublicWebsites = () => {
  const config = { expire: 0 };
  revalidateTag("websites", config);
  revalidateTag("websites:cs", config);
  revalidateTag("websites:en", config);

  revalidatePath("/cs");
  revalidatePath("/en");
  revalidatePath("/cs/websites");
  revalidatePath("/en/websites");
};
