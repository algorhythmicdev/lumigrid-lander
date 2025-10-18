# Vercel Deployment Guide

This project is configured to deploy as a static site on Vercel.

## Quick Deploy

### Option 1: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your Git repository
4. Framework Preset: **Other** (or leave as auto-detected)
5. Build & Development Settings:
   - **Build Command**: `npm run build` (or leave empty)
   - **Output Directory**: `.` (root directory)
   - **Install Command**: `npm install` (or leave as default)
6. Click "Deploy"

### Option 2: Vercel CLI
```bash
# Install Vercel CLI globally (if not already installed)
npm i -g vercel

# Deploy
vercel --prod
```

## Configuration

The project includes a `vercel.json` configuration file that:
- Sets up a rewrite for `/favicon.ico` → `/public/favicon.svg`
- Configures cache headers for static assets (CSS, JS, images)

## File Structure

```
/
├── index.html              # Main HTML file (served as root)
├── css/lumigrid.css        # Stylesheet
├── js/lumigrid.js          # JavaScript module
├── assets/                 # Images and other assets
├── public/                 # Public files (favicon, robots.txt, sitemap.xml)
├── package.json            # NPM configuration (minimal, no dependencies)
└── vercel.json             # Vercel deployment configuration
```

## Build Process

This is a static site with no build process. The build script simply echoes a message.
All files are served directly from the repository root.

## Troubleshooting

### Deployment fails with "Command not found" error
- This has been fixed by removing references to the `serve` package which was not installed
- The build script now just echoes a message and doesn't require any dependencies

### Routes not working
- The modern Vercel configuration uses `rewrites` and `headers` instead of the deprecated `routes` syntax
- Static files are automatically served from the root directory
- The favicon rewrite ensures `/favicon.ico` redirects to `/public/favicon.svg`

### Assets not loading
- Ensure all file paths start with `/` (absolute paths)
- Cache headers are configured for optimal performance

## Environment Variables

No environment variables are required for this static site.

## Custom Domain

After deployment, you can add a custom domain in the Vercel dashboard:
1. Go to your project settings
2. Click "Domains"
3. Add your custom domain and follow DNS configuration instructions

## Monitoring

Vercel provides automatic:
- Edge network CDN
- HTTPS certificates
- Analytics (optional)
- Performance monitoring

## Support

For Vercel-specific issues, consult:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
