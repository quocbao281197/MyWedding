import React from "react";

type WeddingHeroProps = {
  brideName?: string;
  groomName?: string;
  leftImage?: string;
  rightImage?: string;
};

export default function WeddingHero({
  brideName = "MAI ANH",
  groomName = "QUỐC BẢO",
  leftImage = "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
  rightImage = "https://images.unsplash.com/photo-1525258946800-98cfd641d0de?q=80&w=1200&auto=format&fit=crop",
}: WeddingHeroProps) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "60px 20px",
        boxSizing: "border-box",
        fontFamily: "serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          textAlign: "center",
        }}
      >
        {/* Top Text */}
        <div
          style={{
            color: "#8b6b47",
            fontSize: "25px",
            lineHeight: 1.8,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          THÂN MỜI TỚI DỰ LỄ CƯỚI THÂN MẬT
          <br />
          CỦA CHÚNG TÔI
        </div>

        <div
          style={{
            marginTop: "28px",
            color: "#8b6b47",
            fontSize: "20px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          WE CORDIALLY INVITE YOU TO CELEBRATE OUR WEDDING
        </div>

        {/* Names */}
        <div
          style={{
            marginTop: "60px",
            color: "#8b6b47",
            lineHeight: 1.2,
          }}
        >
          <div
            style={{
              fontSize: "50px",
              fontWeight: 400,
              letterSpacing: "3px",
            }}
          >
            {groomName}
          </div>

          <div
            style={{
              fontSize: "110px",
              color: "#c9b9a5",
              lineHeight: 0.7,
              fontStyle: "italic",
            }}
          >
            &
          </div>

          <div
            style={{
              fontSize: "50px",
              fontWeight: 400,
              letterSpacing: "3px",
            }}
          >
            {brideName}
          </div>
        </div>

        {/* Images */}
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
          {/* Left Photo */}
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
              alt="Bride"
              style={{
                width: "100%",
                height: "420px",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Right Photo */}
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
              alt="Groom"
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