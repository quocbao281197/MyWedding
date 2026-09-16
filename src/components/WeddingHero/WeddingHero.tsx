import { WEDDING_INFO, THEME } from "../../constants";
import { ImgHeroBride, ImgHeroGroom } from "../../assets";

type WeddingHeroProps = {
  brideName?: string;
  groomName?: string;
  leftImage?: string;
  rightImage?: string;
};

export default function WeddingHero({
  brideName = WEDDING_INFO.bride.name.toUpperCase(),
  groomName = WEDDING_INFO.groom.name.toUpperCase(),
  leftImage = ImgHeroGroom,
  rightImage = ImgHeroBride,
}: WeddingHeroProps) {
  return (
    <div
      style={{
        ...THEME.styles.sectionContainer,
        minHeight: "100vh",
        background: THEME.gradients.bgIvoryVignette,
        alignItems: "center",
        padding: "60px 20px",
        fontFamily: THEME.fonts.serif,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#8b6b47",
            fontSize: "clamp(1.05rem, 3.8vw, 1.4rem)",
            lineHeight: 1.7,
            textTransform: "uppercase",
            fontWeight: 500,
            letterSpacing: "1.2px",
            maxWidth: "680px",
            margin: "0 auto",
            padding: "0 10px",
          }}
        >
          TRÂN TRỌNG KÍNH MỜI QUÝ KHÁCH
          <br />
          TỚI DỰ BUỔI TIỆC CƯỚI THÂN MẬT CỦA CHÚNG TÔI
        </div>

        <div
          style={{
            marginTop: "16px",
            color: "rgba(139, 107, 71, 0.8)",
            fontSize: "clamp(0.75rem, 2.2vw, 0.95rem)",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "2px",
            fontFamily: THEME.fonts.sans,
          }}
        >
          WE CORDIALLY INVITE YOU TO CELEBRATE OUR WEDDING
        </div>

        <div
          style={{
            marginTop: "40px",
            color: "#8b6b47",
            lineHeight: 1.2,
          }}
        >
          <div
            style={{
              fontSize: "36px",
              fontWeight: 400,
              letterSpacing: "3px",
            }}
          >
            {groomName}
          </div>

          <div
            style={{
              fontSize: "64px",
              color: "#c9b9a5",
              lineHeight: 0.8,
              fontStyle: "italic",
              margin: "6px 0",
            }}
          >
            &
          </div>

          <div
            style={{
              fontSize: "36px",
              fontWeight: 400,
              letterSpacing: "3px",
            }}
          >
            {brideName}
          </div>
        </div>

        <div
          style={{
            marginTop: "70px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {/* Polaroid bên trái: Chú Rể */}
          <div
            style={{
              width: "320px",
              background: "#fff",
              padding: "16px 16px 50px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              transform: "rotate(-8deg)",
              transition: "all 0.5s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "rotate(0deg) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotate(-8deg)";
            }}
          >
            <img
              src={leftImage}
              alt="Groom"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Polaroid bên phải: Cô Dâu */}
          <div
            style={{
              width: "320px",
              background: "#fff",
              padding: "16px 16px 50px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
              transform: "rotate(8deg)",
              transition: "all 0.5s ease",
              cursor: "pointer",
              marginTop: "-20px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "rotate(0deg) scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "rotate(8deg)";
            }}
          >
            <img
              src={rightImage}
              alt="Bride"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}