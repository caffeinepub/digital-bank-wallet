# Specification

## Summary
**Goal:** Redesign the BlueStone Bank dashboard into a full-featured modern banking home screen with a virtual card, expanded quick actions, rich transaction feed, and multiple account overview.

**Planned changes:**
- Redesign the Dashboard page with a dark navy/deep charcoal and gold/amber theme, card-based layout, subtle shadows, and micro-animations
- Add a prominent account balance section at the top with a show/hide toggle button that masks the amount as ••••••
- Add an interactive virtual debit card showing masked PAN, user name, expiry, and BlueStone Bank branding, with a 3D flip animation on click to reveal the card back (CVV area, card network logo)
- Replace the existing QuickActions component with four buttons: Transfer, Deposit, Bill Pay, and Top-up — each with a unique icon and color accent; Bill Pay and Top-up show a "Coming Soon" toast
- Update the RecentTransactionsList to show up to 5 recent transactions with icon, description, date, and color-coded amounts (green for credits, red for debits), a loading skeleton, and a "View All" link to the full history page
- Add a multiple accounts overview section showing a Checking account card (live backend balance) and a Savings account card (dummy data), each with account type label, masked account number, and balance
- Ensure the login page retains its professional BlueStone Bank design (email, password, Remember Me, Forgot Password, Sign In) and navigates to the new dashboard on success

**User-visible outcome:** Users see a polished, modern bank dashboard with a virtual card they can flip, a toggleable balance, four quick action buttons, a rich transaction feed, and an overview of their Checking and Savings accounts — all styled consistently with the BlueStone Bank brand.
