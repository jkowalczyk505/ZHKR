import React from "react";
import pigHero from "../assets/pig-hero.png";
import Button from "../components/Button";

function HomePage() {
    return (
        <main className="page">
            <div className="content">
                <section className="hero">
                    <div className="hero-left">
                        <h1>Związek Hodowców <br />
                            Kawii Rasowych</h1>
                        <p>Aliqua reprehenderit mollit aliquip ea velit culpa nisi dolor sit aliquip elit. Cupidatat fugiat elit non reprehenderit minim laborum adipisicing elit ex eu incididunt nisi ad. Consequat commodo do incididunt velit. Nostrud occaecat nisi laborum laboris nostrud incididunt.</p>
                        <div className="buttons">
                            <Button variant="primary" to="/o-nas">Dowiedz się więcej</Button>
                            <Button variant="outline" to="/kontakt">Kontakt</Button>
                        </div>
                    </div>
                    <img src={pigHero} alt="Świnka morska"></img>
                </section>

                <section className="news-container">
                    <h2>Aktualności</h2>
                    <div className="news">
                        <div className="news-item">
                            <img src={pigHero} alt="Miniatura"></img>
                            <div className="news-item-right">
                                <span className="news-item-date">19.06.2026</span>
                                <h3 className="news-item-title">Nowe zasady członkowstwa</h3>
                                <p className="news-item-description">Ullamco reprehenderit dolor adipisicing ad tempor aliquip mollit quis minim reprehenderit dolore aliquip ullamco. Non est occaecat pariatur cillum occaecat.</p>
                            </div>
                        </div>
                        <div className="news-item">
                            <img src={pigHero} alt="Miniatura"></img>
                            <div className="news-item-right">
                                <span className="news-item-date">19.06.2026</span>
                                <h3 className="news-item-title">Nowe zasady członkowstwa</h3>
                                <p className="news-item-description">Ullamco reprehenderit dolor adipisicing ad tempor aliquip mollit quis minim reprehenderit dolore aliquip ullamco. Non est occaecat pariatur cillum occaecat.</p>
                            </div>
                        </div>
                        <div className="news-item">
                            <img src={pigHero} alt="Miniatura"></img>
                            <div className="news-item-right">
                                <span className="news-item-date">19.06.2026</span>
                                <h3 className="news-item-title">Nowe zasady członkowstwa</h3>
                                <p className="news-item-description">Ullamco reprehenderit dolor adipisicing ad tempor aliquip mollit quis minim reprehenderit dolore aliquip ullamco. Non est occaecat pariatur cillum occaecat.</p>
                            </div>
                        </div>
                        <div className="news-item">
                            <img src={pigHero} alt="Miniatura"></img>
                            <div className="news-item-right">
                                <span className="news-item-date">19.06.2026</span>
                                <h3 className="news-item-title">Nowe zasady członkowstwa</h3>
                                <p className="news-item-description">Ullamco reprehenderit dolor adipisicing ad tempor aliquip mollit quis minim reprehenderit dolore aliquip ullamco. Non est occaecat pariatur cillum occaecat.</p>
                            </div>
                        </div>
                    </div>
                    <div className="pagination">
                        <Button variant="primary">1</Button>
                        <Button variant="outline">2</Button>
                        <Button variant="outline">3</Button>
                        <span className="dots">...</span>
                        <Button variant="outline">8</Button>
                        <Button variant="outline">></Button>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default HomePage;