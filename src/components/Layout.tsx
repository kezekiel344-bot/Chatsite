import React from 'react';
import NavBar from './NavBar';
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => { return (<div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"><NavBar /><main className="max-w-4xl mx-auto p-4">{children}</main></div>); };
export default Layout;