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
        style={{
          width: "100%",
          maxWidth: "1000px",
        //   border: "1px solid #e5e5e5",
          padding: "50px 40px",
          display: "grid",
          gridTemplateColumns: "1fr 1px 1fr",
          alignItems: "center",
          background: "#fff",
        }}
      >
        {/* Bride Family */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
            color: "rgb(127, 100, 67)",
            padding: "0 30px",
          }}
        >
          <div
            style={{
              fontSize: "25px",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            NHÀ GÁI
          </div>

          <div
            style={{
              fontSize: "25px",
              marginTop: "8px",
              textTransform: "uppercase",
            }}
          >
            Bride’s Family
          </div>

          <div
            style={{
              marginTop: "20px",
              fontSize: "20px",
              lineHeight: 2,
            }}
          >
            <div>{brideFather}</div>
            <div>{brideMother}</div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: "1px",
            height: "100%",
            background: "#999",
          }}
        />

        {/* Groom Family */}
        <div
          style={{
            textAlign: "center",
            fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
            color: "rgb(127, 100, 67)",
            padding: "0 30px",
          }}
        >
          <div
            style={{
              fontSize: "25px",
              fontWeight: 600,
              textTransform: "uppercase",
              lineHeight: 1.5,
            }}
          >
            NHÀ TRAI
          </div>

          <div
            style={{
              fontSize: "25px",
              marginTop: "8px",
              textTransform: "uppercase",
            }}
          >
            Groom’s Family
          </div>

          <div
            style={{
              marginTop: "30px",
              fontSize: "20px",
              lineHeight: 2,
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