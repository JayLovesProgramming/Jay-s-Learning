import { useState, StrictMode } from 'react';
import { BookOpen, Laptop, ChevronRight, Menu, X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { createRoot } from 'react-dom/client'
import './App.css'

interface Section {
  title: string;
  text: string;
}

interface SubTab {
  id: string;
  title: string;
  text: string;
}

interface PageContent {
  title: string;
  description: string;
  sections: Section[];
}

interface NavigationItem {
  id: string;
  title: string;
  icon: JSX.Element;
  content: PageContent;
  subTabs?: SubTab[]; // Optional subTabs array
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState<string>('getting-started');
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const navigation: NavigationItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookOpen className="w-5 h-5" />,
      content: {
        title: 'Getting Started With Jay\'s Learning',
        description: 'A simple guide to learning things about all computer related things',
        sections: [],
      },
    },
    {
      id: 'linux',
      title: 'Linux',
      icon: <Laptop className="w-5 h-5" />,
      content: {
        title: 'Linux Learning',
        description: 'Explore the powerful features of Linux',
        sections: [
        ],
      },
      subTabs: [
        {
          id: 'simple-commands',
          title: 'Simple Terminal Commands',
          text: `# File and Directory Management
- ls # List directory contents
- cd <dir> # Change directory to <dir>
- rm <file> # Remove a file
- rmdir <dir> # Remove an empty directory
- cp <src> <dest> # Copy file or directory
- mv <src> <dest> # Move or rename file/directory
- touch <file> # Create a new empty file
- chmod 755 <file> # Change file permissions

# System Info and Monitoring
- uname -a # Display system information
- df -h # Show disk usage
- free -m # Show memory usage
- top # Display tasks and system load
- ps aux # List running processes

# Process Management
- kill <pid> # Kill process by PID
- killall <process> # Kill process by name
- htop # Interactive process viewer (if installed)

# Package Management
# Debian/Ubuntu
- apt install <package>, apt update
# Fedora/CentOS
- yum install <package>, dnf update
# Arch Linux
- pacman -S <package>, pacman -Syu
          `,
        },
        {
          id: 'linux_directories',
          title: 'About Linux Directories',
          text: `# Linux Directories Overview
- / # The top-level directory in Linux. All files and directories in the system are organized under the root directory
- ~ # The tilde (~) is a shortcut for the current user's home directory. Running cd ~ will take you to your personal home directory (e.g., /home/username). You can also use cd ~username to navigate to another user's home directory (provided you have the necessary permissions).
- /home # Contains home directories for users. Each user has their own sub-directory where they store personal files and settings
- /bin # Stores essential system binaries (executables) needed for the system to function
- /sbin # Stores essential system binaries (executables) needed for adminstrative tasks, usually requiring superuser (root) permissions
- /etc # Configuration files for system services and applications are stored here. For example, network configuration, user accounts and system services are managed through files in this directory
- /var # Stores variable data like system logs (/var/log), mail and other files that frequently change over time
- /usr # Holds user-installed software, libraries, documentation and other resources. It's one of the largest directories and contains sub-directories like /usr/bin, /usr/lib, and /usr/share
- /tmp # A temporary directory for storing files created by system processes and users. Files here are usually deleted on reboot
- /opt # Used for installing third-party software that isn't managed by the system's package manager. For example, manually installed applications can reside here
- /dev # Contains special files that represent system devices, such as hard drives, terminals and peripherals. These files allow software to intereact with hardware components
- /mnt and /media # Directories used for mounting external storage devices, such as USB drives, CDs or network shares

# Key Commands for Directory Management
- ls # List directory contents
- cd <dir> # Change directory to <dir>
- mkdir <dir> # Create a new directory
- rmdir <dir> # Remove an empty directory
- rm -r <dir> # Remove a directory and its contents
- pwd # Print current working directory`,
        },
        {
          id: 'package-management',
          title: 'Package Management Commands',
          text: `# Debian/Ubuntu
- apt install <package> # Install a package
- apt update # Update package lists
- apt upgrade # Upgrade installed packages
- apt update && apt upgrade # Commonly used as a combination

# Fedora/CentOS
- yum install <package> # Install a package
- yum update # Update all packages

# Arch Linux
- pacman -S <package> # Install a package
- pacman -Syu # Update the system
          `,
        },
        {
          id: 'networking-commands',
          title: 'Networking Commands',
          text: `- ifconfig # Display network configuration
- ping <host> # Test network connectivity
- iptables -h # List firewall rules
- netstat -tuln # List active network connections
- curl <url> # Make network requests`,
        },
      ],
    },
    {
      id: 'windows',
      title: 'Windows',
      icon: <Laptop className="w-5 h-5" />,
      content: {
        title: 'Windows Learning',
        description: 'Explore the powerful features of Windows',
        sections: [
          {
            title: 'Core Features',
            text: 'Discover the main features that make our platform unique.',
          },
        ],
      },
      subTabs: [
        {
          id: 'simple-commands',
          title: 'Simple Command Prompt Commands',
          text: `# File and Directory Management
- dir # List directory contents
- cd <dir> # Change directory
- del <file> # Delete a file
- copy <src> <dest> # Copy file
- move <src> <dest> # Move file

# System Info and Monitoring
- systeminfo # Display system information
- tasklist # List running processes
- taskkill /F /PID <pid> # Kill process by PID

# Networking
- ipconfig # Display network configuration
- ping <host> # Check network connectivity
- netstat -an # List open network ports
- tracert <host> # Trace the route to a host
          `,
        },
      ],
    },
  ];

  const currentPage = navigation.find((item) => item.id === activePage);
  const currentSubTab = currentPage?.subTabs?.find((item) => item.id === activeSubTab) ?? null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="w-36 h-6" /> : <Menu className="w-36 h-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed z-40 py-5 flex flex-col bg-white shadow-lg transform transition-transform duration-300 ease-in-out
         lg:static lg:w-64
      `}
      >
        <div className="p-6">
          <a href='/' className="text-2xl font-bold text-gray-800">Jay's Learning</a>
        </div>
        <nav className="px-4 space-y-1 flex flex-col gap-2">
          {navigation.map((item) => (
            <div key={item.id}>
              <button
                onClick={() => {
                  setActivePage(item.id);
                  // setActiveSubTab(null); // Reset sub-tab on main tab change
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 text-sm rounded-md transition-colors hover:animate-pulse
                  ${activePage === item.id
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-50'}
                `}
              >
                {item.icon}
                {item.title}
                <ChevronRight
                  className={`
                  w-4 h-4 ml-auto transition-transform
                  ${activePage === item.id ? 'rotate-90' : ''}
                `}
                />
              </button>

              {/* Sub-tabs */}
              {activePage === item.id && item.subTabs && (
                <div className="flex flex-col gap-1 pt-2">
                  {item.subTabs.map((subTab) => (
                    <button
                      key={subTab.id}
                      onClick={() => setActiveSubTab(subTab.id)}
                      className={`
                        w-full flex text-xs items-start justify-center py-2.5 px-2 rounded-[2.5rem] font-extrabold transition-colors hover:animate-pulse
                        ${activeSubTab === subTab.id
                          ? 'bg-green-200 text-lime-700'
                          : 'text-gray-600 hover:bg-gray-50'}
                      `}
                    >
                      {subTab.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="w-screen p-5">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {currentPage?.content.title}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {currentPage?.content.description}
        </p>

        {currentSubTab ? (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              {currentSubTab.title}
            </h2>
            <SyntaxHighlighter language="bash" className={" w-10/12"} style={dracula}>
              {currentSubTab.text}
            </SyntaxHighlighter>
          </div>
        ) : (
          currentPage?.content.sections.map((section, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {section.title}
              </h2>
              {section.text.includes('\n') ? (
                <SyntaxHighlighter language="bash" className={"w-10/12"} style={dracula}>
                  {section.text}
                </SyntaxHighlighter>
              ) : (
                <p className="text-gray-600">{section.text}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)