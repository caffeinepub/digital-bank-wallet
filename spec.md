# Specification

## Summary
**Goal:** Rebuild the Bluestone Bank Dashboard page to match a mobile banking layout with a branded top bar, balance card, quick actions, recent transactions, and bottom navigation.

**Planned changes:**
- Replace the generic Layout wrapper on the Dashboard with a self-contained mobile-first layout; top section uses dark navy/blue background, content section below uses white/light grey with rounded top corners, centered and max-width constrained
- Add a sticky top bar with a hamburger menu icon on the left, "Bluestone Bank" branding centered with tagline "Solid Foundation, Secure Funds" beneath it in a smaller lighter font, and a notification bell icon with a red badge on the right
- Add a hero balance card below the top bar showing a personalized greeting ("Hello, [User Name]"), "Your Balance" label with the live balance amount in large bold text, and an "Available Balance" label, styled with a blue gradient background
- Add a horizontal row of four circular quick-action buttons (Transfer, Deposit, Withdraw, Pay Bills) each with a white circular icon background and label; Transfer/Deposit/Withdraw navigate to existing routes, Pay Bills shows a Coming Soon toast
- Add a Recent Transactions section showing up to 5 most recent transactions with category icon, name, relative date, and right-aligned amount (green with "+" for credits, red with "-" for debits); includes skeleton loaders and empty state
- Add a fixed bottom navigation bar with four tabs: Home (house icon), Accounts (card icon), Payments (dollar icon), More (three-dot icon); active tab highlighted; Home navigates to dashboard, Accounts and Payments show Coming Soon toast; main content padded to avoid overlap

**User-visible outcome:** Users see a fully redesigned mobile-style dashboard with Bluestone Bank branding and tagline, a live balance card, quick-action buttons, recent transactions list, and a bottom navigation bar matching the reference layout.
