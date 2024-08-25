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

Replay or feedback dummy 
{
    "feedbackFormId": "66cb605e4e157eccaded63f7",  
    "userId": "66cb61aaf1aee9b8f9599a46",       
    "responses": [
        {
            "field": "66cb605e4e157eccaded63f3", 
            "value": "Excellent"               
        },
        {
            "field": "66cb605e4e157eccaded63f1",
            "value": 4  
        }
    ]
}