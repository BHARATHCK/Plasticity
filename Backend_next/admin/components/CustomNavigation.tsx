import { NavigationContainer, NavItem, ListNavItems } from '@keystone-next/keystone/admin-ui/components';
import type { NavigationProps } from '@keystone-next/keystone/admin-ui/components';
import React from "react";

export function CustomNavigation({ authenticatedItem, lists }: NavigationProps) {
    return (
      <NavigationContainer authenticatedItem={authenticatedItem}>
        <ListNavItems lists={lists}/>
        <NavItem href={process.env.FRONTEND_URL || ""}>
            Plasticity Web
        </NavItem>
      </NavigationContainer>
    )
  }