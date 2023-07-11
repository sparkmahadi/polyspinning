import { createSlice } from "@reduxjs/toolkit"
import { Bars3Icon, CalendarIcon, ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, UsersIcon, XMarkIcon,} from '@heroicons/react/24/outline';

const initialState={
    isSidebarOpen: false,
    navItems: [
            { name: 'Back to Home', link: '/', icon: HomeIcon },
            { name: 'Users', link: 'users', icon: UsersIcon },
            { name: 'Machines', link: 'machines', icon: CalendarIcon },
            { name: 'Products', link: 'products', icon: FolderIcon },
            { name: 'Documents', link: 'documents', icon: InboxIcon },
            { name: 'Reports', link: 'reports', icon: ChartBarIcon },
        ],
    activeNav: "Back to Home",
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers:{
        setSidebarOpen: (state, action) =>{
            state.isSidebarOpen = action.payload;
        },
        setNavItems: (state, action) =>{
            state.navItems = action.payload;
        },
        setActiveNav: (state, action) =>{
            state.activeNav = action.payload;
        },
    },
})

export const { setSidebarOpen, setNavItems, setActiveNav } = dashboardSlice.actions;
export default dashboardSlice.reducer;