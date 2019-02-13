define( function( require ) {

    function EntityError( message ) {
        this.name = "EntityError";
        this.message = message;
    };
    EntityError.prototype = new Error();
    EntityError.prototype.constructor = EntityError;

    return EntityError;

} );
