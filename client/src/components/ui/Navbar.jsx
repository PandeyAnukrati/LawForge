import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/lawLOGO.png'; // Make sure this path is correct
import { ModeToggle } from '@/components/ui/mode-toggle'; // Shadcn component

// Shadcn UI components for dropdown and avatar
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar'; // Import AvatarFallback
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetClose,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, User, Settings, LogOut } from 'lucide-react'; // Added User, Settings, LogOut icons

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // You might get user info from context or state if needed, e.g., for initials
  const [userInitials, setUserInitials] = useState('JD'); // Placeholder: 'JD' for John Doe
  // const [profilePicUrl, setProfilePicUrl] = useState(''); // If you have a profile picture URL

  // Check token on mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    // In a real app, you'd also fetch user details here to get initials/profile pic
    // For demo, we'll use a placeholder
    // If you have user data in localStorage, you could extract initials:
    // const userData = JSON.parse(localStorage.getItem('user'));
    // if (userData && userData.name) {
    //   setUserInitials(userData.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0,2));
    // }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 bg-white/80 dark:bg-gray-900/80 shadow-md backdrop-blur-md font-jakarta sticky top-0 z-50 transition-colors duration-300">

      {/* Logo */}
      <div className="flex items-center space-x-2 mr-6 md:mr-0">
        <Link to="/">
          <img src={logo} alt="Legal Analyzer Logo" className="h-9 w-auto md:h-11 object-contain transform hover:scale-105 transition-transform duration-200" />
        </Link>
      </div>

      {/* Desktop Nav */}
      <ul className="hidden md:flex flex-1 justify-center space-x-12 text-lg">
        {['/', '/analyze', '/history', '/about', '/contact'].map((path, index) => {
          const labels = ['Home', 'Analyze', 'History', 'About', 'Contact'];
          return (
            <li key={path}>
              <Link
                to={path}
                className={`relative py-1 group transition-colors duration-200 ${
                  isActive(path)
                    ? 'text-blue-700 dark:text-blue-400 font-semibold'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {labels[index]}
                <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-blue-600 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ${isActive(path) ? 'scale-x-100' : ''}`}></span>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Right Section */}
      <div className="flex items-center space-x-2 sm:space-x-4 ml-auto md:ml-0">
        <ModeToggle />

        {/* Desktop Auth Buttons / User Dropdown */}
        <div className="hidden md:flex items-center space-x-3">
          {isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-9 w-9">
                    {/* If you have a profile picture URL: <AvatarImage src={profilePicUrl} alt="User Avatar" /> */}
                    <AvatarFallback className="bg-blue-600 dark:bg-blue-800 text-white font-semibold text-sm">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>My Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="mr-2 h-4 w-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="px-5 py-2.5 text-base font-medium text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="px-5 py-2.5 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all duration-200 rounded-lg shadow-md hover:shadow-lg">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[350px] dark:bg-gray-950 flex flex-col pt-0 pb-0">
              <SheetHeader className="h-20 flex items-center justify-center relative">
                <Link to="/">
                  <img src={logo} alt="LawForge Logo" className="h-10 w-auto object-contain" />
                </Link>
              </SheetHeader>

              {/* Mobile Nav */}
              <nav className="flex flex-col gap-3 flex-grow overflow-y-auto px-4 py-6">
                {['/', '/analyze', '/history', '/about', '/contact'].map((path, index) => {
                  const labels = ['Home', 'Analyze', 'History', 'About', 'Contact'];
                  return (
                    <SheetClose asChild key={path}>
                      <Link
                        to={path}
                        className={`text-lg font-medium py-3 px-4 rounded-md transition-colors duration-200 ${
                          isActive(path)
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                      >
                        {labels[index]}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Mobile Auth Buttons / User Dropdown */}
              <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-6 pb-4 px-4 flex flex-col gap-3">
                {isLoggedIn ? (
                  // Mobile dropdown within the Sheet
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      {/* Button to trigger dropdown in mobile */}
                      <Button variant="outline" className="w-full py-3 text-base font-medium flex items-center justify-center gap-2">
                         <Avatar className="h-7 w-7">
                            {/* <AvatarImage src={profilePicUrl} alt="User Avatar" /> */}
                            <AvatarFallback className="bg-blue-600 dark:bg-blue-800 text-white text-xs">
                                {userInitials}
                            </AvatarFallback>
                         </Avatar>
                         <span>My Account</span> {/* Text for mobile dropdown trigger */}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <SheetClose asChild> {/* Ensure sheet closes on item click */}
                        <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>My Dashboard</span>
                        </DropdownMenuItem>
                      </SheetClose>
                      <SheetClose asChild>
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>My Profile</span>
                        </DropdownMenuItem>
                      </SheetClose>
                      <SheetClose asChild>
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </SheetClose>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <SheetClose asChild>
                      <Link to="/login">
                        <Button variant="outline" className="w-full py-3 text-base font-medium text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200 rounded-lg">
                          Login
                        </Button>
                      </Link>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link to="/signup">
                        <Button className="w-full py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 rounded-lg shadow-md">
                          Sign Up
                        </Button>
                      </Link>
                    </SheetClose>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;