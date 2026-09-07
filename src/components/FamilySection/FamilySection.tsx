type FamilySectionProps = {
  brideFather?: string;
  brideMother?: string;
  groomFather?: string;
  groomMother?: string;
};

export function FamilySection({
  brideFather = "Ông/ Mr. Nguyễn Quý Long",
  brideMother = "Bà/ Mrs. Nguyễn Thị Ngọc Lan",
  groomFather = "Ông/ Mr. Nguyễn Văn Truyền",
  groomMother = "Bà/ Mrs. Phạm Thị Phương",
}: FamilySectionProps) {
  return (
    <div
      style={{
        width: "100%",
        background: "#faf7f2",
        display: "flex",
        justifyContent: "center",
        padding: "30px 16px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="w-full max-w-[960px] py-12 px-6 sm:px-12 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] items-center bg-white rounded-2xl border border-[#e5c07b]/45 shadow-[0_16px_40px_rgba(127,100,67,0.08)] gap-8 md:gap-0 relative"
        style={{
          outline: "1px solid rgba(229, 192, 123, 0.2)",
          outlineOffset: "-10px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "rgb(127, 100, 67)",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.4rem, 4.5vw, 1.85rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.5,
              letterSpacing: "1px",
            }}
          >
            NHÀ GÁI
          </div>

          <div
            style={{
              fontSize: "clamp(1.05rem, 3.2vw, 1.35rem)",
              marginTop: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Bride’s Family
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "clamp(1.15rem, 3.6vw, 1.45rem)",
              lineHeight: 2.1,
              fontWeight: 500,
            }}
          >
            <div>{brideFather}</div>
            <div>{brideMother}</div>
          </div>
        </div>

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

        <div
          style={{
            textAlign: "center",
            fontFamily: "'Playfair Display', Georgia, serif",
            color: "rgb(127, 100, 67)",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.4rem, 4.5vw, 1.85rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.5,
              letterSpacing: "1px",
            }}
          >
            NHÀ TRAI
          </div>

          <div
            style={{
              fontSize: "clamp(1.05rem, 3.2vw, 1.35rem)",
              marginTop: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            Groom’s Family
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "clamp(1.15rem, 3.6vw, 1.45rem)",
              lineHeight: 2.1,
              fontWeight: 500,
            }}
          >
            <div>{groomFather}</div>
            <div>{groomMother}</div>
          </div>
        </div>
      </div>
    </div>
  );
}