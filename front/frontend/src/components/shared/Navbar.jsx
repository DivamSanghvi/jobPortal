import React from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth); // Assuming `store.auth` has `user`

  return (
    <div>
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          {/* Logo */}
          <div>
            <Link to="/">
              <h1 className="text-2xl font-bold">
                Job<span className="text-[#F83002]">Portal</span>
              </h1>
            </Link>
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/Jobs"> Jobs </Link></li>
              <li><Link to="/browse">Browse</Link></li>
            </ul>

            {/* Conditional Rendering Based on User State */}
            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button>
                </Link>
              </div>
            ) : (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src={user?.profile?.profilePhoto || ""}
                      alt={user?.fullname || "User"}
                    />
                    <AvatarFallback>
                      {user?.fullname
                        ? user.fullname
                            .split(" ")
                            .map((name) => name[0])
                            .join("")
                        : "CN"}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-40">
                  <div>
                    {/* User Info */}
                    <div className="flex gap-2 space-y-2">
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src={user?.profile?.profilePhoto || ""}
                          alt={user?.fullname || "User"}
                        />
                        <AvatarFallback>
                          {user?.fullname
                            ? user.fullname
                                .split(" ")
                                .map((name) => name[0])
                                .join("")
                            : "CN"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">{user?.fullname || "User"}</h4>
                        <p className="text-sm text-muted-foreground">
                          {user?.email || "No email available"}
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <User2 />
                        <Button variant="link"><Link to={'/profile'}>View Profile</Link></Button>
                      </div>
                      <div className="flex w-fit items-center gap-2 cursor-pointer">
                        <LogOut />
                        <Button variant="link">Logout</Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
