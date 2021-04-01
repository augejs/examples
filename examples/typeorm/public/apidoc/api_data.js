define({ "api": [
  {
    "type": "post",
    "url": "/user/img",
    "title": "Request User information",
    "group": "User",
    "sampleRequest": [
      {
        "url": "/user/img"
      }
    ],
    "version": "0.0.0",
    "filename": "src/controllers/User.controller.ts",
    "groupTitle": "User",
    "name": "PostUserImg"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "Request User information",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "userId",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/user/login"
      }
    ],
    "version": "0.0.0",
    "filename": "src/controllers/User.controller.ts",
    "groupTitle": "User",
    "name": "PostUserLogin"
  }
] });
