/** @type {import('next').NextConfig} */

/**
 * CSP compatible Next.js (scripts inline du runtime), GTM/GA4, iframe Google Maps (contact).
 * À étendre (connect-src / frame-src) si nouveaux domaines tiers.
 */
function buildContentSecurityPolicy() {
  const directives = [
    "default-src 'self'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      "https://www.googletagmanager.com",
      "https://www.google-analytics.com",
      "https://ssl.google-analytics.com",
      "https://tagmanager.google.com",
    ].join(" "),
    ["style-src", "'self'", "'unsafe-inline'"].join(" "),
    ["img-src", "'self'", "data:", "blob:", "https:"].join(" "),
    ["font-src", "'self'", "data:"].join(" "),
    [
      "connect-src",
      "'self'",
      "https://www.google-analytics.com",
      "https://*.google-analytics.com",
      "https://region1.google-analytics.com",
      "https://analytics.google.com",
      "https://www.googletagmanager.com",
      "https://stats.g.doubleclick.net",
    ].join(" "),
    [
      "frame-src",
      "'self'",
      "https://www.googletagmanager.com",
      "https://www.google.com",
      "https://maps.google.com",
    ].join(" "),
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ];
  return directives.join("; ");
}

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "Content-Security-Policy", value: buildContentSecurityPolicy() },
];

if (process.env.NODE_ENV === "production") {
  securityHeaders.splice(1, 0, {
    key: "Strict-Transport-Security",
    value: "max-age=31536000; includeSubDomains",
  });
}

const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./lib/imageLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
