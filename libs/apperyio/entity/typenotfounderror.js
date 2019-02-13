define( [ 'require', '$App/entity/entityerror' ], function( require, EntityError ) {

    function TypeNotFoundError( message ) {
        this.name = "TypeNotFoundError";
        this.message = message;
    }
    TypeNotFoundError.prototype = new EntityError();
    TypeNotFoundError.prototype.constructor = TypeNotFoundError;

    return TypeNotFoundError;

} );
