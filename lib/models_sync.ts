/*USAGE:
The module will export 1 objects: models,add models and sync_function.
The export contains a promise to wait that all the Models are synchronized with the Database.
Use sync_function.then to operate with models */

const Sync=async (Ctx)=>{
        for(let model in Ctx){
                await Ctx[model].sync();
        }
}
export default Sync;
