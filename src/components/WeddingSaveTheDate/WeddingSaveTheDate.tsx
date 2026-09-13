import { WEDDING_INFO, THEME } from "../../constants";
import { ImgSaveTheDate } from "../../assets";

type WeddingSaveTheDateProps = {
  title?: string;
  subtitle?: string;
  date?: string;
  imageUrl?: string;
};

export default function WeddingSaveTheDate({
  title = "QUYẾT ĐỊNH BÊN NHAU TRỌN ĐỜI.",
  subtitle = "Together, for a Lifetime.",
  date = WEDDING_INFO.date.dotFormatted,
  imageUrl = ImgSaveTheDate,
}: WeddingSaveTheDateProps) {
  return (
    <div
      style={{
        ...THEME.styles.sectionContainer,
        minHeight: "85vh",
        background: THEME.gradients.bgIvoryLinear,
        alignItems: "center",
        padding: "40px 16px",
      }}
    >
      <div
        style={{
          ...THEME.styles.stationeryCard,
          padding: "50px 24px",
          outlineOffset: "-12px",
        }}
      >
        <div
          style={{
            fontFamily: THEME.fonts.serif,
            color: THEME.colors.primaryBronze,
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

          <div
            style={{
              marginTop: "10px",
              fontSize: "25px",
              lineHeight: 1.8,
            }}
          >
            {subtitle}
          </div>

          <div
            style={{
              marginTop: "24px",
              fontSize: "56px",
              fontFamily: THEME.fonts.script,
              color: THEME.colors.primaryBronze,
              textShadow: "0 2px 4px rgba(184, 151, 94, 0.15)",
              lineHeight: 1.1,
            }}
          >
            Save the date
          </div>

          <div
            style={{
              marginTop: "8px",
              fontSize: "36px",
              letterSpacing: "6px",
              fontWeight: 600,
              color: THEME.colors.primaryBronze,
              fontFamily: THEME.fonts.serif,
            }}
          >
            {date}
          </div>
        </div>

        {/* Khung ảnh ngang phong cách Cinematic / Editorial Art Frame */}
        <div
          style={{
            marginTop: "45px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "relative",
              padding: "12px",
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow:
                "0 20px 40px -15px rgba(127, 100, 67, 0.2), 0 0 0 1px rgba(184, 151, 94, 0.25)",
              maxWidth: "560px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {/* Đường chỉ vàng kim loại thanh mảnh bao quanh ảnh */}
            <div
              style={{
                position: "absolute",
                top: "18px",
                bottom: "18px",
                left: "18px",
                right: "18px",
                border: "1px solid rgba(184, 151, 94, 0.4)",
                borderRadius: "14px",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            <img
              src={imageUrl}
              alt="Wedding"
              style={{
                width: "100%",
                aspectRatio: "3 / 2",
                objectFit: "cover",
                borderRadius: "14px",
                display: "block",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}