const DAYS = ["MON", "TUE", "WED", "THUR", "FRI", "SAT", "SUN"];

type WeddingCalendarProps = {
  year?: number;
  month?: number; // 0 - 11
  specialDay?: number;
};

export default function WeddingCalendar({
  year = 2026,
  month = 10, // November
  specialDay = 29,
}: WeddingCalendarProps) {
  // First day of month
  const firstDay = new Date(year, month, 1).getDay();

  // Convert Sunday=0 -> Sunday last
  const startIndex = firstDay === 0 ? 6 : firstDay - 1;

  // Total days
  const totalDays = new Date(year, month + 1, 0).getDate();

  // Month name
  const monthName = new Date(year, month).toLocaleString("en-US", {
    month: "long",
  });

  // Generate calendar
  const calendarDays: (number | null)[] = [];

  // Empty cells
  for (let i = 0; i < startIndex; i++) {
    calendarDays.push(null);
  }

  // Dates
  for (let i = 1; i <= totalDays; i++) {
    calendarDays.push(i);
  }

  return (
    <div
      style={{
        width: "480px",
        padding: "40px 35px 50px",
        background: "rgb(127, 100, 67)",
        // background: "#FFFFFF",
        border: "2px solid #000",
        borderRadius: "18px",
        fontFamily: "MUZUViWSVAtTWuclldXItTGEtRGbGFpcUtUmVndWxhcivdGY",
        // color: "rgb(127, 100, 67)",
        color: "#FFFFFF",
        boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Month */}
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

      {/* Week Days */}
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

      {/* Dates */}
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