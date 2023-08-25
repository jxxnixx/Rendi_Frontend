import { motion, useCycle, Variants } from "framer-motion";
import Link from "next/link";
import Circle from "../category/circle";

// Sidebar animation variants
const sidebarVariants: Variants = {
  open: {
    x: 0,
    width: "100vw",
    transition: {
      duration: 0.2,
    },
  },
  closed: {
    x: "-100%",
    width: 0,
    transition: {
      duration: 0.2,
      delay: 0.2,
    },
  },
};

// Toggler component

const Path = ({ openPath, closedPath, ...rest }: any) => {
  return (
    <motion.path
      fill="transparent"
      strokeWidth="2"
      stroke="hsl(0, 0%, 18%)"
      strokeLinecap="round"
      variants={{
        open: { d: openPath, transition: { duration: 0.3 } },
        closed: { d: closedPath, transition: { duration: 0.3 } },
      }}
      {...rest}
    ></motion.path>
  );
};

const Toggler = ({ toggle }: any) => {
  return (
    <>
      <button
        onClick={toggle}
        className="absolute h-[24px] w-[24px] rounded-full border-0 outline-none focus:outline-none ml-3"
      >
        <svg width="23" height="23" viewBox="0 0 23 23">
          <Path openPath="M 3 16.5 L 17 2.5" closedPath="M 2 2.5 L 20 2.5" />
          <Path closedPath="M 2 9.423 L 20 9.423" openPath="" />
          <Path
            closedPath="M 2 16.346 L 20 16.346"
            openPath="M 3 2.5 L 17 16.346"
          />
        </svg>
      </button>
    </>
  );
};

// Navigation component
const Navigation = ({ onItemClick }: any) => {
  const navigationItems = [
    { label: "Today", path: "/" },
    { label: "Best", path: "/menus/best" },
    { label: "New", path: "/menus/new" },
    { label: "Market", path: "/menus/market" },
    { label: "Trend", path: "/menus/trend" },
  ];

  const icons = [
    "Top",
    "Outer",
    "Dress",
    "Pants",
    "Skirt",
    "Training",
    "Inner",
    "Swimsuit",
    "Shoes",
    "Bag",
    "Mgoods",
    "ETC",
  ];

  return (
    <ul className="absolute">
      {navigationItems.map((item, index) => (
        <li key={index}>
          <Link
            href={item.path}
            onClick={onItemClick}
            className="flex items-center space-x-3"
          >
            <span>{item.label}</span>
          </Link>
        </li>
      ))}
      <li>
        <div className="flex flex-col items-center space-x-3">
          {icons.map((icon, index) => (
            <Circle key={index} icon={icon} direction="vert" />
          ))}
        </div>
      </li>
    </ul>
  );
};

// Sidebar component
export default function SideBar() {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <div className={"overflow-hidden bg-white"}>
      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
        className="absolute top-5 left-0 bottom-0 "
      >
        <motion.div
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          className="absolute -top-5 -left-2 bottom-0 w-screen h-screen bg-white"
        />
        <Toggler toggle={() => toggleOpen()} />
        {isOpen && (
          <Navigation
            onItemClick={() => {
              toggleOpen();
            }}
          />
        )}
      </motion.nav>
    </div>
  );
}
