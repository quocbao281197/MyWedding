import { WEDDING_INFO, THEME } from "../../constants";

type FamilySectionProps = {
  brideFather?: string;
  brideMother?: string;
  groomFather?: string;
  groomMother?: string;
};

export function FamilySection({
  brideFather = WEDDING_INFO.bride.father,
  brideMother = WEDDING_INFO.bride.mother,
  groomFather = WEDDING_INFO.groom.father,
  groomMother = WEDDING_INFO.groom.mother,
}: FamilySectionProps) {
  return (
    <div style={THEME.styles.sectionContainer}>
      <div
        className="w-full max-w-[960px] py-12 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] items-center bg-white rounded-2xl border border-[#e5c07b]/45 shadow-[0_16px_40px_rgba(127,100,67,0.08)] gap-8 md:gap-0 relative"
        style={{
          outline: "1px solid rgba(229, 192, 123, 0.25)",
          outlineOffset: "-10px",
        }}
      >
        {/* CỘT BÊN TRÁI: NHÀ TRAI */}
        <div
          style={{
            textAlign: "center",
            fontFamily: THEME.fonts.serif,
            color: THEME.colors.primaryBronze,
            padding: "0 15px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.4rem, 4.5vw, 1.85rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.4,
              letterSpacing: "2px",
            }}
          >
            NHÀ TRAI
          </div>

          <div
            style={{
              fontSize: "clamp(0.95rem, 2.8vw, 1.15rem)",
              marginTop: "6px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              opacity: 0.8,
              fontFamily: THEME.fonts.sans,
            }}
          >
            Groom’s Family
          </div>

          <div
            style={{
              marginTop: "24px",
              fontSize: "clamp(1.15rem, 3.6vw, 1.4rem)",
              lineHeight: 2.2,
              fontWeight: 500,
            }}
          >
            <div>{groomFather}</div>
            <div>{groomMother}</div>
          </div>
        </div>

        {/* ĐƯỜNG KẺ PHÂN CÁCH GIỮA 2 NHÀ */}
        <>
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#e5c07b]/60 to-transparent md:hidden" />
          <div
            className="hidden md:block bg-gradient-to-b from-transparent via-[#e5c07b]/60 to-transparent"
            style={{
              width: "1px",
              height: "80%",
              margin: "auto",
            }}
          />
        </>

        {/* CỘT BÊN PHẢI: NHÀ GÁI */}
        <div
          style={{
            textAlign: "center",
            fontFamily: THEME.fonts.serif,
            color: THEME.colors.primaryBronze,
            padding: "0 15px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.4rem, 4.5vw, 1.85rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.4,
              letterSpacing: "2px",
            }}
          >
            NHÀ GÁI
          </div>

          <div
            style={{
              fontSize: "clamp(0.95rem, 2.8vw, 1.15rem)",
              marginTop: "6px",
              textTransform: "uppercase",
              letterSpacing: "1px",
              opacity: 0.8,
              fontFamily: THEME.fonts.sans,
            }}
          >
            Bride’s Family
          </div>

          <div
            style={{
              marginTop: "24px",
              fontSize: "clamp(1.15rem, 3.6vw, 1.4rem)",
              lineHeight: 2.2,
              fontWeight: 500,
            }}
          >
            <div>{brideFather}</div>
            <div>{brideMother}</div>
          </div>
        </div>
      </div>
    </div>
  );
}