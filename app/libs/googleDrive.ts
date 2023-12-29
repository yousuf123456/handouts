import { drive_v3, drive } from "@googleapis/drive";
import { GoogleAuth } from "google-auth-library";

const authenticateGoogle = () => {
  const auth = new GoogleAuth({
    keyFile: `app/assets/handouts-392013-06a79c6e3b3a.json`,
    scopes: "https://www.googleapis.com/auth/drive",
  });
  return auth;
};

const auth = authenticateGoogle();

declare global {
  var googleDrive: drive_v3.Drive;
}

let googleDrive: drive_v3.Drive;

if (typeof window === "undefined") {
  if (process.env.NODE_ENV === "production") {
    googleDrive = drive({ version: "v3", auth });
  } else {
    if (!global.googleDrive) {
      global.googleDrive = drive({ version: "v3", auth });
    }

    googleDrive = global.googleDrive;
  }
}

//@ts-ignore
export default googleDrive;
