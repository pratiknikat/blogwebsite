import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { getUserInfo } from "@/lib/actions/user.action";
import { SignedIn, auth } from "@clerk/nextjs";
import { TabsList } from "@radix-ui/react-tabs";
import Link from "next/link";
import React from "react";
import { Image } from "lucide-react";
const page = async ({ params }: any) => {
  return <p>page</p>;
};

export default page;
