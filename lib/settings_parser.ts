class GreenlightSettings{

    public settings:{};//Settings dictionary

    /**
    *Call this method to set the settings object.
    *@param moduleSettings - The settings dictionary to be used in the object
    */
    public setSettings=(moduleSettings)=>{
        this.settings=moduleSettings;
    }


}

export default GreenlightSettings;

