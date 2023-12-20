import { featherRestApp } from "@/components/client/restClient";
import { InvitationSchema } from "@/components/interfaces";
import { FrameProps } from "@/components/Editor/Viewport/Frames";

import lz from "lzutf8";
import { generateId } from "@/components/utils/generateId";
import Body from "../../../template/[slug]/[id]/Body";

type Props = {
  params: {
    id: string;
    slug: string;
  };
  searchParams: {};
};

export async function generateMetadata({ params }: Props) {
  const data: InvitationSchema = await featherRestApp
    .service("invitations")
    .get(params.id);

  return {
    title: `Invitation Editor - ${data.name}`,
  };
}

export default async function Page({ params }: Props) {
  const data: InvitationSchema = await featherRestApp
    .service("invitations")
    .get(params.id);

  let content: FrameProps = {
    id: generateId(),
    name: "App",
    content: "",
    templates: [],
    properties: [],
  };
  try {
    content = JSON.parse(lz.decompress(lz.decodeBase64(data.content)));
  } catch (err) {}

  return <Body type="invitation" id={params.id} slug={params.slug} content={content} />;
}
