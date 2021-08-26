
export interface e_Landing {
   async getDbs:  () => string[] | []
  }
  
  declare global {
    interface Window {
      e_Landing: e_Landing;
    }
  }