"use strict";

assert2(cr, "cr namespace not created");
assert2(cr.plugins_, "cr.plugins_ not created");

var runningElectron = false;
var dataReaded = [];

if (isElectron()) {
    var fs = require('fs'),
        jQuery = require("jquery"),
        electron = require('electron'),
        process = require('process'),
        epath = require("path"),
        os = require('os'),
        shell = electron.shell,
        app = electron.app,
        remote = electron.remote,
        dialog = remote.dialog,
        remoteapp = remote.app,
        browserWindow = remote.getCurrentWindow(),
        runningElectron = true;


    console.log("Electron loaded");
}

/////////////////////////////////////
// Plugin class
cr.plugins_.armaldio_electron = function (runtime) {
    this.runtime = runtime;
};

function isElectron() {
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
        return true;
    }
    if (typeof process !== 'undefined' && process.versions && !!process.versions.electron) {
        return true;
    }
    return false;
}

(function () {

    var pluginProto = cr.plugins_.armaldio_electron.prototype;

    /////////////////////////////////////
    // Object type class
    pluginProto.Type = function (plugin) {
        this.plugin = plugin;
        this.runtime = plugin.runtime;
    };

    var typeProto = pluginProto.Type.prototype;

    // called on startup for each object type
    typeProto.onCreate = function () {

    };

    /////////////////////////////////////
    // Instance class
    pluginProto.Instance = function (type) {
        this.type = type;
        this.runtime = type.runtime;
    };

    var instanceProto = pluginProto.Instance.prototype;

    // called whenever an instance is created
    instanceProto.onCreate = function () {};

    instanceProto.saveToJSON = function () {
        return this.dictionary;
    };

    instanceProto.loadFromJSON = function (o) {
        this.dictionary = o;

        // Update the key count
        this.key_count = 0;

        for (var p in this.dictionary) {
            if (this.dictionary.hasOwnProperty(p))
                this.key_count++;
        }
    };

    /**BEGIN-PREVIEWONLY**/
    instanceProto.getDebuggerValues = function (propsections) {
        var props = [];

        for (var p in this.dictionary) {
            if (this.dictionary.hasOwnProperty(p)) {
                props.push({
                    "name": p,
                    "value": this.dictionary[p]
                });
            }
        }

        propsections.push({
            "title": "Electron",
            "properties": props
        });
    };

    instanceProto.onDebugValueEdited = function (header, name, value) {
        this.dictionary[name] = value;
    };
    /**END-PREVIEWONLY**/

    //////////////////////////////////////
    // Conditions
    function Cnds() {};

    /**
     * @return {boolean}
     */
    Cnds.prototype.OnSaveSuccess = function (tag) {
        return cr.equals_nocase(tag, this.tag);
    };

    Cnds.prototype.OnSaveFail = function (tag) {
        return cr.equals_nocase(tag, this.tag);
    };

    Cnds.prototype.OnReadSuccess = function (tag) {
        return cr.equals_nocase(tag, this.tag);
    };

    Cnds.prototype.OnReadFail = function (tag) {
        return cr.equals_nocase(tag, this.tag);
    };

    Cnds.prototype.IsElectron = function () {
        return runningElectron;
    };

    pluginProto.cnds = new Cnds();

    //////////////////////////////////////
    // Actions
    function Acts() {};

    Acts.prototype.Write = function (tag, path, data) {
        var self = this;
        self.tag = tag;
        fs.writeFile(path, data, function (err) {
            if (err) {
                readError.push({
                    tag: tag,
                    text: err
                })
                self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnSaveFail, self);
            }

            self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnSaveSuccess, self);
        });
    };

    //TOOD add encoding
    Acts.prototype.Read = function (tag, path) {
        var self = this;
        self.tag = tag;
        fs.readFile(path, "utf8", function (err, data) {
            if (err) {
                //return console.log(err);
                self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadFail, self);
            }


            self.runtime.trigger(cr.plugins_.armaldio_electron.prototype.cnds.OnReadSuccess, self);
        });
    };

    Acts.prototype.ShowOpenDialog = function (params) {
        dialog.showOpenDialog({
            title: "Choose file"
        });
    }

    Acts.prototype.Exit = function () {
        browserWindow.close();
    };

    Acts.prototype.Restart = function () {
        browserWindow.reload();
    };

    Acts.prototype.Focus = function () {
        browserWindow.focus();
    };

    Acts.prototype.Show = function () {
        browserWindow.show();
    };

    Acts.prototype.Hide = function () {
        browserWindow.hide();
    };

    Acts.prototype.Maximize = function () {
        browserWindow.Maximize();
    };

    Acts.prototype.Fullscreen = function (b) {
        console.log(b);
        browserWindow.setFullScreen((b == 0) ? true : false);
    };

    pluginProto.acts = new Acts();

    //////////////////////////////////////
    // Expressions
    // ret.set_float, ret.set_string, ret.set_any
    function Exps() {};

    Exps.prototype.GetAppPath = function (ret) {
        ret.set_string(remoteapp.getAppPath());
    };

    Exps.prototype.GetLocale = function (ret) {
        ret.set_string(remoteapp.getLocale());
    };

    Exps.prototype.GetOSArch = function (ret) {
        ret.set_string(os.arch());
    };

    Exps.prototype.GetOSHomedir = function (ret) {
        ret.set_string(os.homedir());
    };

    Exps.prototype.GetOSHostname = function (ret) {
        ret.set_string(os.hostname());
    };

    Exps.prototype.GetOSPlatform = function (ret) {
        ret.set_string(os.platform());
    };

    Exps.prototype.GetHomePath = function (ret) {
        ret.set_string(remoteapp.getPath("home"));
    };

    Exps.prototype.GetAppDataPath = function (ret) {
        ret.set_string(remoteapp.getPath("appData"));
    };

    Exps.prototype.GetUserDataPath = function (ret) {
        ret.set_string(remoteapp.getPath("userData"));
    };

    Exps.prototype.GetExePath = function (ret) {
        ret.set_string(remoteapp.getPath("exe"));
    };

    Exps.prototype.GetDesktopPath = function (ret) {
        ret.set_string(remoteapp.getPath("desktop"));
    };

    Exps.prototype.GetDocumentsPath = function (ret) {
        ret.set_string(remoteapp.getPath("documents"));
    };

    Exps.prototype.GetDownloadsPath = function (ret) {
        ret.set_string(remoteapp.getPath("downloads"));
    };

    Exps.prototype.GetMusicPath = function (ret) {
        ret.set_string(remoteapp.getPath("music"));
    };

    Exps.prototype.GetPicturesPath = function (ret) {
        ret.set_string(remoteapp.getPath("pictures"));
    };

    Exps.prototype.GetVideoPath = function (ret) {
        ret.set_string(remoteapp.getPath("videos"));
    };

    Exps.prototype.GetTempPath = function (ret) {
        ret.set_string(remoteapp.getPath("temp"));
    };

    pluginProto.exps = new Exps();

}());