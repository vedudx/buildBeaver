# Licensing Questions (Greater Vancouver Area)

This document defines the questions needed to determine business licensing requirements
for a small business (e.g., bakery) in the Greater Vancouver Area (GVA).

The goal is to collect minimal but sufficient information to:
- Determine municipal licensing requirements
- Identify zoning constraints
- Detect health permit requirements
- Handle special cases (mobile, multi-city, etc.)

---

## 🎯 Design Principles

- Ask only essential questions
- Use simple language (non-legal)
- Prefer dropdowns over free text
- Reuse answers across steps
- Enable deterministic logic (if/else mapping)

---

## 🧠 Core Questions

### 1. City of Operation (REQUIRED)

Which city will your business operate in?

Options:
- Vancouver
- Burnaby
- Surrey
- Richmond
- Other (Greater Vancouver Area)

Notes:
- Each city has its own business licence system
- This determines which municipal authority applies

---

### 2. Business Location Type

Where will you run your business from?

Options:
- Home-based
- Commercial space (storefront, kitchen, etc.)
- Mobile (food truck, pop-up, temporary setup)

Notes:
- Determines licence type and zoning rules
- Home-based businesses have stricter limitations

---

### 3. Food Involvement

Will you prepare or sell food to customers?

Options:
- Yes
- No

Notes:
- If "Yes", additional health permits may be required
- Triggers food safety requirements

---

### 4. Type of Food Operation (Conditional)

(Ask only if Food Involvement = Yes)

How will you handle food?

Options:
- Prepare food on-site (bakery, cafe)
- Sell pre-packaged food
- Home-based low-risk food (e.g., baked goods)

Notes:
- Determines whether a health permit is required
- Affects inspection requirements

---

### 5. Business Location Status

Do you already have a business location?

Options:
- Yes
- No

Notes:
- Zoning approval is required before licensing
- If "No", user may need to secure location first

---

### 6. Customer Interaction

Will customers visit your business location?

Options:
- Yes
- No (delivery / online only)

Notes:
- Affects zoning and inspection requirements
- Home-based businesses often restrict customer visits

---

### 7. Multi-City Operation

Will you operate in more than one city?

Options:
- Yes
- No

Notes:
- May require Inter-Municipal Business Licence (IMBL)
- Common for mobile or service-based businesses

---

## 🟡 Optional Question (Nice-to-Have)

### 8. Temporary or Market Sales

Will you sell at markets or temporary events?

Options:
- Yes
- No

Notes:
- May require temporary event permits
- Relevant for pop-ups, farmers markets

---

## 🧩 Example Input

```json
{
  "city": "Burnaby",
  "location_type": "home-based",
  "food": true,
  "food_type": "home-based low-risk",
  "has_location": true,
  "customer_visits": false,
  "multi_city": false
}
