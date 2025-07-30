import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Use 'dynamicIO: true' only if you're reading files at runtime in server components — not for DB queries which are network or driver-based
  // Needed when using fs.readFile, fs.readdir, etc., path.resolve, process.cwd(), etc. i.e. when Node.js file system (I/O) is involved
  // experimental: {
  //   dynamicIO: true,
  // },
}

export default nextConfig
