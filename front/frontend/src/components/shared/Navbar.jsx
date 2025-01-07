import React from "react";
import { Popover, PopoverTrigger } from "../ui/popover";
import { PopoverContent } from "@radix-ui/react-popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const user = false
  
  return (
    <div>
      <div className="bg-white">
        <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
          <div>
            <Link to="/">
            <h1 className="text-2xl font-bold">
              Job<span className="text-[#F83002]">Portal</span>
            </h1>
            </Link>
          </div>
          <div className="flex items-center gap-12">
            <ul className="flex font-medium items-center gap-5">
              <li>Home</li>
              <li>Jobs</li>
              <li>Browse</li>
            </ul>
            {
              !user ? (
                <div className='flex items-center gap-2'>
                <Link to="/login"><Button variant="outline">Login</Button></Link>
                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                </div>
              ) : (
                <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-40 ">
                  <div>
                    <div className='flex gap-2 space-y-2'>
                      <Avatar className="cursor-pointer">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium">Divam Sanghvi</h4>
                        <p className="text-sm text-muted-foreground">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                        </p>
                      </div>
                    </div>
                    <div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2/>
                          <Button variant="link"> View Profile</Button>
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <LogOut/>
                          <Button variant="link">Logout</Button>
                        </div>
                      </div>
                  </div>
                </PopoverContent>
              </Popover>)
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
