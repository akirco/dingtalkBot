export default function (accessToken: string) {
  return accessToken.split("=")[1];
}
