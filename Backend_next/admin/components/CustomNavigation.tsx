import { NavigationContainer, NavItem, ListNavItems,PageContainer } from '@keystone-next/keystone/admin-ui/components';
import type { NavigationProps } from '@keystone-next/keystone/admin-ui/components';
import React from "react";

export function CustomNavigation({ authenticatedItem, lists }: NavigationProps) {
    return (
      <NavigationContainer authenticatedItem={authenticatedItem}>
        <ListNavItems lists={lists}/>
        <NavItem href="https://plasticity-web.herokuapp.com/">
            Plasticity Web
        </NavItem>
      </NavigationContainer>
    )
  }