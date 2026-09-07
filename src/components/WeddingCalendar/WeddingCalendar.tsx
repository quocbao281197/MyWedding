const DAYS = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];

type WeddingCalendarProps = {
  year?: number;
  month?: number; // 0 - 11
  specialDay?: number;
};

export default function WeddingCalendar({
  year = 2026,
  month = 10,
  specialDay = 29,
}: WeddingCalendarProps) {
  const firstDay = new Date(year, month, 1).getDay();
  const startIndex = firstDay === 0 ? 6 : firstDay - 1;
  const totalDays = new Date(year, month + 1, 0).getDate();
  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < startIndex; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  return (
    <div
      style={{
        width: "calc(100% - 32px)",
        maxWidth: "440px",
        padding: "36px 20px 45px",
        background: "rgb(127, 100, 67)",
        border: "1px solid rgba(229, 192, 123, 0.4)",
        borderRadius: "18px",
        fontFamily: "'Playfair Display', Georgia, serif",
        color: "#FFFFFF",
        boxShadow: "0 12px 36px rgba(40, 30, 15, 0.25)",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontSize: "48px",
          fontStyle: "italic",
          marginBottom: "35px",
          fontFamily: "cursive",
          textShadow: "0 0 6px rgba(255,255,255,0.2)",
        }}
      >
        {monthName}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          marginBottom: "22px",
          textAlign: "center",
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "1px",
        }}
      >
        {DAYS.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "22px 0",
        }}
      >
        {calendarDays.map((date, index) => {
          const isSpecial = date === specialDay;

          return (
            <div
              key={index}
              style={{
                position: "relative",
                height: "42px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "28px",
              }}
            >
              {date && (
                <>
                  {/* Heart */}
                  {isSpecial && (
                    <svg
                      viewBox="0 0 32 29.6"
                      style={{
                        position: "absolute",
                        width: "42px",
                        height: "42px",
                        opacity: 0.8,
                      }}
                    >
                      <path
                        d="M23.6,0c-3.4,0-6.3,2.7-7.6,5.1C14.7,2.7,11.8,0,8.4,0
                        C3.8,0,0,3.8,0,8.4c0,9.1,16,21.2,16,21.2s16-12.1,16-21.2
                        C32,3.8,28.2,0,23.6,0z"
                        fill="#ffb6c1"
                        stroke="rgba(255,255,255,0.75)"
                        strokeWidth="1.5"
                      />
                    </svg>
                  )}

                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {date}
                  </span>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}