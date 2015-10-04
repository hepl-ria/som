/* sòm
 * Compute checksum of a file.
 *
 * started at 25/09/2015
 */

"use strict";

var chalk = require( "chalk" ),
    path = require( "path" ),
    fs = require( "fs" ),
    humanSize = require( "human-size" ),
    // require Sha1 instead of crc32
    sha1 = require( "sha1" );

var sFileName, sFilePath;

var fShowError = function( sErrorMessage ) {
    console.log( chalk.red.bold.underline( "✘ error:" ), sErrorMessage );
    process.exit( 1 );
};

if( !( sFileName = process.argv[ 2 ] ) ) {
    fShowError( "You need to give a file as argument!" );
}

sFilePath = path.resolve( process.cwd(), sFileName );

fs.stat( sFilePath, function( oError, oStats ) {
    var aLogLines = [];

    if( oError ) {
        fShowError( oError.message );
    }

    if( !oStats.isFile() ) {
        fShowError( "The given path must be a file!" );
    }

    // name
    aLogLines.push( chalk.yellow( "FileName : " ) + sFileName + '\r\n' );

    // Location
    // Dislay location too
    aLogLines.push( chalk.yellow( "Location : " ) + sFilePath + '\r\n' );

    // size
    aLogLines.push( chalk.yellow( "Size : " ) + "(" + humanSize( oStats.size ) + ")"  + '\r\n'  );

    // checksum
    fs.readFile( sFilePath, { "encoding": "utf-8" }, function( oError, sData ) {
        if( oError ) {
            fShowError( oError );
        }

        // off course change crc32 by sha1 here too
        aLogLines.push( chalk.yellow( "Checksum : " ) + " " + sha1( sData ) );

        console.log( aLogLines.join( " " ) );
    } );
} );
