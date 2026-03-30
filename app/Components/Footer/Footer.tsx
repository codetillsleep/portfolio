"use client";
import "./Footer.css";
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer className="footer-minimal">
        © {year} &nbsp;Saksham Sharma.&nbsp;
        <a href="/humans.txt">Crafted by yours truly</a>
      </footer>
    </>
  );
}
