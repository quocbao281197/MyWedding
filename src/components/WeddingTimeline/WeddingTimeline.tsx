type TimelineItem = {
  time: string;
  title: string;
  subtitle: string;
  description?: string;
};

type WeddingTimelineProps = {
  imageUrl?: string;
  timeline?: TimelineItem[];
};

export default function WeddingTimeline({
  imageUrl = "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
  timeline = [
    {
      time: "11:00",
      title: "ĐÓN KHÁCH",
      subtitle: "GUEST RECEPTION",
    },
    {
      time: "12:00",
      title:
        "Cùng nhau chứng kiến khoảnh khắc thiêng liêng cùng CDCR",
      subtitle: "LỄ VU QUY / THE BRIDE’S FAMILY CEREMONY",
    },
    {
      time: "12:15",
      title:
        "Cùng nhau ăn tiệc và nâng ly chúc mừng CDCR",
      subtitle: "KHAI TIỆC / BANQUET BEGINS",
    },
  ],
}: WeddingTimelineProps) {
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "80px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "60px",
        }}
      >
        {/* Left Image */}
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            src={imageUrl}
            alt="Wedding"
            style={{
              width: "100%",
              height: "620px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            }}
          />

          {/* Timeline Text */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "54px",
              fontStyle: "italic",
              fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
              color: "rgb(255, 255, 255)",
              whiteSpace: "nowrap",
            }}
          >
            Timeline
          </div>
        </div>

        {/* Right Timeline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "50px",
          }}
        >
          {timeline.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "32px",
              }}
            >
              {/* Time */}
              <div
                style={{
                  minWidth: "120px",
                  fontSize: "42px",
                  fontWeight: 600,
                  fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
                  color: "rgb(127, 100, 67)",
                }}
              >
                {item.time}
              </div>

              {/* Content */}
              <div
                style={{
                  flex: 1,
                  borderLeft: "2px solid #ddd",
                  paddingLeft: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    color: "rgb(127, 100, 67)",
                    lineHeight: 1.7,
                    fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "20px",
                    color: "rgb(127, 100, 67)",
                    fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    lineHeight: 1.6,
                  }}
                >
                  {item.subtitle}
                </div>

                {item.description && (
                  <div
                    style={{
                      marginTop: "12px",
                      fontSize: "18px",
                      color: "rgb(127, 100, 67)",
                      fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
                      lineHeight: 1.8,
                    }}
                  >
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}