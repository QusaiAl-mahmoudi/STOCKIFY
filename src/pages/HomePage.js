import React from "react";
import StateItem from "../Components/common/StateItem";
import dashboardImage from "../assets/images/image_wrapper.avif";
function HomePage({ setCurrentPage }) {
  return (
    <div>
      <section className="home-section">
        <div className="home-container">
          <div className="home-content">
            <span className="badge">🚀 الإصدار الجديد 2.0</span>
            <h1>
              أضف القوة والاحترافية لإدارة{" "}
              <span className="highlight">مخزونك</span>
            </h1>
            <p>
              نظام متكامل صُمم خصيصاً ليسهل عليك تتبع المنتجات، حساب الأسعار،
              وإدارة المبيعات بكل سهولة وسلاسة. واجهة عصرية، أداء فائق، وتجربة
              مستخدم مريحة للعين.
            </p>

            <div className="home-buttons">
              <a
                href="#management"
                className="btn-primary-custom"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage("management");
                }}
              >
                ابدأ الإدارة الآن <i className="fas fa-arrow-left"></i>
              </a>
            </div>

            <div className="home-stats">
              <StateItem value="+10k" label="منتج مُدار" />
              <StateItem value="99.9%" label="دقة وسرعة" />
              <StateItem value="24/7" label="جاهزية واستقرار" />
            </div>
          </div>

          <div className="home-image">
            <div className="image-wrapper">
              <img src={dashboardImage} alt="Stockify Dashboard UI" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
