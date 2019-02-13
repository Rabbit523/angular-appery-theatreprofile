define( [ 'require', '$App/entity/typenotfounderror' ], function( require, TypeNotFoundError ) {

    function NoModelError( message ) {
        this.name = "NoModelError";
        this.message = message;
    };
    NoModelError.prototype = new TypeNotFoundError();
    NoModelError.prototype.constructor = NoModelError;

    return NoModelError;

} );
