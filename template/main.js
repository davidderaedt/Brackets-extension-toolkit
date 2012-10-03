/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */

/** Extension XXXX 
    description 
*/
define(function (require, exports, module) {
    'use strict';

    console.log("INITIALIZING XXXX EXTENSION");
    
    var CommandManager = brackets.getModule("command/CommandManager");
    var Menus          = brackets.getModule("command/Menus");
    //var EditorManager  = brackets.getModule("editor/EditorManager");
    //var ProjectManager = brackets.getModule("project/ProjectManager");
    //var FileUtils = brackets.getModule("file/FileUtils");    
    //var DocumentManager = brackets.getModule("document/DocumentManager");    

    
    var COMMAND_ID  = "XXXX.XXXX"; 
    var MENU_NAME   = "XXXX";
    
    
    function doMyCommand() {
        //console.log("Executing Command XXXX");
    }


    CommandManager.register(MENU_NAME, COMMAND_ID, doMyCommand);
    
    var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
    menu.addMenuDivider();
    menu.addMenuItem(COMMAND_ID);
    

});