import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/files-banner.jpg"; // dowolny obrazek tła

const files = [
  {
    name: "Regulamin ZHKR.pdf",
    url: "/uploads/files/regulamin.pdf",
  },
  {
    name: "Wniosek o rejestrację hodowli.docx",
    url: "/uploads/files/wniosek.docx",
  },
  {
    name: "Logo ZHKR (JPG)",
    url: "/uploads/files/logo.jpg",
  },
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
