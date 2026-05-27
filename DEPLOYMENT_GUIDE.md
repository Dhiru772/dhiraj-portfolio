# Full-Stack Portfolio Guide: Local Testing & Free Deployment

This guide explains how to run your portfolio locally, view database entries, and deploy the entire full-stack application (frontend + database + contact API) for free.

---

## 1. Local Development & Testing

Your local setup is configured to use a local **SQLite** database (`dev.db`), which runs out of the box without requiring any external cloud database.

### Start the Development Server
Run the following command in your terminal:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### View Contact Form Messages (Prisma Studio)
Prisma provides a built-in visual database browser called **Prisma Studio**. You can use it to view, create, edit, or delete messages submitted through your contact form.
Run:
```bash
npx prisma studio
```
This will open a browser tab at `http://localhost:5555` where you can see all your `ContactMessage` entries.

---

## 2. Free Production Database Setup (Neon or Supabase)

Next.js Serverless API routes on hosting services like Vercel have ephemeral filesystems. This means a local SQLite file (`dev.db`) will get wiped out regularly. To persist your database submissions in production, you should connect a free cloud PostgreSQL database.

### Recommended: Neon Postgres (Free & Fast)
1. Go to [Neon.tech](https://neon.tech) and sign up for a free account.
2. Create a new project (select PostgreSQL 16+).
3. Copy your database connection string, which will look like:
   `postgresql://neondb_owner:password@ep-cool-snowflake-123456.us-east-2.aws.neon.tech/neondb?sslmode=require`
4. Set this URL as your `DATABASE_URL` in production (see Vercel setup below).

### Alternative: Supabase (Free & Full Featured)
1. Go to [Supabase.com](https://supabase.com) and sign up.
2. Create a new project.
3. Go to **Project Settings** > **Database** and copy the **Connection string** (URI format).

---

## 3. Deploying to Vercel (Free Hosting)

Vercel is the creator of Next.js and offers a best-in-class free tier for personal sites.

### Step 1: Push your code to GitHub
Create a repository on GitHub (private or public) and push your code:
```bash
git init
git add .
git commit -m "feat: setup full-stack contact api and database"
# Add your origin and push
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

### Step 2: Import Project on Vercel
1. Sign up/log in at [Vercel.com](https://vercel.com).
2. Click **Add New** > **Project**.
3. Import your GitHub repository.
4. Under **Environment Variables**, add:
   - `DATABASE_URL` = (Insert the cloud PostgreSQL link you got from Neon or Supabase)
5. Click **Deploy**.

> [!NOTE]
> Vercel will run `npm run build` which automatically triggers `postinstall` (`prisma generate`), ensuring your database client is fully compiled and ready.

### Step 3: Run Database Migrations in Production
Once Vercel is connected, you need to push the Prisma database schema into your cloud database.
Run this command from your local machine, replacing the value with your production PostgreSQL URL (or temporarily set it in your local `.env` and run it):
```bash
npx prisma db push
```

---

## 4. Setting up Free Email Notifications (Optional)

If you'd like to get an email notification whenever someone fills out your contact form, you can use **Resend**.

1. Go to [Resend.com](https://resend.com) and create a free account.
2. Copy your **API Key** (starts with `re_`).
3. Add these environment variables to your Vercel project configuration:
   - `RESEND_API_KEY` = `re_your_api_key_here`
   - `NOTIFICATION_EMAIL` = `dhirajsharma9848@gmail.com`
4. Re-deploy or restart your Vercel deployment. Now, every submission will trigger a styled email sent to you!

---

## 5. Verification Checklist

- [ ] Send a test message on `localhost:3000/#contact`. Verify the spinner runs, and the success checkmark appears.
- [ ] Run `npx prisma studio` and confirm the message was successfully saved to your database.
- [ ] Deploy to Vercel and verify the live website loads successfully.
