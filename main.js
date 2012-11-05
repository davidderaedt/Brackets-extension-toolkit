/* 
    This extension was written to help you build one.
    Just read the source and follow the instructions.

    The "main.js" is the entry point for your extension.
    It is executed by the editor at application startup. 
*/


/*  These are jslint options. Using linters is recommended, but optional */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global define, $, brackets */


/*
    In Brackets, all js files are modules handled by requirejs.
    Leave it that way to conform to Brackets coding standards.
*/
define(function (require, exports, module) {
    
    // This enforces the use of javascript strict mode (again, a good practice).
    'use strict';

    
    /*
        The code for our extension really starts here.
        Select "Debug > Show the developer tools" and 
        make sure you selected the "disable cache" option.
        You should see the following log burried under other logs
    */
    console.log("INITIALIZING EXTENSION TUTORIAL");
    
        
    /*
        Here, we'll focus on the "Bracket wiki" command, which simply
        opens the Brackets wiki page in your browser.

        First, we need to import the necessary required dependencies.
    */
    
    // The CommandManager registers command IDs with functions
    var CommandManager = brackets.getModule("command/CommandManager"),
    // This will let us add menus items
        Menus          = brackets.getModule("command/Menus"),
    // This holds the list of all default commands
        Commands = brackets.getModule("command/Commands"),
    // This lets us do things through the native app shell
        NativeApp = brackets.getModule("utils/NativeApp");

    
    
    /*
        Next are some constants used by our extension        
    */
    // The name of our menu item, as it will appear to users
    var OPEN_WIKI_MENU_NAME   = "Brackets Wiki";
    // The command ID - which must be unique
    var OPEN_WIKI_COMMAND_ID  = "toolkit.openBracketsWiki";
    // The URL for the page we'll open
    var WIKI_URL = "https://github.com/adobe/brackets/wiki";


    
    /* 
        The function which will be called when the command is
        executed (ie when users select the menu)
    */
    function openBracketsWiki() {
        // This is how you open a webpage in the current browser window
        NativeApp.openURLInDefaultBrowser(WIKI_URL);

    }

    /*
        For our extension to do something, we need to tell the CommandManager:
        "execute the openBracketsWiki function when this menu item is selected"
    */
    CommandManager.register(OPEN_WIKI_MENU_NAME, OPEN_WIKI_COMMAND_ID, openBracketsWiki);

    
    /*
        Now, we'll add a menu item somewhere in the application Help menu
    */
    var menu = Menus.getMenu(Menus.AppMenuBar.HELP_MENU);
    menu.addMenuItem(OPEN_WIKI_COMMAND_ID, [], Menus.AFTER, Commands.HELP_FORUM);
    
        
    
    /*
        And that's it. You're now ready to make your own extension!

        Now, copy the "template" folder of this extension into the 
        "extensions/user" folder, rename it, and edit it.

        You can take a now look at the code below which implements 
        the logic behind the other menu items of this extension.


        Note: You can move this tutorial to the "extensions/disabled" folder
        to disable it. If you're getting serious about this, I strongly
        recommend working from a local copy of the Brackets repository.        
    */
           
    
    
    
    
    /*
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Add Text Command
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        The following describes a command which adds a comment to 
        the current document.
        It is only there for educational purposes (it doesn't do 
        anything useful), so it is disabled by default. 
        To unable it, uncomment the last paragraph.
    */
    
    // This will give us access to the document that's currently open
    var DocumentManager = brackets.getModule("document/DocumentManager");
    // This will let us edit the selection
    var EditorManager  = brackets.getModule("editor/EditorManager");
    
    // Constants
    var ADD_TEXT_CMD_ID  = "toolkit.addtext";
    var ADD_TEXT_MENU_NAME   = "Add Some Text";
    var SOME_TEXT = "// THIS IS OBVIOUSLY THE WORK OF A GENIUS!";
    
    /*
        Let's try it now!
        Edit the SOME_TEXT variable above, and hit Ctrl/CMD+R to reload.
        Now select the "Help/Add Some Text" menu: you should see your text now.
        ->
    */
    
            
    /*
        You probably realize that editing and testing from the same
        app window is far from ideal. So Select "Debug > New Brackets Window",
        and open developer tools from there. From now on, make test on that
        new window and keep editing code in the first one.
    */
    
    
    /*
        This is the function describing how to add text to our file
    */
    function addSomeText() {
        // Document objects represent file contents
        var currentDoc = DocumentManager.getCurrentDocument();
        
        // Editor objects let us modify selections
        var editor = EditorManager.getCurrentFullEditor();
        
        // Get the position of our cursor in the document
        var pos = editor.getCursorPos();
        
        // Add some text in our document
        currentDoc.replaceRange(SOME_TEXT, pos);
    }

    
    // Menu dividers are a good practice to separate our menu from the rest
    menu.addMenuDivider();
    
    
    // Uncomment the following to unable this command
    /*
    CommandManager.register(ADD_TEXT_MENU_NAME, ADD_TEXT_CMD_ID, addSomeText);
    menu.addMenuItem(ADD_TEXT_CMD_ID);
    */
    

    
    
    /*
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Open Extension source Command
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        
        This command opens this very file in Brackets
    */
    
    var ProjectManager = brackets.getModule("project/ProjectManager");
    var FileUtils = brackets.getModule("file/FileUtils");

    var OPEN_TUT_MENU_NAME   = "Open Extension Tutorial src";
    var OPEN_SRC_COMMAND_ID  = "toolkit.openSrc";
        
    function openSrc() {
        var srcFolder = FileUtils.getNativeModuleDirectoryPath(module);
        
        ProjectManager.openProject(srcFolder).done(
            function () {
                var path = srcFolder + "/main.js";
                
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
    


    
    /*
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Open Brackets source Command
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        This command opens the Brackets src folder in Brackets
    */
    
    var OPEN_BRACKETS_MENU_NAME   = "Open Brackets src";
    var OPEN_BRACKETS_COMMAND_ID  = "toolkit.openBracketsSrc";
        
    function openBracketsSrc() {
        ProjectManager.openProject(FileUtils.getNativeBracketsDirectoryPath());
    }
    
    CommandManager.register(OPEN_BRACKETS_MENU_NAME, OPEN_BRACKETS_COMMAND_ID, openBracketsSrc);
    menu.addMenuItem(OPEN_BRACKETS_COMMAND_ID);

});