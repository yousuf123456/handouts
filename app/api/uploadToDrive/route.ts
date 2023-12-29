import { Readable } from "stream";
import { NextResponse } from "next/server";

import googleDrive from "@/app/libs/googleDrive";
import { getCurrentUser } from "@/app/actions/getCurrentUser";
import { createImageUrlFromWebViewLink } from "@/app/utils/createImageUrlFromWebViewLink";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorised", { status: 401 });
    }

    const files: any = [];
    const formData = await req.formData();

    const folderId = process.env.USER_IMAGES_FOLDER_ID!;

    formData.forEach((_) => {
      if (typeof _ === "object") files.push(_);
    });

    if (!files || files.length === 0) {
      return new NextResponse("No files were recieved", { status: 400 });
    }

    const uploadPromises = files.map((file: any) => {
      const fileMetadata = {
        name: file.name,
        parents: [folderId],
      };

      const stream = file.stream();

      const media = {
        mimeType: file.type,
        body: Readable.from(stream),
      };

      return googleDrive.files
        .create({
          //@ts-ignore
          resource: fileMetadata,
          media: media,
          fields: "id",
        })
        .then((createRes: any) => {
          const permissions = {
            type: "anyone",
            role: "reader",
          };
          return googleDrive.permissions
            .create({
              //@ts-ignore
              resource: permissions,
              fileId: createRes.data.id,
              fields: "id",
            })
            .then(() => {
              return googleDrive.files.get({
                fileId: createRes.data.id,
                fields:
                  "webViewLink, webContentLink, size, createdTime, name, modifiedTime, id, imageMediaMetadata",
              });
            });
        });
    });

    const responses = await Promise.all(uploadPromises);

    const imagesData: { id: string; url: string }[] = [];

    responses.map((res) => {
      imagesData.push({
        id: res.data.id,
        url: createImageUrlFromWebViewLink(res.data.webViewLink),
      });
    });

    return NextResponse.json({
      imagesData,
    });
  } catch (err) {
    console.log(err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
