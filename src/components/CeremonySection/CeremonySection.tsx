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
  venue = "DIAMON PALACE",
  hall = "SẢNH GOLD",
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
            fontSize: "30px",
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
            fontSize: "25px",
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
            fontSize: "30px",
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
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              fontSize: "30px",
              lineHeight: 1.6,
              whiteSpace: "pre-line",
            }}
          >
            {monthText}
          </div>

          <div
            style={{
              fontSize: "90px",
              fontWeight: 500,
              lineHeight: 1,
            }}
          >
            {date}
          </div>

          <div
            style={{
              fontSize: "90px",
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
            fontSize: "40px",
            fontWeight: 600,
            textTransform: "uppercase",
          }}
        >
          {venue}
        </div>

        <div
          style={{
            marginTop: "5px",
            fontSize: "30px",
            textTransform: "uppercase",
          }}
        >
          {hall}
        </div>

        {/* Address */}
        <div
          style={{
            marginTop: "5px",
            fontSize: "30px",
            lineHeight: 1.8,
          }}
        >
          {address}
        </div>
      </div>
    </div>
  );
}