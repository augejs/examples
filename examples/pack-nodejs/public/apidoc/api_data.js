define({ "api": [
  {
    "type": "get",
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
            "field": "userName",
            "description": "<p>User name.</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/user/hello"
      }
    ],
    "version": "0.0.0",
    "filename": "src/controllers/User.controller.ts",
    "groupTitle": "User",
    "name": "GetUserLogin"
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
