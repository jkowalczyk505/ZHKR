import React from "react";
import Banner from "../components/Banner";
import bannerImage from "../assets/about-us-banner.jpg";

function AboutPage() {
  return (
    <main className="about-page page">
      <Banner
        image={bannerImage}
        title="O Związku"
        subtitle="Nasza działalność to więcej niż hodowla – to troska, wiedza i zaangażowanie"
      />
      <section className="light-section about-section">
        <h2 className="with-line">O nas</h2>
        <p>Ea consequat quis occaecat et ipsum. Qui ex quis ipsum nulla tempor. Proident amet aute consequat proident incididunt id minim qui minim voluptate. Velit occaecat ipsum cillum ad amet commodo laborum do dolor ad.

Commodo id aliqua consectetur enim deserunt sit excepteur aliqua sit laboris aliquip. Labore magna qui culpa adipisicing tempor sunt excepteur Lorem est incididunt velit duis est excepteur. Exercitation irure Lorem et magna voluptate est reprehenderit ullamco cillum. Veniam eu dolore ea voluptate anim dolor culpa ipsum incididunt ad.

Nostrud consequat anim magna non culpa reprehenderit veniam nisi deserunt anim ipsum. Nulla elit in commodo eu incididunt. Elit sint ex sunt consectetur deserunt mollit reprehenderit aute consectetur. Voluptate laborum id aliqua eu labore consequat culpa eiusmod sunt velit mollit. Excepteur do laborum proident incididunt exercitation pariatur officia est. Occaecat est dolore exercitation qui nisi consequat deserunt irure culpa tempor laboris quis et.

Esse mollit voluptate Lorem eu dolore eu nisi dolore. Commodo enim eiusmod laboris reprehenderit voluptate Lorem laboris quis amet dolore ex labore ad. Laborum incididunt proident laborum fugiat. Excepteur anim cupidatat laboris do. Aliqua ullamco exercitation consectetur ullamco labore anim est ea magna do eu sint laborum. Laboris aute Lorem labore reprehenderit aute occaecat sit fugiat. Labore sunt sint occaecat amet tempor consectetur veniam deserunt.

Quis ullamco proident elit quis deserunt quis veniam veniam commodo consectetur labore qui. Id ipsum proident duis consequat magna exercitation voluptate est ipsum nisi. Reprehenderit officia occaecat qui commodo.</p>
      </section>
    </main>
  );
}

export default AboutPage;
