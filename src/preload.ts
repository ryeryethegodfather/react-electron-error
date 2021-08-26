import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('e_Landing', {
 // getDbs: () : string[]   => { ipcRenderer.invoke('asynchronous-get-DBs') }
 getDbs: async function() : Promise<string[] | []> 
  { 
    const dbs = await ipcRenderer.invoke('asynchronous-get-DBs')
    return dbs;
    }
});