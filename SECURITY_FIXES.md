# Security Fixes Applied to DineHub

## Critical Security Issues Fixed

### 1. Environment Variables Exposure
**Issue:** `.env` files containing sensitive credentials were committed to git
- MongoDB credentials (username/password)
- SMTP credentials
- OAuth secrets (Google, Facebook)
- Stripe API keys
- JWT secret keys

**Fix:**
- Updated `.gitignore` to exclude all `.env` files
- Created `.env.example` files for both backend and frontend
- Added comprehensive `.gitignore` patterns for logs, build outputs, etc.

**Action Required:**
```bash
# Remove .env files from git history (if already committed)
git rm --cached backend/.env frontend/.env

# Rotate ALL credentials in the .env files
# - Generate new MongoDB user with new password
# - Regenerate JWT secrets
# - Rotate OAuth credentials
# - Get new Stripe keys
# - Generate new SMTP app password
```

### 2. AdminRoute Hardcoded Authentication Bypass
**Issue:** `frontend/src/Components/Private/AdminRoute.jsx` had hardcoded values:
```javascript
const isAuthenticated = true;  // ALWAYS TRUE!
const role = "admin";          // ALWAYS ADMIN!
```
This allowed **ANYONE** to access admin panel without authentication.

**Fix:**
- Implemented proper authentication check using `getAccessToken()` helper
- Added Redux state check for user profile and role
- Users are now properly redirected to `/login` if not authenticated
- Non-admin users are redirected to `/` if they try to access admin routes

### 3. Logout Controller Bug
**Issue:** `logoutController` was **deleting users** instead of logging them out:
```javascript
const response = await User.findOneAndDelete(email); // DELETES USER!
```

**Fix:**
- Completely rewrote logout controller to clear cookies properly
- Added secure cookie clearing with proper flags
- Imported and used `clearAuthCookies()` helper
- Added proper error handling

### 4. Insecure Cookie Configuration
**Issue:** Cookie settings were incorrect and insecure:
- Incorrect `expires` calculation: `new Date(Date() + 25892000000)` (Date() returns string)
- Used `sameSite: "none"` without `secure: true`
- No environment-based security flags
- Used CommonJS exports instead of ES6

**Fix:**
- Implemented environment-aware cookie settings
- Added proper `httpOnly`, `secure`, `sameSite` flags
- Cookies use `secure: true` in production (HTTPS only)
- `sameSite` is `none` in production, `lax` in development
- Added `clearAuthCookies()` utility function
- Converted to ES6 exports for consistency

### 5. Missing Security Headers
**Issue:** No security headers configured (vulnerable to XSS, clickjacking, MIME sniffing)

**Fix:**
- Installed and configured `helmet` middleware
- Added comprehensive security headers:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: SAMEORIGIN
  - Strict-Transport-Security (HSTS)
  - X-XSS-Protection
  - And more via helmet defaults

### 6. NoSQL Injection Vulnerability
**Issue:** No input sanitization for MongoDB queries

**Fix:**
- Installed `express-mongo-sanitize` package
- Configured to strip `$` and `.` from user input
- Prevents malicious MongoDB operators in queries

### 7. HTTP Parameter Pollution
**Issue:** No protection against parameter pollution attacks

**Fix:**
- Installed `hpp` (HTTP Parameter Pollution) middleware
- Prevents duplicate parameters in query strings

### 8. Weak Rate Limiting
**Issue:** Rate limiting was too permissive (10 requests per minute, applies to ALL routes)

**Fix:**
- Implemented tiered rate limiting:
  - **Global limiter:** 100 requests per 15 minutes (for all routes)
  - **Auth limiter:** 5 attempts per 15 minutes (for login, signup, password reset)
- Auth limiter skips successful requests (only counts failed attempts)
- Applied auth limiter to `/login`, `/signup`, `/google-login`, `/forget-password`

### 9. Inconsistent JWT Secret Keys
**Issue:** Two JWT secrets (`jwtAccessKey` and `jwtSecretKey`) used inconsistently

**Fix:**
- Marked `jwtSecretKey` as deprecated in `secret.js`
- Recommended using `jwtAccessKey` for all JWT operations
- Updated documentation

### 10. Missing Environment Variables
**Issue:** No `NODE_ENV` or `FRONTEND_URL` configuration

**Fix:**
- Added `NODE_ENV` to secret.js (defaults to "development")
- Added `FRONTEND_URL` to secret.js (defaults to "http://localhost:5173")
- Updated CORS to use `FRONTEND_URL` in production
- Updated `.env.example` with new variables

---

## Additional Security Improvements

### CORS Configuration
- Environment-aware CORS settings
- Restricts origins based on `NODE_ENV`
- Development: Allows `localhost:5173` and `localhost:3000`
- Production: Uses `FRONTEND_URL` from environment
- Configured allowed methods and headers

