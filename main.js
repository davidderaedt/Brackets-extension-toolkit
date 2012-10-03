/* 
    This extension was written to help you build one.
    Just read the source and follow the instructions.

    The "main.js" is the entry point for your extension.
    It is executed by the editor at application startup. 
*/


/*These are jslint options. Using linters is recommended, but optional*/
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */


/*
    In Brackets, all js files are modules handled by requirejs.
    Leave it that way to conform to Brackets coding standards.
*/
define(function (require, exports, module) {
    
    // This enforces the use of javascript strict mode (a good practice).
    'use strict';

    
    /*
        The code for our extension really starts here.
        Select "Debug > Show the developer tools" and 
        sure you selected the "disable cache" option.
        You should see the following log burried under other logs
    */
    console.log("INITIALIZING EXTENSION TUTORIAL");
    
        
    /*
        Now may be a good time to actually try our extension. 
        Put your cursor below and select "Add Some Text" from the "Help" Menu
        ->
    */

    
    /*
        Fantastic.
        To make such magic, we'll need to create commands (which describe some
        things to execute) and then we'll make menu items to triggers commands
    */
    
    
    
    /*
        First, we need to import the necessary required dependencies.
    */
    // This will let us register commands
    var CommandManager = brackets.getModule("command/CommandManager"),
    // This will let us edit the document that's currently open
        EditorManager  = brackets.getModule("editor/EditorManager"),
    // This will let us add menus
        Menus          = brackets.getModule("command/Menus");


    /*
        Next are some constants used by our extension
    */
    // We need unique IDs for our commands
    var ADD_TEXT_CMD_ID  = "toolkit.addtext";
    // And some strings for the menu items
    var ADD_TEXT_MENU_NAME   = "Add Some Text";
    // This is our comment. Edit it as you like.
    var SOME_TEXT = "// THIS IS OBVIOUSLY THE WORK OF A GENIUS";
    
    /*
        Open your developer tools options panel, and make sure that 
        the "disable cache" option is enabled.
        Edit the SOME_TEXT variable, and hit Ctrl/CMD+R. 
        Now re-select the "Add Some Text" menu: you should see your text now.
    */
    
            
    /*
        You probably realize that editing and testing from the same app window is far from ideal.
        Select "Debug > New Brackets Window", and open developer tools from there
        From now on, make test on that new window and keep editing code in the first one.
    */
    
    
    /*
        This is a custom function describing how to add text to our file
    */
    function addSomeText() {
        
        // Editor objects let us edit documents
        // Here we want to access the editor of the current document
        var editor = EditorManager.getCurrentFullEditor();
        
        // Get the position of our cursor in the document
        var pos = editor.getCursorPos();
        
        // Add some text in our document
        editor._codeMirror.replaceRange(SOME_TEXT, pos);

        // Give focus back to the editor
        EditorManager.focusEditor();
    }

    
    
    /*
        For our extension to do something, we need to tell the Command Manager:
        "execute the addSomeText function when this menu item is selected"
    */
    CommandManager.register(ADD_TEXT_MENU_NAME, ADD_TEXT_CMD_ID, addSomeText);

    
    
    /*
        Now, we'll add a menu item somewhere in the application menu
        Since this extension adds some text, it should belong to the Edit menu
        But for the purpose of this extension, we put everything under the Help menu
    */
    var menu = Menus.getMenu(Menus.AppMenuBar.HELP_MENU);
    // menu dividers are a good practice to separate our menu from the rest
    menu.addMenuDivider();
    // this actually adds the menu item to the menu
    menu.addMenuItem(ADD_TEXT_CMD_ID);
    

    
    
    /*
        You're now ready to make your own extension!
        Copy the template folder in the "extensions/user" folder, and 

        You can move this tutorial to the "extensions/disabled" folder to remove it.

        Note: If you're getting serious about this, I strongly recommend working
        from a local copy of Brackets repository.

        You can also take a look at the code below which implements 
        the logic behind the "Open Extension Tutorial" command
    */
        
    var ProjectManager = brackets.getModule("project/ProjectManager");
    var FileUtils = brackets.getModule("file/FileUtils");
    var DocumentManager = brackets.getModule("document/DocumentManager");

    var OPEN_TUT_MENU_NAME   = "Open Extension Tutorial src";
    var OPEN_SRC_COMMAND_ID  = "toolkit.openSrc";
        
    function openSrc() {
        var srcFolder = FileUtils.getNativeModuleDirectoryPath(module);
        
        ProjectManager.openProject(srcFolder).done(
            function () {
                var path = srcFolder + "/main.js";
                console.log(path);
                DocumentManager.getDocumentForPath(path).done(
                    function (doc) {
                        DocumentManager.setCurrentDocument(doc);
                    }
                );
            }
        );
    }
    
    CommandManager.register(OPEN_TUT_MENU_NAME, OPEN_SRC_COMMAND_ID, openSrc);
    menu.addMenuItem(OPEN_SRC_COMMAND_ID, [], Menus.BEFORE, ADD_TEXT_CMD_ID);
    

    
    /*Open Brackets src command*/
    var OPEN_BRACKETS_MENU_NAME   = "Open Brackets src";
    var OPEN_BRACKETS_COMMAND_ID  = "toolkit.openBracketsSrc";
        
    function openBracketsSrc() {
        ProjectManager.openProject(FileUtils.getNativeBracketsDirectoryPath());
    }
    
    CommandManager.register(OPEN_BRACKETS_MENU_NAME, OPEN_BRACKETS_COMMAND_ID, openBracketsSrc);
    menu.addMenuItem(OPEN_BRACKETS_COMMAND_ID);

    
    
    /*Open wiki command*/
    var Commands = brackets.getModule("command/Commands");
    var NativeApp = brackets.getModule("utils/NativeApp");
    
    var OPEN_WIKI_MENU_NAME   = "Brackets Wiki";
    var OPEN_WIKI_COMMAND_ID  = "toolkit.openBracketsWiki";
        
    function openBracketsWiki() {
        NativeApp.openURLInDefaultBrowser("https://github.com/adobe/brackets/wiki");
    }
    
    CommandManager.register(OPEN_WIKI_MENU_NAME, OPEN_WIKI_COMMAND_ID, openBracketsWiki);
    menu.addMenuItem(OPEN_WIKI_COMMAND_ID, [], Menus.AFTER, Commands.HELP_FORUM);
});