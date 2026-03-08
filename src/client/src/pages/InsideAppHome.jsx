import "../App.css";
import "./AppPages.css";
import BottomNav from "../BottomNav";
import CharacterCanvas from "../components/CharacterCanvas";

// character assets
import LightSkin from "../assets/character/LightSkin.png";
import Hair1 from "../assets/character/hair1.png";
import Shirt2 from "../assets/character/money_shirt.png";
import Pants1 from "../assets/character/jeans.png";
import Shoe1 from "../assets/character/shoes.png";

function InsideAppHome() {
  const spendingHealth = 72;

  return (
    <div className="app">
      <div className="phone-container inside-app-shell">
        <div className="top-section"></div>

        <div className="inside-app-content dashboard-content">

          <h1 className="dashboard-title">Home</h1>

          <div className="dashboard-card dashboard-character-card">

            <CharacterCanvas
              skinToneSrc={LightSkin}
              hairStyleSrc={Hair1}
              hairTop={20}
              hairWidth={115}
              shirtSrc={Shirt2}
              shirtTop={130}
              shirtWidth={63}
              pantsSrc={Pants1}
              pantsTop={180}
              pantsWidth={55}
              shoeSrc={Shoe1}
              shoeTop={260}
              shoeWidth={66}
            />

            <p className="dashboard-stat-title">Character Health</p>

            <div className="dashboard-progress-bar">
              <div
                className="dashboard-progress-fill"
                style={{ width: `${spendingHealth}%` }}
              />
            </div>

            <p className="dashboard-muted">
              {spendingHealth}% healthy spending this month
            </p>

          </div>

        </div>

        <BottomNav />

      </div>
    </div>
  );
}

export default InsideAppHome;