"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemStyle,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import type { TGetCompanyList } from "@/server/company";
import { api } from "@/trpc/react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { RiAddCircleLine } from "@remixicon/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface CompanySwitcherProps {
  companies: TGetCompanyList;
  publicId: string;
}

const createCompanyValue = "cap-co-create-company";

export function CompanySwitcher({ companies, publicId }: CompanySwitcherProps) {
  const value = useState(() => publicId)[0];
  const { update } = useSession();
  const router = useRouter();

  const pathname = usePathname();

  const switchCompany = api.company.switchCompany.useMutation();

  return (
    <Select
      value={value}
      onValueChange={async (newValue) => {
        if (newValue === createCompanyValue) {
          router.push("/company/new");
        }

        if (newValue !== value) {
          const member = companies.find(
            (item) => item.company.publicId === newValue,
          );

          if (member) {
            await switchCompany.mutateAsync({ id: member.id });
            await update();

            const routeSegments = pathname.split("/").filter(Boolean);
            const nonDynamicSegment = routeSegments.slice(1).join("/");

            router.push(
              `/${newValue}/${nonDynamicSegment ? nonDynamicSegment : ""}`,
            );
          }
        }
      }}
    >
      <SelectTrigger className="text-md ml-3 h-8 w-[180px] rounded border-none bg-transparent text-left font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {companies.map((item) => (
          <SelectItem key={item.company.publicId} value={item.company.publicId}>
            {item.company.name}
          </SelectItem>
        ))}

        <SelectSeparator />
        <SelectPrimitive.Item
          value={createCompanyValue}
          className={SelectItemStyle}
        >
          <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
            <RiAddCircleLine className="h-4 w-4" aria-hidden />
          </span>

          <SelectPrimitive.ItemText>Create Company</SelectPrimitive.ItemText>
        </SelectPrimitive.Item>
      </SelectContent>
    </Select>
  );
}
