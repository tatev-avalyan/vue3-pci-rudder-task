# Secure Fields + RudderStack Vue 3 Integration

This project is a small Vue 3 setup where I built a secure credit card form using Datatrans' PCI Proxy Secure Fields and added analytics tracking with RudderStack. The goal was to handle sensitive fields securely (via iframe) while tracking form behavior for insights.

---

## Task Breakdown & My Approach

### Comparing the Options

#### IFrame (what I used here)

* Super secure — card data doesn’t even touch my frontend
* Easy to stay PCI-compliant
* A bit tricky to style and debug since it’s inside an iframe

#### Client-Side Tokenization

* More styling freedom and form control
* Slightly more PCI responsibility and setup complexity

#### Hosted Payment Page

* You don’t touch card data at all
* User gets redirected away — bad for experience and analytics

I went with iframe because the task said to use Secure Fields, and also because it’s a solid balance of security and control.

---

### RudderStack Tracking

I used the legacy RudderStack SDK to log:

* When users blur cardholder or expiry fields
* When they submit (success/fail)
* Any errors from the Secure Fields SDK

In a real app, I’d use their newer SDK, but I followed the task repo for consistency.

---

### 3DS Redirect – What Could Go Wrong?

When a user gets redirected to the 3D Secure step and comes back, things that can break:

* They close the tab
* Redirect URL is missing data (like `transactionId`)
* Internet connection fails
* Session expires while they’re away

#### How I handled it:

* I faked a 3DS flow with a `transactionId` passed in query params
* Added a separate callback route
* Added logs and fallbacks in case something’s missing
* Instead of forcing redirects, I show a "Continue" button on the 3DS screen

If this were live, I’d also store session data and validate everything server-side.

---

### Why `.env.local`?

To avoid hardcoding sensitive stuff:

```env
VITE_RUDDER_WRITE_KEY=2wjlDP0IJFe9WaZ8uNV2FXsGifi
VITE_RUDDER_DATAPLANE_URL=https://hosted.rudderlabs.com
VITE_PCI_MERCHANT_ID="1110019647"
```

This lets me safely load credentials via Vite, and it keeps config flexible.

---

## What I Built

* Secure Fields iframe integration for PAN + CVV
* RudderStack tracking for field interactions, errors, and submits
* Validations for non-secure fields (like cardholder name, expiry)
* Error messages below fields
* Simulated 3DS redirect flow with manual "Continue" step

---

## Run the Project

```bash
npm install
```

Create `.env.local` with the values shown above, then:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## Test Card Info

```
Card Number: 4242 4242 4242 4242
CVV: 123
Expiry: Any valid future month/year
```

---

## Final Thoughts

This covers everything from the task: iframe integration, analytics logging, and simulated 3DS flow. I also made sure to validate inputs and show user-friendly error messages.

Thanks for checking it out!
