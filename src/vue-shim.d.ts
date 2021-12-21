  
// declare module '*.vue' {
//     import { ComponentOptions } from 'vue'
//     const component: ComponentOptions;
//     export default component;
// }

// declare module "*.vue" {
//     import Vue from 'vue'
//     export default Vue
//   }

  declare module "*.vue" {
    import { defineComponent } from "vue";
    const component: ReturnType<typeof defineComponent>;
    export default component;
  }
  