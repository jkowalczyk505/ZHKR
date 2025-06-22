import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/knowledge-banner.jpg";
import texel from "../assets/texel.png";

function KnowledgePage() {
  return (
    <main className="knowledge-page page">
      <Banner
        image={bannerImage}
        title="Wiedza"
        subtitle="Rasy kawii domowych, genetyka, poradniki"
      />
      <section className="characteristic light-section">
        <h2 className="characteristic-title">Charakterystyka gatunku</h2>
        <div className="container-with-two-sides">
          <img src={texel} alt="Texel"></img>
          <div className="subjects-right">
            <div className="subject-right">
              <h3 className="subject-title">Podstawowe informacje</h3>
              <p className="subject-content">Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate veniam. Pariatur sint exercitation nostrud nisi laboris eu labore et dolore incididunt. Non non eu nostrud tempor deserunt reprehenderit non consectetur officia duis sit ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam non mollit enim magna.</p>
            </div>
            <div className="subject-right">
              <h3 className="subject-title">Długość życia i wielkość</h3>
              <p className="subject-content">Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate veniam. Pariatur sint exercitation nostrud nisi laboris eu labore et dolore incididunt. Non non eu nostrud tempor deserunt reprehenderit non consectetur officia duis sit ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam non mollit enim magna.</p>
            </div>
            <div className="subject-right">
              <h3 className="subject-title">Tryb życia</h3>
              <p className="subject-content">Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate veniam. Pariatur sint exercitation nostrud nisi laboris eu labore et dolore incididunt. Non non eu nostrud tempor deserunt reprehenderit non consectetur officia duis sit ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam non mollit enim magna.</p>
            </div>
          </div>
        </div>
        <div className="subjects-below">
            <div className="subject-below">
              <h3 className="subject-title">Historia gatunku</h3>
              <p className="subject-content">Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate veniam. Pariatur sint exercitation nostrud nisi laboris eu labore et dolore incididunt. Non non eu nostrud tempor deserunt reprehenderit non consectetur officia duis sit ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam non mollit enim magna.</p>
            </div>
            <div className="subject-below">
              <h3 className="subject-title">Cechy i inteligencja</h3>
              <p className="subject-content">Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate veniam. Pariatur sint exercitation nostrud nisi laboris eu labore et dolore incididunt. Non non eu nostrud tempor deserunt reprehenderit non consectetur officia duis sit ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam non mollit enim magna.</p>
            </div>
            <div className="subject-below">
              <h3 className="subject-title">Typowe zachowania</h3>
              <p className="subject-content">Commodo voluptate ipsum cillum cillum ipsum qui ex exercitation ad et tempor. Aute sunt deserunt culpa commodo cillum Lorem eiusmod non duis excepteur ea ea. Ipsum eiusmod commodo nulla voluptate veniam. Pariatur sint exercitation nostrud nisi laboris eu labore et dolore incididunt. Non non eu nostrud tempor deserunt reprehenderit non consectetur officia duis sit ipsum amet. Eu fugiat eiusmod cillum laborum adipisicing veniam non mollit enim magna.</p>
            </div>
        </div>
      </section>
      <section className="guides dark-section">
        <h2 className="guides-title">Poradniki</h2>
      </section>
    </main>
  );
}

export default KnowledgePage;
