import { WEDDING_INFO, THEME } from "../../constants";

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
  ceremonyTime = WEDDING_INFO.ceremony.ceremonyNoticeVi,
  englishTime = WEDDING_INFO.ceremony.ceremonyNoticeEn,
  dayText = WEDDING_INFO.date.dayText,
  monthText = WEDDING_INFO.date.monthText,
  date = WEDDING_INFO.date.day,
  year = WEDDING_INFO.date.year,
  lunarText = WEDDING_INFO.date.lunarText,
  venue = WEDDING_INFO.ceremony.venue,
  hall = WEDDING_INFO.ceremony.hall,
  address = WEDDING_INFO.ceremony.address,
}: CeremonySectionProps) {
  return (
    <div style={THEME.styles.sectionContainer}>
      <div
        style={{
          ...THEME.styles.stationeryCard,
          padding: "45px 24px",
        }}
      >
        <div
          style={{
            fontSize: "40px",
            marginBottom: "30px",
          }}
        >
          ❀
        </div>

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

        <div
          style={{
            marginTop: "60px",
            fontSize: "clamp(1.1rem, 3.5vw, 1.8rem)",
            textTransform: "uppercase",
          }}
        >
          {dayText}
        </div>

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

        <div
          style={{
            marginTop: "6px",
            fontSize: "clamp(0.82rem, 2.7vw, 1.05rem)",
            fontStyle: "italic",
            letterSpacing: "0.4px",
            lineHeight: 1.5,
            opacity: 0.9,
          }}
        >
          {lunarText}
        </div>

        <div
          style={{
            marginTop: "12px",
            fontSize: "clamp(2.5rem, 6vw, 3.8rem)",
          }}
        >
          💍
        </div>

        <div
          style={{
            marginTop: "16px",
            fontSize: "clamp(1.25rem, 3.8vw, 1.6rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
          }}
        >
          {venue}
        </div>

        <div
          style={{
            marginTop: "6px",
            fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1px",
          }}
        >
          {hall}
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "clamp(0.9rem, 2.6vw, 1.1rem)",
            lineHeight: 1.6,
            maxWidth: "520px",
            marginLeft: "auto",
            marginRight: "auto",
            opacity: 0.9,
          }}
        >
          {address}
        </div>

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