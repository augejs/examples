define({ "api": [
  {
    "type": "post",
    "url": "/redis/increase",
    "title": "Increase",
    "group": "Redis",
    "sampleRequest": [
      {
        "url": "/redis/increase"
      }
    ],
    "version": "0.0.0",
    "filename": "src/RedisController.ts",
    "groupTitle": "Redis",
    "name": "PostRedisIncrease"
  },
  {
    "type": "post",
    "url": "/redis/lock",
    "title": "Publish Redis Message",
    "group": "Redis",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "message",
            "defaultValue": "default",
            "description": "<p>Message</p>"
          }
        ]
      }
    },
    "sampleRequest": [
      {
        "url": "/redis/lock"
      }
    ],
    "version": "0.0.0",
    "filename": "src/RedisController.ts",
    "groupTitle": "Redis",
    "name": "PostRedisLock"
  },
  {
    "type": "post",
    "url": "/redis/setKey",
    "title": "SetKey",
    "group": "Redis",
    "sampleRequest": [
      {
        "url": "/redis/setKey"
      }
    ],
    "version": "0.0.0",
    "filename": "src/RedisController.ts",
    "groupTitle": "Redis",
    "name": "PostRedisSetkey"
  }
] });
