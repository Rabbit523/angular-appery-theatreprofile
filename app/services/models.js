define(['require'], function(require) {

    /**
     * Models generated from "Model and Storage" and models extracted from services.
     * To generate entity use syntax:
     * Apperyio.EntityAPI("<model_name>[.<model_field>]");
     */

    var models = {
        "SessionData": {
            "type": "object",
            "properties": {
                "expirationDate": {
                    "type": "string"
                },
                "userID": {
                    "type": "string"
                },
                "user": {
                    "type": "object",
                    "properties": {
                        "email": {
                            "type": "string"
                        },
                        "username": {
                            "type": "string"
                        },
                        "id": {
                            "type": "string"
                        }
                    }
                },
                "status": {
                    "type": "string"
                },
                "id": {
                    "type": "string"
                },
                "ipAddress": {
                    "type": "string"
                },
                "activeKey": {
                    "type": "string"
                }
            }
        },
        "DateRange": {
            "type": "object",
            "properties": {
                "startDate": {
                    "type": "string"
                },
                "datesChosen": {
                    "type": "boolean"
                },
                "endDate": {
                    "type": "string"
                }
            }
        },
        "Organizations": {
            "type": "array",
            "items": [{
                "type": "object",
                "properties": {
                    "index": {
                        "type": "number"
                    },
                    "orgNames": {
                        "type": "string"
                    },
                    "id": {
                        "type": "number"
                    }
                }
            }]
        },
        "AttendanceDetails": {
            "type": "array",
            "items": [{
                "type": "array",
                "items": [{
                    "type": "object",
                    "properties": {
                        "days": {
                            "type": "string"
                        },
                        "times": {
                            "type": "string"
                        },
                        "day": {
                            "type": "number"
                        },
                        "attendanceAvg": {
                            "type": "number"
                        },
                        "time": {
                            "type": "string"
                        },
                        "wkdayNum": {
                            "type": "number"
                        },
                        "attendance": {
                            "type": "number"
                        },
                        "index": {
                            "type": "number"
                        },
                        "showTimes": {
                            "type": "string"
                        },
                        "dayName": {
                            "type": "string"
                        }
                    }
                }]
            }]
        },
        "OrganizationData": {
            "type": "array",
            "items": [{
                "type": "object",
                "properties": {
                    "PeerGrossTktsPerEvent": {
                        "type": "number"
                    },
                    "PctCapacity": {
                        "type": "number"
                    },
                    "AvgTktPrice": {
                        "type": "number"
                    },
                    "NetQty": {
                        "type": "number"
                    },
                    "PeerPctPaid": {
                        "type": "number"
                    },
                    "NetSales": {
                        "type": "number"
                    },
                    "GrossQty": {
                        "type": "number"
                    },
                    "Comp": {
                        "type": "number"
                    },
                    "PeerCapacity": {
                        "type": "number"
                    },
                    "PctTotalPurchased": {
                        "type": "number"
                    },
                    "PeerPctCapacity": {
                        "type": "number"
                    },
                    "Refunded": {
                        "type": "number"
                    },
                    "PctPaid": {
                        "type": "number"
                    },
                    "PeerAvgTktPrice": {
                        "type": "number"
                    },
                    "PctTotalComp": {
                        "type": "number"
                    },
                    "ShowID": {
                        "type": "number"
                    },
                    "numEvents": {
                        "type": "number"
                    },
                    "Index": {
                        "type": "number"
                    },
                    "ShowTitles": {
                        "type": "string"
                    },
                    "PctTotalRefunded": {
                        "type": "number"
                    },
                    "AvgGrossTktsPerEvent": {
                        "type": "number"
                    },
                    "Capacity": {
                        "type": "number"
                    },
                    "Purchased": {
                        "type": "number"
                    },
                    "PctTotalQty": {
                        "type": "number"
                    }
                }
            }]
        },
        "String": {
            "type": "string"
        },
        "Boolean": {
            "type": "boolean"
        },
        "OtherKeys": {
            "type": "object",
            "properties": {
                "otherhost": {
                    "type": "string"
                },
                "otheradmin": {
                    "type": "string"
                },
                "otherpassword": {
                    "type": "string"
                }
            }
        },
        "Number": {
            "type": "number"
        },
        "TicketsByZip": {
            "type": "array",
            "items": [{
                "type": "object",
                "properties": {
                    "numAttended": {
                        "type": "number"
                    },
                    "uniqueZipCodes": {
                        "type": "string"
                    },
                    "city": {
                        "type": "string"
                    }
                }
            }]
        },
        "PeerData": {
            "type": "array",
            "items": [{
                "type": "object",
                "properties": {
                    "netSales": {
                        "type": "number"
                    },
                    "pctCapacity": {
                        "type": "number"
                    },
                    "totalEvents": {
                        "type": "number"
                    },
                    "pctPaidAttendees": {
                        "type": "number"
                    },
                    "netPurchasedTickets": {
                        "type": "number"
                    },
                    "netAttendedTickets": {
                        "type": "number"
                    },
                    "tpShowID": {
                        "type": "number"
                    },
                    "totalCompedProdTkts": {
                        "type": "number"
                    },
                    "tpShowTitle": {
                        "type": "string"
                    },
                    "totalRefundedProdTkts": {
                        "type": "number"
                    },
                    "numEvents": {
                        "type": "number"
                    },
                    "avgTktPrice": {
                        "type": "number"
                    }
                }
            }]
        },
        "Keys": {
            "type": "object",
            "properties": {
                "tpcompanytable": {
                    "type": "string"
                },
                "usertable": {
                    "type": "string"
                },
                "ownershiptable": {
                    "type": "string"
                },
                "tickettable": {
                    "type": "string"
                },
                "tpshowtable": {
                    "type": "string"
                },
                "host": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "admin": {
                    "type": "string"
                },
                "eventtable": {
                    "type": "string"
                },
                "geotable": {
                    "type": "string"
                },
                "tatheatredb": {
                    "type": "string"
                },
                "dbname": {
                    "type": "string"
                },
                "productiontable": {
                    "type": "string"
                },
                "venuetable": {
                    "type": "string"
                },
                "companytable": {
                    "type": "string"
                },
                "showtable": {
                    "type": "string"
                }
            }
        },
        "TheatreProfile_Keys_read_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/db/collections/Keys/{_id}"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "_id": {
                                    "type": "string",
                                    "default": "597a2be32e22d73e9ff4a9f9"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "X-Appery-Database-Id": {
                                    "type": "string",
                                    "default": "{TheatreProfile_settings.database_id}"
                                },
                                "X-Appery-Session-Token": {
                                    "type": "string"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "password": {
                                            "type": "string",
                                            "default": "NYC4821SD"
                                        },
                                        "venuetable": {
                                            "type": "string",
                                            "default": "tbl_tttcvenue"
                                        },
                                        "geotable": {
                                            "type": "string",
                                            "default": "cityBy3DigitZip"
                                        },
                                        "host": {
                                            "type": "string",
                                            "default": "a2s86.a2hosting.com"
                                        },
                                        "eventtable": {
                                            "type": "string",
                                            "default": "tbl_tttcevent"
                                        },
                                        "productiontable": {
                                            "type": "string",
                                            "default": "tbl_tttcproduction"
                                        },
                                        "_id": {
                                            "type": "string",
                                            "default": "597a2be32e22d73e9ff4a9f9"
                                        },
                                        "dbname": {
                                            "type": "string",
                                            "default": "theatrep_test"
                                        },
                                        "tpshowtable": {
                                            "type": "string",
                                            "default": "tbl_show"
                                        },
                                        "_createdAt": {
                                            "type": "string",
                                            "default": "2017-07-27 18:07:31.535"
                                        },
                                        "tatheatredb": {
                                            "type": "string",
                                            "default": "theatreprofile"
                                        },
                                        "_updatedAt": {
                                            "type": "string",
                                            "default": "2017-08-02 01:00:35.170"
                                        },
                                        "usertable": {
                                            "type": "string",
                                            "default": "tbl_tttcuser"
                                        },
                                        "companytable": {
                                            "type": "string",
                                            "default": "tbl_tttccompany"
                                        },
                                        "showtable": {
                                            "type": "string",
                                            "default": "tbl_tttcshow"
                                        },
                                        "tickettable": {
                                            "type": "string",
                                            "default": "tbl_tttcticketsale"
                                        },
                                        "admin": {
                                            "type": "string",
                                            "default": "theatrep"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPshowEventDetails": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "endDate": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "tickettable": {
                                    "type": "string"
                                },
                                "eventtable": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "productionID": {
                                    "type": "string"
                                },
                                "startDate": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/showEventDetails/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "array",
                                "items": [{
                                    "type": "object",
                                    "properties": {
                                        "weekday": {
                                            "type": "string",
                                            "default": "Saturday"
                                        },
                                        "numAttended": {
                                            "type": "number",
                                            "default": 256
                                        },
                                        "eventDate": {
                                            "type": "string",
                                            "default": "2016-10-29 E"
                                        },
                                        "days.i.": {
                                            "type": "string",
                                            "default": "Saturday"
                                        },
                                        "time": {
                                            "type": "string",
                                            "default": "20:30"
                                        },
                                        "tttcProductionID": {
                                            "type": "number",
                                            "default": 4622
                                        },
                                        "id": {
                                            "type": "number",
                                            "default": 141672
                                        },
                                        "times.i.": {
                                            "type": "string",
                                            "default": "20:30"
                                        },
                                        "avgAttendance": {
                                            "type": "number",
                                            "default": 256
                                        },
                                        "wdayNum": {
                                            "type": "number",
                                            "default": 7
                                        }
                                    }
                                }]
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPshowEventGeography": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "endDate": {
                                    "type": "string"
                                },
                                "otheradmin": {
                                    "type": "string"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "productionID": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "startDate": {
                                    "type": "string"
                                },
                                "otherhost": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string"
                                },
                                "geotable": {
                                    "type": "string"
                                },
                                "otherpassword": {
                                    "type": "string"
                                },
                                "tatheatredb": {
                                    "type": "string"
                                },
                                "usertable": {
                                    "type": "string"
                                },
                                "eventtable": {
                                    "type": "string"
                                },
                                "tickettable": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/showEventGeography/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "attendance": {
                                        "type": "number",
                                        "default": 6
                                    },
                                    "zipCodesEvents": {
                                        "type": "string",
                                        "default": "60193"
                                    },
                                    "city": {
                                        "type": "string",
                                        "default": "CAROL STREAM IL"
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPallCompanies": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "venuetable": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "tickettable": {
                                    "type": "string"
                                },
                                "companytable": {
                                    "type": "string"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "productiontable": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string"
                                },
                                "eventtable": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/allCompanies/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "companyName": {
                                        "type": "string",
                                        "default": "Blake Zidell and Associates"
                                    },
                                    "id": {
                                        "type": "number",
                                        "default": 258
                                    },
                                    "index": {
                                        "type": "number",
                                        "default": 251
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPcompanyShowsPerformance": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "password": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "tickettable": {
                                    "type": "string"
                                },
                                "endDate": {
                                    "type": "string"
                                },
                                "eventtable": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string"
                                },
                                "startDate": {
                                    "type": "string"
                                },
                                "productiontable": {
                                    "type": "string"
                                },
                                "organizationID": {
                                    "type": "number",
                                    "default": null
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "venuetable": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/companyShowsPerformance/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "index": {
                                        "type": "number",
                                        "default": 19
                                    },
                                    "totalRefundedProdTkts": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "avgTktPrice": {
                                        "type": "number",
                                        "default": 10
                                    },
                                    "netSales": {
                                        "type": "number",
                                        "default": 340
                                    },
                                    "pctCapacity": {
                                        "type": "number",
                                        "default": 14.35
                                    },
                                    "totalCompedProdTkts": {
                                        "type": "number",
                                        "default": 28
                                    },
                                    "pctPaidAttendees": {
                                        "type": "number",
                                        "default": 54.84
                                    },
                                    "tttcProductionID.title": {
                                        "type": "string",
                                        "default": "New Play Readings Festival 2016"
                                    },
                                    "pctTotalPurchasedTkts": {
                                        "type": "number",
                                        "default": 0.18
                                    },
                                    "tttcProductionID.id": {
                                        "type": "number",
                                        "default": 4348
                                    },
                                    "netPurchasedTickets": {
                                        "type": "number",
                                        "default": 34
                                    },
                                    "netAttendedTickets": {
                                        "type": "number",
                                        "default": 62
                                    },
                                    "numEvents": {
                                        "type": "number",
                                        "default": 3
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPticketsByZipCode": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "dbname": {
                                    "type": "string",
                                    "default": "theatreprofile"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "geotable": {
                                    "type": "string",
                                    "default": "cityBy3DigitZip"
                                },
                                "organization": {
                                    "type": "string"
                                },
                                "show": {
                                    "type": "string"
                                },
                                "table": {
                                    "type": "string",
                                    "default": "sampleData"
                                },
                                "othertable": {
                                    "type": "string",
                                    "default": "sampleVenue"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofile/R/ticketsByZipCode/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "uniqueZipCodes": {
                                        "type": "string",
                                        "default": "Box Office"
                                    },
                                    "numAttended": {
                                        "type": "number",
                                        "default": 2363
                                    },
                                    "index": {
                                        "type": "number",
                                        "default": null
                                    },
                                    "city": {
                                        "type": "string"
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPattendanceByShow": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "organization": {
                                    "type": "string"
                                },
                                "table": {
                                    "type": "string",
                                    "default": "sampleData"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string",
                                    "default": "theatreprofile"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "othertable": {
                                    "type": "string",
                                    "default": "sampleVenue"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofile/R/attendanceByShow/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "PeerPctCapacity": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "AvgGrossTktsPerEvent": {
                                        "type": "number",
                                        "default": 1
                                    },
                                    "PctTotalRefunded": {
                                        "type": "number",
                                        "default": 0.76
                                    },
                                    "GrossQty": {
                                        "type": "number",
                                        "default": 3
                                    },
                                    "PeerPctPaid": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "numEvents": {
                                        "type": "number",
                                        "default": 1
                                    },
                                    "Refunded": {
                                        "type": "number",
                                        "default": 2
                                    },
                                    "PeerCapacity": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "PctCapacity": {
                                        "type": "number",
                                        "default": 4
                                    },
                                    "PctTotalPurchased": {
                                        "type": "number",
                                        "default": 0.02
                                    },
                                    "PeerGrossTktsPerEvent": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "PeerAvgTktPrice": {
                                        "type": "number",
                                        "default": null
                                    },
                                    "PctTotalQty": {
                                        "type": "number",
                                        "default": 0.01
                                    },
                                    "PctTotalComp": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "Purchased": {
                                        "type": "number",
                                        "default": 1
                                    },
                                    "index": {
                                        "type": "number",
                                        "default": 11
                                    },
                                    "AvgTktPrice": {
                                        "type": "number",
                                        "default": null
                                    },
                                    "PctPaid": {
                                        "type": "number",
                                        "default": 100
                                    },
                                    "Capacity": {
                                        "type": "number",
                                        "default": 25
                                    },
                                    "ShowTitles": {
                                        "type": "string",
                                        "default": "Breakfast with Dorothy"
                                    },
                                    "Comp": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "NetQty": {
                                        "type": "number",
                                        "default": 1
                                    },
                                    "NetSales": {
                                        "type": "number",
                                        "default": null
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPorganizationsList": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "dbname": {
                                    "type": "string",
                                    "default": "theatreprofile"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "table": {
                                    "type": "string",
                                    "default": "sampleData"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofile/R/organizationsList/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "orgNames": {
                                        "type": "string",
                                        "default": "Baytown Little Theater"
                                    },
                                    "index": {
                                        "type": "number",
                                        "default": 5
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPuserValidCheck": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "activeKey": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "table": {
                                    "type": "string",
                                    "default": "IPandKeys"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "ipAddress": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string",
                                    "default": "theatreprofile"
                                },
                                "userID": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/userValidCheck/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "string",
                                "default": "TRUE"
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPshowAttendanceDetails": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "organization": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "othertable": {
                                    "type": "string",
                                    "default": "sampleVenue"
                                },
                                "dbname": {
                                    "type": "string",
                                    "default": "theatreprofile"
                                },
                                "show": {
                                    "type": "string"
                                },
                                "table": {
                                    "type": "string",
                                    "default": "sampleData"
                                },
                                "admin": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofile/R/showAttendanceDetails/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "array",
                                "items": [{
                                    "type": "object",
                                    "properties": {
                                        "index": {
                                            "type": "number",
                                            "default": 14
                                        },
                                        "attendanceAvg": {
                                            "type": "number",
                                            "default": 86.75
                                        },
                                        "showTimes": {
                                            "type": "string",
                                            "default": "Aug-04-13"
                                        },
                                        "day": {
                                            "type": "number",
                                            "default": 6
                                        },
                                        "wkdayNum": {
                                            "type": "number",
                                            "default": 1
                                        },
                                        "attendance": {
                                            "type": "number",
                                            "default": 109
                                        },
                                        "time": {
                                            "type": "string",
                                            "default": "14:00"
                                        },
                                        "dayName": {
                                            "type": "string",
                                            "default": "Friday"
                                        },
                                        "times": {
                                            "type": "string",
                                            "default": "20:00"
                                        }
                                    }
                                }]
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "TPgetUserIPAddress": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "https://api.ipify.org/?format=json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "ip": {
                                            "type": "string",
                                            "default": "52.7.79.49"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPcompaniesLinkedUserID": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "dbname": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "userID": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "companytable": {
                                    "type": "string"
                                },
                                "tpcompanytable": {
                                    "type": "string"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "ownershiptable": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/companiesLinkedUserID/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "index": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "id": {
                                        "type": "number",
                                        "default": 22
                                    },
                                    "companyName": {
                                        "type": "string",
                                        "default": "Stage West"
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "TPretrieveUserInformation": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "activeKey": {
                                    "type": "string"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "https://www.theatreprofile.com/api/user/authorize/{activeKey}"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "ipAddress": {
                                            "type": "string",
                                            "default": "70.95.11.120"
                                        },
                                        "activeKey": {
                                            "type": "string",
                                            "default": "$2a$14$lcQKAJW/4bn9pnu4DqSMIO8lfBbc8f0/wKryCNYakD1TOL00v/d2y"
                                        },
                                        "expirationDate": {
                                            "type": "null"
                                        },
                                        "user": {
                                            "type": "object",
                                            "properties": {
                                                "email": {
                                                    "type": "string",
                                                    "default": "webmaster@example.com"
                                                },
                                                "id": {
                                                    "type": "string",
                                                    "default": "1"
                                                },
                                                "username": {
                                                    "type": "string",
                                                    "default": "admin"
                                                }
                                            }
                                        },
                                        "id": {
                                            "type": "string",
                                            "default": "2"
                                        },
                                        "userID": {
                                            "type": "string",
                                            "default": "1"
                                        },
                                        "status": {
                                            "type": "string",
                                            "default": "0"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "Secret_Keys_read_service": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/db/collections/Keys/{_id}"
                },
                "method": {
                    "type": "string",
                    "default": "get"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {}
                        },
                        "query": {
                            "type": "object",
                            "properties": {
                                "_id": {
                                    "type": "string",
                                    "default": "57ed3f79e4b0714363af3219"
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "X-Appery-Session-Token": {
                                    "type": "string"
                                },
                                "X-Appery-Database-Id": {
                                    "type": "string",
                                    "default": "{Secret_settings.database_id}"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "$": {
                                    "type": "object",
                                    "properties": {
                                        "cSecret": {
                                            "type": "string",
                                            "default": "faEVf7qbETFkF9vrV4UvPYsr0jEkAnsXIzACfSbOKrA3"
                                        },
                                        "stripe_key": {
                                            "type": "string",
                                            "default": "Bearer sk_test_AEaziFEWCaRmFdCMI4TJURB1"
                                        },
                                        "host": {
                                            "type": "string",
                                            "default": "tradejesterdb.csnqqxsil4rg.us-east-1.rds.amazonaws.com"
                                        },
                                        "cKey": {
                                            "type": "string",
                                            "default": "GifPIDGbe2382b5SMUNm2EEph4YMVNL5Oay6ec0C2v81"
                                        },
                                        "_createdAt": {
                                            "type": "string",
                                            "default": "2016-09-29 16:21:13.235"
                                        },
                                        "intrinioUser": {
                                            "type": "string",
                                            "default": "f3dfd7eea1166fd1da407f5f57c6cb46"
                                        },
                                        "_updatedAt": {
                                            "type": "string",
                                            "default": "2017-06-29 21:02:08.795"
                                        },
                                        "oSecret": {
                                            "type": "string",
                                            "default": "ONTyuzDFW4k1zEyvcZcpVH3sJn8IeuSRolHjNOW2tSU6"
                                        },
                                        "quandlKey": {
                                            "type": "string",
                                            "default": "CdKxVqfMckWLWTM81E1y"
                                        },
                                        "intrinioPass": {
                                            "type": "string",
                                            "default": "dcba0870b6c2b2773c669149bae0b6b6"
                                        },
                                        "_id": {
                                            "type": "string",
                                            "default": "57ed3f79e4b0714363af3219"
                                        },
                                        "url": {
                                            "type": "string",
                                            "default": "https://api.mailgun.net/v3/mg.tradejester.com/messages"
                                        },
                                        "api_key": {
                                            "type": "string",
                                            "default": "key-c1577313d11dec81aeb2e600acb1379d"
                                        },
                                        "admin": {
                                            "type": "string",
                                            "default": "tradejester"
                                        },
                                        "oKey": {
                                            "type": "string",
                                            "default": "fwyftLKVnx0Iz1u08YbdIs7PHMlzLAuY7i3oFvKn3C44"
                                        },
                                        "password": {
                                            "type": "string",
                                            "default": "This1210Pass806Is548Secure2767"
                                        }
                                    }
                                }
                            }
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        },
        "rstudioTPshowPeerComparison": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "default": "https://api.appery.io/rest/1/proxy/tunnel"
                },
                "method": {
                    "type": "string",
                    "default": "post"
                },
                "request": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "object",
                            "properties": {
                                "showtable": {
                                    "type": "string"
                                },
                                "eventtable": {
                                    "type": "string"
                                },
                                "productionID": {
                                    "type": "string"
                                },
                                "password": {
                                    "type": "string"
                                },
                                "tpshowtable": {
                                    "type": "string"
                                },
                                "dbname": {
                                    "type": "string"
                                },
                                "admin": {
                                    "type": "string"
                                },
                                "productiontable": {
                                    "type": "string"
                                },
                                "host": {
                                    "type": "string"
                                },
                                "venuetable": {
                                    "type": "string"
                                },
                                "tickettable": {
                                    "type": "string"
                                }
                            }
                        },
                        "query": {
                            "type": "object",
                            "properties": {}
                        },
                        "headers": {
                            "type": "object",
                            "properties": {
                                "Content-Type": {
                                    "type": "string",
                                    "default": "application/json"
                                },
                                "appery-transformation": {
                                    "type": "string",
                                    "default": "checkTunnel"
                                },
                                "appery-rest": {
                                    "type": "string",
                                    "default": "769e2277-b285-4daf-b97e-06328dee7c71"
                                },
                                "appery-proxy-url": {
                                    "type": "string",
                                    "default": "{rstudioSettings.url}/ocpu/user/rstudio/library/TAtheatreprofileMAIN/R/showPeerComparison/json"
                                }
                            }
                        }
                    }
                },
                "response": {
                    "type": "object",
                    "properties": {
                        "body": {
                            "type": "array",
                            "items": [{
                                "type": "object",
                                "properties": {
                                    "pctCapacity": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "totalCompedProdTkts": {
                                        "type": "number",
                                        "default": 71481
                                    },
                                    "netPurchasedTickets": {
                                        "type": "number",
                                        "default": 334080
                                    },
                                    "totalEvents": {
                                        "type": "number",
                                        "default": null
                                    },
                                    "avgTktPrice": {
                                        "type": "number",
                                        "default": 23.47
                                    },
                                    "tpShowID.title": {
                                        "type": "string",
                                        "default": "Oklahoma"
                                    },
                                    "totalRefundedProdTkts": {
                                        "type": "number",
                                        "default": 2040
                                    },
                                    "pctPaidAttendees": {
                                        "type": "number",
                                        "default": 82.37
                                    },
                                    "tpShowID.tpShowID": {
                                        "type": "number",
                                        "default": 0
                                    },
                                    "netAttendedTickets": {
                                        "type": "number",
                                        "default": 405561
                                    },
                                    "numEvents": {
                                        "type": "number",
                                        "default": 6003
                                    },
                                    "netSales": {
                                        "type": "number",
                                        "default": 7840210.66
                                    }
                                }
                            }]
                        },
                        "headers": {
                            "type": "object",
                            "properties": {}
                        }
                    }
                }
            }
        }
    };
    return models;

});