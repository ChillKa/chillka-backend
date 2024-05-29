// THIS FILE IS AUTO-GENERATED BY SCHEMAGENERATOR.JS
/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

export const _schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "GenderEnum": {
      "type": "string",
      "enum": [
        "男",
        "女"
      ]
    },
    "UserBase": {
      "type": "object",
      "properties": {
        "displayName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "displayName",
        "email",
        "password"
      ]
    },
    "UserSchemaModel": {
      "type": "object",
      "properties": {
        "googleId": {
          "type": "string"
        },
        "realName": {
          "type": "string"
        },
        "birthday": {
          "type": "string"
        },
        "gender": {
          "enum": [
            "女",
            "男"
          ],
          "type": "string"
        },
        "age": {
          "type": "number"
        },
        "introduction": {
          "type": "string"
        },
        "phoneAreaCode": {
          "type": "number"
        },
        "phoneNumber": {
          "type": "number"
        },
        "phoneBarcode": {
          "type": "string"
        },
        "address": {
          "type": "string"
        },
        "isEmailValidate": {
          "type": "string"
        },
        "savedActivities": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Types.ObjectId"
          }
        },
        "displayName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "displayName",
        "email",
        "password"
      ]
    },
    "UserRegisterCredentials": {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "displayName": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "password": {
              "type": "string"
            }
          },
          "required": [
            "displayName",
            "email",
            "password"
          ]
        },
        {
          "type": "object",
          "properties": {
            "confirmPassword": {
              "type": "string"
            }
          },
          "required": [
            "confirmPassword"
          ]
        }
      ]
    },
    "UserTokenCredentials": {
      "type": "object",
      "properties": {
        "_id": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "displayName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      },
      "required": [
        "_id",
        "displayName",
        "email"
      ]
    },
    "UserLoginCredentials": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "password": {
          "type": "string"
        }
      },
      "required": [
        "email",
        "password"
      ]
    },
    "UserEditCredentials": {
      "type": "object",
      "properties": {
        "address": {
          "type": "string"
        },
        "age": {
          "type": "number"
        },
        "displayName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "googleId": {
          "type": "string"
        },
        "realName": {
          "type": "string"
        },
        "birthday": {
          "type": "string"
        },
        "gender": {
          "enum": [
            "女",
            "男"
          ],
          "type": "string"
        },
        "introduction": {
          "type": "string"
        },
        "phoneAreaCode": {
          "type": "number"
        },
        "phoneNumber": {
          "type": "number"
        },
        "phoneBarcode": {
          "type": "string"
        },
        "isEmailValidate": {
          "type": "string"
        },
        "savedActivities": {
          "type": "array",
          "items": {
            "$ref": "#/definitions/Types.ObjectId"
          }
        }
      },
      "required": [
        "displayName",
        "email"
      ]
    },
    "SendEmailCredentials": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string"
        },
        "emailType": {
          "enum": [
            "resetPassword",
            "verifyEmail"
          ],
          "type": "string"
        }
      },
      "required": [
        "email",
        "emailType"
      ]
    },
    "ResetPasswordCredentials": {
      "type": "object",
      "properties": {
        "token": {
          "type": "string"
        },
        "password": {
          "type": "string"
        },
        "confirmPassword": {
          "type": "string"
        }
      },
      "required": [
        "confirmPassword",
        "password",
        "token"
      ]
    },
    "ChangePasswordParams": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "oldPassword": {
          "type": "string"
        },
        "newPassword": {
          "type": "string"
        },
        "confirmNewPassword": {
          "type": "string"
        }
      },
      "required": [
        "confirmNewPassword",
        "newPassword",
        "oldPassword",
        "userId"
      ]
    },
    "ChangePasswordCredentials": {
      "type": "object",
      "properties": {
        "oldPassword": {
          "type": "string"
        },
        "newPassword": {
          "type": "string"
        },
        "confirmNewPassword": {
          "type": "string"
        }
      },
      "required": [
        "confirmNewPassword",
        "newPassword",
        "oldPassword"
      ]
    },
    "SortEnum": {
      "type": "string",
      "enum": [
        "asc",
        "des"
      ]
    },
    "AuthDecoded": {
      "type": "object",
      "properties": {
        "int": {
          "type": "number"
        },
        "exp": {
          "type": "number"
        },
        "_id": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "displayName": {
          "type": "string"
        },
        "email": {
          "type": "string"
        }
      },
      "required": [
        "_id",
        "displayName",
        "email",
        "exp",
        "int"
      ]
    },
    "SortType": {
      "enum": [
        "asc",
        "des"
      ],
      "type": "string"
    },
    "OrganizerSchemaModel": {
      "type": "object",
      "properties": {
        "profilePicture": {
          "type": "string"
        },
        "name": {
          "type": "string"
        },
        "contactName": {
          "type": "string"
        },
        "contactPhone": {
          "type": "string"
        },
        "contactEmail": {
          "type": "string"
        },
        "websiteName": {
          "type": "string"
        },
        "websiteURL": {
          "type": "string"
        }
      },
      "required": [
        "contactEmail",
        "contactName",
        "contactPhone",
        "name",
        "profilePicture",
        "websiteName",
        "websiteURL"
      ]
    },
    "OrganizerBase": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "profilePicture": {
          "type": "string"
        },
        "contactName": {
          "type": "string"
        },
        "contactPhone": {
          "type": "string"
        },
        "contactEmail": {
          "type": "string"
        },
        "websiteName": {
          "type": "string"
        },
        "websiteURL": {
          "type": "string"
        }
      },
      "required": [
        "contactEmail",
        "contactName",
        "contactPhone",
        "name",
        "profilePicture",
        "websiteName",
        "websiteURL"
      ]
    },
    "TicketStatusEnum": {
      "type": "string",
      "enum": [
        "可購買",
        "已售完",
        "結束售票"
      ]
    },
    "TicketSchemaModel": {
      "type": "object",
      "properties": {
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "name": {
          "type": "string"
        },
        "price": {
          "type": "number"
        },
        "startDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "fromToday": {
          "type": "boolean"
        },
        "endDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "noEndDate": {
          "type": "boolean"
        },
        "participantCapacity": {
          "type": "number"
        },
        "unlimitedQuantity": {
          "type": "boolean"
        },
        "purchaseLimit": {
          "type": "number"
        },
        "description": {
          "type": "string"
        },
        "purchaseDuplicate": {
          "type": "boolean"
        },
        "ticketStatus": {
          "type": "string",
          "enum": [
            "可購買",
            "已售完",
            "結束售票"
          ]
        },
        "serialNumber": {
          "type": "string"
        }
      },
      "required": [
        "activityId",
        "description",
        "endDateTime",
        "fromToday",
        "name",
        "noEndDate",
        "participantCapacity",
        "price",
        "purchaseDuplicate",
        "purchaseLimit",
        "serialNumber",
        "startDateTime",
        "ticketStatus",
        "unlimitedQuantity"
      ]
    },
    "CategoryEnum": {
      "type": "string",
      "enum": [
        "戶外踏青",
        "社交活動",
        "興趣嗜好",
        "運動健身",
        "健康生活",
        "科技玩物",
        "藝術文化",
        "遊戲"
      ]
    },
    "TypeEnum": {
      "type": "string",
      "enum": [
        "線下",
        "線上"
      ]
    },
    "PeriodEnum": {
      "type": "string",
      "enum": [
        "隔週",
        "每月",
        "每季"
      ]
    },
    "WeekEnum": {
      "type": "string",
      "enum": [
        "每週",
        "隔週",
        "第一週",
        "第二週",
        "第三週",
        "第四週",
        "最後一週"
      ]
    },
    "DayEnum": {
      "type": "string",
      "enum": [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日"
      ]
    },
    "StatusEnum": {
      "type": "string",
      "enum": [
        "有效",
        "取消",
        "結束"
      ]
    },
    "Recurring": {
      "type": "object",
      "properties": {
        "period": {
          "type": "string",
          "enum": [
            "隔週",
            "每月",
            "每季"
          ]
        },
        "week": {
          "type": "string",
          "enum": [
            "每週",
            "隔週",
            "第一週",
            "第二週",
            "第三週",
            "第四週",
            "最後一週"
          ]
        },
        "day": {
          "type": "string",
          "enum": [
            "星期一",
            "星期二",
            "星期三",
            "星期四",
            "星期五",
            "星期六",
            "星期日"
          ]
        }
      },
      "required": [
        "day",
        "period",
        "week"
      ]
    },
    "ActivitySchemaModel": {
      "type": "object",
      "properties": {
        "creatorId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "name": {
          "type": "string"
        },
        "organizer": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "profilePicture": {
              "type": "string"
            },
            "contactName": {
              "type": "string"
            },
            "contactPhone": {
              "type": "string"
            },
            "contactEmail": {
              "type": "string"
            },
            "websiteName": {
              "type": "string"
            },
            "websiteURL": {
              "type": "string"
            }
          },
          "required": [
            "contactEmail",
            "contactName",
            "contactPhone",
            "name",
            "profilePicture",
            "websiteName",
            "websiteURL"
          ]
        },
        "cover": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "thumbnail": {
          "type": "string"
        },
        "startDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "fromToday": {
          "type": "boolean"
        },
        "endDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "noEndDate": {
          "type": "boolean"
        },
        "category": {
          "type": "string",
          "enum": [
            "戶外踏青",
            "社交活動",
            "興趣嗜好",
            "運動健身",
            "健康生活",
            "科技玩物",
            "藝術文化",
            "遊戲"
          ]
        },
        "type": {
          "type": "string",
          "enum": [
            "線下",
            "線上"
          ]
        },
        "link": {
          "type": "string"
        },
        "location": {
          "type": "string"
        },
        "address": {
          "type": "string"
        },
        "summary": {
          "type": "string"
        },
        "details": {
          "type": "string"
        },
        "isPrivate": {
          "type": "boolean"
        },
        "displayRemainingTickets": {
          "type": "boolean"
        },
        "isRecurring": {
          "type": "boolean"
        },
        "recurring": {
          "type": "object",
          "properties": {
            "period": {
              "type": "string",
              "enum": [
                "隔週",
                "每月",
                "每季"
              ]
            },
            "week": {
              "type": "string",
              "enum": [
                "每週",
                "隔週",
                "第一週",
                "第二週",
                "第三週",
                "第四週",
                "最後一週"
              ]
            },
            "day": {
              "type": "string",
              "enum": [
                "星期一",
                "星期二",
                "星期三",
                "星期四",
                "星期五",
                "星期六",
                "星期日"
              ]
            }
          },
          "required": [
            "day",
            "period",
            "week"
          ]
        },
        "status": {
          "type": "string",
          "enum": [
            "有效",
            "取消",
            "結束"
          ]
        },
        "tickets": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "activityId": {
                "$ref": "#/definitions/Types.ObjectId"
              },
              "name": {
                "type": "string"
              },
              "price": {
                "type": "number"
              },
              "startDateTime": {
                "type": "string",
                "format": "date-time"
              },
              "fromToday": {
                "type": "boolean"
              },
              "endDateTime": {
                "type": "string",
                "format": "date-time"
              },
              "noEndDate": {
                "type": "boolean"
              },
              "participantCapacity": {
                "type": "number"
              },
              "unlimitedQuantity": {
                "type": "boolean"
              },
              "purchaseLimit": {
                "type": "number"
              },
              "description": {
                "type": "string"
              },
              "purchaseDuplicate": {
                "type": "boolean"
              },
              "ticketStatus": {
                "type": "string",
                "enum": [
                  "可購買",
                  "已售完",
                  "結束售票"
                ]
              },
              "serialNumber": {
                "type": "string"
              }
            },
            "required": [
              "activityId",
              "description",
              "endDateTime",
              "fromToday",
              "name",
              "noEndDate",
              "participantCapacity",
              "price",
              "purchaseDuplicate",
              "purchaseLimit",
              "serialNumber",
              "startDateTime",
              "ticketStatus",
              "unlimitedQuantity"
            ]
          }
        }
      },
      "required": [
        "address",
        "category",
        "cover",
        "creatorId",
        "details",
        "displayRemainingTickets",
        "endDateTime",
        "fromToday",
        "isPrivate",
        "isRecurring",
        "link",
        "location",
        "name",
        "noEndDate",
        "organizer",
        "recurring",
        "startDateTime",
        "status",
        "summary",
        "thumbnail",
        "tickets",
        "type"
      ]
    },
    "ActivityCreateCredentials": {
      "allOf": [
        {
          "type": "object",
          "properties": {
            "link": {
              "type": "string"
            },
            "type": {
              "type": "string",
              "enum": [
                "線下",
                "線上"
              ]
            },
            "location": {
              "type": "string"
            },
            "address": {
              "type": "string"
            },
            "name": {
              "type": "string"
            },
            "details": {
              "type": "string"
            },
            "summary": {
              "type": "string"
            },
            "status": {
              "type": "string",
              "enum": [
                "有效",
                "取消",
                "結束"
              ]
            },
            "organizer": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "profilePicture": {
                  "type": "string"
                },
                "contactName": {
                  "type": "string"
                },
                "contactPhone": {
                  "type": "string"
                },
                "contactEmail": {
                  "type": "string"
                },
                "websiteName": {
                  "type": "string"
                },
                "websiteURL": {
                  "type": "string"
                }
              },
              "required": [
                "contactEmail",
                "contactName",
                "contactPhone",
                "name",
                "profilePicture",
                "websiteName",
                "websiteURL"
              ]
            },
            "cover": {
              "type": "array",
              "items": {
                "type": "string"
              }
            },
            "thumbnail": {
              "type": "string"
            },
            "startDateTime": {
              "type": "string",
              "format": "date-time"
            },
            "fromToday": {
              "type": "boolean"
            },
            "endDateTime": {
              "type": "string",
              "format": "date-time"
            },
            "noEndDate": {
              "type": "boolean"
            },
            "category": {
              "type": "string",
              "enum": [
                "戶外踏青",
                "社交活動",
                "興趣嗜好",
                "運動健身",
                "健康生活",
                "科技玩物",
                "藝術文化",
                "遊戲"
              ]
            },
            "isPrivate": {
              "type": "boolean"
            },
            "displayRemainingTickets": {
              "type": "boolean"
            },
            "isRecurring": {
              "type": "boolean"
            },
            "recurring": {
              "type": "object",
              "properties": {
                "period": {
                  "type": "string",
                  "enum": [
                    "隔週",
                    "每月",
                    "每季"
                  ]
                },
                "week": {
                  "type": "string",
                  "enum": [
                    "每週",
                    "隔週",
                    "第一週",
                    "第二週",
                    "第三週",
                    "第四週",
                    "最後一週"
                  ]
                },
                "day": {
                  "type": "string",
                  "enum": [
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六",
                    "星期日"
                  ]
                }
              },
              "required": [
                "day",
                "period",
                "week"
              ]
            },
            "tickets": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "activityId": {
                    "$ref": "#/definitions/Types.ObjectId"
                  },
                  "name": {
                    "type": "string"
                  },
                  "price": {
                    "type": "number"
                  },
                  "startDateTime": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "fromToday": {
                    "type": "boolean"
                  },
                  "endDateTime": {
                    "type": "string",
                    "format": "date-time"
                  },
                  "noEndDate": {
                    "type": "boolean"
                  },
                  "participantCapacity": {
                    "type": "number"
                  },
                  "unlimitedQuantity": {
                    "type": "boolean"
                  },
                  "purchaseLimit": {
                    "type": "number"
                  },
                  "description": {
                    "type": "string"
                  },
                  "purchaseDuplicate": {
                    "type": "boolean"
                  },
                  "ticketStatus": {
                    "type": "string",
                    "enum": [
                      "可購買",
                      "已售完",
                      "結束售票"
                    ]
                  },
                  "serialNumber": {
                    "type": "string"
                  }
                },
                "required": [
                  "activityId",
                  "description",
                  "endDateTime",
                  "fromToday",
                  "name",
                  "noEndDate",
                  "participantCapacity",
                  "price",
                  "purchaseDuplicate",
                  "purchaseLimit",
                  "serialNumber",
                  "startDateTime",
                  "ticketStatus",
                  "unlimitedQuantity"
                ]
              }
            }
          },
          "required": [
            "address",
            "category",
            "cover",
            "details",
            "displayRemainingTickets",
            "endDateTime",
            "fromToday",
            "isPrivate",
            "isRecurring",
            "link",
            "location",
            "name",
            "noEndDate",
            "organizer",
            "recurring",
            "startDateTime",
            "status",
            "summary",
            "thumbnail",
            "tickets",
            "type"
          ]
        },
        {
          "type": "object",
          "properties": {
            "organizer": {
              "type": "object",
              "properties": {
                "name": {
                  "type": "string"
                },
                "profilePicture": {
                  "type": "string"
                },
                "contactName": {
                  "type": "string"
                },
                "contactPhone": {
                  "type": "string"
                },
                "contactEmail": {
                  "type": "string"
                },
                "websiteName": {
                  "type": "string"
                },
                "websiteURL": {
                  "type": "string"
                }
              },
              "required": [
                "contactEmail",
                "contactName",
                "contactPhone",
                "name",
                "profilePicture",
                "websiteName",
                "websiteURL"
              ]
            }
          },
          "required": [
            "organizer"
          ]
        }
      ]
    },
    "GetActivitiesParams": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "page": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        },
        "sort": {
          "enum": [
            "asc",
            "des"
          ],
          "type": "string"
        }
      },
      "required": [
        "userId"
      ]
    },
    "GetActivityParticipantParams": {
      "type": "object",
      "properties": {
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "participantName": {
          "type": "string"
        },
        "page": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        },
        "sort": {
          "enum": [
            "asc",
            "des"
          ],
          "type": "string"
        }
      },
      "required": [
        "activityId"
      ]
    },
    "AttendActivityParams": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "requestBody": {
          "type": "object",
          "properties": {
            "name": {
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "startDateTime": {
              "type": "string",
              "format": "date-time"
            },
            "fromToday": {
              "type": "boolean"
            },
            "endDateTime": {
              "type": "string",
              "format": "date-time"
            },
            "noEndDate": {
              "type": "boolean"
            },
            "price": {
              "type": "number"
            },
            "participantCapacity": {
              "type": "number"
            },
            "unlimitedQuantity": {
              "type": "boolean"
            },
            "purchaseLimit": {
              "type": "number"
            },
            "purchaseDuplicate": {
              "type": "boolean"
            }
          },
          "required": [
            "description",
            "endDateTime",
            "fromToday",
            "name",
            "noEndDate",
            "participantCapacity",
            "price",
            "purchaseDuplicate",
            "purchaseLimit",
            "startDateTime",
            "unlimitedQuantity"
          ]
        }
      },
      "required": [
        "activityId",
        "requestBody",
        "userId"
      ]
    },
    "AttendActivityCredentials": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "description": {
          "type": "string"
        },
        "startDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "fromToday": {
          "type": "boolean"
        },
        "endDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "noEndDate": {
          "type": "boolean"
        },
        "price": {
          "type": "number"
        },
        "participantCapacity": {
          "type": "number"
        },
        "unlimitedQuantity": {
          "type": "boolean"
        },
        "purchaseLimit": {
          "type": "number"
        },
        "purchaseDuplicate": {
          "type": "boolean"
        }
      },
      "required": [
        "description",
        "endDateTime",
        "fromToday",
        "name",
        "noEndDate",
        "participantCapacity",
        "price",
        "purchaseDuplicate",
        "purchaseLimit",
        "startDateTime",
        "unlimitedQuantity"
      ]
    },
    "CancelActivityParams": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        }
      },
      "required": [
        "activityId",
        "userId"
      ]
    },
    "CollectActivityParams": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        }
      },
      "required": [
        "activityId",
        "userId"
      ]
    },
    "GetSavedActivityParams": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "page": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        },
        "sort": {
          "enum": [
            "asc",
            "des"
          ],
          "type": "string"
        }
      },
      "required": [
        "userId"
      ]
    },
    "QuestionCredentials": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "question": {
          "type": "string"
        },
        "questionId": {
          "$ref": "#/definitions/Types.ObjectId"
        }
      },
      "required": [
        "activityId",
        "userId"
      ]
    },
    "GetActivitiesCredentials": {
      "type": "object",
      "properties": {
        "sort": {
          "enum": [
            "asc",
            "des"
          ],
          "type": "string"
        },
        "page": {
          "type": "number"
        },
        "limit": {
          "type": "number"
        }
      }
    },
    "MessageListSchemaModel": {
      "type": "object",
      "properties": {
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "displayName": {
          "type": "string"
        },
        "question": {
          "type": "string"
        }
      },
      "required": [
        "activityId",
        "displayName",
        "question",
        "userId"
      ]
    },
    "MessageSchemaModel": {
      "type": "object",
      "properties": {
        "messageListId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "answer": {
          "type": "string"
        }
      },
      "required": [
        "answer",
        "messageListId",
        "userId"
      ]
    },
    "PaymentStatusEnum": {
      "type": "string",
      "enum": [
        "已付款",
        "待付款",
        "付款失敗"
      ]
    },
    "PaymentMethodEnum": {
      "type": "string",
      "enum": [
        "信用卡",
        "現金",
        "系統更新"
      ]
    },
    "OrderStatusEnum": {
      "type": "string",
      "enum": [
        "有效",
        "取消",
        "已使用",
        "保留",
        "無效票券"
      ]
    },
    "OrderPayment": {
      "type": "object",
      "properties": {
        "amount": {
          "type": "number"
        },
        "status": {
          "type": "string",
          "enum": [
            "已付款",
            "待付款",
            "付款失敗"
          ]
        },
        "method": {
          "type": "string",
          "enum": [
            "信用卡",
            "現金",
            "系統更新"
          ]
        },
        "orderNumber": {
          "type": "number"
        }
      },
      "required": [
        "amount",
        "method",
        "orderNumber",
        "status"
      ]
    },
    "OrderSchemaModel": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "ticketId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "name": {
          "type": "string"
        },
        "email": {
          "type": "string"
        },
        "phone": {
          "type": "string"
        },
        "startDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "endDateTime": {
          "type": "string",
          "format": "date-time"
        },
        "payment": {
          "type": "object",
          "properties": {
            "amount": {
              "type": "number"
            },
            "status": {
              "type": "string",
              "enum": [
                "已付款",
                "待付款",
                "付款失敗"
              ]
            },
            "method": {
              "type": "string",
              "enum": [
                "信用卡",
                "現金",
                "系統更新"
              ]
            },
            "orderNumber": {
              "type": "number"
            }
          },
          "required": [
            "amount",
            "method",
            "orderNumber",
            "status"
          ]
        },
        "orderStatus": {
          "type": "string",
          "enum": [
            "有效",
            "取消",
            "已使用",
            "保留",
            "無效票券"
          ]
        },
        "serialNumber": {
          "type": "string"
        }
      },
      "required": [
        "activityId",
        "email",
        "endDateTime",
        "name",
        "orderStatus",
        "payment",
        "phone",
        "serialNumber",
        "startDateTime",
        "ticketId",
        "userId"
      ]
    },
    "SavedActivitySchemaModel": {
      "type": "object",
      "properties": {
        "userId": {
          "$ref": "#/definitions/Types.ObjectId"
        },
        "activityId": {
          "$ref": "#/definitions/Types.ObjectId"
        }
      },
      "required": [
        "activityId",
        "userId"
      ]
    }
  }
};
