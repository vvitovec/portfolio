import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default async function AdminBackLink() {
  const t = await getTranslations("admin.dashboard");

  return (
    <Link href="/admin" className={buttonVariants({ variant: "outline", size: "sm" })}>
      <ArrowLeft className="mr-2 h-4 w-4" aria-hidden="true" />
      {t("back")}
    </Link>
  );
}
