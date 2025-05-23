'use client';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail
} from '@/components/ui/sidebar';
import {
  homeNavItems,
  managerNavItems,
  storeNavItems,
  useNavItems
} from '@/constants/data';
import { ChevronRight, GalleryVerticalEnd } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';
import { Icons } from '../icons';
import { useAuthStore } from '@/store/useAuthStore';
import { NavItem } from '@/types';
import { cn } from '@/lib/utils';

export const company = {
  name: 'Hasaki',
  logo: GalleryVerticalEnd
  // plan: 'Enterprise'
};

export default function AppSidebar() {
  const user = useAuthStore((state) => state.user);

  const isAdmin = user?.role === 'admin';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 py-2 text-sidebar-accent-foreground ">
          {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <company.logo className="size-4" />
          </div> */}
          <div className="flex      flex-1 items-center pl-6   truncate text-2xl font-semibold leading-tight">
            {company.name}

            {/* <span className="truncate text-xs">{company.plan}</span> */}
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <NetSidebarMenu navItems={homeNavItems}></NetSidebarMenu>
          <SidebarGroupLabel className="px-4 text-sm text-gray-500">
            我的
          </SidebarGroupLabel>
          <NetSidebarMenu navItems={storeNavItems}></NetSidebarMenu>
          <SidebarGroupLabel className="px-4 text-sm text-gray-500">
            教程
          </SidebarGroupLabel>
          <NetSidebarMenu navItems={useNavItems}></NetSidebarMenu>
          {isAdmin && (
            <>
              <SidebarGroupLabel className="px-4 text-sm">
                管理
              </SidebarGroupLabel>
              <NetSidebarMenu navItems={managerNavItems}></NetSidebarMenu>
            </>
          )}
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={user?.image || ''}
                      alt={user?.name || ''}
                    />
                    <AvatarFallback className="rounded-lg">
                      {user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">
                      {user?.name || ''}
                    </span>
                    <span className="truncate text-xs">
                      {user?.email || ''}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                side="bottom"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarFallback className="rounded-lg">
                        {user?.name?.slice(0, 2)?.toUpperCase() || 'CN'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">
                        {user?.name || ''}
                      </span>
                      <span className="truncate text-xs">
                        {' '}
                        {user?.email || ''}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell />
                    Notifications
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  );
}

const NetSidebarMenu = ({ navItems }: { navItems: NavItem[] }) => {
  const pathname = usePathname();
  return (
    <SidebarMenu>
      {navItems.map((item) => {
        const Icon = item.icon ? Icons[item.icon] : Icons.logo;
        return item?.items && item?.items?.length > 0 ? (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={pathname === item.url}
                >
                  {item.icon && <Icon />}
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ) : (
          <SidebarMenuItem key={item.title} className="text-xl">
            <SidebarMenuButton
              asChild
              tooltip={item.title}
              isActive={pathname === item.url}

              // className={pathname === item.url ? '!bg-primary  ' : ''}
            >
              <Link
                href={item.url}
                className={cn(
                  'px-6 py-6',
                  pathname === item.url &&
                    'text  !bg-primary-foreground !text-primary'
                )}
              >
                <Icon size={24} />
                <span className="text-base">{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
};
