define( [ 'require',
    '$App/entity/entityerror',
    '$App/entity/typenotfounderror',
    '$App/entity/nomodelerror',
    '$App/entity/entityfactory'
], function( require ) {
    return {
        EntityError: require( '$App/entity/entityerror' ),
        TypeNotFoundError: require( '$App/entity/typenotfounderror' ),
        NoModelError: require( '$App/entity/nomodelerror' ),
        EntityFactory: require( '$App/entity/entityfactory' )
    }
} );
