define( [ 'require', 'lodash', "angular-mocks", '$App/entity/api', 'mocks' ], function( require, _ ) {
    var Entity_api = require( '$App/entity/api' );
    var EntityFactory = Entity_api.EntityFactory;
    var Mocks = require( 'mocks' ).EntityAPI;

    beforeEach( module( window.__APPLICATION_NAME ) );

    describe( "EntityAPI", function() {

        it( "should return simple types", function() {
            var entities = new EntityFactory();

            expect( ( typeof entities.get( "string" ) ).toLowerCase() == "string" ).toBeTruthy();
            expect( entities.get( "string" ) == "" ).toBeTruthy();

            expect( ( typeof entities.get( "number" ) ).toLowerCase() == "number" ).toBeTruthy();
            expect( entities.get( "number" ) == 0 ).toBeTruthy();

            expect( ( typeof entities.get( "boolean" ) ).toLowerCase() == "boolean" ).toBeTruthy();
            expect( entities.get( "boolean" ) == false ).toBeTruthy();

            expect( _.isArray( entities.get( "array" ) ) ).toBeTruthy();
            expect( entities.get( "array" ).length == 0 ).toBeTruthy();

            expect( _.isObject( entities.get( "object" ) ) ).toBeTruthy();
            expect( _.map( entities.get( "object" ) ).length == 0 ).toBeTruthy();
        } );

        it( "should return simple types as undefined", function() {
            var entities = new EntityFactory();

            expect( ( typeof entities.get( "string", undefined, true ) ).toLowerCase() ).toBe(
                "undefined" );

            expect( entities.get( "string", undefined, true ) ).not.toBeDefined();

            expect( ( typeof entities.get( "number", undefined, true ) ).toLowerCase() ).toBe(
                "undefined" );
            expect( entities.get( "number", undefined, true ) ).not.toBeDefined();

            expect( ( typeof entities.get( "boolean", undefined, true ) ).toLowerCase() ).toBe(
                "undefined" );

            expect( entities.get( "boolean", undefined, true ) ).not.toBeDefined();
        } );

        it( "Object with one level", function() {
            var entities = new EntityFactory( Mocks.object_with_one_level_Models );

            var object = entities.get( "TestStruct" );
            expect( _.isObject( object ) ).toBeTruthy();
            expect( _.isEqual( object, Mocks.object_with_one_level_Result ) ).toBeTruthy();

            object = entities.get( "TestStruct", undefined, true );
            expect( _.isObject( object ) ).toBeTruthy();
            expect( _.isEqual( object, Mocks.object_with_one_level_defUndefined_Result ) ).toBeTruthy();

            object = entities.get( "TestStruct", undefined, true, true );
            expect( _.isEqual( object, Mocks.object_with_one_level_skipEmpty_Result ) ).toBeTruthy();
        } );

        it( "Cache shouldn't be overridden", function() {
            var entities = new EntityFactory( Mocks.object_with_one_level_Models );

            var object_ff = entities.get( "TestStruct" );
            expect( _.isObject( object_ff ) ).toBeTruthy();
            expect( _.isEqual( object_ff, Mocks.object_with_one_level_Result ) ).toBeTruthy();

            var object_tf = entities.get( "TestStruct", undefined, true );
            expect( _.isObject( object_tf ) ).toBeTruthy();
            expect( _.isEqual( object_tf, Mocks.object_with_one_level_defUndefined_Result ) ).toBeTruthy();

            var object_tt = entities.get( "TestStruct", undefined, true, true );
            expect( _.isEqual( object_tt, Mocks.object_with_one_level_skipEmpty_Result ) ).toBeTruthy();
            
            var object_ff2 = entities.get( "TestStruct" );
            var object_tf2 = entities.get( "TestStruct", undefined, true );
            var object_tt2 = entities.get( "TestStruct", undefined, true, true );
            
            expect( _.isEqual( object_ff, object_ff2 ) ).toBeTruthy();
            expect( _.isEqual( object_tf, object_tf2 ) ).toBeTruthy();
            expect( _.isEqual( object_tt, object_tt2 ) ).toBeTruthy();
        } );

        it( 'List of types', function() {
            var entities = new EntityFactory( Mocks.list_of_types_Models );
            var t1 = entities.get( "TestStruct" ),
                t2 = entities.get( "TestStruct2" ),
                t3 = entities.get( "TestStruct3" );

            expect( t1 ).toBeDefined();
            expect( t2 ).toBeDefined();
            expect( t3 ).toBeDefined();

            expect( t1.title ).toBeDefined();
            expect( t2.title ).not.toBeDefined();
            expect( t3.num === 0 ).toBeTruthy();
            expect( t1.num ).not.toBeDefined();
        } );

        it( 'Lazy initialization', function() {
            var entities = new EntityFactory( Mocks.lazy_init_Models );

            var res = entities.get( "TestStruct2" );
            expect( res ).toBeDefined();
            expect( res.data.struct.title ).toBeDefined();
            expect( res.data2.title ).toBeDefined();
        } );

        it( 'Inner tests (implementation specific)', function() {
            var entities = new EntityFactory( Mocks.inner_tests );

            var res = entities.get( "TestStruct2" );
            expect( res ).toBeDefined();

            expect( entities._types[ "TestStruct/false" ] ).toBeDefined();
            expect( entities._types[ "TestStruct/true" ] ).toBeUndefined();
            expect( entities._types[ "TestStruct" ] ).toBeUndefined();
            expect( _.isFunction( entities._types[ "TestStruct/false" ] ) ).toBeTruthy();

            var res = entities.get( "TestStruct2", undefined, true );
            expect( res ).toBeDefined();

            expect( entities._types[ "TestStruct/true" ] ).toBeDefined();
            expect( _.isFunction( entities._types[ "TestStruct/true" ] ) ).toBeTruthy();
        } );

        it( "Exceptions", function() {
            var entities = new EntityFactory();
            expect( entities.get.bind( entities, "NotExistedTypeName" ) ).toThrowError();
            expect( entities.get.bind( entities, "NotExistedTypeName" ) ).toThrowError(
                Entity_api.TypeNotFoundError );
        } );

        it( 'Default values inside model', function() {
            var entities = new EntityFactory( Mocks.default_values_Models );

            var entity = entities.get( "TestStruct" );
            expect( entity ).toBeDefined();;
            expect( entity.title ).toBe( "test default string" );

            entity = entities.get( "TestStruct2" );

            expect( entity && entity.data && entity.data.title ).toBe( "test default string" );
        } );

        it( "Default values on object creation", function() {
            var entities = new EntityFactory( Mocks.default_values_on_object_creation_Models );

            var entity = entities.get( "TestStruct", {
                caption: "predefined test String"
            } );

            expect( entity ).toBeDefined();

            expect( entity.title ).toBe( "test default string" );
            expect( entity.caption ).toBe( "predefined test String" );

            entity = entities.get( "TestStruct2", {
                data: {
                    caption: "predefined test String"
                }
            } );

            expect( entity.data.caption ).toBe( "predefined test String" );

            entity = entities.get( "TestStruct2", {
                data: {
                    title: "predefined test String"
                }
            } );

            expect( entity.data.title ).toBe( "predefined test String" );

            entity = entities.get( "TestStruct2", {
                data: {
                    new_title: "predefined test String"
                }
            } );

            expect( entity.data.new_title ).toBe( "predefined test String" );
            var entity_ff = entities.get( "TestStruct3" );
            expect( _.isEqual( entity_ff,  Mocks.default_values_on_object_creation_Models.TestStruct3_Result ) ).toBeTruthy();
            
            var entity_tf = entities.get( "TestStruct3", undefined, true );
            expect( _.isEqual( entity_tf,  Mocks.default_values_on_object_creation_Models.TestStruct3_defUndefined_Result ) ).toBeTruthy();
            
            var entity_tt = entities.get( "TestStruct3", undefined, true, true );
            expect( _.isEqual( entity_tt,  Mocks.default_values_on_object_creation_Models.TestStruct3_skipEmpty_Result ) ).toBeTruthy();
            
            var entity_ff2 = entities.get( "TestStruct3" );
            var entity_tf2 = entities.get( "TestStruct3", undefined, true );
            var entity_tt2 = entities.get( "TestStruct3", undefined, true, true );
            expect( _.isEqual( entity_ff,  entity_ff2 ) ).toBeTruthy();
            expect( _.isEqual( entity_tf,  entity_tf2 ) ).toBeTruthy();
            expect( _.isEqual( entity_tt,  entity_tt2 ) ).toBeTruthy();
            
            expect( entity_ff == entity_ff2 ).not.toBeTruthy( );
            expect( entity_tf == entity_tf2 ).not.toBeTruthy( );
            expect( entity_tt == entity_tt2 ).not.toBeTruthy( );

        } );

        it( "Dot notation in Model generation", function() {
            var entities = new EntityFactory( Mocks.dot_notation_Models );

            var entity = entities.get( 'TestStruct.caption' );

            expect( _.isObject( entity ) ).toBeTruthy();

            expect( entity.title ).toBeDefined();
            expect( entity.title ).toBe( "test default string" );
            expect( entity.caption ).toBeDefined();

            entity = entities.get( 'TestStruct.arr.[i]' );

            expect( _.isObject( entity ) ).toBeTruthy();

            expect( entity.title ).toBeDefined();
            expect( entity.title ).toBe( "test default string" );
            expect( entity.caption ).toBeDefined();

            entity = entities.get( 'TestStruct.arr.[i].test.[i]' );

            expect( _.isObject( entity ) ).toBeTruthy();

            expect( entity.a ).toBeDefined();
            expect( entity.b ).toBeDefined();
            expect( entity.b ).toBe( "test b" );

            entity = entities.get( "obj.arr_in_obj.[i]" );

            expect( _.isObject( entity ) ).toBeTruthy();
            expect( _.isString( entity.str ) ).toBeTruthy();

            entity = entities.get( "TestStruct2.arr.[i].test" );

            expect( _.isObject( entity ) ).toBeTruthy();
            expect( _.isArray( entity.arr_in_obj ) ).toBeTruthy();
            // clone() drops __entyty function for array
            expect( entity.arr_in_obj.hasOwnProperty( '__entity' ) ).toBeTruthy();

            entity = entities.get( "UserList.[i]" );
            expect( _.isObject( entity ) ).toBeTruthy();
            expect( _.isString( entity.name ) ).toBeTruthy();

            entity = entities.get( "obj_simple.[i]" );

            expect( _.isNumber( entity ) ).toBeTruthy();
            expect( entity ).toBe( 0 );

            entity = entities.get( 'obj2.arr.[i]' );

            expect( _.isNumber( entity ) ).toBeTruthy();
            expect( entity ).toBe( 0 );

            entity = entities.get( 'TestStruct2.arr.[i].test.arr_in_obj.[i]' );

            expect( _.isObject( entity ) ).toBeTruthy();
            expect( _.isString( entity.str ) ).toBeTruthy();

        } );


        it( "XML OneItem in Array issue", function() {
            var entities = new EntityFactory( Mocks.xml_one_item_issue.model );

            var def = Mocks.xml_one_item_issue.default_value.first;

            var entity = entities.get( 'TestStruct', def );

            expect( _.isArray( entity.list ) ).toBeTruthy();
            expect( _.isArray( entity.prop.other_list ) ).toBeTruthy();

            expect( entity.list[ 0 ] ).toBe( def.list );
            expect( entity.prop.other_list[ 0 ].item_name ).toBe( def.prop.other_list.item_name );
            expect( _.keys( entity.prop.other_list[ 0 ] ).length ).toBe( 1 );

            expect( entity.list.length ).toBe( 1 );
            expect( entity.prop.other_list.length ).toBe( 1 );

            expect( entity.prop.second_list.length ).toBe( 2 );
            expect( _.keys( entity.prop.second_list[ 0 ] ).length ).toBe( 2 );
            expect( entity.prop.second_list[ 0 ].obj.item_array ).toBeDefined();

            expect( _.isArray( entity.prop.second_list[ 0 ].obj.item_array ) ).toBeTruthy();

            def = Mocks.xml_one_item_issue.default_value.second;

            entity = entities.get( 'TestStruct2', def );

            expect( _.isArray( entity.arr ) ).toBeTruthy();
            expect( _.isObject( entity.arr[ 0 ] ) ).toBeTruthy();
            expect( _.isObject( entity.arr[ 0 ].test ) ).toBeTruthy();
            expect( _.isArray( entity.arr[ 0 ].test.arr_in_obj ) ).toBeTruthy();
            expect( _.isObject( entity.arr[ 0 ].test.arr_in_obj[ 0 ] ) ).toBeTruthy();
            expect( _.isString( entity.arr[ 0 ].test.arr_in_obj[ 0 ].str ) ).toBeTruthy();
        } );

        it( "should support model as array of objects", function() {
            var entities = new EntityFactory( Mocks.array_model );

            var entity = entities.get( 'TestStruct' );

            expect( _.isArray( entity ) ).toBeTruthy();
            expect( entity.length ).toBe( 0 );

        } );

        it( 'should support two notations with "type" and "$ref" as model name', function() {
            var entities = new EntityFactory( Mocks.type_$ref_models );

            var entity = entities.get( 'user_list_$ref' );
            expect( _.isArray( entity ) ).toBeTruthy();

            entity = entities.get( 'user_list_type' );
            expect( _.isArray( entity ) ).toBeTruthy();

            entity = entities.get( 'group' );

            expect( _.isObject( entity ) ).toBeTruthy();
            expect( _.isObject( entity.prop$ref ) ).toBeTruthy();
            expect( _.isObject( entity.prop ) ).toBeTruthy();
            expect( _.isArray( entity.prop.list_type ) ).toBeTruthy();
            expect( _.isArray( entity.prop.list_ref ) ).toBeTruthy();
            expect( entity.prop.list_ref.hasOwnProperty( '__entity' ) ).toBeTruthy();

        } );

        it( 'should make clone of inner objects instead of reference copy', function() {
            var Generator = new EntityFactory( Mocks.user_clone_inner_obj_instead_reference_copy );
            var var1 = Generator.get( 'TestStruct' );
            var var2 = Generator.get( 'TestStruct' );
            var var3 = Generator.get( 'TestStruct' );

            var1.title = '1';
            var2.title = '2';
            var3.title = '3';
            expect( var1.title ).not.toEqual( var2.title );
            expect( var2.title ).not.toEqual( var3.title );
            expect( var1.title ).not.toEqual( var3.title );

            var1.location.longitude = 10;
            var2.location.longitude = 20;
            var3.location.longitude = 30;

            expect( 10 ).toEqual( var1.location.longitude );
            expect( 20 ).toEqual( var2.location.longitude );
            expect( 30 ).toEqual( var3.location.longitude );

            var1.location.other.longitude = 101;
            var2.location.other.longitude = 201;
            var3.location.other.longitude = 301;

            expect( 101 ).toEqual( var1.location.other.longitude );
            expect( 201 ).toEqual( var2.location.other.longitude );
            expect( 301 ).toEqual( var3.location.other.longitude );

            var1.location_2.longitude = 102;
            var2.location_2.longitude = 202;
            var3.location_2.longitude = 302;

            expect( 102 ).toEqual( var1.location_2.longitude );
            expect( 202 ).toEqual( var2.location_2.longitude );
            expect( 302 ).toEqual( var3.location_2.longitude );
        } );

        it( 'should be available ability to use dot-path-notation for property from other property of current Model', function() {
            var entities = new EntityFactory( Mocks.inner_type_as_path );

            var entity = entities.get( 'TestStruct' );

            expect( entity.name.first ).toBeDefined();
            expect( entity.name.second ).toBeDefined();

            expect( entity.data.first ).toBeDefined();
            expect( entity.data.second ).toBeDefined();

            entity.name.first = "q";
            entity.data.first = "w";

            expect( entity.name.first ).not.toBe( entity.data.first );
        } );

        describe( ' Second version of array model type', function() {
            var entities;

            beforeEach( function() {
                entities = new EntityFactory( Mocks.v2format_for_arrays.types );
            } );

            it( "is possible to read [i]", function() {
                var entity = entities.get( 'TestStruct' );
                expect( entity ).toBeDefined();

                entity = entities.get( 'TestStruct.abc.[i]' );
                expect( typeof entity ).toBe( 'string' );
            } );

            it( "is possible to read [5]", function() {
                entity = entities.get( 'TestStruct.abc.[5]' );
                expect( typeof entity ).toBe( 'number' );
            } );

            it( "is possible to read [5] and it nested properties", function() {
                entity = entities.get( 'TestStruct.abc2.[5].test' );
                expect( typeof entity ).toBe( 'string' );
            } );

            it( "is possible to read [5] and it nested properties as array and it [5] element", function() {
                entity = entities.get( 'TestStruct.abc2.[5].dbc.[5]' );
                expect( typeof entity ).toBe( 'number' );
            } );

            it( "should merge model and external data with consideration of special array item", function() {
                entity = entities.get( 'TestStruct', Mocks.v2format_for_arrays.defaults );

                expect( _.isArray( entity.abc2 ) ).toBeTruthy();
                expect( _.isString( entity.abc2[ 0 ] ) ).toBeTruthy();
                expect( _.isString( entity.abc2[ 3 ] ) ).toBeTruthy();
                expect( _.isObject( entity.abc2[ 5 ] ) ).toBeTruthy();
                expect( _.isArray( entity.abc2[ 5 ].dbc ) ).toBeTruthy();
                expect( entity.abc2[ 5 ].special ).toBeDefined();
                expect( entity.abc2[ 5 ].test ).toBeDefined();
                expect( entity.abc2[ 5 ].special ).toBe( Mocks.v2format_for_arrays.defaults.abc2[ 5 ].special );
            } );
        } )
    } );
} );