Sample rules JSON to handle requirements


    {
      "activity": "Food Service",
      "triggers": {
        "mandatory": [
          {
            "id": "food-safe-level-1",
            "condition": "staff_count > 0",
            "label": "FOODSAFE Level 1 Certification",
            "authority": "Provincial Health Authority"
          },
          {
            "id": "liquor-license",
            "condition": "serves_alcohol == true",
            "label": "Liquor Primary License",
            "requires": ["criminal-record-check"]
          }
        ],
        "environmental": [
          {
            "id": "grease-trap-permit",
            "condition": "cooking_on_site == true",
            "label": "Municipal Wastewater Permit"
          }
        ]
      }
    }
