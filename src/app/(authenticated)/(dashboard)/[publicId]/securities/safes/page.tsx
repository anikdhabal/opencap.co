import { withServerSession } from "@/server/auth";
import { PageLayout } from "@/components/dashboard/page-layout";
import SafeActions from "@/components/safe/actions";
import EmptyState from "@/components/shared/empty-state";
import { RiSafeFill } from "@remixicon/react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "SAFEs",
};

const SafePage = async () => {
  const session = await withServerSession();
  const user = session.user;

  return (
    // <PageLayout
    //   title="SAFE"
    //   description="Create and manage SAFE agreements for your company."
    //   action={
    //     <div className="items-end justify-end text-right">
    //       <SafeActions companyPublicId={user.companyPublicId} />
    //     </div>
    //   }
    // />
    <EmptyState
      icon={<RiSafeFill />}
      title="SAFE"
      subtitle="Create and manage SAFE agreements for your company."
    >
      <SafeActions companyPublicId={user.companyPublicId} />
    </EmptyState>
  );
};

export default SafePage;
