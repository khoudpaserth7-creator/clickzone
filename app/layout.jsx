import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Click Zone",
  description: "ຮ້ານອອນລາຍຂາຍສິນຄ້າໄອທີ ມືຖື ຄອມພິວເຕີ ແລະອຸປະກອນເສີມ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="lo">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
