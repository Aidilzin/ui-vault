interface StyleSwatchProps {
  styleId: string;
}

export function StyleSwatch({ styleId }: StyleSwatchProps) {
  switch (styleId) {
    case "fui-tactical":
      return (
        <div
          style={{
            height: "100%",
            background: "#090a0c",
            color: "#e8ecf2",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 10, color: "#38bdf8", letterSpacing: "0.08em" }}>
              + HUD // SEC-04
            </span>
            <span
              style={{
                fontSize: 9,
                color: "#34d399",
                border: "1px solid rgba(52,211,153,0.35)",
                padding: "1px 6px",
                borderRadius: 2,
              }}
            >
              NOMINAL
            </span>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            <div
              style={{
                background: "#0f1115",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 3,
                padding: "8px 10px",
              }}
            >
              <div style={{ fontSize: 9, color: "#586170" }}>FRAME DELTA</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  marginTop: 2,
                }}
              >
                16.4<span style={{ fontSize: 10, color: "#8b94a3" }}>ms</span>
              </div>
            </div>
            <div
              style={{
                background: "#15181e",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 3,
                padding: "8px 10px",
              }}
            >
              <div style={{ fontSize: 9, color: "#586170" }}>SIGNAL LOCK</div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  color: "#38bdf8",
                  fontVariantNumeric: "tabular-nums",
                  marginTop: 2,
                }}
              >
                99.8%
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 9,
              color: "#586170",
              borderTop: "1px solid rgba(255,255,255,0.08)",
              paddingTop: 6,
            }}
          >
            <span>GRID 1PX HAIRLINE</span>
            <span>RADIUS 4PX MAX</span>
          </div>
        </div>
      );

    case "neo-swiss":
      return (
        <div
          style={{
            height: "100%",
            background: "#f5f4f0",
            color: "#111111",
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div
            style={{
              padding: 14,
              borderRight: "1px solid rgba(17,17,17,0.16)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em" }}>
              01 / EDITION 2026
            </div>
            <div
              style={{
                fontSize: 30,
                fontWeight: 800,
                lineHeight: 0.92,
                letterSpacing: "-0.05em",
              }}
            >
              GRID
              <br />
              ORDER
            </div>
            <div style={{ fontSize: 10, color: "#444" }}>
              Zero radius. Mathematical alignment.
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: 1,
                borderBottom: "1px solid rgba(17,17,17,0.16)",
                padding: 12,
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-end",
              }}
            >
              <span
                style={{
                  width: 14,
                  height: 14,
                  background: "#ff3b00",
                  display: "inline-block",
                }}
              />
            </div>
            <div style={{ padding: 12, fontSize: 10, lineHeight: 1.35 }}>
              <div style={{ fontWeight: 700, color: "#ff3b00" }}>FIG. 04</div>
              <div style={{ marginTop: 4 }}>Asymmetric negative space cell.</div>
            </div>
          </div>
        </div>
      );

    case "editorial-mono":
      return (
        <div
          style={{
            height: "100%",
            background: "#0b0b0b",
            color: "#ffffff",
            padding: 15,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.08em",
                color: "#797979",
              }}
            >
              CONTENT ARCHITECTURE // 01
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "#19d600",
                border: "1px solid #353535",
                background: "#212121",
                padding: "1px 6px",
                borderRadius: 3,
              }}
            >
              ACHROMATIC
            </span>
          </div>

          <div
            style={{
              fontSize: 26,
              fontWeight: 500,
              lineHeight: 1.02,
              letterSpacing: "-0.045em",
              color: "#ffffff",
            }}
          >
            Structured stage.
            <span style={{ color: "#b9b9b9" }}> Dark press.</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              paddingTop: 10,
              borderTop: "1px solid #212121",
            }}
          >
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <span
                style={{
                  background: "#f36458",
                  color: "#ffffff",
                  padding: "4px 12px",
                  borderRadius: 9999,
                  fontSize: 10,
                  fontWeight: 500,
                }}
              >
                Start building
              </span>
              <span
                style={{
                  background: "#212121",
                  border: "1px solid #353535",
                  color: "#b9b9b9",
                  padding: "3px 10px",
                  borderRadius: 5,
                  fontSize: 10,
                }}
              >
                Docs
              </span>
            </div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "#0052ef",
              }}
            >
              HOVER #0052EF
            </span>
          </div>
        </div>
      );

    case "industrial-hardware":
      return (
        <div
          style={{
            height: "100%",
            background: "#f1f2f2",
            color: "#000000",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                color: "#4d4d4d",
                letterSpacing: "0.06em",
              }}
            >
              UNIT-04 // FIELD DECK
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                background: "#e5e5e5",
                border: "1px solid #b2b2b2",
                borderRadius: 1000,
                padding: "1px 8px",
                color: "#272727",
              }}
            >
              0PX SHADOW
            </span>
          </div>

          <div
            style={{
              background: "#e5e5e5",
              border: "1px solid #b2b2b2",
              borderRadius: 3,
              padding: "10px 12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <div>
              <div style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.1 }}>
                48.0 <span style={{ fontWeight: 700, fontSize: 13 }}>kHz</span>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#4d4d4d", marginTop: 2 }}>
                200MS EASE-IN
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {[
                { bg: "#b81d13", label: "REC" },
                { bg: "#0071bb", label: "MOD" },
                { bg: "#006837", label: "RUN" },
              ].map((knob) => (
                <div
                  key={knob.label}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}
                >
                  <span
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      background: knob.bg,
                      border: "1px solid #272727",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#f5f5f5",
                      }}
                    />
                  </span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "#4d4d4d" }}>
                    {knob.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div
              style={{
                width: "58%",
                height: 6,
                background: "#cdcece",
                borderRadius: 1000,
                overflow: "hidden",
              }}
            >
              <div style={{ width: "68%", height: "100%", background: "#000000", borderRadius: 1000 }} />
            </div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#4d4d4d" }}>
              #F1F2F2 / #B81D13
            </span>
          </div>
        </div>
      );

    case "ditherpunk":
      return (
        <div
          style={{
            height: "100%",
            background: "#f2f0e6",
            color: "#0b0c0a",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "2px solid #0b0c0a",
              paddingBottom: 6,
              fontSize: 10,
              fontWeight: 700,
            }}
          >
            <span>1-BIT // BAYER 4X4</span>
            <span style={{ background: "#ff4d00", color: "#0b0c0a", padding: "0 5px" }}>
              INK
            </span>
          </div>

          <div
            style={{
              height: 76,
              border: "2px solid #0b0c0a",
              backgroundImage:
                "radial-gradient(#0b0c0a 1.25px, transparent 1.25px), radial-gradient(#0b0c0a 1.25px, #f2f0e6 1.25px)",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                background: "#0b0c0a",
                color: "#f2f0e6",
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              NO BLUR // ZERO AA
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10 }}>
            <span>#0B0C0A / #F2F0E6</span>
            <span style={{ color: "#ff4d00", fontWeight: 700 }}>SPOT #FF4D00</span>
          </div>
        </div>
      );

    case "os-core":
      return (
        <div
          style={{
            height: "100%",
            background: "#008080",
            padding: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div
            style={{
              width: "100%",
              background: "#d4d0c8",
              borderTop: "2px solid #ffffff",
              borderLeft: "2px solid #ffffff",
              borderRight: "2px solid #404040",
              borderBottom: "2px solid #404040",
              padding: 3,
              color: "#111111",
            }}
          >
            <div
              style={{
                background: "#000080",
                color: "#ffffff",
                padding: "3px 6px",
                fontSize: 10,
                fontWeight: 700,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span>SYSTEM_VAULT.EXE</span>
              <span style={{ display: "flex", gap: 2 }}>
                {["_", "X"].map((ch) => (
                  <span
                    key={ch}
                    style={{
                      background: "#d4d0c8",
                      color: "#111",
                      width: 14,
                      height: 14,
                      display: "inline-grid",
                      placeItems: "center",
                      fontSize: 9,
                      borderTop: "1px solid #fff",
                      borderLeft: "1px solid #fff",
                      borderRight: "1px solid #404040",
                      borderBottom: "1px solid #404040",
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </div>

            <div style={{ padding: "10px 8px", fontSize: 11 }}>
              <div style={{ marginBottom: 8 }}>Beveled 2-step hardware chrome.</div>
              <div style={{ display: "flex", gap: 6 }}>
                <span
                  style={{
                    padding: "3px 10px",
                    fontSize: 10,
                    background: "#d4d0c8",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                  }}
                >
                  OK
                </span>
                <span
                  style={{
                    padding: "3px 10px",
                    fontSize: 10,
                    background: "#d4d0c8",
                    borderTop: "2px solid #ffffff",
                    borderLeft: "2px solid #ffffff",
                    borderRight: "2px solid #404040",
                    borderBottom: "2px solid #404040",
                  }}
                >
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    case "neo-brutalism":
      return (
        <div
          style={{
            height: "100%",
            background: "#fffdf5",
            color: "#000000",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            fontFamily: "var(--font-display)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                background: "#ffde00",
                border: "2px solid #000",
                boxShadow: "3px 3px 0 #000",
                padding: "2px 8px",
                fontSize: 10,
                fontWeight: 700,
                transform: "rotate(-2deg)",
              }}
            >
              RAW PRIMITIVE
            </span>
            <span
              style={{
                background: "#ff5c5c",
                border: "2px solid #000",
                padding: "2px 6px",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
              }}
            >
              0PX BLUR
            </span>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "2px solid #000",
              boxShadow: "4px 4px 0 #000",
              padding: "10px 12px",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.05 }}>
              HARD OFFSET SHADOWS
            </div>
            <div style={{ fontSize: 11, marginTop: 4, fontFamily: "var(--font-mono)" }}>
              2px solid #000 // 4px 4px 0
            </div>
          </div>
        </div>
      );

    case "acid-y2k":
      return (
        <div
          style={{
            height: "100%",
            background: "#050507",
            backgroundImage:
              "linear-gradient(rgba(204,255,0,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(204,255,0,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            color: "#f8fafc",
            padding: 14,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span
              style={{
                background:
                  "linear-gradient(135deg, #ffffff 0%, #7c8496 45%, #f8fafc 55%, #272b36 100%)",
                color: "#050507",
                padding: "2px 10px",
                borderRadius: 999,
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              CHROME // 2000
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                color: "#ff00a8",
                border: "1px solid #ff00a8",
                padding: "1px 6px",
              }}
            >
              SN-9904X
            </span>
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "#ccff00",
              lineHeight: 1,
            }}
          >
            ACID//Y2K
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              color: "#94a3b8",
            }}
          >
            <span>||| || ||| | ||||</span>
            <span style={{ color: "#ccff00" }}>#CCFF00 + #FF00A8</span>
          </div>
        </div>
      );

    case "liquid-glass":
      return (
        <div
          style={{
            height: "100%",
            position: "relative",
            background:
              "radial-gradient(circle at 18% 25%, #38bdf8 0%, transparent 45%), radial-gradient(circle at 82% 72%, #f43f5e 0%, transparent 48%), radial-gradient(circle at 60% 18%, #34d399 0%, transparent 38%), #070b14",
            padding: 16,
            display: "grid",
            placeItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              padding: "14px 16px",
              borderRadius: 12,
              background: "rgba(255, 255, 255, 0.08)",
              backdropFilter: "blur(18px) saturate(160%)",
              WebkitBackdropFilter: "blur(18px) saturate(160%)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
              boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.28)",
              color: "#ffffff",
            }}
          >
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, opacity: 0.8 }}>
              SPECULAR RIM // BLUR 18PX
            </div>
            <div style={{ fontSize: 15, fontWeight: 600, marginTop: 4 }}>
              Liquid Glass Surface
            </div>
            <div style={{ fontSize: 11, opacity: 0.78, marginTop: 2 }}>
              Refractive depth over ambient chroma.
            </div>
          </div>
        </div>
      );

    case "ambient-orbit":
      return (
        <div
          style={{
            height: "100%",
            background: "radial-gradient(ellipse at 50% 50%, #161f33 0%, #0a0e18 65%, #06070a 100%)",
            color: "#e8ecf2",
            position: "relative",
            overflow: "hidden",
            display: "grid",
            placeItems: "center",
            fontFamily: "var(--font-mono)",
          }}
        >
          <svg
            viewBox="0 0 280 160"
            style={{ width: "100%", height: "100%", display: "block" }}
            aria-hidden="true"
          >
            <g transform="translate(140 82) rotate(-7)">
              <ellipse
                cx="0"
                cy="0"
                rx="46"
                ry="17"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="82"
                ry="30"
                fill="none"
                stroke="rgba(255,255,255,0.17)"
              />
              <ellipse
                cx="0"
                cy="0"
                rx="116"
                ry="43"
                fill="none"
                stroke="rgba(255,255,255,0.13)"
              />
              <circle cx="-72" cy="-16" r="4.5" fill="#111318" stroke="rgba(255,255,255,0.22)" opacity="0.5" />
              <circle cx="52" cy="24" r="6.5" fill="#111318" stroke="rgba(255,255,255,0.34)" />
              <circle cx="62" cy="18" r="2.3" fill="#38bdf8" />
              <circle cx="43" cy="30" r="2" fill="#7a8494" />
              <circle cx="-94" cy="22" r="5.5" fill="#111318" stroke="rgba(255,255,255,0.26)" />
              <circle cx="-102" cy="16" r="2.2" fill="#f59e0b" />
              <circle cx="0" cy="0" r="9" fill="#020204" stroke="rgba(255,224,178,0.8)" strokeWidth="1.2" />
            </g>
          </svg>
          <span
            style={{
              position: "absolute",
              bottom: 8,
              left: 12,
              fontSize: 9,
              color: "#7a8494",
              letterSpacing: "0.08em",
            }}
          >
            2.5D DEPTH-SORTED RADAR // #06070A
          </span>
        </div>
      );

    default:
      return null;
  }
}
