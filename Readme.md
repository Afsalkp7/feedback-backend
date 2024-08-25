# FEEDBACK API

sample body data on add feed

{
    "title": "Customer Satisfaction Survey",
    "fields": [
        {
            "fieldType": "StarRating",
            "label": "Rate our service",
            "isRequired": true,
            "errorMessage": "Please provide a rating."
        },
        {
            "fieldType": "TextArea",
            "label": "Comments",
            "isRequired": false,
            "errorMessage": ""
        },
        {
            "fieldType": "RadioButtons",
            "label": "How did you hear about us?",
            "isRequired": true,
            "errorMessage": "This field is required.",
            "options": ["Internet", "Friends", "Advertisement"]
        }
    ]
}