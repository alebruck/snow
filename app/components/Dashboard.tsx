import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, Outlet } from "@remix-run/react";
import classNames from "classnames";
import slopeflux from "./slopeflux.png";

const navigation = [
  { name: "KPIs", href: "/" },
  { name: "Efficiency", href: "/capacity" },
  { name: "Realtime", href: "/realtime" },
  { name: "Map", href: "/map" },
];

export default function Dashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <Disclosure as="nav" className=" bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-25 justify-between">
            <div className="flex">
              <Link to={"/"} className="flex shrink-0 items-center">
                <img
                  alt="SlopeFlux"
                  src={slopeflux}
                  className="block h-24 w-auto lg:hidden"
                />
                <img
                  alt="SlopeFlux"
                  src={slopeflux}
                  className="hidden h-24 w-auto lg:block"
                />
              </Link>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      classNames(
                        "inline-flex items-center px-1 pt-1 text-sm font-medium",
                        {
                          "border-indigo-500 text-gray-900": isActive,
                          "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700":
                            !isActive,
                        }
                      )
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <button
                type="button"
                className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="block h-6 w-6 group-data-[open]:hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="hidden h-6 w-6 group-data-[open]:block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <DisclosurePanel className="sm:hidden">
          <div className="space-y-1 pb-3 pt-2">
            {navigation.map((item) => (
              <DisclosureButton
                key={item.name}
                as="a"
                href={item.href}
                className="border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800, block border-l-4 py-2 pl-3 pr-4 text-base font-medium"
              >
                {item.name}
              </DisclosureButton>
            ))}
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div className="py-10 flex flex-col flex-1">
        <main className="flex flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-1">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
