import type React from "react";

export const THEME = {
  colors: {
    bgIvory: "#faf7f2",
    bgIvoryDark: "#f4ede1",
    primaryBronze: "rgb(127, 100, 67)",
    primaryBrown: "#8b6b47",
    goldMain: "#b8975e",
    goldLight: "#e5c07b",
    goldBorder: "rgba(229, 192, 123, 0.45)",
    goldInnerBorder: "rgba(229, 192, 123, 0.2)",
    goldShadow: "rgba(127, 100, 67, 0.08)",
  },
  fonts: {
    serif: "'Playfair Display', Georgia, serif",
    sans: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  gradients: {
    textGold:
      "linear-gradient(135deg, #FFF8EB 0%, #F5D38E 45%, #D4A34D 100%)",
    buttonGold:
      "linear-gradient(135deg, #e5c07b 0%, #b8975e 50%, #94743c 100%)",
    bgIvoryVignette:
      "linear-gradient(180deg, #faf7f2 0%, #f4ede1 50%, #faf7f2 100%)",
    bgIvoryLinear:
      "linear-gradient(180deg, #faf7f2 0%, #f6f1e8 100%)",
    goldDividerVertical:
      "linear-gradient(to bottom, transparent, rgba(229, 192, 123, 0.6), transparent)",
    goldDividerHorizontal:
      "linear-gradient(to right, transparent, rgba(229, 192, 123, 0.6), transparent)",
  },
  styles: {
    sectionContainer: {
      width: "100%",
      background: "#faf7f2",
      display: "flex",
      justifyContent: "center",
      padding: "30px 16px",
      boxSizing: "border-box" as const,
    } as React.CSSProperties,
    stationeryCard: {
      width: "100%",
      maxWidth: "960px",
      background: "#ffffff",
      borderRadius: "24px",
      border: "1px solid rgba(229, 192, 123, 0.45)",
      outline: "1px solid rgba(229, 192, 123, 0.2)",
      outlineOffset: "-10px",
      boxShadow: "0 16px 40px rgba(127, 100, 67, 0.08)",
      position: "relative" as const,
      textAlign: "center" as const,
      fontFamily: "'Playfair Display', Georgia, serif",
      color: "rgb(127, 100, 67)",
    } as React.CSSProperties,
  },
};
