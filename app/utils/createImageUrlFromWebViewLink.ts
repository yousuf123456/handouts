export function createImageUrlFromWebViewLink(webViewLink: string) {
  const fileId = webViewLink.split("/d/")[1]?.split("/")[0];
  return fileId
    ? `https://drive.google.com/uc?export=view&id=${fileId}`
    : webViewLink;
}
