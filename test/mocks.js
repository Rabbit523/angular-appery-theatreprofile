define(['lodash'], function(_) {

    return {
        RESTService: {
            'url': '',
            'dataType': 'json',
            'type': 'get',
            'echo': "{\"menu\": {\n    \"header\": \"HeaderText\",\n    \"true\": \"true\",\n    \"false\": \"false\",\n    \"items\": [\n        {\"id\": \"1\", \"label\": \"Dice\", \"img\": \"https://www.gstatic.com/webp/gallery3/3_webp_ll.png\", \"r\": [1,2,3]},\n        {\"id\": \"2\", \"label\": \"Tux\", \"img\": \"https://www.gstatic.com/webp/gallery3/2.png\", \"r\": [4,5,6]},\n        {\"id\": \"3\", \"label\": \"Dice\", \"img\": \"https://www.gstatic.com/webp/gallery3/3_webp_ll.png\", \"r\": [7,8,9]},\n        {\"id\": \"4\", \"label\": \"Tux\", \"img\": \"https://www.gstatic.com/webp/gallery3/2.png\", \"r\": [11,12,13]},\n        {\"id\": \"5\", \"label\": \"Dice\", \"img\": \"https://www.gstatic.com/webp/gallery3/3_webp_ll.png\", \"r\": [14,15,16]}\n    ]\n}}"
        },
        RESTService2: {
            'url': '',
            'dataType': 'json',
            'type': 'post',
            'echo': ""
        },
        configTest: {
            context: {
                right: "passed"
            },
            expression: {
                exp: "right",
                exp1: 'wrong',
                changeExp: "changed",
                addExp: "added",
                addValue: "new"

            },
            compareObj: {
                right: "changed",
                added: "new"
            }
        },
        params_parse_mock: {
            a: {
                b: 1
            },
            not_existed: "{not_existed_key}",
            c: {
                d: "{a.b}",
                d1: "{b}",
                g1: "{g}",
                f1: "{f}",
                f2: "{f}+{a.b}-{c.f1}"
            },
            d2: {
                d3: {
                    d4: "{c.d}",
                    d5: "{c.d1}",
                    d6: true,
                    d7: "{g}+{g}"
                }
            },
            e: "{d2.d3.d6}",
            b1: "{b}",
            g: "$",
            f: 1.554
        },
        helperTest: {
            services: {
                service1: "testService",
                service2: "anotherService",
                toCompare: [
                    "testService",
                    "anotherService"
                ]
            },
            templates: {
                template: "{right}",
                template_with_not_existed_keys: "https://example.io/{key1}/{key2}",
                result: "executed"
            },
            context: {
                right: "passed"
            }
        },
        EntityAPI: {
            type_$ref_models: {
                user: {
                    type: "object",
                    properties: {
                        "name": {
                            type: "string"
                        }
                    }
                },
                user_list_$ref: {
                    type: "array",
                    items: {
                        $ref: "user"
                    }
                },
                user_list_type: {
                    type: "array",
                    items: {
                        type: "user"
                    }
                },
                group: {
                    type: "object",
                    properties: {
                        name: {
                            type: "string"
                        },
                        prop$ref: {
                            $ref: "user"
                        },
                        prop: {
                            type: "object",
                            properties: {
                                "list_type": {
                                    type: "array",
                                    items: {
                                        type: "user"
                                    }
                                },
                                list_ref: {
                                    type: "array",
                                    items: {
                                        $ref: "user"
                                    }
                                }
                            }
                        }
                    }
                }
            },
            array_model: {
                "TestStruct": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "item_name": {
                                "type": "string"
                            }
                        }
                    }
                }
            },
            object_with_one_level_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "number": {
                            "type": "number"
                        },
                        "arr": {
                            "type": "array",
                            "items": {
                                "type": "string"
                            }
                        },
                        "boolean": {
                            "type": "boolean"
                        }
                    }
                }
            },
            object_with_one_level_Result: {
                title: "",
                "caption": "",
                "number": 0,
                arr: [],
                "boolean": false
            },
            object_with_one_level_defUndefined_Result: {
                title: undefined,
                "caption": undefined,
                "number": undefined,
                arr: [],
                "boolean": undefined
            },
            object_with_one_level_skipEmpty_Result: undefined,
            list_of_types_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct3": {
                    "type": "object",
                    "properties": {
                        "num": {
                            "type": "number"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                }
            },
            lazy_init_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "object",
                            "properties": {
                                "struct": {
                                    "type": "TestStruct"
                                }
                            }
                        },
                        "data2": {
                            "type": "TestStruct"
                        }
                    }
                }
            },
            inner_tests: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "array",
                            "items": {
                                "type": "TestStruct"
                            }
                        }
                    }
                }
            },
            default_values_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "default": "test default string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "TestStruct"
                        }
                    }
                }
            },
            default_values_on_object_creation_Models: {
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string",
                            "default": "test default string"
                        },
                        "caption": {
                            "type": "string"
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "TestStruct"
                        }
                    }
                },
                "TestStruct3": {
                    "type": "object",
                    "properties": {
                        "an": {
                            "type": "array",
                            "items": [{
                                "type": "number",
                                "default": null
                            }, {
                                "type": "number",
                                "default": 5,
                                "index": 0
                            }]
                        },
                        "n": {
                            "type": "number",
                            "default": null
                        },
                        "o": {
                            "type": "object",
                            "properties": {}
                        },
                        "b1": {
                            "type": "boolean",
                            "default": false
                        },
                        "b2": {
                            "type": "boolean",
                            "default": true
                        },
                        "o1": {
                            "type": "object",
                            "properties": {
                                "o11": {
                                    "type": "string"
                                }
                            }
                        },
                        "o3": {
                            "type": "object",
                            "properties": {
                                "o33": {
                                    "type": "object",
                                    "properties": {
                                        "o333": {
                                            "type": "object",
                                            "properties": {
                                                "o3333": {
                                                    "type": "object",
                                                    "properties": {
                                                        "o33332": {
                                                            "type": "string"
                                                        },
                                                        "o33331": {
                                                            "type": "string"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "b": {
                            "type": "boolean",
                            "default": null
                        },
                        "n1": {
                            "type": "number",
                            "default": 4
                        },
                        "nu": {
                            "type": "null"
                        },
                        "a1": {
                            "type": "array",
                            "items": [{
                                "type": "number",
                                "default": null
                            }]
                        },
                        "s": {
                            "type": "string"
                        },
                        "o2": {
                            "type": "object",
                            "properties": {
                                "o22": {
                                    "type": "string",
                                    "default": "o22 val"
                                }
                            }
                        },
                        "o4": {
                            "type": "object",
                            "properties": {
                                "o44": {
                                    "type": "object",
                                    "properties": {
                                        "o444": {
                                            "type": "object",
                                            "properties": {
                                                "o4444": {
                                                    "type": "object",
                                                    "properties": {
                                                        "o44442": {
                                                            "type": "string",
                                                            "default": "o44442 val"
                                                        },
                                                        "o44441": {
                                                            "type": "string"
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "ab": {
                            "type": "array",
                            "items": [{
                                "type": "boolean",
                                "default": null
                            }, {
                                "type": "boolean",
                                "default": false,
                                "index": 0
                            }]
                        },
                        "as": {
                            "type": "array",
                            "items": [{
                                "type": "string",
                                "default": "as val",
                                "index": 0
                            }, {
                                "type": "string"
                            }]
                        },
                        "n2": {
                            "type": "number",
                            "default": 0
                        },
                        "s1": {
                            "type": "string",
                            "default": "s1 val"
                        },
                        "a": {
                            "type": "array",
                            "items": [{
                                "type": "string"
                            }]
                        }
                    }
                },
                "TestStruct3_Result": {
                    "a": [],
                    "a1": [],
                    "as": ["as val"],
                    "an": [5],
                    "ab": [false],
                    "s": "",
                    "s1": "s1 val",
                    "n": 0,
                    "n1": 4,
                    "n2": 0,
                    "b": false,
                    "b1": false,
                    "b2": true,
                    "nu": null,
                    "o": {},
                    "o1": {
                        "o11": ""
                    },
                    "o2": {
                        "o22": "o22 val"
                    },
                    "o3": {
                        "o33": {
                            "o333": {
                                "o3333": {
                                    "o33332": "",
                                    "o33331": ""
                                }
                            }
                        }
                    },
                    "o4": {
                        "o44": {
                            "o444": {
                                "o4444": {
                                    "o44442": "o44442 val",
                                    "o44441": ""
                                }
                            }
                        }
                    }
                },
                "TestStruct3_defUndefined_Result": {
                    "a": [],
                    "a1": [],
                    "as": ["as val"],
                    "an": [5],
                    "ab": [false],
                    "s": undefined,
                    "s1": "s1 val",
                    "n": undefined,
                    "n1": 4,
                    "n2": undefined,
                    "b": undefined,
                    "b1": false,
                    "b2": true,
                    "nu": null,
                    "o": {},
                    "o1": {
                        "o11": undefined
                    },
                    "o2": {
                        "o22": "o22 val"
                    },
                    "o3": {
                        "o33": {
                            "o333": {
                                "o3333": {
                                    "o33332": undefined,
                                    "o33331": undefined
                                }
                            }
                        }
                    },
                    "o4": {
                        "o44": {
                            "o444": {
                                "o4444": {
                                    "o44442": "o44442 val",
                                    "o44441": undefined
                                }
                            }
                        }
                    }
                },
                "TestStruct3_skipEmpty_Result": {
                    "a": undefined,
                    "a1": undefined,
                    "as": ["as val"],
                    "an": [5],
                    "ab": [false],
                    "s": undefined,
                    "s1": "s1 val",
                    "n": undefined,
                    "n1": 4,
                    "n2": undefined,
                    "b": undefined,
                    "b1": false,
                    "b2": true,
                    "nu": null,
                    "o": undefined,
                    "o1": undefined,
                    "o2": {
                        "o22": "o22 val"
                    },
                    "o3": undefined,
                    "o4": {
                        "o44": {
                            "o444": {
                                "o4444": {
                                    "o44442": "o44442 val",
                                    "o44441": undefined
                                }
                            }
                        }
                    }
                }
            },

            dot_notation_Models: {
                "obj_simple": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "obj2": {
                    "type": "object",
                    "properties": {
                        "arr": {
                            "$ref": "nums"
                        }
                    }
                },
                "nums": {
                    "type": "array",
                    "items": {
                        "type": "number"
                    }
                },
                "obj": {
                    "type": "object",
                    "properties": {
                        "arr_in_obj": {
                            "$ref": "arr"
                        }
                    }
                },
                "arr": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "str": {
                                "type": "string"
                            }
                        }
                    }
                },
                "TestStruct2": {
                    "type": "object",
                    "properties": {
                        "arr": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "test": {
                                        "type": "obj"
                                    }
                                }
                            }
                        }
                    }
                },
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "caption": {
                            "type": "object",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "default": "test default string"
                                },
                                "caption": {
                                    "type": "string"
                                }
                            }
                        },
                        "number": {
                            "type": "number"
                        },
                        "arr": {
                            "type": "array",
                            "items": {
                                "type": "object",
                                "properties": {
                                    "title": {
                                        "type": "string",
                                        "default": "test default string"
                                    },
                                    "caption": {
                                        "type": "string"
                                    },
                                    "test": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "a": {
                                                    "type": "string"
                                                },
                                                "b": {
                                                    "type": "string",
                                                    "default": "test b"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "boolean": {
                            "type": "boolean"
                        }
                    }
                },
                "User": {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "string"
                        },
                        "id": {
                            "type": "number"
                        }
                    }
                },
                "UserList": {
                    "type": "array",
                    "items": {
                        "$ref": "User"
                    }
                }
            },
            xml_one_item_issue: {
                model: {
                    "TestStruct": {
                        "type": "object",
                        "properties": {
                            "prop": {
                                "type": "object",
                                "properties": {
                                    "other_list": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "item_name": {
                                                    "type": "string"
                                                }
                                            }
                                        }
                                    },
                                    "second_list": {
                                        "type": "array",
                                        "items": {
                                            "type": "object",
                                            "properties": {
                                                "item_name": {
                                                    "type": "string"
                                                },
                                                "obj": {
                                                    "type": "object",
                                                    "properties": {
                                                        "item_array": {
                                                            "type": "array",
                                                            "items": {
                                                                "type": "number"
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            },
                            "list": {
                                "type": "array",
                                "items": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "obj": {
                        "type": "object",
                        "properties": {
                            "arr_in_obj": {
                                "$ref": "arr"
                            }
                        }
                    },
                    "arr": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "str": {
                                    "type": "string"
                                }
                            }
                        }
                    },
                    "TestStruct2": {
                        "type": "object",
                        "properties": {
                            "arr": {
                                "type": "array",
                                "items": {
                                    "type": "object",
                                    "properties": {
                                        "test": {
                                            "type": "obj"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                default_value: {
                    first: {
                        prop: {
                            other_list: {
                                item_name: "should be an object inside one array item"
                            },
                            second_list: [{
                                item_name: "1",
                                obj: {
                                    item_array: 10
                                }
                            }, {
                                item_name: "2",
                                obj: {
                                    item_array: [10, 20, 30, 40, 50]
                                }
                            }]
                        },
                        list: "should be transform to array"
                    },
                    second: {
                        arr: {
                            test: {
                                arr_in_obj: {
                                    str: "should be property inside object in array item"
                                }
                            }
                        }
                    }
                }
            },
            inner_type_as_path: {
                TestStruct: {
                    "type": "object",
                    "properties": {
                        "name": {
                            "type": "object",
                            "properties": {
                                "first": {
                                    "type": "string"
                                },
                                "second": {
                                    "type": "string"
                                },
                            }
                        },
                        "caption": {
                            "type": "string"
                        },
                        "data": {
                            "type": "TestStruct.name"
                        }
                    }
                }
            },
            user_clone_inner_obj_instead_reference_copy: {
                "Location": {
                    "type": "object",
                    "properties": {
                        "longitude": {
                            "type": "number",
                            "default": 0
                        },
                        "latitude": {
                            "type": "number"
                        }
                    }
                },
                "TestStruct": {
                    "type": "object",
                    "properties": {
                        "title": {
                            "type": "string"
                        },
                        "location": {
                            "type": "object",
                            "properties": {
                                "longitude": {
                                    "type": "number",
                                    "default": 0
                                },
                                "latitude": {
                                    "type": "number"
                                },
                                "other": {
                                    "type": "Location"
                                }
                            }
                        },
                        "location_2": {
                            "type": "Location"
                        }
                    }
                }
            },
            v2format_for_arrays: {
                types: {
                    TestStruct: {
                        "type": "object",
                        "properties": {
                            "abc": {
                                "type": "array",
                                "items": [{
                                    "type": "string"
                                }, {
                                    "type": "number",
                                    "index": 5
                                }]
                            },
                            "abc2": {
                                "type": "array",
                                "items": [{
                                    "type": "string"
                                }, {
                                    "type": "object",
                                    "index": 5,
                                    "properties": {
                                        "test": {
                                            "type": "string"
                                        },
                                        "dbc": {
                                            "type": "array",
                                            "items": [{
                                                "type": "string"
                                            }, {
                                                "type": "number",
                                                "index": 5,
                                            }, {
                                                "type": "object",
                                                "index": 6,
                                                "properties": {
                                                    "A": {
                                                        "type": "string"
                                                    },
                                                    "B": {
                                                        "type": "string"
                                                    }
                                                }
                                            }]
                                        }
                                    }
                                }]
                            }
                        }
                    }
                },
                defaults: {
                    abc2: ['a', 'b', 'c', 'd', '3', {
                        special: "e"
                    }, 'f']
                }

            }
        },
        Login: {
            users: [{
                "_id": "558aa010975ae035ee2a88a0",
                "username": "test1",
                "_createdAt": "2015-06-24 12:18:24.491",
                "_updatedAt": "2015-06-25 09:38:06.593",
                "acl": {
                    "*": {
                        "read": true
                    },
                    "558aa010975ae035ee2a88a0": {
                        "read": true,
                        "write": true
                    }
                },
                "auth": {
                    "facebook": {
                        "id": "1426339097"
                    },
                    "google": {
                        "id": "103630909017103982657"
                    },
                    "twitter": {
                        "id": "778516674"
                    }
                }
            }, {
                "_id": "558bc3cf975ade716a23e09a",
                "username": "test",
                "_createdAt": "2015-06-25 09:03:11.433",
                "_updatedAt": "2015-06-25 09:03:11.485",
                "acl": {
                    "*": {
                        "read": true
                    },
                    "558bc3cf975ade716a23e09a": {
                        "read": true,
                        "write": true
                    }
                }
            }],
            user: {
                "_id": "558d00be975a52990a05196d",
                "username": "test",
                "_createdAt": "2015-06-26 07:35:26.017",
                "_updatedAt": "2015-06-26 07:35:26.019",
                "acl": {
                    "*": {
                        "read": true
                    },
                    "558d00be975a52990a05196d": {
                        "read": true,
                        "write": true
                    }
                },
                "sessionToken": "2c2ac734-a5f6-4ee7-9bbb-0a1145f6d1a8"
            },
            dbId: "557e7e3603ce37df160433cd",
            sessionToken: "2c2ac734-a5f6-4ee7-9bbb-0a1145f6d1a8",
            oauthRequestToken: "requestToken",
            oauthToken: "oauth_token",
            code: "oauth_code",
            oauthVerifier: "oauth_verifier",
            loginResponse: {
                "_id": "558d00be975a52990a05196d",
                "sessionToken": "2c2ac734-a5f6-4ee7-9bbb-0a1145f6d1a8"
            },
            dbIdNotFound: {
                "code": "DBUS002",
                "description": "database id not specified"
            }
        }
    }
});