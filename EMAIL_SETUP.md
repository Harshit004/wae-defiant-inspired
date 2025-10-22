# Email Configuration Setup

To enable email sending functionality for job applications, you need to configure email credentials.

## Setup Instructions

1. Create a `.env.local` file in the root directory of your project

2. Add the following environment variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
```

## Getting Gmail App Password

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to "App passwords" section
5. Generate a new app password for "Mail"
6. Copy the 16-character password
7. Use this password in the `EMAIL_PASSWORD` variable

## Alternative Email Services

If you want to use a different email service, update the transporter configuration in `/app/api/send-email/route.ts`:

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.your-provider.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

## Testing

After configuration, test the email functionality by:
1. Filling out the job application form
2. Submitting the form
3. Checking the configured email inbox for the application details

## Email Details

- **Recipient:** wae.marktech@gmail.com
- **Subject:** Job title from the job description page
- **Body:** Applicant name, email, phone, and page URL
