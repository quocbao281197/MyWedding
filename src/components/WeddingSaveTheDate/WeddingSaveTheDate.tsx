type WeddingSaveTheDateProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
};

export default function WeddingSaveTheDate({
  title = "QUYẾT ĐỊNH BÊN NHAU TRỌN ĐỜI.",
  subtitle = "Together, for a Lifetime.",
  date = "29.11.2026",
  imageUrl = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
}: WeddingSaveTheDateProps) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "85vh",
        background: "linear-gradient(180deg, #faf7f2 0%, #f6f1e8 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 16px",
        boxSizing: "border-box",
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "rgb(127, 100, 67)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          padding: "50px 24px",
          background: "#FFFFFF",
          borderRadius: "24px",
          border: "1px solid rgba(229, 192, 123, 0.45)",
          outline: "1px solid rgba(229, 192, 123, 0.2)",
          outlineOffset: "-12px",
          boxShadow: "0 16px 40px rgba(127, 100, 67, 0.08)",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "rgb(127, 100, 67)"
          }}
        >
          <div
            style={{
              fontSize: "30px",
              lineHeight: 1.4,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontWeight: 500,
            }}
          >
            {title}
          </div>

          {/* Subtitle */}
          <div
            style={{
              marginTop: "10px",
              fontSize: "25px",
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </div>

          {/* Save the date */}
          <div
            style={{
              marginTop: "20px",
              fontSize: "50px",
              fontStyle: "italic",
              fontFamily: "cursive",
            }}
          >
            Save the date
          </div>

          {/* Date */}
          <div
            style={{
              marginTop: "5px",
              fontSize: "45px",
              letterSpacing: "4px",
              fontWeight: 500,
            }}
          >
            {date}
          </div>
        </div>

        {/* Image */}
        <div
          style={{
            marginTop: "70px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={imageUrl}
            alt="Wedding"
            style={{
              width: "100%",
              maxWidth: "300px",
              height: "300px",
              objectFit: "cover",
              border: "3px solid #b8975e",
              borderRadius: "16px",
              boxShadow: "0 8px 24px rgba(127, 100, 67, 0.15)",
            }}
          />
        </div>
      </div>
    </div>
  );
}