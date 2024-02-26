export default async function createGuide(data) {
  const { territory, title, description } = data;

  const imageUrl =
    "https://www.visitgreece.gr/images/1743x752/jpg/files/i_1131241465_xanthi_1743x752.webp";
  const req = await fetch("http://localhost:7000/guides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ territory, title, description, imageUrl }),
  });
  const res = await req.json();
  console.log(res);
}
