# Get Business Number (CRA) (Form Step)

This step prepares the user to register for a Business Number (BN) with the Canada Revenue Agency.

## Questions

1. What is your business name?
   - Prefilled

2. What type of business structure?
   - Prefilled

3. What is your business address?
   - Prefilled

4. When did your business start operating?
   - Input: date or month/year

5. Do you expect to earn more than $30,000 per year?
   - Options:
     - Yes
     - No

## Derived Logic

- If "Yes" → GST/HST registration is required
- If "No" → GST/HST registration is optional

## Notes

- Reuse previous answers where possible
- Only ask for new information

## Expected Output (Example)

Business Name: Vedant Bakery Inc.  
Ownership Type: Sole Proprietorship  
Address: Vancouver, BC  
Start Date: March 2026  

GST/HST Registration: Recommended
