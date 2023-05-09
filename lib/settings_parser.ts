import ISettings from "./interfaces/ISettings"

class GreenlightSettings{

    public settings:ISettings;//Settings dictionary

    /**
    *Call this method to set the settings object.
    *@param moduleSettings - The settings dictionary to be used in the object
    */
    public setSettings=(moduleSettings:ISettings)=>{
        this.settings=moduleSettings;
    }


}

export default GreenlightSettings;

