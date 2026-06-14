type CeremonySectionProps = {
  ceremonyTime?: string;
  englishTime?: string;
  dayText?: string;
  monthText?: string;
  date?: string;
  year?: string;
  lunarText?: string;
  venue?: string;
  hall?: string;
  address?: string;
};

export function CeremonySection({
  ceremonyTime = "LỄ VU QUY ĐƯỢC TỔ CHỨC VÀO LÚC 12 GIỜ 00 PHÚT",
  englishTime = "OUR WEDDING CEREMONY WILL TAKE PLACE AT 12:00 PM",
  dayText = "CHỦ NHẬT / SUNDAY",
  monthText = "THÁNG 11\nNOVEMBER",
  date = "29",
  year = "2026",
  lunarText = "(Lunar date: October 21st, Year of the Snake)",
  venue = "DIAMOND PALACE",
  hall = "Sảnh Gold",
  address = "101 Đường Lý Chiêu Hoàng, Khu V, Bình Phú, Hồ Chí Minh",
}: CeremonySectionProps) {
  return (
    <div
      style={{
        width: "100%",
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        padding: "20px 10px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
        //   border: "1px solid #e5e5e5",
          padding: "20px 50px",
          background: "#fff",
          textAlign: "center",
          fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
          color: "rgb(127, 100, 67)",
        }}
      >
        {/* Flower */}
        <div
          style={{
            fontSize: "40px",
            marginBottom: "30px",
          }}
        >
          ❀
        </div>

        {/* Ceremony Time */}
        <div
          style={{
            fontSize: "clamp(1.1rem, 3.5vw, 1.8rem)",
            lineHeight: 1.6,
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {ceremonyTime}
        </div>

        <div
          style={{
            marginTop: "26px",
            fontSize: "clamp(0.85rem, 2.5vw, 1.25rem)",
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {englishTime}
        </div>

        {/* Day */}
        <div
          style={{
            marginTop: "60px",
            fontSize: "clamp(1.1rem, 3.5vw, 1.8rem)",
            textTransform: "uppercase",
          }}
        >
          {dayText}
        </div>

        {/* Date */}
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "clamp(12px, 3.5vw, 30px)",
            flexWrap: "nowrap",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1rem, 3vw, 1.6rem)",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {monthText}
          </div>

          <div
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            {date}
          </div>

          <div
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
            }}
          >
            {year}
          </div>
        </div>

        {/* Lunar */}
        <div
          style={{
            marginTop: "5px",
            fontSize: "20px",
            lineHeight: 1.8,
          }}
        >
          {lunarText}
        </div>

        {/* Rings */}
        <div
          style={{
            marginTop: "5px",
            fontSize: "70px",
          }}
        >
          💍
        </div>

        {/* Venue */}
        <div
          style={{
            marginTop: "20px",
            fontSize: "27px",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {venue}
        </div>

        <div
          style={{
            marginTop: "5px",
            fontSize: "25px",
            textTransform: "uppercase",
          }}
        >
          {hall}
        </div>

        {/* Address */}
        <div
          style={{
            marginTop: "5px",
            fontSize: "25px",
            lineHeight: 1.8,
          }}
        >
          {address}
        </div>

        {/* Chỉ đường */}
        <div style={{ marginTop: "25px" }}>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Diamond+Palace+101+Lý+Chiêu+Hoàng+Quận+6"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 30px",
              backgroundColor: "#b8975e",
              color: "#fff",
              borderRadius: "30px",
              fontSize: "22px",
              textDecoration: "none",
              fontWeight: "bold",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 12px rgba(184, 151, 94, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#94743c";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(184, 151, 94, 0.5)";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#b8975e";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(184, 151, 94, 0.3)";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            📍 Chỉ đường
          </a>
        </div>
      </div>
    </div>
  );
}