### Body Parser Limits
- Added 10MB limit to prevent large payload attacks
- Applied to both JSON and URL-encoded parsers

### Request Logging
- Morgan logging only in development (reduces log bloat in production)
- Helps debug during development without performance impact in production

---

## Security Best Practices Implemented

1. **Principle of Least Privilege:** AdminRoute now properly checks roles
2. **Defense in Depth:** Multiple layers of security (helmet, sanitization, rate limiting)
3. **Secure by Default:** Production mode enforces stricter security
4. **Environment Separation:** Different configs for dev/production
5. **Input Validation:** Sanitization against NoSQL injection and XSS
6. **Rate Limiting:** Prevents brute force and DoS attacks
7. **Secure Session Management:** Proper cookie flags and expiration

---

## Remaining Security Recommendations

### High Priority
1. **Rotate All Credentials:** Change all passwords, secrets, and API keys
2. **Remove .env from Git History:** Use `git filter-branch` or BFG Repo-Cleaner
3. **Enable HTTPS in Production:** Required for secure cookies to work
4. **Implement CSRF Protection:** Add `csurf` middleware (when frontend supports it)
5. **Add Email Verification:** Verify user emails on signup
6. **Implement Token Refresh:** Add refresh token mechanism for better security

### Medium Priority
7. **Add 2FA (Two-Factor Authentication):** For admin accounts
8. **Implement Account Lockout:** After multiple failed login attempts
9. **Add Security Audit Logging:** Log all admin actions and auth events
10. **Content Security Policy (CSP):** Configure helmet CSP for frontend assets
11. **Password Strength Validation:** Enforce strong password requirements
12. **Session Timeout:** Auto-logout after inactivity

### Low Priority
13. **Add Subresource Integrity (SRI):** For external CDN resources
14. **Implement API Versioning:** `/api/v1/...` for better maintenance
15. **Add Request ID Tracking:** For debugging and audit trails
16. **Implement IP Whitelisting:** For admin routes (optional)

---

## Testing Security Fixes

### Manual Testing Checklist
- [ ] Verify .env files are ignored by git
- [ ] Test admin routes redirect non-admin users
- [ ] Verify logout clears cookies properly
- [ ] Test rate limiting on login (attempt 6+ times)
- [ ] Confirm cookies have correct flags (httpOnly, secure in prod)
- [ ] Test CORS with different origins
- [ ] Verify MongoDB injection prevention (try `{"$gt": ""}` in inputs)
- [ ] Check security headers in browser DevTools (Network tab)

### Automated Testing (Recommended)
```bash
# Install security audit tools
npm install -g snyk
npm audit

# Run security scan
snyk test

# Check for known vulnerabilities
npm audit fix
```

---

## Security Headers Applied

When helmet is enabled, these headers are automatically set:

```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Strict-Transport-Security: max-age=15552000; includeSubDomains
X-XSS-Protection: 1; mode=block
X-Download-Options: noopen
X-Permitted-Cross-Domain-Policies: none
Referrer-Policy: no-referrer
```

---

## Environment Variables Reference

### Backend (.env)
```bash
PORT=3333
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com

MONGO_URL=mongodb+srv://...
ACCESS_KEY=random_secret_key_here
SECRET_KEY=another_secret_key

FB_ID=facebook_app_id
FB_SECRET=facebook_app_secret

SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=app_specific_password

STRIPE_SECRET_KEY=sk_live_your_stripe_key
```

### Frontend (.env)
```bash
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_CLIENT_SECRET=your_google_secret
VITE_FB_ID=facebook_app_id
VITE_SERVER_URL=https://your-backend-domain.com
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
```

---

## Deployment Checklist

Before deploying to production:

1. [ ] Set `NODE_ENV=production` in backend .env
2. [ ] Update `FRONTEND_URL` to production domain
3. [ ] Rotate all credentials (MongoDB, JWT, OAuth, Stripe, SMTP)
4. [ ] Enable HTTPS/SSL on server
5. [ ] Configure firewall rules
6. [ ] Set up error monitoring (Sentry, LogRocket, etc.)
7. [ ] Enable database backups
8. [ ] Review CORS settings
9. [ ] Test rate limiting in production
10. [ ] Verify security headers using https://securityheaders.com/

---

## Incident Response

If credentials are compromised:

1. **Immediately rotate all affected credentials**
2. **Check logs for suspicious activity**
3. **Force logout all users (clear sessions)**
4. **Review database for unauthorized changes**
5. **Notify affected users if data was accessed**
6. **Update security procedures**
7. **Consider security audit**

---

## Contact

For security concerns or to report vulnerabilities, please contact:
- GitHub Issues: [Project Repository Issues]
- Security Email: [security@your-domain.com]

**Do not publicly disclose security vulnerabilities until they are fixed.**
