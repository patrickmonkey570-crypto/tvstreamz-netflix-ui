export const metadata = {
  title: "TVStreamz Netflix UI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: "#0a0a0f", color: "white" }}>
        {children}
      </body>
    </html>
  );
}
