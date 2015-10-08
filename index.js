/* som
 * Compute checksum of a file
 *
 * Started at 25/09/2015
 */

"use strict";
//Removes node_modules
// var chalk = require( "chalk" ),
//     path = require( "path" ),
//     fs = require( "fs" ),
//     humanSize = require( "human-size" ),
//     sha1 = require( "sha1" );
var sFileName, sFilePath;

var fShowError = function( sErrorMessage ) {

    console.log(chalk.red.bold("error : "), sErrorMessage);
    process.exit( 1 );

}

if( !( sFileName = process.argv[2] ) ){

    fShowError('You need to give a file as arg');

}
sFilePath = path.resolve( process.cwd(), sFileName);

fs.stat( sFilePath, function( oError, oStats ) {
    var aLogLines = [];

    if (oError) {
        fShowError( oError.message );
    }
    if ( !oStats.isFile() ) {
        fShowError('The given path must be a file')
    }
    //name
    aLogLines.push( chalk.yellow.bold( sFileName ) );

    //size
    aLogLines.push( chalk.gray( '(' + humanSize(oStats.size) + ')' ) );

    //checksum
    fs.readFile( sFilePath, {"encoding" : "utf-8"}, function( oError, sData) {
        if (oError) {
            fShowError( oError );
        }
        aLogLines.push( chalk.green.bold( "sum:" ) + " " + sha1( sData ) );
        console.log( aLogLines.join( ' // ' ) );
    } )

    //result


} );
