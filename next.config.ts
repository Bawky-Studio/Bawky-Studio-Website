import createNextIntlPlugin from "next-intl/plugin";
  
const nextConfig = {
  reactStrictMode: true,
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
  
const withNextIntl = createNextIntlPlugin();
  
export default withNextIntl(nextConfig);
