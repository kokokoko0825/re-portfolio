// 16px を基準とする役割別トークン。既存の 768px 境界を共用する。
export const mobile = "screen and (max-width: 768px)";

export const space = {
    4: "0.25rem", 8: "0.5rem", 12: "0.75rem", 16: "1rem",
    20: "1.25rem", 24: "1.5rem", 32: "2rem", 40: "2.5rem",
    48: "3rem", 64: "4rem", 96: "6rem",
} as const;

export const layout = {
    pageInset: space[32], sectionGap: space[96], cardGap: space[24],
    cardPadding: space[24], cardContentGap: space[12], articleMaxWidth: "40em",
    mobile: {
        pageInset: space[20], sectionGap: space[64], cardGap: space[16],
        cardPadding: space[20], cardContentGap: space[12], articleMaxWidth: "100%",
    },
} as const;

export const type = {
    heroName: { fontSize: "6rem", mobileSize: "3rem", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.01em" },
    largeTitle: { fontSize: "2.25rem", mobileSize: "2rem", fontWeight: 700, lineHeight: 1.4, letterSpacing: 0 },
    title1: { fontSize: "1.75rem", mobileSize: "1.625rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
    title2: { fontSize: "1.5rem", mobileSize: "1.375rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
    title3: { fontSize: "1.25rem", mobileSize: "1.125rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
    headline: { fontSize: "1.0625rem", mobileSize: "1rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
    body: { fontSize: "1.0625rem", mobileSize: "1rem", fontWeight: 400, lineHeight: 1.75, letterSpacing: 0 },
    subheadline: { fontSize: "1rem", mobileSize: "1rem", fontWeight: 500, lineHeight: 1.5, letterSpacing: 0 },
    uiBody: { fontSize: "1rem", mobileSize: "1rem", fontWeight: 400, lineHeight: 1.5, letterSpacing: 0 },
    footnote: { fontSize: "0.875rem", mobileSize: "0.875rem", fontWeight: 400, lineHeight: 1.6, letterSpacing: 0 },
    caption: { fontSize: "0.875rem", mobileSize: "0.875rem", fontWeight: 500, lineHeight: 1.6, letterSpacing: 0 },
    articleBody: { fontSize: "1.125rem", mobileSize: "1rem", fontWeight: 400, lineHeight: 1.9, letterSpacing: 0 },
    articleH2: { fontSize: "1.75rem", mobileSize: "1.5rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
    articleH3: { fontSize: "1.5rem", mobileSize: "1.25rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
    articleH4: { fontSize: "1.25rem", mobileSize: "1.125rem", fontWeight: 700, lineHeight: 1.5, letterSpacing: 0 },
} as const;

export function typeStyle(token: keyof typeof type) {
    const { mobileSize, ...desktop } = type[token];
    return {
        ...desktop,
        ...(desktop.fontSize !== mobileSize ? {
            "@media": { [mobile]: { fontSize: mobileSize } },
        } : {}),
    };
}
