type WeddingSaveTheDateProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
};

export default function WeddingSaveTheDate({
  title = "QUYẾT ĐỊNH BÊN NHAU TRỌN ĐỜI.",
  subtitle = "Together, for a Lifetime.",
  date = "29.11.2025",
  imageUrl = "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
}: WeddingSaveTheDateProps) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#FFFFFF",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px 10px",
        boxSizing: "border-box",
        fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
        color: "rgb(127, 100, 67)"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          padding: "10px 30px",
        //   border: "1px solid #e5e5e5",
          background: "#FFFFFF",
          textAlign: "center"
        }}
      >
        {/* Title */}
        <div
          style={{
            fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
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
              border: "1px solid #ddd",
            }}
          />
        </div>
      </div>
    </div>
  );
}