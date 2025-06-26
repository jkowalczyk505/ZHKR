import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/files-banner.jpg"; // dowolny obrazek tła

const files = [
  {
    name: "Regulamin ZHKR.pdf",
    url: "/ZHKR/uploads/files/regulamin.pdf",           //tylko /ZHKR dla githuba, normalnie bez
  },
  {
    name: "Wniosek o rejestrację hodowli.docx",
    url: "/ZHKR/uploads/files/wniosek.docx",
  },
  {
    name: "Logo ZHKR (PNG)",
    url: "/ZHKR/uploads/files/logo.png",
  },
  {
    name: "Polityka Prywatności",
    url: "/ZHKR/uploads/files/Polityka_Prywatnosci_ZHKR.pdf"
  }
];

function FilesPage() {
  return (
    <div className="files-page page">
      <Banner
        image={bannerImage}
        title="Pliki do pobrania"
        subtitle="Tutaj znajdziesz różne dokumenty do pobrania"
      />

      <section className="files-section light-section">
        <h2 className="with-line">Dostępne pliki</h2>
        <ul className="files-list">
          {files.map((file, index) => (
            <li key={index}>
              <a href={file.url} download>
                📄 {file.name}
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default FilesPage;
