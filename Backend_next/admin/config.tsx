import React from "react"
import type { AdminConfig } from '@keystone-next/keystone/types';
import { CustomNavigation } from "./components/CustomNavigation";

function CustomLogo () {
    return (<img src="https://res.cloudinary.com/dhmtg163x/image/upload/v1632664244/Plasticity_ck6iga.png" alt="Plasticity Logo"></img>)
}

export const components: AdminConfig['components'] = {
  Navigation: CustomNavigation,
  Logo: CustomLogo
}