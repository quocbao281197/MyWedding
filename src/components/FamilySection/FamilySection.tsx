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
        background: "#fff",
        display: "flex",
        justifyContent: "center",
        padding: "20px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        className="w-full max-w-[1000px] py-12 px-4 sm:px-10 grid grid-cols-1 md:grid-cols-[1fr_1px_1fr] items-center bg-white gap-8 md:gap-0"
      >
        {/* Bride Family */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
            color: "rgb(127, 100, 67)",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            NHÀ GÁI
          </div>

          <div
            style={{
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              marginTop: "8px",
              textTransform: "uppercase",
            }}
          >
            Bride’s Family
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "clamp(0.95rem, 2.8vw, 1.25rem)",
              lineHeight: 1.8,
            }}
          >
            <div>{brideFather}</div>
            <div>{brideMother}</div>
          </div>
        </div>

        {/* Divider */}
        <>
          <div className="h-[1px] w-full bg-[#999]/30 md:hidden" />
          <div
            className="hidden md:block bg-[#999]"
            style={{
              width: "1px",
              height: "100%",
            }}
          />
        </>

        {/* Groom Family */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
            color: "rgb(127, 100, 67)",
            padding: "0 10px",
          }}
        >
          <div
            style={{
              fontSize: "clamp(1.2rem, 3.5vw, 1.6rem)",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            NHÀ TRAI
          </div>

          <div
            style={{
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              marginTop: "8px",
              textTransform: "uppercase",
            }}
          >
            Groom’s Family
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "clamp(0.95rem, 2.8vw, 1.25rem)",
              lineHeight: 1.8,
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