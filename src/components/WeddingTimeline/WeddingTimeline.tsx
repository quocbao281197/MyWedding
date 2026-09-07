import { WEDDING_INFO, THEME } from "../../constants";

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
  timeline = WEDDING_INFO.timeline,
}: WeddingTimelineProps) {
  return (
    <div
      style={{
        ...THEME.styles.sectionContainer,
        minHeight: "100vh",
        background: THEME.gradients.bgIvoryVignette,
        alignItems: "center",
        padding: "80px 20px",
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

          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "54px",
              fontStyle: "italic",
              fontFamily: "'Playfair Display', Georgia, serif",
              color: "rgb(255, 255, 255)",
              whiteSpace: "nowrap",
            }}
          >
            Timeline
          </div>
        </div>

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
              <div
                style={{
                  minWidth: "120px",
                  fontSize: "25px",
                  fontWeight: 600,
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: "rgb(127, 100, 67)",
                }}
              >
                {item.time}
              </div>

              <div
                style={{
                  flex: 1,
                  borderLeft: "2px solid rgba(184, 151, 94, 0.45)",
                  paddingLeft: "28px",
                }}
              >
                <div
                  style={{
                    fontSize: "28px",
                    color: "rgb(127, 100, 67)",
                    lineHeight: 1.7,
                    fontFamily: "'Playfair Display', Georgia, serif",
                  }}
                >
                  {item.title}
                </div>

                <div
                  style={{
                    marginTop: "12px",
                    fontSize: "20px",
                    color: "rgb(127, 100, 67)",
                    fontFamily: "'Playfair Display', Georgia, serif",
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
                      fontFamily: "'Playfair Display', Georgia, serif",
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