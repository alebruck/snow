import { Disclosure, DisclosureButton } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink, Outlet } from "@remix-run/react";
import classNames from "classnames";
import slopeflux from "./slopeflux.png";

export default function Dashboard() {
  return (
    <div className="min-h-full flex flex-col">
      <Disclosure as="nav" className=" bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-25 justify-between">
            <div className="flex">
              <div className="flex shrink-0 items-center">
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
              </div>
              <div className="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
                <NavLink
                  to="/"
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
                  Dashboard
                </NavLink>
                <NavLink
                  to="/realtime"
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
                  Realtime
                </NavLink>
                <NavLink
                  to="/map"
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
                  Map
                </NavLink>
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
