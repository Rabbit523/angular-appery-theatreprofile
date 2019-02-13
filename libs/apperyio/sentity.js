define( [ 'require', '$App/entity/api', 'services/models' ], function( require ) {

    var EntityAPI_provider = require( '$App/entity/api' );
    var app_models = require( 'services/models' );
    return function() {
        var result;
        var EntityAPI = new EntityAPI_provider.EntityFactory( app_models );
        result = EntityAPI.get.bind( EntityAPI );
        result.EntityFactory = EntityAPI_provider.EntityFactory;
        result.EntityTypeNotFoundError = EntityAPI_provider.TypeNotFoundError;
        result.$$Apperyio_name = 'EntityAPI';
        return result;
    }

} );
